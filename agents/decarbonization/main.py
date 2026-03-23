#!/usr/bin/env python3
"""
ESW Decarbonization Agent System — Main Orchestrator
=====================================================
Simulates the full agent pipeline from inventory instantiation (Phase 1)
through MACC curve generation (Phase 4).

Usage:
    python -m agents.decarbonization.main

Example scenario: Mid-size manufacturing company in Spain, 2023 baseline.
"""

from __future__ import annotations

import json
import sys

# Phase 1 — Models & Engine
from .models.inventory import (
    ActivityData,
    ConsolidationConfig,
    ConsolidationType,
    DecarbonizationTarget,
    EmissionFactor,
    EmissionSource,
    EmissionsEngine,
    Facility,
    Organization,
    Scope,
    Scope2Method,
)

# Phase 2 — Diagnostic Agent
from .agents.diagnostic_agent import DiagnosticAgent, DiagnosticInput

# Phase 3 — Pathway Agent
from .agents.pathway_agent import PathwayAgent

# Phase 4 — Financial Agent
from .agents.financial_agent import FinancialAgent, MeasureEconomics


def separator(title: str) -> None:
    print(f"\n{'═' * 70}")
    print(f"  {title}")
    print(f"{'═' * 70}\n")


def run_simulation() -> None:
    """Execute the full 4-phase decarbonization pipeline."""

    # ==================================================================
    # PHASE 1 — Inventory Setup (Motor de Datos Base)
    # ==================================================================
    separator("FASE 1 — Inventario de Emisiones GEI (GHG Protocol)")

    # A. Organization
    org = Organization(
        nombre="Industrias Verdes S.A.",
        pais="España",
        sector="Manufactura",
        empleados=500,
        ingresos_eur=85_000_000,
        anio_reporte=2023,
    )

    # B. Consolidation
    consolidation = ConsolidationConfig(
        tipo=ConsolidationType.OPERATIONAL_CONTROL,
        participacion_porcentaje=100.0,
    )

    # D. Facilities
    planta = Facility(
        id="FAC-001",
        nombre="Planta Principal Sevilla",
        ubicacion="Sevilla",
        pais="España",
        superficie_m2=12_000,
        dias_operacion=250,
    )
    oficina = Facility(
        id="FAC-002",
        nombre="Oficina Central Madrid",
        ubicacion="Madrid",
        pais="España",
        superficie_m2=2_000,
        dias_operacion=260,
    )

    # E. Emission Sources
    sources = [
        EmissionSource(
            id="SRC-001",
            nombre="Consumo eléctrico planta",
            descripcion="Electricidad comprada de la red para planta industrial",
            scope=Scope.SCOPE_2,
            facility_id="FAC-001",
            categoria="electricidad_comprada",
        ),
        EmissionSource(
            id="SRC-002",
            nombre="Calderas de gas natural",
            descripcion="Calderas industriales para proceso térmico",
            scope=Scope.SCOPE_1,
            facility_id="FAC-001",
            categoria="caldera_gas_natural",
        ),
        EmissionSource(
            id="SRC-003",
            nombre="Flota de vehículos diésel",
            descripcion="30 vehículos de distribución y servicio",
            scope=Scope.SCOPE_1,
            facility_id="FAC-001",
            categoria="transporte_flota",
        ),
        EmissionSource(
            id="SRC-004",
            nombre="Consumo eléctrico oficina",
            descripcion="Electricidad comprada para oficina central",
            scope=Scope.SCOPE_2,
            facility_id="FAC-002",
            categoria="electricidad_comprada",
        ),
        EmissionSource(
            id="SRC-005",
            nombre="Equipos de refrigeración",
            descripcion="Sistemas HVAC y refrigeración industrial (fugas F-gases)",
            scope=Scope.SCOPE_1,
            facility_id="FAC-001",
            categoria="refrigeracion_fugitivas",
        ),
    ]

    # F. Activity Data (2023 baseline)
    activities = [
        ActivityData(source_id="SRC-001", cantidad=4_500_000, unidad="kWh", anio=2023,
                     descripcion="Consumo anual eléctrico planta"),
        ActivityData(source_id="SRC-002", cantidad=800_000, unidad="m3", anio=2023,
                     descripcion="Gas natural calderas industriales"),
        ActivityData(source_id="SRC-003", cantidad=450_000, unidad="litros", anio=2023,
                     descripcion="Diésel flota de distribución"),
        ActivityData(source_id="SRC-004", cantidad=350_000, unidad="kWh", anio=2023,
                     descripcion="Consumo anual eléctrico oficina"),
        ActivityData(source_id="SRC-005", cantidad=150, unidad="kg", anio=2023,
                     descripcion="Recargas de refrigerante R-410A"),
    ]

    # G. Emission Factors (based on Spain / DEFRA 2023 / IPCC AR6)
    factors = {
        "SRC-001": EmissionFactor(
            id="EF-001", nombre="Electricidad España 2023 (LBM)",
            factor=0.150, unidad_actividad="kWh", gwp=1.0,
            fuente="REE/MITECO 2023",
        ),
        "SRC-002": EmissionFactor(
            id="EF-002", nombre="Gas natural combustión",
            factor=2.0, unidad_actividad="m3", gwp=1.0,
            fuente="DEFRA 2023",
        ),
        "SRC-003": EmissionFactor(
            id="EF-003", nombre="Diésel (gasóleo A)",
            factor=2.68, unidad_actividad="litros", gwp=1.0,
            fuente="DEFRA 2023",
        ),
        "SRC-004": EmissionFactor(
            id="EF-004", nombre="Electricidad España 2023 (LBM)",
            factor=0.150, unidad_actividad="kWh", gwp=1.0,
            fuente="REE/MITECO 2023",
        ),
        "SRC-005": EmissionFactor(
            id="EF-005", nombre="R-410A (HFC)",
            factor=1.0, unidad_actividad="kg", gwp=2088.0,
            fuente="IPCC AR6",
        ),
    }

    # --- Calculate emissions ---
    engine = EmissionsEngine(consolidation)
    results = []
    source_map = {s.id: s for s in sources}

    for act in activities:
        ef = factors.get(act.source_id)
        src = source_map.get(act.source_id)
        if ef and src:
            result = engine.build_result(act, ef, src, scope2_method=Scope2Method.LOCATION_BASED)
            results.append(result)

    summary = engine.summarize(results, anio=2023)
    summary.compute_intensities(org)

    print(f"Organización: {org.nombre} ({org.pais}, {org.sector})")
    print(f"Año de reporte: {org.anio_reporte}")
    print(f"Consolidación: {consolidation.tipo.value} ({consolidation.participacion_porcentaje}%)")
    print(f"\nResultados del inventario {summary.anio}:")
    print(f"  Scope 1:      {summary.scope_1_tCO2e:>10,.1f} tCO2e")
    print(f"  Scope 2 (LBM):{summary.scope_2_lbm_tCO2e:>10,.1f} tCO2e")
    print(f"  Scope 2 (MBM):{summary.scope_2_mbm_tCO2e:>10,.1f} tCO2e")
    print(f"  TOTAL:        {summary.total_tCO2e:>10,.1f} tCO2e")
    print(f"\nIntensidad: {summary._intensidad_empleado:.2f} tCO2e/empleado")
    print(f"Intensidad: {summary._intensidad_ingreso * 1_000_000:.2f} tCO2e/M€")

    print("\nDesglose por fuente:")
    for r in sorted(results, key=lambda x: x.tCO2e, reverse=True):
        src = source_map[r.source_id]
        print(f"  {src.nombre}: {r.tCO2e:,.1f} tCO2e (Scope {r.scope.value})")

    # ==================================================================
    # PHASE 2 — Diagnostic Agent
    # ==================================================================
    separator("FASE 2 — Agente de Diagnóstico")

    target = DecarbonizationTarget(
        compromiso="SBTi 1.5°C",
        reduccion_porcentaje=42.0,
        anio_objetivo=2030,
        anio_base=2023,
        descripcion="Alineado con Science Based Targets 1.5°C (near-term)",
    )

    diag_input = DiagnosticInput(
        anio_base=2023,
        summary=summary,
        gases_incluidos=["CO2", "CH4", "N2O", "HFC"],
        consumo_electrico_kwh=4_850_000,
        porcentaje_renovable=0.0,
        generacion_propia_kwh=0.0,
        combustibles=["gas_natural", "diesel"],
        procesos_termicos=["caldera_industrial"],
        target=target,
    )

    diagnostic_agent = DiagnosticAgent()
    diagnostic_output = diagnostic_agent.run(diag_input, sources, results)

    print(diagnostic_output.resumen)
    print(f"\nTrayectoria sugerida:")
    for year, value in sorted(diagnostic_output.trayectoria_hitos.items()):
        print(f"  {year}: {value:>10,.1f} tCO2e")

    # ==================================================================
    # PHASE 3 — Pathway Agent
    # ==================================================================
    separator("FASE 3 — Agente de Senda de Descarbonización")

    pathway_agent = PathwayAgent()
    pathway_output = pathway_agent.run(diagnostic_output)

    print(pathway_output.resumen)
    print(f"\nAlternativas de reducción por fuente:")
    for alt in pathway_output.alternativas:
        print(
            f"  [{alt.horizonte.value}] {alt.source_nombre} → {alt.medida}\n"
            f"        Palanca: {alt.palanca.value} | "
            f"Reducción: {alt.reduccion_estimada_tCO2e:,.1f} tCO2e/año"
        )

    print(f"\nMedidas generadas: {len(pathway_output.medidas)}")
    for m in pathway_output.medidas:
        print(f"  {m.id}: {m.nombre} (vida útil: {m.vida_util_anios} años)")

    # ==================================================================
    # PHASE 4 — Financial Agent (MACC)
    # ==================================================================
    separator("FASE 4 — Agente Financiero (Business Case & MACC)")

    # Economic assumptions for each measure
    economics_data = _build_economics(pathway_output)

    financial_agent = FinancialAgent()
    financial_output = financial_agent.run(pathway_output, economics_data)

    print(financial_output.resumen)

    print(f"\nCurva MACC (coordenadas para graficación):")
    for point in financial_output.curva_macc:
        print(
            f"  {point['label'][:50]:50s} | "
            f"x: [{point['x_start']:>8,.0f} - {point['x_end']:>8,.0f}] tCO2e | "
            f"y: {point['y']:>8,.2f} €/tCO2e"
        )

    print(f"\nRoadmap de implementación:")
    for phase in financial_output.roadmap:
        print(f"\n  {phase['fase']}:")
        print(f"    Inversión: {phase['inversion_eur']:>12,.0f} €")
        print(f"    Reducción anual: {phase['reduccion_anual_tCO2e']:>8,.1f} tCO2e/año")
        for m in phase["medidas"]:
            print(f"      • {m}")

    # ==================================================================
    # Summary JSON export
    # ==================================================================
    separator("RESUMEN EJECUTIVO")

    executive = {
        "organizacion": org.nombre,
        "anio_base": 2023,
        "emisiones_base_tCO2e": round(summary.total_tCO2e, 1),
        "objetivo": target.compromiso,
        "reduccion_objetivo_pct": target.reduccion_porcentaje,
        "anio_objetivo": target.anio_objetivo,
        "medidas_analizadas": len(financial_output.ranking),
        "reduccion_total_acumulada_tCO2e": financial_output.reduccion_total_tCO2e,
        "inversion_total_eur": financial_output.inversion_total_eur,
        "coste_medio_eur_per_tCO2e": financial_output.coste_medio_eur_per_tCO2e,
        "medidas_con_ahorro_neto": sum(1 for e in financial_output.ranking if e.macc_eur_per_tCO2e < 0),
    }
    print(json.dumps(executive, indent=2, ensure_ascii=False))


def _build_economics(pathway_output) -> list[MeasureEconomics]:
    """Assign realistic economic assumptions to each generated measure."""
    economics: list[MeasureEconomics] = []

    # Cost assumptions by measure keyword (CAPEX €, annual savings €)
    cost_catalog = {
        "PPA": (15_000, 80_000),           # PPA: low setup, high savings via fixed price
        "fotovoltaica": (450_000, 55_000),  # Solar self-consumption
        "eficiencia energética": (120_000, 45_000),  # LED + HVAC + BMS
        "eficiencia térmica": (95_000, 35_000),
        "bomba de calor": (600_000, 40_000),
        "biogás": (350_000, 15_000),
        "eléctricos BEV": (900_000, 60_000),
        "eco-driving": (25_000, 15_000),
        "HVO": (10_000, 5_000),
        "refrigerantes": (80_000, 10_000),
        "estanqueidad": (30_000, 8_000),
        "Auditoría": (40_000, 12_000),
    }

    for measure in pathway_output.medidas:
        capex = 50_000
        savings = 10_000
        for keyword, (c, s) in cost_catalog.items():
            if keyword.lower() in measure.nombre.lower():
                capex = c
                savings = s
                break

        economics.append(MeasureEconomics(
            measure_id=measure.id,
            capex_eur=capex,
            ahorro_operativo_anual_eur=savings,
        ))

    return economics


if __name__ == "__main__":
    run_simulation()
