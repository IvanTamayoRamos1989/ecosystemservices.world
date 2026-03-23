"""
Phase 2 — Agente de Diagnóstico
================================
Examines the emissions inventory and classifies sources by priority.

Inputs:  Inventory data (base year, total tCO2e, Scope distribution, energy, fuels, targets).
Outputs: Top 3-5 priority sources, scope assignment, preliminary targets, timeline, alternatives.
"""

from __future__ import annotations

from dataclasses import dataclass, field

from ..models.inventory import (
    DecarbonizationTarget,
    EmissionResult,
    EmissionSource,
    EmissionSummary,
    Scope,
    TimeHorizon,
)


@dataclass
class DiagnosticInput:
    """Structured input for the diagnostic agent."""
    # 1. Inventario
    anio_base: int
    summary: EmissionSummary
    gases_incluidos: list[str] = field(default_factory=lambda: ["CO2", "CH4", "N2O"])
    # 2. Consumo energético
    consumo_electrico_kwh: float = 0.0
    porcentaje_renovable: float = 0.0
    generacion_propia_kwh: float = 0.0
    # 3. Combustibles fósiles
    combustibles: list[str] = field(default_factory=list)
    procesos_termicos: list[str] = field(default_factory=list)
    # 4. Objetivos
    target: DecarbonizationTarget | None = None


@dataclass
class PrioritySource:
    """A prioritised emission source from the diagnostic."""
    source: EmissionSource
    tCO2e: float
    porcentaje_total: float
    scope: Scope
    alternativas: list[str] = field(default_factory=list)
    reduccion_potencial_tCO2e: float = 0.0
    horizonte: TimeHorizon = TimeHorizon.MEDIUM
    viabilidad_tecnica: str = "media"


@dataclass
class DiagnosticOutput:
    """Output of the diagnostic agent."""
    fuentes_prioritarias: list[PrioritySource]
    objetivo_preliminar_reduccion_pct: float
    trayectoria_hitos: dict[int, float]  # year -> target tCO2e
    resumen: str = ""


class DiagnosticAgent:
    """Agente de Diagnóstico — Phase 2.

    Examines the emissions inventory, identifies the top sources responsible
    for 70-80% of total emissions, and generates preliminary reduction targets.
    """

    COVERAGE_THRESHOLD = 0.80  # target 80% of emissions

    def run(
        self,
        diagnostic_input: DiagnosticInput,
        sources: list[EmissionSource],
        results: list[EmissionResult],
    ) -> DiagnosticOutput:
        di = diagnostic_input
        total = di.summary.total_tCO2e
        if total <= 0:
            return DiagnosticOutput(
                fuentes_prioritarias=[],
                objetivo_preliminar_reduccion_pct=0.0,
                trayectoria_hitos={},
                resumen="No emissions recorded.",
            )

        # --- Aggregate tCO2e per source ---
        source_totals: dict[str, float] = {}
        for r in results:
            if r.anio != di.anio_base:
                continue
            source_totals[r.source_id] = source_totals.get(r.source_id, 0.0) + r.tCO2e

        # Sort descending
        ranked = sorted(source_totals.items(), key=lambda x: x[1], reverse=True)

        # --- Select top sources covering ~80% ---
        source_map = {s.id: s for s in sources}
        priority_sources: list[PrioritySource] = []
        accumulated = 0.0

        for src_id, tco2e in ranked:
            if accumulated / total >= self.COVERAGE_THRESHOLD and len(priority_sources) >= 3:
                break
            src = source_map.get(src_id)
            if src is None:
                continue

            pct = tco2e / total * 100
            alternatives = self._suggest_alternatives(src, di)
            horizon = self._estimate_horizon(src)
            potential = self._estimate_reduction_potential(src, tco2e)

            priority_sources.append(PrioritySource(
                source=src,
                tCO2e=tco2e,
                porcentaje_total=round(pct, 1),
                scope=src.scope,
                alternativas=alternatives,
                reduccion_potencial_tCO2e=round(potential, 1),
                horizonte=horizon,
                viabilidad_tecnica=self._assess_feasibility(src),
            ))
            accumulated += tco2e

            if len(priority_sources) >= 5:
                break

        # --- Preliminary reduction target ---
        if di.target:
            reduccion_pct = di.target.reduccion_porcentaje
            anio_objetivo = di.target.anio_objetivo
        else:
            # Default SBTi 1.5°C aligned: ~4.2% annual linear reduction
            reduccion_pct = 42.0  # by 2030 from 2020 baseline
            anio_objetivo = 2030

        # --- Build trajectory milestones ---
        hitos = self._build_trajectory(di.anio_base, total, reduccion_pct, anio_objetivo)

        return DiagnosticOutput(
            fuentes_prioritarias=priority_sources,
            objetivo_preliminar_reduccion_pct=reduccion_pct,
            trayectoria_hitos=hitos,
            resumen=self._generate_summary(priority_sources, reduccion_pct, anio_objetivo),
        )

    # --- Private helpers ---

    def _suggest_alternatives(
        self, source: EmissionSource, di: DiagnosticInput
    ) -> list[str]:
        cat = source.categoria.lower()
        alternatives: list[str] = []

        if "electricidad" in cat or "grid" in cat:
            alternatives.extend([
                "Contrato PPA de energía renovable",
                "Instalación de autoconsumo fotovoltaico",
                "Mejora de eficiencia energética en iluminación y climatización",
            ])
        elif "caldera" in cat or "gas" in cat or "termico" in cat:
            alternatives.extend([
                "Electrificación de calderas (bomba de calor industrial)",
                "Mejora de eficiencia térmica (aislamiento, recuperación de calor)",
                "Sustitución por biogás o hidrógeno verde",
            ])
        elif "vehiculo" in cat or "transporte" in cat or "flota" in cat:
            alternatives.extend([
                "Electrificación de flota (BEV)",
                "Optimización de rutas y conducción eficiente",
                "Combustibles alternativos (HVO, biocombustibles)",
            ])
        elif "refrigeracion" in cat or "fugitivas" in cat:
            alternatives.extend([
                "Sustitución de refrigerantes de alto GWP",
                "Mejora de estanqueidad y mantenimiento preventivo",
            ])
        else:
            alternatives.append("Auditoría energética específica requerida")

        return alternatives

    def _estimate_horizon(self, source: EmissionSource) -> TimeHorizon:
        cat = source.categoria.lower()
        if any(k in cat for k in ["electricidad", "grid", "iluminacion"]):
            return TimeHorizon.SHORT
        if any(k in cat for k in ["caldera", "transporte", "flota"]):
            return TimeHorizon.MEDIUM
        return TimeHorizon.LONG

    def _estimate_reduction_potential(
        self, source: EmissionSource, current_tCO2e: float
    ) -> float:
        cat = source.categoria.lower()
        if "electricidad" in cat or "grid" in cat:
            return current_tCO2e * 0.90  # up to 90% with full renewables
        if "caldera" in cat or "gas" in cat:
            return current_tCO2e * 0.60
        if "vehiculo" in cat or "transporte" in cat:
            return current_tCO2e * 0.50
        return current_tCO2e * 0.30

    def _assess_feasibility(self, source: EmissionSource) -> str:
        cat = source.categoria.lower()
        if "electricidad" in cat or "grid" in cat:
            return "alta"
        if "caldera" in cat or "transporte" in cat:
            return "media"
        return "baja"

    def _build_trajectory(
        self,
        anio_base: int,
        emisiones_base: float,
        reduccion_pct: float,
        anio_objetivo: int,
    ) -> dict[int, float]:
        """Linear interpolation of reduction milestones."""
        horizonte = anio_objetivo - anio_base
        if horizonte <= 0:
            return {anio_base: emisiones_base}

        tasa_anual = reduccion_pct / horizonte / 100
        hitos: dict[int, float] = {anio_base: round(emisiones_base, 1)}

        milestone_years = sorted({
            anio_base + 2,
            2025,
            2030,
            2035,
            anio_objetivo,
        })

        for year in milestone_years:
            if year <= anio_base or year > anio_objetivo:
                continue
            years_elapsed = year - anio_base
            factor = 1.0 - (tasa_anual * years_elapsed)
            hitos[year] = round(emisiones_base * max(factor, 0), 1)

        return hitos

    def _generate_summary(
        self,
        sources: list[PrioritySource],
        reduccion_pct: float,
        anio_objetivo: int,
    ) -> str:
        lines = [
            f"Diagnóstico: {len(sources)} fuentes prioritarias identificadas.",
            f"Objetivo preliminar: -{reduccion_pct}% para {anio_objetivo}.",
        ]
        for i, ps in enumerate(sources, 1):
            lines.append(
                f"  {i}. {ps.source.nombre} (Scope {ps.scope.value}): "
                f"{ps.tCO2e:.1f} tCO2e ({ps.porcentaje_total}%) — "
                f"Reducción potencial: {ps.reduccion_potencial_tCO2e:.1f} tCO2e"
            )
        return "\n".join(lines)
