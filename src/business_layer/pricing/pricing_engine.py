"""
ESW — Pricing Engine
Calculates upfront fees, success fees, and subscription tier based on
project CAPEX, technical complexity, and client type.

Fee logic:
  - High-impact projects (high CAPEX + high complexity) → success-fee-heavy
    to align ESW incentives with project outcome.
  - Smaller / lower-probability projects → upfront-fee-heavy to guarantee
    cost recovery on advisory time.
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
from typing import Any


class ClientType(Enum):
    GOVERNMENT = "Government"
    NGO = "NGO"
    PRIVATE_DEVELOPER = "Private Developer"


class SubscriptionTier(Enum):
    ESSENTIALS = "Essentials"
    PROFESSIONAL = "Professional"
    ENTERPRISE = "Enterprise"


# ── Tier thresholds (annual subscription pricing USD) ──────────────────
TIER_CONFIG = {
    SubscriptionTier.ESSENTIALS: {
        "label": "Essentials",
        "annual_price": 12_000,
        "includes": [
            "Regulatory scan (1 jurisdiction)",
            "Baseline ecological report",
            "GIS screening (satellite only)",
        ],
    },
    SubscriptionTier.PROFESSIONAL: {
        "label": "Professional",
        "annual_price": 36_000,
        "includes": [
            "Everything in Essentials",
            "Multi-jurisdiction compliance (CSRD/TNFD/ISSB)",
            "NbS feasibility study",
            "Financial model + bankability memo",
            "Carbon/biodiversity credit scoping",
        ],
    },
    SubscriptionTier.ENTERPRISE: {
        "label": "Enterprise",
        "annual_price": 96_000,
        "includes": [
            "Everything in Professional",
            "Full EIA/ESIA",
            "Blended finance structuring",
            "DFI application support",
            "Green bond framework",
            "Dedicated project controller",
            "Annual monitoring & MRV",
        ],
    },
}


@dataclass
class PricingResult:
    upfront_fee: float
    success_fee_pct: float
    success_fee_estimate: float
    subscription_tier: str
    subscription_annual: float
    tier_includes: list[str]
    fee_rationale: str
    impact_score: float


class PricingCalculator:
    """Compute ESW engagement pricing from project parameters.

    Parameters
    ----------
    project_capex : float
        Total estimated project capital expenditure in USD.
    complexity_score : int
        Technical complexity from 1 (simple) to 10 (multi-sector, multi-jurisdiction).
    client_type : str | ClientType
        One of "Government", "NGO", "Private Developer".
    """

    # ── Base rate tables ───────────────────────────────────────────────
    # Upfront fee = base_rate × complexity_multiplier × client_discount
    _BASE_RATE_USD = 25_000

    _COMPLEXITY_MULTIPLIER = {
        range(1, 4): 1.0,    # Low complexity
        range(4, 7): 1.8,    # Medium
        range(7, 9): 2.8,    # High
        range(9, 11): 4.0,   # Very high (multi-jurisdiction, blended finance)
    }

    _CLIENT_DISCOUNT = {
        ClientType.GOVERNMENT: 0.85,          # 15% public-sector discount
        ClientType.NGO: 0.75,                 # 25% NGO discount
        ClientType.PRIVATE_DEVELOPER: 1.00,   # Full rate
    }

    # Success fee schedule — percentage of project deal value at financial close
    # Higher impact → higher success fee share (incentive alignment)
    _SUCCESS_FEE_SCHEDULE = {
        "low":    {"pct": 0.005, "label": "0.5%"},   # < $5M CAPEX or complexity ≤ 3
        "medium": {"pct": 0.015, "label": "1.5%"},   # $5–20M, complexity 4–6
        "high":   {"pct": 0.025, "label": "2.5%"},   # $20–50M, complexity 7–8
        "mega":   {"pct": 0.035, "label": "3.5%"},   # > $50M, complexity 9–10
    }

    def __init__(
        self,
        project_capex: float,
        complexity_score: int,
        client_type: str | ClientType,
    ) -> None:
        if not 1 <= complexity_score <= 10:
            raise ValueError("complexity_score must be between 1 and 10")

        self.project_capex = float(project_capex)
        self.complexity_score = complexity_score

        if isinstance(client_type, str):
            client_type = ClientType(client_type)
        self.client_type = client_type

    def calculate(self) -> dict[str, Any]:
        """Return full pricing breakdown as a dictionary."""
        result = self._compute()
        return {
            "upfront_fee": round(result.upfront_fee, 2),
            "success_fee": f"{result.success_fee_pct * 100:.1f}%",
            "success_fee_estimate_usd": round(result.success_fee_estimate, 2),
            "subscription_tier": result.subscription_tier,
            "subscription_annual_usd": result.subscription_annual,
            "tier_includes": result.tier_includes,
            "fee_rationale": result.fee_rationale,
            "impact_score": round(result.impact_score, 2),
        }

    def _compute(self) -> PricingResult:
        impact = self._impact_score()
        upfront = self._upfront_fee()
        success_pct = self._success_fee_pct(impact)
        tier = self._subscription_tier(impact)
        tier_cfg = TIER_CONFIG[tier]

        # For high-impact projects, reduce upfront and rely on success fee
        # For low-impact, increase upfront to guarantee cost recovery
        if impact >= 7.0:
            upfront *= 0.6   # 40% discount — incentive shifts to success fee
            rationale = (
                "High-impact project: upfront fee discounted 40%. "
                "ESW aligns incentives via success fee at financial close."
            )
        elif impact >= 4.0:
            rationale = (
                "Medium-impact project: balanced fee structure. "
                "Upfront covers advisory costs; success fee rewards deal completion."
            )
        else:
            success_pct *= 0.5  # Halve success fee for low-probability projects
            rationale = (
                "Lower-impact / early-stage project: upfront fee covers full advisory cost. "
                "Reduced success fee reflects lower deal probability."
            )

        return PricingResult(
            upfront_fee=upfront,
            success_fee_pct=success_pct,
            success_fee_estimate=self.project_capex * success_pct,
            subscription_tier=tier_cfg["label"],
            subscription_annual=tier_cfg["annual_price"],
            tier_includes=tier_cfg["includes"],
            fee_rationale=rationale,
            impact_score=impact,
        )

    def _impact_score(self) -> float:
        """Composite 0–10 score: weighted combination of CAPEX scale + complexity."""
        capex_score = min(self.project_capex / 10_000_000, 10.0)  # $10M = 1.0, $100M = 10.0
        return 0.5 * capex_score + 0.5 * self.complexity_score

    def _upfront_fee(self) -> float:
        multiplier = 1.0
        for score_range, mult in self._COMPLEXITY_MULTIPLIER.items():
            if self.complexity_score in score_range:
                multiplier = mult
                break
        discount = self._CLIENT_DISCOUNT[self.client_type]
        return self._BASE_RATE_USD * multiplier * discount

    def _success_fee_pct(self, impact: float) -> float:
        if impact < 2.5:
            return self._SUCCESS_FEE_SCHEDULE["low"]["pct"]
        if impact < 5.0:
            return self._SUCCESS_FEE_SCHEDULE["medium"]["pct"]
        if impact < 7.5:
            return self._SUCCESS_FEE_SCHEDULE["high"]["pct"]
        return self._SUCCESS_FEE_SCHEDULE["mega"]["pct"]

    def _subscription_tier(self, impact: float) -> SubscriptionTier:
        if impact >= 6.0:
            return SubscriptionTier.ENTERPRISE
        if impact >= 3.0:
            return SubscriptionTier.PROFESSIONAL
        return SubscriptionTier.ESSENTIALS


# ── CLI usage ──────────────────────────────────────────────────────────
if __name__ == "__main__":
    # Example: Culiacán Green Corridors project
    calc = PricingCalculator(
        project_capex=42_500_000,
        complexity_score=8,
        client_type="Government",
    )
    result = calc.calculate()
    print("ESW Pricing — Culiacán Green Corridors")
    print("=" * 50)
    for k, v in result.items():
        print(f"  {k}: {v}")
