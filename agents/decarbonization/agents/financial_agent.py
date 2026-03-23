"""
Phase 4 — Agente Financiero: Business Case y Curvas MACC
=========================================================
Transforms technical alternatives into prioritised economic decisions.

Formulas:
    Coste_Neto = CAPEX - (Ahorro_Operativo_Anual * Vida_Util)
    MACC = Coste_Neto / tCO2e_evitadas_acumuladas

Flow:
    1. Vincular — Associate each alternative to its emission source.
    2. Estimar — Calculate annual tCO2e avoided vs. baseline.
    3. Análisis Económico — Compute net cost.
    4. Calcular MACC — Cost per tonne abated.
    5. Ordenar — Rank by MACC (negative first = cost-saving).
    6. Generar Roadmap — Build abatement curve + implementation schedule.
"""

from __future__ import annotations

from dataclasses import dataclass, field

from ..models.inventory import (
    EconomicVariables,
    ReductionMeasure,
    TimeHorizon,
)
from .pathway_agent import PathwayOutput


@dataclass
class MACCEntry:
    """A single entry in the Marginal Abatement Cost Curve."""
    measure_id: str
    nombre: str
    # Emissions
    tCO2e_evitadas_anuales: float
    tCO2e_evitadas_acumuladas: float  # over lifetime
    # Economics
    capex_eur: float
    ahorro_operativo_anual_eur: float
    vida_util_anios: int
    coste_neto_eur: float
    macc_eur_per_tCO2e: float
    # Curve coordinates
    x_width: float   # cumulative tCO2e (bar width)
    y_height: float  # €/tCO2e (bar height = MACC)
    # Metadata
    horizonte: TimeHorizon
    palanca: str


@dataclass
class FinancialOutput:
    """Output of the Financial Agent."""
    ranking: list[MACCEntry]
    curva_macc: list[dict]  # [{x_start, x_end, y, label}, ...]
    roadmap: list[dict]     # [{year, measures, investment, reduction}, ...]
    # Aggregates
    reduccion_total_tCO2e: float = 0.0
    inversion_total_eur: float = 0.0
    coste_medio_eur_per_tCO2e: float = 0.0
    resumen: str = ""


@dataclass
class MeasureEconomics:
    """Economic assumptions for a single measure (input to Phase 4)."""
    measure_id: str
    capex_eur: float
    ahorro_operativo_anual_eur: float  # positive = savings


class FinancialAgent:
    """Agente Financiero — Phase 4.

    Takes the pathway alternatives and economic data, computes the MACC curve,
    and generates a prioritised roadmap.
    """

    def run(
        self,
        pathway: PathwayOutput,
        economics: list[MeasureEconomics],
    ) -> FinancialOutput:

        econ_map = {e.measure_id: e for e in economics}
        entries: list[MACCEntry] = []

        # --- Steps 1-4: Vincular, Estimar, Análisis Económico, Calcular MACC ---
        for measure in pathway.medidas:
            econ = econ_map.get(measure.id)
            if econ is None:
                continue

            # Step 2: tCO2e evitadas
            tCO2e_anuales = measure.reduccion_estimada_tCO2e
            tCO2e_acumuladas = tCO2e_anuales * measure.vida_util_anios

            # Step 3: Coste Neto = CAPEX - (Ahorro_Operativo_Anual * Vida_Util)
            coste_neto = econ.capex_eur - (econ.ahorro_operativo_anual_eur * measure.vida_util_anios)

            # Step 4: MACC = Coste_Neto / tCO2e_evitadas_acumuladas
            macc = coste_neto / tCO2e_acumuladas if tCO2e_acumuladas > 0 else float("inf")

            entries.append(MACCEntry(
                measure_id=measure.id,
                nombre=measure.nombre,
                tCO2e_evitadas_anuales=round(tCO2e_anuales, 1),
                tCO2e_evitadas_acumuladas=round(tCO2e_acumuladas, 1),
                capex_eur=round(econ.capex_eur, 2),
                ahorro_operativo_anual_eur=round(econ.ahorro_operativo_anual_eur, 2),
                vida_util_anios=measure.vida_util_anios,
                coste_neto_eur=round(coste_neto, 2),
                macc_eur_per_tCO2e=round(macc, 2),
                x_width=0.0,  # set in step 5
                y_height=round(macc, 2),
                horizonte=measure.horizonte,
                palanca=measure.tipo.value,
            ))

        # --- Step 5: Ordenar (MACC negativo primero) ---
        entries.sort(key=lambda e: e.macc_eur_per_tCO2e)

        # --- Build MACC curve coordinates ---
        curva_macc = self._build_macc_curve(entries)

        # --- Step 6: Generar Roadmap ---
        roadmap = self._build_roadmap(entries)

        # --- Aggregates ---
        reduccion_total = sum(e.tCO2e_evitadas_acumuladas for e in entries)
        inversion_total = sum(e.capex_eur for e in entries)
        coste_medio = inversion_total / reduccion_total if reduccion_total > 0 else 0.0

        # --- Also populate EconomicVariables for downstream use ---
        econ_vars = self._build_economic_variables(entries)

        return FinancialOutput(
            ranking=entries,
            curva_macc=curva_macc,
            roadmap=roadmap,
            reduccion_total_tCO2e=round(reduccion_total, 1),
            inversion_total_eur=round(inversion_total, 2),
            coste_medio_eur_per_tCO2e=round(coste_medio, 2),
            resumen=self._generate_summary(entries, reduccion_total, inversion_total, coste_medio),
        )

    # ------------------------------------------------------------------
    # MACC Curve construction
    # ------------------------------------------------------------------

    def _build_macc_curve(self, entries: list[MACCEntry]) -> list[dict]:
        """Build coordinate pairs for plotting the MACC curve.

        Each bar:
            x_start, x_end = cumulative tCO2e range
            y = MACC (€/tCO2e)
        """
        curve: list[dict] = []
        cumulative = 0.0

        for entry in entries:
            x_start = cumulative
            x_end = cumulative + entry.tCO2e_evitadas_acumuladas
            entry.x_width = entry.tCO2e_evitadas_acumuladas

            curve.append({
                "measure_id": entry.measure_id,
                "label": entry.nombre,
                "x_start": round(x_start, 1),
                "x_end": round(x_end, 1),
                "y": entry.macc_eur_per_tCO2e,
                "horizonte": entry.horizonte.value,
            })
            cumulative = x_end

        return curve

    # ------------------------------------------------------------------
    # Roadmap generation
    # ------------------------------------------------------------------

    def _build_roadmap(self, entries: list[MACCEntry]) -> list[dict]:
        """Group measures by time horizon into implementation phases."""
        phases = {
            TimeHorizon.SHORT: {"label": "Corto plazo (0-2 años)", "measures": [], "investment": 0.0, "reduction": 0.0},
            TimeHorizon.MEDIUM: {"label": "Medio plazo (2-5 años)", "measures": [], "investment": 0.0, "reduction": 0.0},
            TimeHorizon.LONG: {"label": "Largo plazo (5-10 años)", "measures": [], "investment": 0.0, "reduction": 0.0},
        }

        for entry in entries:
            phase = phases[entry.horizonte]
            phase["measures"].append(entry.nombre)
            phase["investment"] += entry.capex_eur
            phase["reduction"] += entry.tCO2e_evitadas_anuales

        roadmap = []
        for horizon in [TimeHorizon.SHORT, TimeHorizon.MEDIUM, TimeHorizon.LONG]:
            phase = phases[horizon]
            if phase["measures"]:
                roadmap.append({
                    "fase": phase["label"],
                    "medidas": phase["measures"],
                    "inversion_eur": round(phase["investment"], 2),
                    "reduccion_anual_tCO2e": round(phase["reduction"], 1),
                })

        return roadmap

    # ------------------------------------------------------------------
    # Economic variables output
    # ------------------------------------------------------------------

    def _build_economic_variables(self, entries: list[MACCEntry]) -> list[EconomicVariables]:
        variables = []
        for e in entries:
            ev = EconomicVariables(
                measure_id=e.measure_id,
                capex_eur=e.capex_eur,
                opex_diferencial_eur=e.ahorro_operativo_anual_eur,
                macc_eur_per_tCO2e=e.macc_eur_per_tCO2e,
            )
            ev.compute_payback()
            variables.append(ev)
        return variables

    # ------------------------------------------------------------------
    # Summary
    # ------------------------------------------------------------------

    def _generate_summary(
        self,
        entries: list[MACCEntry],
        reduccion_total: float,
        inversion_total: float,
        coste_medio: float,
    ) -> str:
        lines = [
            "═══ Business Case — Curva MACC ═══",
            f"Medidas analizadas: {len(entries)}",
            f"Reducción total acumulada: {reduccion_total:,.1f} tCO2e",
            f"Inversión total requerida: {inversion_total:,.0f} €",
            f"Coste medio: {coste_medio:,.2f} €/tCO2e",
            "",
            "Ranking (MACC ascendente):",
        ]

        cost_saving = [e for e in entries if e.macc_eur_per_tCO2e < 0]
        cost_positive = [e for e in entries if e.macc_eur_per_tCO2e >= 0]

        if cost_saving:
            lines.append(f"  Medidas con ahorro neto: {len(cost_saving)}")
            for e in cost_saving:
                lines.append(
                    f"    ✓ {e.nombre}: {e.macc_eur_per_tCO2e:+.2f} €/tCO2e "
                    f"({e.tCO2e_evitadas_anuales:.0f} tCO2e/año)"
                )

        if cost_positive:
            lines.append(f"  Medidas con coste neto: {len(cost_positive)}")
            for e in cost_positive:
                lines.append(
                    f"    → {e.nombre}: {e.macc_eur_per_tCO2e:+.2f} €/tCO2e "
                    f"({e.tCO2e_evitadas_anuales:.0f} tCO2e/año)"
                )

        return "\n".join(lines)
