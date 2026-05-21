---
name: mmcr-maturity-assessor
description: Evalúa la Matriz de Madurez Corporativa Regenerativa (MMCR — autoría Iván Tamayo Ramos) para diagnosticar la capacidad organizacional de ejecutar infraestructura regenerativa. Activa para MMCR, madurez regenerativa corporativa, evaluación cultura organizacional, capacidad de ejecución regenerativa, diagnóstico organizacional sostenibilidad, mediación cultural en infraestructura, gap analysis corporativo regenerativo, scoring del consorcio, due diligence de capacidad del developer, evaluación de socio en JV. Activa también para evaluar consorcios, identificar brechas que condicionan IMPACT-LC, o cuando un GO/CONDITIONAL requiera evidencia de capacidad. Opera autónomamente: aplica los cinco niveles (Inicial → Reactivo → Estructurado → Integrado → Regenerativo) a través de las seis dimensiones operativas, produce scoring, hallazgos H-numerados y plan de elevación. Responde en el idioma del usuario.
---

# MMCR Maturity Assessor

## Propósito
Aplicar la **Matriz de Madurez Corporativa Regenerativa (MMCR)** — aporte doctoral original de Iván Tamayo Ramos — para diagnosticar la capacidad real de una organización (developer, operador, EPC, fund manager, autoridad concedente) de ejecutar infraestructura regenerativa.

## Fundamento (no negociable)
La sostenibilidad declarativa no equivale a capacidad de ejecución. La MMCR cuantifica esta brecha en **5 niveles** a través de **6 dimensiones**.

### Niveles
| Nivel | Etiqueta | Comportamiento típico |
|---|---|---|
| 1 | Inicial | Cumplimiento mínimo legal. Sostenibilidad reactiva al regulador. |
| 2 | Reactivo | ESG como función comunicacional. No operativa. |
| 3 | Estructurado | KPIs ESG en gobernanza, desacoplados de la decisión de capital. |
| 4 | Integrado | ESG decide CAPEX/OPEX. Comité técnico-financiero alineado. |
| 5 | Regenerativo | Net-positive como criterio de diseño desde la etapa 0. |

### Dimensiones
1. **Gobernanza** (board, comité ESG, accountability)
2. **Estrategia** (integración con plan de negocio)
3. **Procesos** (procurement, obra, O&M)
4. **Capacidades** (talento, formación, certificaciones)
5. **Datos & medición** (inventario GEI, biodiversidad, social)
6. **Financiamiento interno** (CAPEX verde, OPEX stewardship, incentivos)

## Procedimiento

### Paso 1 — Unidad evaluada
Empresa, consorcio, división, SPV, autoridad concedente. En consorcio, evaluar **cada miembro por separado y el conjunto** (eslabón débil arrastra al grupo).

### Paso 2 — Evidencia
Reportes anuales y de sostenibilidad (3 años), políticas internas, indicadores publicados (CDP, GRESB, S&P CSA, MSCI ESG, Sustainalytics), certificaciones (ISO 14001/50001/45001/37001, B Corp), estructura de gobernanza ESG.

### Paso 3 — Scoring matriz 6 × 5
Por dimensión, nivel 1–5 más alto con **evidencia documental**. Sin evidencia, baja un nivel.

| Dimensión | Nivel | Evidencia | Brecha al siguiente |
|---|---|---|---|
| Gobernanza | 3 | Comité ESG con minutas trimestrales | Falta accountability del CEO a KPI |
| ... | ... | ... | ... |

### Paso 4 — Score agregado
**Factor MMCR** = promedio ponderado de los 6 niveles (defaults: gobernanza 25 %, procesos 25 %, datos 15 %, capacidades 15 %, estrategia 10 %, financiamiento 10 %).

### Paso 5 — Hallazgos H-numerados
Por dimensión: H1.x → H6.x con evidencia → impacto → recomendación.

### Paso 6 — Plan de elevación
Tabla: dimensión → acción → responsable → plazo → costo. Cada acción avanza **exactamente un nivel**; saltos de dos niveles no son creíbles y se rechazan.

## Entregables
- **Matriz MMCR 6 × 5** (XLSX color-coded con evidencia por celda).
- **Memo de diagnóstico** (DOCX) con scoring, hallazgos, factor MMCR y plan de elevación.
- (Opcional) Slide ejecutivo para comité de inversión o GO/NO-GO.

## Estándar de calidad
- Sin evidencia documental → nivel mínimo asignado.
- Toda recomendación ejecutable en 12–24 meses.
- Factor MMCR reutilizable directamente por `impact-lc-engine`.

## Integraciones
- `impact-lc-engine` (consumidor del factor MMCR)
- `due-diligence-consolidator`
- `acciona-senior-analyst` (due diligence de socios)
- `acciona-excel` · `docx`
