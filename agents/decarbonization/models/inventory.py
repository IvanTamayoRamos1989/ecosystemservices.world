"""
Phase 1 — Entender el Inventario: Motor de Datos Base
=====================================================
Data models for GHG Protocol emissions calculation.

Core Formula:
    Emisiones (tCO2e) = Dato_de_Actividad * Factor_de_Emision * GWP * Factor_de_Consolidacion
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Optional


# ---------------------------------------------------------------------------
# Enums
# ---------------------------------------------------------------------------

class ConsolidationType(Enum):
    """B. Tipo de Consolidación."""
    EQUITY_SHARE = "equity_share"
    FINANCIAL_CONTROL = "financial_control"
    OPERATIONAL_CONTROL = "operational_control"


class Scope(Enum):
    """C. Límites Operacionales."""
    SCOPE_1 = 1
    SCOPE_2 = 2
    SCOPE_3 = 3


class Scope2Method(Enum):
    """Scope 2 calculation method."""
    LOCATION_BASED = "LBM"
    MARKET_BASED = "MBM"


class TimeHorizon(Enum):
    SHORT = "corto_plazo"    # 0-2 years
    MEDIUM = "medio_plazo"   # 2-5 years
    LONG = "largo_plazo"     # 5-10+ years


class ReductionLever(Enum):
    EFFICIENCY = "eficiencia"
    ELECTRIFICATION = "electrificacion"
    RENEWABLES = "renovables"
    OFFSET = "compensacion"
    FUEL_SWITCH = "sustitucion_combustible"


# ---------------------------------------------------------------------------
# A. Organización
# ---------------------------------------------------------------------------

@dataclass
class Organization:
    """A. Datos de la organización."""
    nombre: str
    pais: str
    sector: str
    empleados: int
    ingresos_eur: float
    anio_reporte: int


# ---------------------------------------------------------------------------
# B-C. Consolidación y Límites
# ---------------------------------------------------------------------------

@dataclass
class ConsolidationConfig:
    """B. Configuración de consolidación."""
    tipo: ConsolidationType
    participacion_porcentaje: float = 100.0  # % ownership / control

    @property
    def factor_consolidacion(self) -> float:
        return self.participacion_porcentaje / 100.0


# ---------------------------------------------------------------------------
# D. Instalaciones
# ---------------------------------------------------------------------------

@dataclass
class Facility:
    """D. Instalación física."""
    id: str
    nombre: str
    ubicacion: str
    pais: str
    arrendamiento: bool = False
    superficie_m2: float = 0.0
    dias_operacion: int = 365


# ---------------------------------------------------------------------------
# E. Fuentes de Emisión
# ---------------------------------------------------------------------------

@dataclass
class EmissionSource:
    """E. Punto generador de emisiones."""
    id: str
    nombre: str
    descripcion: str
    scope: Scope
    facility_id: str
    categoria: str  # e.g. "caldera", "vehiculo", "equipo_refrigeracion"


# ---------------------------------------------------------------------------
# F. Datos de Actividad
# ---------------------------------------------------------------------------

@dataclass
class ActivityData:
    """F. Consumo real asociado a una fuente de emisión."""
    source_id: str
    cantidad: float
    unidad: str  # e.g. "litros", "kWh", "km"
    anio: int
    descripcion: str = ""


# ---------------------------------------------------------------------------
# G. Factor de Emisión y GWP
# ---------------------------------------------------------------------------

@dataclass
class EmissionFactor:
    """G. Coeficiente de conversión + GWP."""
    id: str
    nombre: str
    factor: float           # kgCO2e per unit of activity
    unidad_actividad: str   # matching ActivityData.unidad
    gwp: float = 1.0       # Global Warming Potential multiplier (default CO2=1)
    fuente: str = ""        # e.g. "IPCC AR6", "DEFRA 2023"


# ---------------------------------------------------------------------------
# H. Cálculo y Resultados
# ---------------------------------------------------------------------------

@dataclass
class EmissionResult:
    """H. Output del motor de cálculo."""
    source_id: str
    scope: Scope
    tCO2e: float
    anio: int
    scope2_method: Optional[Scope2Method] = None  # only for Scope 2


@dataclass
class EmissionSummary:
    """H. Resumen agregado de emisiones."""
    anio: int
    scope_1_tCO2e: float = 0.0
    scope_2_lbm_tCO2e: float = 0.0
    scope_2_mbm_tCO2e: float = 0.0
    scope_3_tCO2e: float = 0.0

    @property
    def total_tCO2e(self) -> float:
        return self.scope_1_tCO2e + self.scope_2_lbm_tCO2e + self.scope_3_tCO2e

    @property
    def intensidad_por_empleado(self) -> float:
        """Must be set externally via compute method."""
        return self._intensidad_empleado

    @intensidad_por_empleado.setter
    def intensidad_por_empleado(self, value: float) -> None:
        self._intensidad_empleado = value

    @property
    def intensidad_por_ingreso(self) -> float:
        return self._intensidad_ingreso

    @intensidad_por_ingreso.setter
    def intensidad_por_ingreso(self, value: float) -> None:
        self._intensidad_ingreso = value

    def compute_intensities(self, org: Organization) -> None:
        self._intensidad_empleado = self.total_tCO2e / org.empleados if org.empleados else 0.0
        self._intensidad_ingreso = self.total_tCO2e / org.ingresos_eur if org.ingresos_eur else 0.0


# ---------------------------------------------------------------------------
# I. Asignación Interna
# ---------------------------------------------------------------------------

@dataclass
class InternalAllocation:
    """I. Atribución de emisiones por departamento o producto."""
    entidad: str          # department or product name
    tipo: str             # "departamento" | "producto"
    tCO2e_asignado: float
    porcentaje: float     # % of total


# ---------------------------------------------------------------------------
# J. Objetivo de Descarbonización
# ---------------------------------------------------------------------------

@dataclass
class DecarbonizationTarget:
    """J. Compromiso de reducción."""
    compromiso: str       # e.g. "SBTi 1.5°C", "Net Zero"
    reduccion_porcentaje: float
    anio_objetivo: int
    anio_base: int
    descripcion: str = ""


# ---------------------------------------------------------------------------
# K. Año Base y Trayectoria
# ---------------------------------------------------------------------------

@dataclass
class BaselineTrajectory:
    """K. Dimensión retrospectiva y prospectiva."""
    anio_base: int
    emisiones_base_tCO2e: float
    hitos: dict[int, float] = field(default_factory=dict)
    # e.g. {2025: 75000, 2030: 60000, 2035: 40000}


# ---------------------------------------------------------------------------
# L. Medidas de Reducción
# ---------------------------------------------------------------------------

@dataclass
class ReductionMeasure:
    """L. Medida de reducción de emisiones."""
    id: str
    nombre: str
    descripcion: str
    tipo: ReductionLever
    scope_aplicable: Scope
    source_id: str                          # linked emission source
    reduccion_estimada_tCO2e: float         # annual tCO2e avoided
    horizonte: TimeHorizon
    vida_util_anios: int = 10
    # Offset-specific criteria
    adicionalidad: bool = False
    permanencia: bool = False


# ---------------------------------------------------------------------------
# M. Variables Económicas
# ---------------------------------------------------------------------------

@dataclass
class EconomicVariables:
    """M. Variables económicas de una medida."""
    measure_id: str
    capex_eur: float
    opex_diferencial_eur: float  # annual savings (negative = cost)
    payback_anios: float = 0.0
    macc_eur_per_tCO2e: float = 0.0  # will be computed in Phase 4

    def compute_payback(self) -> None:
        if self.opex_diferencial_eur > 0:
            self.payback_anios = self.capex_eur / self.opex_diferencial_eur
        else:
            self.payback_anios = float("inf")


# ---------------------------------------------------------------------------
# Core Calculation Engine
# ---------------------------------------------------------------------------

class EmissionsEngine:
    """Motor de cálculo GHG Protocol.

    Emisiones (tCO2e) = Dato_de_Actividad * Factor_de_Emision * GWP * Factor_de_Consolidacion
    """

    def __init__(self, consolidation: ConsolidationConfig):
        self.consolidation = consolidation

    def calculate(
        self,
        activity: ActivityData,
        factor: EmissionFactor,
    ) -> float:
        """Apply the core GHG formula and return tCO2e."""
        emisiones_kg = (
            activity.cantidad
            * factor.factor
            * factor.gwp
            * self.consolidation.factor_consolidacion
        )
        return emisiones_kg / 1000.0  # kg -> tonnes

    def build_result(
        self,
        activity: ActivityData,
        factor: EmissionFactor,
        source: EmissionSource,
        scope2_method: Optional[Scope2Method] = None,
    ) -> EmissionResult:
        tCO2e = self.calculate(activity, factor)
        return EmissionResult(
            source_id=source.id,
            scope=source.scope,
            tCO2e=tCO2e,
            anio=activity.anio,
            scope2_method=scope2_method if source.scope == Scope.SCOPE_2 else None,
        )

    @staticmethod
    def summarize(results: list[EmissionResult], anio: int) -> EmissionSummary:
        summary = EmissionSummary(anio=anio)
        for r in results:
            if r.anio != anio:
                continue
            if r.scope == Scope.SCOPE_1:
                summary.scope_1_tCO2e += r.tCO2e
            elif r.scope == Scope.SCOPE_2:
                if r.scope2_method == Scope2Method.MARKET_BASED:
                    summary.scope_2_mbm_tCO2e += r.tCO2e
                else:
                    summary.scope_2_lbm_tCO2e += r.tCO2e
            elif r.scope == Scope.SCOPE_3:
                summary.scope_3_tCO2e += r.tCO2e
        return summary
