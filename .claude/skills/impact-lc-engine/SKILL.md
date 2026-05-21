---
name: impact-lc-engine
description: Aplica rigurosamente IMPACT-LC (autoría Iván Tamayo Ramos) para evaluar proyectos de infraestructura a lo largo de sus seis etapas de ciclo de vida regenerativo, con la cultura organizacional (MMCR) como variable mediadora. Activa para IMPACT-LC, IMPACT LC, evaluación lifecycle regenerativo, scoring por etapa de proyecto, evaluación cuna-a-cuna, scorecard IMPACT-LC, hallazgos H-numerados por etapa, variable mediadora cultura. Activa también al describir un proyecto P3/concesión/obra y pedir evaluarlo, comparar IMPACT-LC con Envision/PAS 2080/CEEQUAL/TVF/Color Palette, o al redactar capítulos doctorales que apliquen el método. Opera autónomamente, produce scorecard con factor MMCR aplicado, hallazgos H-numerados y recomendación GO/CONDITIONAL/NO-GO. Responde en el idioma del usuario.
---

# IMPACT-LC Engine

## Propósito
Aplicar **IMPACT-LC** (Infrastructure Multidimensional Performance Assessment by Cultural and Lifecycle integration) — aporte doctoral original de Iván Tamayo Ramos — para producir evaluaciones regenerativas defendibles a nivel doctoral y bancables a nivel financiero.

## Fundamento (no negociable)
IMPACT-LC evalúa un proyecto a lo largo de **seis etapas** mediadas por la **cultura organizacional ejecutora**:

1. **Pre-Project** — origen, demanda, marco regulatorio, derecho de vía, derecho social a la infraestructura.
2. **Planning & Design** — alternativas, criterios regenerativos integrados desde el día uno.
3. **Procurement & Financing** — estructuración financiera, ESG en pliego, asignación de riesgos.
4. **Construction** — materiales, energía, gestión social del territorio, biodiversidad in situ.
5. **Operation & Maintenance** — desempeño verificado, mayordomía ecológica, renovación de KPIs.
6. **End-of-Life / Renewal** — decommissioning, circularidad, transferencia, regeneración del activo.

La cultura organizacional (vía MMCR) opera como mediador: un proyecto con buen diseño técnico pero baja madurez organizacional no puede aspirar a "regenerativo".

## Procedimiento

### Paso 1 — Encuadre
- Tipo de infraestructura, geografía, CAPEX/OPEX, autoridad concedente.
- Etapa(s) en alcance.
- Tipo de evaluación: retrospectiva, prospectiva, comparativa, GO/CONDITIONAL/NO-GO.

### Paso 2 — Línea base por etapa
Para cada etapa: drivers regulatorios, stakeholders dominantes, indicadores cuantificables, brechas vs. estándar regenerativo.

### Paso 3 — Scoring (rúbrica 0–5)

| Etapa | Dimensiones | Peso |
|---|---|---|
| Pre-Project | Legitimidad social · Marco regulatorio · Justificación de demanda | 10 % |
| Planning & Design | Integración regenerativa · Alternativas · NbS embebidas | 20 % |
| Procurement & Financing | Capital stack · Riesgos · ESG · DNSH | 20 % |
| Construction | Carbono embebido · Biodiversidad · Gestión social | 20 % |
| O&M | Stewardship · KPIs verificables · Pago por desempeño | 20 % |
| End-of-Life / Renewal | Circularidad · Transferencia · Plan de renovación | 10 % |

Pesos ajustables, con justificación documentada.

### Paso 4 — Mediación cultural (MMCR)
Multiplicar score técnico por el **factor MMCR**:

- Nivel 1 Inicial → 0.40
- Nivel 2 Reactivo → 0.55
- Nivel 3 Estructurado → 0.70
- Nivel 4 Integrado → 0.85
- Nivel 5 Regenerativo → 1.00

### Paso 5 — Hallazgos H-numerados
Por etapa: H1.1, H1.2, …, H6.n con evidencia → impacto → recomendación.

### Paso 6 — Recomendación ejecutiva
Bloque `GO / CONDITIONAL / NO-GO`, condiciones precedentes, ventana óptima.

## Entregables
- **Scorecard IMPACT-LC** (XLSX o tabla DOCX) con scoring por etapa, factor MMCR y score global ponderado.
- **Memo IMPACT-LC** (DOCX) con cover, ejecutivo, secciones por etapa, hallazgos H-numerados y recomendación.
- (Opcional) Comparativa contra Envision · PAS 2080 · CEEQUAL · TVF · Color Palette.

## Estándar de calidad
- Toda calificación "regenerativa" requiere evidencia citada y verificación MMCR.
- Ningún score sin justificación documentada por dimensión.
- Sin etiquetas "TBD" en la rúbrica.
- Re-emitible cuando cambie evidencia material.

## Integraciones
- `mmcr-maturity-assessor` (input cultural obligatorio)
- `regen-nexus-scorer` (variante REGEN-NEXUS para uso ACCIONA)
- `thesis-chapter-architect` (cuando alimenta capítulo doctoral)
- `acciona-excel` (scorecard) · `docx` (memo)
