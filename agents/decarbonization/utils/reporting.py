"""
Reporting Utilities
====================
Export functions for generating structured reports from agent outputs.
Supports JSON and CSV export for MACC curves, roadmaps, and inventories.
"""

from __future__ import annotations

import csv
import json
import io
from typing import Any

from ..agents.financial_agent import FinancialOutput, MACCEntry
from ..agents.diagnostic_agent import DiagnosticOutput
from ..agents.pathway_agent import PathwayOutput
from ..models.inventory import EmissionSummary, Organization


def export_executive_summary(
    org: Organization,
    summary: EmissionSummary,
    financial: FinancialOutput,
    target_year: int,
    target_pct: float,
) -> dict[str, Any]:
    """Generate a structured executive summary as a dictionary."""
    return {
        "organizacion": org.nombre,
        "pais": org.pais,
        "sector": org.sector,
        "anio_base": summary.anio,
        "emisiones": {
            "scope_1_tCO2e": round(summary.scope_1_tCO2e, 1),
            "scope_2_lbm_tCO2e": round(summary.scope_2_lbm_tCO2e, 1),
            "scope_2_mbm_tCO2e": round(summary.scope_2_mbm_tCO2e, 1),
            "scope_3_tCO2e": round(summary.scope_3_tCO2e, 1),
            "total_tCO2e": round(summary.total_tCO2e, 1),
        },
        "objetivo": {
            "reduccion_pct": target_pct,
            "anio_objetivo": target_year,
        },
        "business_case": {
            "medidas_analizadas": len(financial.ranking),
            "medidas_con_ahorro_neto": sum(1 for e in financial.ranking if e.macc_eur_per_tCO2e < 0),
            "reduccion_total_acumulada_tCO2e": financial.reduccion_total_tCO2e,
            "inversion_total_eur": financial.inversion_total_eur,
            "coste_medio_eur_per_tCO2e": financial.coste_medio_eur_per_tCO2e,
        },
        "roadmap": financial.roadmap,
    }


def export_summary_json(
    org: Organization,
    summary: EmissionSummary,
    financial: FinancialOutput,
    target_year: int,
    target_pct: float,
) -> str:
    """Export executive summary as a formatted JSON string."""
    data = export_executive_summary(org, summary, financial, target_year, target_pct)
    return json.dumps(data, indent=2, ensure_ascii=False)


def export_macc_csv(entries: list[MACCEntry]) -> str:
    """Export MACC curve data as CSV for spreadsheet/charting tools."""
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "measure_id", "nombre", "palanca", "horizonte",
        "tCO2e_evitadas_anuales", "tCO2e_evitadas_acumuladas",
        "capex_eur", "ahorro_operativo_anual_eur", "vida_util_anios",
        "coste_neto_eur", "macc_eur_per_tCO2e",
        "x_width", "y_height",
    ])
    for e in entries:
        writer.writerow([
            e.measure_id, e.nombre, e.palanca, e.horizonte.value,
            e.tCO2e_evitadas_anuales, e.tCO2e_evitadas_acumuladas,
            e.capex_eur, e.ahorro_operativo_anual_eur, e.vida_util_anios,
            e.coste_neto_eur, e.macc_eur_per_tCO2e,
            e.x_width, e.y_height,
        ])
    return output.getvalue()


def export_inventory_csv(
    results: list,
    source_map: dict,
) -> str:
    """Export emissions inventory results as CSV."""
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "source_id", "source_nombre", "scope", "tCO2e", "anio", "scope2_method",
    ])
    for r in results:
        src = source_map.get(r.source_id)
        writer.writerow([
            r.source_id,
            src.nombre if src else "",
            f"Scope {r.scope.value}",
            round(r.tCO2e, 2),
            r.anio,
            r.scope2_method.value if r.scope2_method else "",
        ])
    return output.getvalue()


def export_trajectory_csv(trajectory: dict[int, float]) -> str:
    """Export decarbonisation trajectory as CSV."""
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["anio", "tCO2e_objetivo"])
    for year in sorted(trajectory):
        writer.writerow([year, round(trajectory[year], 1)])
    return output.getvalue()


def print_diagnostic_report(diagnostic: DiagnosticOutput) -> str:
    """Format a human-readable diagnostic report."""
    lines = [
        "╔══════════════════════════════════════════════════════╗",
        "║         INFORME DE DIAGNÓSTICO DE EMISIONES         ║",
        "╚══════════════════════════════════════════════════════╝",
        "",
        diagnostic.resumen,
        "",
        "Trayectoria de reducción:",
    ]
    for year in sorted(diagnostic.trayectoria_hitos):
        lines.append(f"  {year}: {diagnostic.trayectoria_hitos[year]:>10,.1f} tCO2e")
    return "\n".join(lines)


def print_pathway_report(pathway: PathwayOutput) -> str:
    """Format a human-readable pathway report."""
    lines = [
        "╔══════════════════════════════════════════════════════╗",
        "║      SENDA DE DESCARBONIZACIÓN (SBTi 1.5°C)        ║",
        "╚══════════════════════════════════════════════════════╝",
        "",
        pathway.resumen,
        "",
        "Detalle de alternativas:",
    ]
    for alt in pathway.alternativas:
        lines.append(
            f"  [{alt.horizonte.value:15s}] {alt.source_nombre}\n"
            f"    → {alt.medida}\n"
            f"      Palanca: {alt.palanca.value} | "
            f"Reducción: {alt.reduccion_estimada_tCO2e:,.1f} tCO2e/año"
        )
    return "\n".join(lines)


def print_financial_report(financial: FinancialOutput) -> str:
    """Format a human-readable financial / MACC report."""
    lines = [
        "╔══════════════════════════════════════════════════════╗",
        "║        BUSINESS CASE — CURVA MACC                   ║",
        "╚══════════════════════════════════════════════════════╝",
        "",
        financial.resumen,
        "",
        "Roadmap de implementación:",
    ]
    for phase in financial.roadmap:
        lines.append(f"\n  {phase['fase']}:")
        lines.append(f"    Inversión: {phase['inversion_eur']:>12,.0f} €")
        lines.append(f"    Reducción: {phase['reduccion_anual_tCO2e']:>8,.1f} tCO2e/año")
        for m in phase["medidas"]:
            lines.append(f"      • {m}")
    return "\n".join(lines)
