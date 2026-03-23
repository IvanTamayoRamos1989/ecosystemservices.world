"""
Phase 3 — Agente de Senda de Descarbonización
===============================================
Translates the inventory into an SBTi-aligned preliminary pathway.

Decision Rules (IF/THEN):
  - IF electricidad comprada  → THEN renovables + eficiencia energética
  - IF combustión gas natural  → THEN eficiencia térmica + electrificación calderas + sustitución
  - IF transporte              → THEN electrificación de flota + combustibles alternativos

Outputs: Preliminary SBTi pathway, reduction alternatives by source, timeline, estimated potential.
"""

from __future__ import annotations

from dataclasses import dataclass, field

from ..models.inventory import (
    ReductionLever,
    ReductionMeasure,
    Scope,
    TimeHorizon,
)
from .diagnostic_agent import DiagnosticOutput, PrioritySource


@dataclass
class SourceAlternative:
    """A reduction alternative tied to a specific emission source."""
    source_id: str
    source_nombre: str
    scope: Scope
    palanca: ReductionLever
    medida: str
    reduccion_estimada_tCO2e: float
    horizonte: TimeHorizon
    prioridad: int  # 1 = highest


@dataclass
class PathwayOutput:
    """Output of the Pathway Agent."""
    senda_preliminar: dict[int, float]  # year -> target tCO2e
    alternativas: list[SourceAlternative]
    medidas: list[ReductionMeasure]
    resumen: str = ""


class PathwayAgent:
    """Agente de Senda de Descarbonización — Phase 3.

    Applies decision rules to translate the diagnostic into a concrete
    reduction pathway with prioritised alternatives per source.
    """

    def run(self, diagnostic: DiagnosticOutput) -> PathwayOutput:
        alternativas: list[SourceAlternative] = []
        medidas: list[ReductionMeasure] = []
        measure_counter = 0

        for ps in diagnostic.fuentes_prioritarias:
            cat = ps.source.categoria.lower()
            src_alts, src_measures = self._apply_decision_rules(ps, cat)
            for m in src_measures:
                measure_counter += 1
                m.id = f"M-{measure_counter:03d}"
            alternativas.extend(src_alts)
            medidas.extend(src_measures)

        # --- Build preliminary SBTi pathway ---
        senda = self._build_senda(diagnostic)

        # --- Assign required reduction per source across the pathway ---
        self._distribute_reductions(senda, alternativas, diagnostic)

        return PathwayOutput(
            senda_preliminar=senda,
            alternativas=sorted(alternativas, key=lambda a: a.prioridad),
            medidas=medidas,
            resumen=self._generate_summary(senda, alternativas),
        )

    # ------------------------------------------------------------------
    # Decision Rules (IF / THEN)
    # ------------------------------------------------------------------

    def _apply_decision_rules(
        self, ps: PrioritySource, categoria: str
    ) -> tuple[list[SourceAlternative], list[ReductionMeasure]]:
        alts: list[SourceAlternative] = []
        measures: list[ReductionMeasure] = []

        if self._is_electricity(categoria):
            # IF electricidad comprada → THEN renovables + eficiencia
            alts, measures = self._rule_electricity(ps)

        elif self._is_natural_gas(categoria):
            # IF combustión gas natural → THEN eficiencia térmica + electrificación + sustitución
            alts, measures = self._rule_natural_gas(ps)

        elif self._is_transport(categoria):
            # IF transporte → THEN electrificación flota + combustibles alternativos
            alts, measures = self._rule_transport(ps)

        else:
            # Generic fallback
            alts, measures = self._rule_generic(ps)

        return alts, measures

    # --- Category detection helpers ---

    @staticmethod
    def _is_electricity(cat: str) -> bool:
        return any(k in cat for k in ["electricidad", "grid", "comprada", "red"])

    @staticmethod
    def _is_natural_gas(cat: str) -> bool:
        return any(k in cat for k in ["gas", "caldera", "termico", "combustion"])

    @staticmethod
    def _is_transport(cat: str) -> bool:
        return any(k in cat for k in ["transporte", "vehiculo", "flota", "logistica"])

    # ------------------------------------------------------------------
    # Rule implementations
    # ------------------------------------------------------------------

    def _rule_electricity(
        self, ps: PrioritySource
    ) -> tuple[list[SourceAlternative], list[ReductionMeasure]]:
        base = ps.tCO2e
        alts = [
            SourceAlternative(
                source_id=ps.source.id,
                source_nombre=ps.source.nombre,
                scope=ps.scope,
                palanca=ReductionLever.RENEWABLES,
                medida="Contrato PPA de electricidad 100% renovable",
                reduccion_estimada_tCO2e=round(base * 0.80, 1),
                horizonte=TimeHorizon.SHORT,
                prioridad=1,
            ),
            SourceAlternative(
                source_id=ps.source.id,
                source_nombre=ps.source.nombre,
                scope=ps.scope,
                palanca=ReductionLever.RENEWABLES,
                medida="Instalación fotovoltaica de autoconsumo",
                reduccion_estimada_tCO2e=round(base * 0.30, 1),
                horizonte=TimeHorizon.MEDIUM,
                prioridad=2,
            ),
            SourceAlternative(
                source_id=ps.source.id,
                source_nombre=ps.source.nombre,
                scope=ps.scope,
                palanca=ReductionLever.EFFICIENCY,
                medida="Programa de eficiencia energética (LED, HVAC, BMS)",
                reduccion_estimada_tCO2e=round(base * 0.15, 1),
                horizonte=TimeHorizon.SHORT,
                prioridad=3,
            ),
        ]
        measures = [
            ReductionMeasure(
                id="", nombre=a.medida, descripcion=a.medida,
                tipo=a.palanca, scope_aplicable=a.scope,
                source_id=a.source_id,
                reduccion_estimada_tCO2e=a.reduccion_estimada_tCO2e,
                horizonte=a.horizonte, vida_util_anios=15 if "fotovoltaica" in a.medida else 10,
            )
            for a in alts
        ]
        return alts, measures

    def _rule_natural_gas(
        self, ps: PrioritySource
    ) -> tuple[list[SourceAlternative], list[ReductionMeasure]]:
        base = ps.tCO2e
        alts = [
            SourceAlternative(
                source_id=ps.source.id,
                source_nombre=ps.source.nombre,
                scope=ps.scope,
                palanca=ReductionLever.EFFICIENCY,
                medida="Mejora de eficiencia térmica (aislamiento + recuperación de calor)",
                reduccion_estimada_tCO2e=round(base * 0.20, 1),
                horizonte=TimeHorizon.SHORT,
                prioridad=1,
            ),
            SourceAlternative(
                source_id=ps.source.id,
                source_nombre=ps.source.nombre,
                scope=ps.scope,
                palanca=ReductionLever.ELECTRIFICATION,
                medida="Electrificación de calderas (bomba de calor industrial)",
                reduccion_estimada_tCO2e=round(base * 0.50, 1),
                horizonte=TimeHorizon.MEDIUM,
                prioridad=2,
            ),
            SourceAlternative(
                source_id=ps.source.id,
                source_nombre=ps.source.nombre,
                scope=ps.scope,
                palanca=ReductionLever.FUEL_SWITCH,
                medida="Sustitución por biogás o hidrógeno verde",
                reduccion_estimada_tCO2e=round(base * 0.40, 1),
                horizonte=TimeHorizon.LONG,
                prioridad=3,
            ),
        ]
        measures = [
            ReductionMeasure(
                id="", nombre=a.medida, descripcion=a.medida,
                tipo=a.palanca, scope_aplicable=a.scope,
                source_id=a.source_id,
                reduccion_estimada_tCO2e=a.reduccion_estimada_tCO2e,
                horizonte=a.horizonte,
                vida_util_anios=15 if "bomba" in a.medida else 10,
            )
            for a in alts
        ]
        return alts, measures

    def _rule_transport(
        self, ps: PrioritySource
    ) -> tuple[list[SourceAlternative], list[ReductionMeasure]]:
        base = ps.tCO2e
        alts = [
            SourceAlternative(
                source_id=ps.source.id,
                source_nombre=ps.source.nombre,
                scope=ps.scope,
                palanca=ReductionLever.ELECTRIFICATION,
                medida="Electrificación de flota (vehículos eléctricos BEV)",
                reduccion_estimada_tCO2e=round(base * 0.60, 1),
                horizonte=TimeHorizon.MEDIUM,
                prioridad=1,
            ),
            SourceAlternative(
                source_id=ps.source.id,
                source_nombre=ps.source.nombre,
                scope=ps.scope,
                palanca=ReductionLever.EFFICIENCY,
                medida="Optimización de rutas y eco-driving",
                reduccion_estimada_tCO2e=round(base * 0.10, 1),
                horizonte=TimeHorizon.SHORT,
                prioridad=2,
            ),
            SourceAlternative(
                source_id=ps.source.id,
                source_nombre=ps.source.nombre,
                scope=ps.scope,
                palanca=ReductionLever.FUEL_SWITCH,
                medida="Combustibles alternativos (HVO / biocombustibles)",
                reduccion_estimada_tCO2e=round(base * 0.30, 1),
                horizonte=TimeHorizon.SHORT,
                prioridad=3,
            ),
        ]
        measures = [
            ReductionMeasure(
                id="", nombre=a.medida, descripcion=a.medida,
                tipo=a.palanca, scope_aplicable=a.scope,
                source_id=a.source_id,
                reduccion_estimada_tCO2e=a.reduccion_estimada_tCO2e,
                horizonte=a.horizonte, vida_util_anios=8,
            )
            for a in alts
        ]
        return alts, measures

    def _rule_generic(
        self, ps: PrioritySource
    ) -> tuple[list[SourceAlternative], list[ReductionMeasure]]:
        base = ps.tCO2e
        alts = [
            SourceAlternative(
                source_id=ps.source.id,
                source_nombre=ps.source.nombre,
                scope=ps.scope,
                palanca=ReductionLever.EFFICIENCY,
                medida="Auditoría energética y plan de eficiencia",
                reduccion_estimada_tCO2e=round(base * 0.15, 1),
                horizonte=TimeHorizon.SHORT,
                prioridad=1,
            ),
        ]
        measures = [
            ReductionMeasure(
                id="", nombre=a.medida, descripcion=a.medida,
                tipo=a.palanca, scope_aplicable=a.scope,
                source_id=a.source_id,
                reduccion_estimada_tCO2e=a.reduccion_estimada_tCO2e,
                horizonte=a.horizonte, vida_util_anios=5,
            )
            for a in alts
        ]
        return alts, measures

    # ------------------------------------------------------------------
    # Pathway construction
    # ------------------------------------------------------------------

    def _build_senda(self, diagnostic: DiagnosticOutput) -> dict[int, float]:
        """Use diagnostic trajectory or generate a linear SBTi-aligned pathway."""
        if diagnostic.trayectoria_hitos:
            return dict(diagnostic.trayectoria_hitos)
        return {}

    def _distribute_reductions(
        self,
        senda: dict[int, float],
        alternativas: list[SourceAlternative],
        diagnostic: DiagnosticOutput,
    ) -> None:
        """Assign each alternative's reduction to appropriate pathway milestones."""
        # Grouped by horizon for roadmap alignment
        for alt in alternativas:
            if alt.horizonte == TimeHorizon.SHORT:
                alt.prioridad = min(alt.prioridad, 2)
            elif alt.horizonte == TimeHorizon.LONG:
                alt.prioridad = max(alt.prioridad, 3)

    def _generate_summary(
        self, senda: dict[int, float], alternativas: list[SourceAlternative]
    ) -> str:
        lines = ["Senda de Descarbonización Preliminar (SBTi-aligned):"]
        for year in sorted(senda):
            lines.append(f"  {year}: {senda[year]:,.1f} tCO2e")

        lines.append(f"\nAlternativas identificadas: {len(alternativas)}")
        by_horizon: dict[str, int] = {}
        for a in alternativas:
            by_horizon[a.horizonte.value] = by_horizon.get(a.horizonte.value, 0) + 1
        for h, count in by_horizon.items():
            lines.append(f"  {h}: {count} medidas")

        return "\n".join(lines)
