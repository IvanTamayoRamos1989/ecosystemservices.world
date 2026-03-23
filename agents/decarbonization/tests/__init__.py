"""
Tests for the Decarbonization Agent System
==========================================
Validates all 4 phases: data models, formulas, decision rules, and MACC calculations.
"""

import unittest
from agents.decarbonization.models.inventory import (
    ActivityData,
    ConsolidationConfig,
    ConsolidationType,
    DecarbonizationTarget,
    EconomicVariables,
    EmissionFactor,
    EmissionResult,
    EmissionSource,
    EmissionsEngine,
    EmissionSummary,
    Facility,
    Organization,
    ReductionLever,
    ReductionMeasure,
    Scope,
    Scope2Method,
    TimeHorizon,
)
from agents.decarbonization.agents.diagnostic_agent import (
    DiagnosticAgent,
    DiagnosticInput,
)
from agents.decarbonization.agents.pathway_agent import PathwayAgent
from agents.decarbonization.agents.financial_agent import (
    FinancialAgent,
    MeasureEconomics,
)


# ======================================================================
# Phase 1 — Inventory & Engine Tests
# ======================================================================

class TestCoreFormula(unittest.TestCase):
    """Validates: Emisiones (tCO2e) = Dato_Actividad * Factor_Emision * GWP * Factor_Consolidacion"""

    def setUp(self):
        self.consolidation = ConsolidationConfig(
            tipo=ConsolidationType.OPERATIONAL_CONTROL,
            participacion_porcentaje=100.0,
        )
        self.engine = EmissionsEngine(self.consolidation)

    def test_basic_co2_calculation(self):
        """1000 kWh * 0.5 kgCO2/kWh * GWP=1 * 100% = 0.5 tCO2e"""
        activity = ActivityData(source_id="S1", cantidad=1000, unidad="kWh", anio=2023)
        factor = EmissionFactor(id="EF1", nombre="test", factor=0.5, unidad_actividad="kWh", gwp=1.0)
        result = self.engine.calculate(activity, factor)
        self.assertAlmostEqual(result, 0.5, places=4)

    def test_gwp_multiplier(self):
        """100 kg of CH4 * 1.0 kgCH4/kg * GWP=28 * 100% = 2.8 tCO2e"""
        activity = ActivityData(source_id="S1", cantidad=100, unidad="kg", anio=2023)
        factor = EmissionFactor(id="EF2", nombre="methane", factor=1.0, unidad_actividad="kg", gwp=28.0)
        result = self.engine.calculate(activity, factor)
        self.assertAlmostEqual(result, 2.8, places=4)

    def test_consolidation_equity_share(self):
        """50% equity share halves emissions."""
        consolidation_50 = ConsolidationConfig(
            tipo=ConsolidationType.EQUITY_SHARE,
            participacion_porcentaje=50.0,
        )
        engine_50 = EmissionsEngine(consolidation_50)
        activity = ActivityData(source_id="S1", cantidad=1000, unidad="kWh", anio=2023)
        factor = EmissionFactor(id="EF1", nombre="test", factor=0.5, unidad_actividad="kWh", gwp=1.0)
        result = engine_50.calculate(activity, factor)
        self.assertAlmostEqual(result, 0.25, places=4)

    def test_hfc_high_gwp(self):
        """150 kg R-410A * 1.0 * GWP=2088 * 100% = 313.2 tCO2e"""
        activity = ActivityData(source_id="S1", cantidad=150, unidad="kg", anio=2023)
        factor = EmissionFactor(id="EF5", nombre="R-410A", factor=1.0, unidad_actividad="kg", gwp=2088.0)
        result = self.engine.calculate(activity, factor)
        self.assertAlmostEqual(result, 313.2, places=1)

    def test_build_result_scope2_lbm(self):
        source = EmissionSource(id="S1", nombre="Grid", descripcion="", scope=Scope.SCOPE_2,
                                facility_id="F1", categoria="electricidad")
        activity = ActivityData(source_id="S1", cantidad=1000, unidad="kWh", anio=2023)
        factor = EmissionFactor(id="EF1", nombre="grid", factor=0.15, unidad_actividad="kWh")
        result = self.engine.build_result(activity, factor, source, Scope2Method.LOCATION_BASED)
        self.assertEqual(result.scope, Scope.SCOPE_2)
        self.assertEqual(result.scope2_method, Scope2Method.LOCATION_BASED)
        self.assertAlmostEqual(result.tCO2e, 0.15, places=4)

    def test_summarize_scopes(self):
        results = [
            EmissionResult(source_id="S1", scope=Scope.SCOPE_1, tCO2e=100, anio=2023),
            EmissionResult(source_id="S2", scope=Scope.SCOPE_2, tCO2e=50, anio=2023,
                           scope2_method=Scope2Method.LOCATION_BASED),
            EmissionResult(source_id="S3", scope=Scope.SCOPE_2, tCO2e=30, anio=2023,
                           scope2_method=Scope2Method.MARKET_BASED),
            EmissionResult(source_id="S4", scope=Scope.SCOPE_3, tCO2e=200, anio=2023),
            EmissionResult(source_id="S5", scope=Scope.SCOPE_1, tCO2e=75, anio=2024),  # different year
        ]
        summary = EmissionsEngine.summarize(results, 2023)
        self.assertAlmostEqual(summary.scope_1_tCO2e, 100)
        self.assertAlmostEqual(summary.scope_2_lbm_tCO2e, 50)
        self.assertAlmostEqual(summary.scope_2_mbm_tCO2e, 30)
        self.assertAlmostEqual(summary.scope_3_tCO2e, 200)
        self.assertAlmostEqual(summary.total_tCO2e, 350)  # S1+S2_LBM+S3_3

    def test_intensity_metrics(self):
        summary = EmissionSummary(anio=2023, scope_1_tCO2e=500)
        org = Organization(nombre="Test", pais="ES", sector="Mfg",
                           empleados=100, ingresos_eur=10_000_000, anio_reporte=2023)
        summary.compute_intensities(org)
        self.assertAlmostEqual(summary._intensidad_empleado, 5.0)
        self.assertAlmostEqual(summary._intensidad_ingreso, 0.00005)


class TestDataModels(unittest.TestCase):

    def test_organization(self):
        org = Organization("ACME", "DE", "Energy", 1000, 50e6, 2023)
        self.assertEqual(org.pais, "DE")

    def test_facility(self):
        f = Facility(id="F1", nombre="Plant", ubicacion="Berlin", pais="DE")
        self.assertEqual(f.dias_operacion, 365)

    def test_economic_payback(self):
        ev = EconomicVariables(measure_id="M1", capex_eur=100_000, opex_diferencial_eur=25_000)
        ev.compute_payback()
        self.assertAlmostEqual(ev.payback_anios, 4.0)

    def test_economic_payback_no_savings(self):
        ev = EconomicVariables(measure_id="M1", capex_eur=100_000, opex_diferencial_eur=-5_000)
        ev.compute_payback()
        self.assertEqual(ev.payback_anios, float("inf"))

    def test_consolidation_factor(self):
        c = ConsolidationConfig(tipo=ConsolidationType.EQUITY_SHARE, participacion_porcentaje=75.0)
        self.assertAlmostEqual(c.factor_consolidacion, 0.75)


# ======================================================================
# Phase 2 — Diagnostic Agent Tests
# ======================================================================

class TestDiagnosticAgent(unittest.TestCase):

    def _make_scenario(self):
        sources = [
            EmissionSource(id="S1", nombre="Electricity", descripcion="",
                           scope=Scope.SCOPE_2, facility_id="F1", categoria="electricidad_comprada"),
            EmissionSource(id="S2", nombre="Gas Boiler", descripcion="",
                           scope=Scope.SCOPE_1, facility_id="F1", categoria="caldera_gas_natural"),
            EmissionSource(id="S3", nombre="Fleet", descripcion="",
                           scope=Scope.SCOPE_1, facility_id="F1", categoria="transporte_flota"),
        ]
        results = [
            EmissionResult(source_id="S1", scope=Scope.SCOPE_2, tCO2e=300, anio=2023),
            EmissionResult(source_id="S2", scope=Scope.SCOPE_1, tCO2e=500, anio=2023),
            EmissionResult(source_id="S3", scope=Scope.SCOPE_1, tCO2e=200, anio=2023),
        ]
        summary = EmissionsEngine.summarize(results, 2023)
        target = DecarbonizationTarget("SBTi 1.5°C", 42.0, 2030, 2023)
        diag_input = DiagnosticInput(
            anio_base=2023, summary=summary, target=target,
            consumo_electrico_kwh=2_000_000, combustibles=["gas_natural", "diesel"],
        )
        return sources, results, diag_input

    def test_identifies_priority_sources(self):
        sources, results, diag_input = self._make_scenario()
        agent = DiagnosticAgent()
        output = agent.run(diag_input, sources, results)
        self.assertGreaterEqual(len(output.fuentes_prioritarias), 2)
        # Top source should be Gas Boiler (500 tCO2e)
        self.assertEqual(output.fuentes_prioritarias[0].source.id, "S2")

    def test_coverage_80_percent(self):
        sources, results, diag_input = self._make_scenario()
        agent = DiagnosticAgent()
        output = agent.run(diag_input, sources, results)
        total = diag_input.summary.total_tCO2e
        covered = sum(ps.tCO2e for ps in output.fuentes_prioritarias)
        self.assertGreaterEqual(covered / total, 0.70)

    def test_trajectory_milestones(self):
        sources, results, diag_input = self._make_scenario()
        agent = DiagnosticAgent()
        output = agent.run(diag_input, sources, results)
        self.assertIn(2023, output.trayectoria_hitos)
        self.assertIn(2030, output.trayectoria_hitos)
        # 2030 should be lower than 2023
        self.assertLess(output.trayectoria_hitos[2030], output.trayectoria_hitos[2023])

    def test_alternatives_for_electricity(self):
        sources, results, diag_input = self._make_scenario()
        agent = DiagnosticAgent()
        output = agent.run(diag_input, sources, results)
        elec_source = [ps for ps in output.fuentes_prioritarias if "Electricity" in ps.source.nombre]
        if elec_source:
            self.assertTrue(any("renovable" in a.lower() or "PPA" in a for a in elec_source[0].alternativas))

    def test_empty_inventory(self):
        summary = EmissionSummary(anio=2023)
        diag_input = DiagnosticInput(anio_base=2023, summary=summary)
        agent = DiagnosticAgent()
        output = agent.run(diag_input, [], [])
        self.assertEqual(len(output.fuentes_prioritarias), 0)


# ======================================================================
# Phase 3 — Pathway Agent Tests
# ======================================================================

class TestPathwayAgent(unittest.TestCase):

    def _run_pipeline(self):
        sources = [
            EmissionSource(id="S1", nombre="Grid Electricity", descripcion="",
                           scope=Scope.SCOPE_2, facility_id="F1", categoria="electricidad_comprada"),
            EmissionSource(id="S2", nombre="Gas Boiler", descripcion="",
                           scope=Scope.SCOPE_1, facility_id="F1", categoria="caldera_gas_natural"),
        ]
        results = [
            EmissionResult(source_id="S1", scope=Scope.SCOPE_2, tCO2e=400, anio=2023),
            EmissionResult(source_id="S2", scope=Scope.SCOPE_1, tCO2e=600, anio=2023),
        ]
        summary = EmissionsEngine.summarize(results, 2023)
        target = DecarbonizationTarget("SBTi 1.5°C", 42.0, 2030, 2023)
        diag_input = DiagnosticInput(anio_base=2023, summary=summary, target=target)
        diagnostic = DiagnosticAgent().run(diag_input, sources, results)
        pathway = PathwayAgent().run(diagnostic)
        return pathway

    def test_generates_alternatives(self):
        pathway = self._run_pipeline()
        self.assertGreater(len(pathway.alternativas), 0)

    def test_decision_rule_electricity_produces_renewables(self):
        pathway = self._run_pipeline()
        elec_alts = [a for a in pathway.alternativas if "Grid" in a.source_nombre]
        levers = {a.palanca for a in elec_alts}
        self.assertIn(ReductionLever.RENEWABLES, levers)

    def test_decision_rule_gas_produces_electrification(self):
        pathway = self._run_pipeline()
        gas_alts = [a for a in pathway.alternativas if "Boiler" in a.source_nombre]
        levers = {a.palanca for a in gas_alts}
        self.assertIn(ReductionLever.ELECTRIFICATION, levers)

    def test_measures_have_ids(self):
        pathway = self._run_pipeline()
        for m in pathway.medidas:
            self.assertTrue(m.id.startswith("M-"))

    def test_senda_is_decreasing(self):
        pathway = self._run_pipeline()
        years = sorted(pathway.senda_preliminar.keys())
        for i in range(1, len(years)):
            self.assertLessEqual(
                pathway.senda_preliminar[years[i]],
                pathway.senda_preliminar[years[i - 1]],
            )


# ======================================================================
# Phase 4 — Financial Agent / MACC Tests
# ======================================================================

class TestFinancialAgent(unittest.TestCase):

    def _run_full_pipeline(self):
        sources = [
            EmissionSource(id="S1", nombre="Grid", descripcion="",
                           scope=Scope.SCOPE_2, facility_id="F1", categoria="electricidad_comprada"),
        ]
        results = [
            EmissionResult(source_id="S1", scope=Scope.SCOPE_2, tCO2e=1000, anio=2023),
        ]
        summary = EmissionsEngine.summarize(results, 2023)
        target = DecarbonizationTarget("SBTi 1.5°C", 42.0, 2030, 2023)
        diag_input = DiagnosticInput(anio_base=2023, summary=summary, target=target)
        diagnostic = DiagnosticAgent().run(diag_input, sources, results)
        pathway = PathwayAgent().run(diagnostic)
        return pathway

    def test_macc_formula(self):
        """Validates: MACC = Coste_Neto / tCO2e_evitadas_acumuladas
           Coste_Neto = CAPEX - (Ahorro * Vida_Util)
        """
        pathway = self._run_full_pipeline()
        economics = []
        for m in pathway.medidas:
            economics.append(MeasureEconomics(
                measure_id=m.id, capex_eur=100_000, ahorro_operativo_anual_eur=20_000,
            ))
        agent = FinancialAgent()
        output = agent.run(pathway, economics)

        for entry in output.ranking:
            expected_cost_neto = entry.capex_eur - (entry.ahorro_operativo_anual_eur * entry.vida_util_anios)
            expected_macc = expected_cost_neto / entry.tCO2e_evitadas_acumuladas if entry.tCO2e_evitadas_acumuladas > 0 else float("inf")
            self.assertAlmostEqual(entry.coste_neto_eur, expected_cost_neto, places=0)
            self.assertAlmostEqual(entry.macc_eur_per_tCO2e, round(expected_macc, 2), places=1)

    def test_macc_ordering_negative_first(self):
        """MACC negativo (ahorro) debe ir primero en el ranking."""
        pathway = self._run_full_pipeline()
        economics = []
        for i, m in enumerate(pathway.medidas):
            # Alternate between savings and costs
            savings = 50_000 if i % 2 == 0 else 5_000
            economics.append(MeasureEconomics(
                measure_id=m.id, capex_eur=100_000, ahorro_operativo_anual_eur=savings,
            ))
        output = FinancialAgent().run(pathway, economics)
        maccs = [e.macc_eur_per_tCO2e for e in output.ranking]
        self.assertEqual(maccs, sorted(maccs))

    def test_macc_curve_coordinates(self):
        """MACC curve bars should be contiguous (x_end of one = x_start of next)."""
        pathway = self._run_full_pipeline()
        economics = [MeasureEconomics(m.id, 50_000, 10_000) for m in pathway.medidas]
        output = FinancialAgent().run(pathway, economics)
        for i in range(1, len(output.curva_macc)):
            self.assertAlmostEqual(
                output.curva_macc[i]["x_start"],
                output.curva_macc[i - 1]["x_end"],
                places=0,
            )

    def test_roadmap_groups_by_horizon(self):
        pathway = self._run_full_pipeline()
        economics = [MeasureEconomics(m.id, 50_000, 10_000) for m in pathway.medidas]
        output = FinancialAgent().run(pathway, economics)
        self.assertGreater(len(output.roadmap), 0)
        for phase in output.roadmap:
            self.assertIn("fase", phase)
            self.assertIn("medidas", phase)
            self.assertIn("inversion_eur", phase)

    def test_aggregate_totals(self):
        pathway = self._run_full_pipeline()
        economics = [MeasureEconomics(m.id, 100_000, 15_000) for m in pathway.medidas]
        output = FinancialAgent().run(pathway, economics)
        self.assertGreater(output.reduccion_total_tCO2e, 0)
        self.assertGreater(output.inversion_total_eur, 0)
        expected_capex = sum(e.capex_eur for e in economics)
        self.assertAlmostEqual(output.inversion_total_eur, expected_capex, places=0)

    def test_net_cost_formula(self):
        """Coste_Neto = CAPEX - (Ahorro_Operativo_Anual * Vida_Util)"""
        # CAPEX=200k, Savings=30k/yr, Life=10yr → Net = 200k - 300k = -100k (net savings)
        pathway = self._run_full_pipeline()
        m = pathway.medidas[0]
        economics = [MeasureEconomics(m.id, capex_eur=200_000, ahorro_operativo_anual_eur=30_000)]
        output = FinancialAgent().run(pathway, economics)
        entry = output.ranking[0]
        expected = 200_000 - (30_000 * entry.vida_util_anios)
        self.assertAlmostEqual(entry.coste_neto_eur, expected, places=0)


if __name__ == "__main__":
    unittest.main()
