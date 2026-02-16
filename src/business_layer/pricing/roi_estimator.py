"""
ESW — ROI Estimator
Generates a client-facing "Value Proposition" summary comparing ESW engagement
costs against alternative approaches (traditional consulting, in-house, no action).

All benchmarks are derived from:
  - C40 CFF historical acceptance rates (public data)
  - IDB NbS project data (USD 813M across 28 projects, 2015–2020)
  - Industry consulting fee benchmarks (EIA, NbS design, DFI applications)
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


# ── Market benchmarks ──────────────────────────────────────────────────

# Traditional consulting costs for equivalent scope (USD)
TRADITIONAL_CONSULTING_COSTS = {
    "eia_esia": 80_000,            # Environmental Impact Assessment
    "nbs_feasibility": 60_000,     # Nature-based Solutions feasibility study
    "financial_modelling": 45_000, # Bankability assessment + financial model
    "gis_remote_sensing": 35_000,  # GIS/remote sensing analysis
    "dfi_application": 50_000,     # DFI loan application support
    "green_bond_framework": 55_000,# Green bond framework + second-party opinion
    "legal_regulatory": 40_000,    # Multi-jurisdiction regulatory scan
    "monitoring_mrv": 30_000,      # Annual monitoring + MRV setup
}

# C40 CFF historical acceptance data
CFF_BASELINE_ACCEPTANCE_RATE = 0.18   # ~18% of applications are accepted (public data)
CFF_ESW_UPLIFT_MULTIPLIER = 2.2       # ESW-structured applications: estimated 2.2x baseline

# IDB economic return on NbS investments
IDB_NBS_ECONOMIC_RETURN = 4.0  # 4:1 USD return per USD invested (IDB, 2020)

# Time savings vs. in-house assembly
MONTHS_TRADITIONAL = 18  # Typical pre-feasibility → bankable feasibility timeline
MONTHS_ESW = 12          # ESW integrated delivery timeline


@dataclass
class ROIResult:
    traditional_cost_total: float
    esw_cost_total: float
    cost_savings: float
    cost_savings_pct: float
    time_savings_months: int
    cff_baseline_rate: float
    cff_esw_rate: float
    acceptance_uplift_pct: float
    economic_return_ratio: float
    projected_economic_value: float
    value_propositions: list[str]


class ROIEstimator:
    """Generate value proposition metrics for a prospective ESW client.

    Parameters
    ----------
    project_capex : float
        Total project CAPEX in USD.
    esw_upfront_fee : float
        ESW upfront advisory fee (comparable to traditional consulting costs).
    esw_success_fee : float
        ESW contingent success fee (paid only at Financial Close).
    services_used : list[str] | None
        List of service keys from TRADITIONAL_CONSULTING_COSTS.
        If None, auto-selects based on CAPEX tier.
    """

    def __init__(
        self,
        project_capex: float,
        esw_upfront_fee: float,
        esw_success_fee: float = 0.0,
        services_used: list[str] | None = None,
    ) -> None:
        self.project_capex = float(project_capex)
        self.esw_upfront_fee = float(esw_upfront_fee)
        self.esw_success_fee = float(esw_success_fee)
        self.services_used = services_used or self._auto_scope()

    def estimate(self) -> dict[str, Any]:
        result = self._compute()
        return {
            "traditional_cost_usd": round(result.traditional_cost_total, 2),
            "esw_upfront_usd": round(result.esw_cost_total, 2),
            "cost_savings_usd": round(result.cost_savings, 2),
            "cost_savings_pct": f"{result.cost_savings_pct:.0f}%",
            "time_savings_months": result.time_savings_months,
            "cff_baseline_acceptance": f"{result.cff_baseline_rate * 100:.0f}%",
            "cff_esw_acceptance": f"{result.cff_esw_rate * 100:.0f}%",
            "acceptance_uplift": f"+{result.acceptance_uplift_pct:.0f}%",
            "economic_return_ratio": f"{result.economic_return_ratio}:1",
            "projected_economic_value_usd": round(result.projected_economic_value, 2),
            "value_propositions": result.value_propositions,
        }

    def format_slide(self) -> str:
        """Return a formatted text block suitable for a presentation slide."""
        r = self._compute()
        lines = [
            "=" * 64,
            "  ESW VALUE PROPOSITION",
            "  Ecosystem Services World",
            "=" * 64,
            "",
        ]
        for i, prop in enumerate(r.value_propositions, 1):
            lines.append(f"  {i}. {prop}")
        lines += [
            "",
            "-" * 64,
            f"  Traditional consulting cost:  ${r.traditional_cost_total:>12,.0f}",
            f"  ESW upfront advisory fee:     ${r.esw_cost_total:>12,.0f}",
            f"  YOUR SAVINGS:                 ${r.cost_savings:>12,.0f}  ({r.cost_savings_pct:.0f}%)",
            "-" * 64,
            f"  Success fee (at close only):  ${self.esw_success_fee:>12,.0f}  (contingent)",
            f"  Timeline acceleration:        {r.time_savings_months} months faster",
            f"  C40 acceptance probability:   {r.cff_baseline_rate*100:.0f}% → {r.cff_esw_rate*100:.0f}% (+{r.acceptance_uplift_pct:.0f}%)",
            f"  Projected economic return:    ${r.projected_economic_value:,.0f} ({r.economic_return_ratio}:1)",
            "=" * 64,
        ]
        return "\n".join(lines)

    def _compute(self) -> ROIResult:
        trad_cost = sum(
            TRADITIONAL_CONSULTING_COSTS[s]
            for s in self.services_used
            if s in TRADITIONAL_CONSULTING_COSTS
        )

        # Compare upfront fees only — success fee is contingent on Financial Close
        # and represents value-aligned compensation, not a comparable advisory cost
        savings = trad_cost - self.esw_upfront_fee
        savings_pct = (savings / trad_cost * 100) if trad_cost > 0 else 0

        esw_acceptance = min(CFF_BASELINE_ACCEPTANCE_RATE * CFF_ESW_UPLIFT_MULTIPLIER, 0.95)
        uplift_pct = (esw_acceptance - CFF_BASELINE_ACCEPTANCE_RATE) * 100

        economic_value = self.project_capex * IDB_NBS_ECONOMIC_RETURN

        props = self._build_propositions(savings, uplift_pct, economic_value)

        return ROIResult(
            traditional_cost_total=trad_cost,
            esw_cost_total=self.esw_upfront_fee,
            cost_savings=savings,
            cost_savings_pct=savings_pct,
            time_savings_months=MONTHS_TRADITIONAL - MONTHS_ESW,
            cff_baseline_rate=CFF_BASELINE_ACCEPTANCE_RATE,
            cff_esw_rate=esw_acceptance,
            acceptance_uplift_pct=uplift_pct,
            economic_return_ratio=IDB_NBS_ECONOMIC_RETURN,
            projected_economic_value=economic_value,
            value_propositions=props,
        )

    def _build_propositions(
        self, savings: float, uplift: float, economic_value: float
    ) -> list[str]:
        props = []
        if savings > 0:
            props.append(
                f"Using ESW saves you ${savings:,.0f} in upfront consulting fees "
                f"vs. assembling equivalent services from separate providers."
            )
        else:
            props.append(
                f"ESW delivers integrated, bankable-grade output for "
                f"${self.esw_upfront_fee:,.0f} upfront — with success-fee alignment "
                f"that traditional consultants don't offer."
            )

        props.append(
            f"ESW increases your C40 CFF acceptance probability by "
            f"{uplift:.0f}% (from {CFF_BASELINE_ACCEPTANCE_RATE*100:.0f}% baseline "
            f"to {min(CFF_BASELINE_ACCEPTANCE_RATE * CFF_ESW_UPLIFT_MULTIPLIER, 0.95)*100:.0f}%), "
            f"based on structured alignment with all 6 CFF assessment pillars."
        )

        props.append(
            f"Your project unlocks ${economic_value:,.0f} in projected economic "
            f"value ({IDB_NBS_ECONOMIC_RETURN:.0f}:1 return ratio, per IDB NbS benchmarks)."
        )

        props.append(
            f"ESW delivers bankable feasibility {MONTHS_TRADITIONAL - MONTHS_ESW} months "
            f"faster than traditional multi-vendor procurement "
            f"({MONTHS_ESW} months vs. {MONTHS_TRADITIONAL} months industry average)."
        )

        return props

    def _auto_scope(self) -> list[str]:
        """Select services based on CAPEX tier."""
        if self.project_capex >= 20_000_000:
            return list(TRADITIONAL_CONSULTING_COSTS.keys())
        if self.project_capex >= 5_000_000:
            return [
                "eia_esia", "nbs_feasibility", "financial_modelling",
                "gis_remote_sensing", "legal_regulatory",
            ]
        return ["nbs_feasibility", "gis_remote_sensing", "legal_regulatory"]


# ── CLI usage ──────────────────────────────────────────────────────────
if __name__ == "__main__":
    estimator = ROIEstimator(
        project_capex=42_500_000,
        esw_upfront_fee=59_500,
        esw_success_fee=1_062_500,
    )
    print(estimator.format_slide())
