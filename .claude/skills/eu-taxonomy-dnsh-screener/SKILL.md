---
name: eu-taxonomy-dnsh-screener
description: Screener de alineación con el Reglamento de Taxonomía UE (Reglamento 2020/852) — Substantial Contribution a los 6 objetivos ambientales, DNSH (Do No Significant Harm) y Minimum Safeguards (OECD/UN Guiding Principles/ILO). Activa para EU Taxonomy alignment, taxonomía UE elegibilidad, DNSH, do no significant harm, minimum safeguards, OECD Guidelines salvaguardas, technical screening criteria TSC, alineación taxonómica porcentaje, KPI taxonomía CSRD, Delegated Act Climate Mitigation, Delegated Act Climate Adaptation, Environmental Delegated Act, Article 8 disclosure, Taxonomy-eligible vs Taxonomy-aligned, green bond elegibilidad UE GBS, EU Green Bond Standard EuGBS, Reglamento 2020/852. Activa también cuando un proyecto o bono verde necesite probar alineación para inversores europeos o un cliente solicite Article 8 reporting. Opera autónomamente: identifica actividad NACE, mapea TSC del Delegated Act, evalúa Substantial Contribution, corre DNSH sobre los otros 5 objetivos, verifica Minimum Safeguards, reporta % CAPEX/OPEX/turnover alineable. Responde en el idioma del usuario.
---

# EU Taxonomy + DNSH Screener

## Propósito
Producir dictámenes defendibles de **alineación a la Taxonomía UE** (Reglamento 2020/852) y sus actos delegados, distinguiendo correctamente **Taxonomy-eligible** de **Taxonomy-aligned**. Triple test:
1. **Substantial Contribution** a uno de los 6 objetivos.
2. **DNSH** sobre los otros 5.
3. **Minimum Safeguards** sociales y de gobernanza.

## Objetivos ambientales (Reglamento 2020/852)
1. Mitigación del cambio climático.
2. Adaptación al cambio climático.
3. Uso sostenible y protección del agua y recursos marinos.
4. Transición a economía circular.
5. Prevención y control de la contaminación.
6. Protección y restauración de biodiversidad y ecosistemas.

## Procedimiento

### Paso 1 — Identificación de la actividad
- Código **NACE** principal.
- Mapear contra **Climate Delegated Act** (Reglamento 2021/2139) o **Environmental Delegated Act** (Reglamento 2023/2486).
- No listada → **Taxonomy non-eligible** (detener y reportar).
- Listada → **Taxonomy-eligible**. Continuar.

### Paso 2 — Substantial Contribution
Aplicar **TSC** del objetivo primario:
- Métrica exacta del TSC (gCO2e/kWh, gCO2e/pkm, % materiales reciclados).
- Evidencia documental.
- Verificación por tercero si aplica.

Resultado: **Substantial Contribution = Sí / No**.

### Paso 3 — DNSH screening
Por cada uno de los otros 5 objetivos:

| Objetivo | TSC DNSH | Evidencia | Cumple |
|---|---|---|---|
| Mitigación | (si SC ≠ Mitigación) emisiones GEI bajo umbral | … | |
| Adaptación | análisis de riesgo climático físico (IPCC AR6) | … | |
| Agua | análisis de riesgo hídrico, plan de gestión | … | |
| Circular | gestión de residuos durante construcción | … | |
| Contaminación | sustancias REACH / Stockholm | … | |
| Biodiversidad | EIA Directiva 2011/92, no en Natura 2000 sin mitigación | … | |

**Cualquier "No cumple" anula la alineación**.

### Paso 4 — Minimum Safeguards
Conformidad con:
- **OECD Guidelines for Multinational Enterprises**.
- **UN Guiding Principles on Business and Human Rights** (due diligence de DDHH).
- **ILO Core Conventions** (libertad sindical, negociación colectiva, no trabajo forzoso, no infantil, no discriminación).
- Convención OCDE Anti-Cohecho.

Evidencia: política corporativa, due diligence documentada, mecanismo de quejas operativo, reporte de incidentes.

### Paso 5 — KPIs Article 8
- **Turnover KPI**: % ingresos de actividades alineadas.
- **CAPEX KPI**: % CAPEX en activos/procesos alineados.
- **OPEX KPI**: % OPEX en actividades alineadas (mantenimiento, R&D).

Reportar **eligible** y **aligned** separadamente.

### Paso 6 — Dictamen
| Resultado | Implicación |
|---|---|
| Aligned | Apto para EU Green Bond Standard, ICMA GBP, Article 8 positivo |
| Eligible, no aligned | Article 8 con KPI = 0 alineado; brechas identificadas |
| Non-eligible | Fuera de Taxonomía |

### Paso 7 — Plan de remediación (si eligible no aligned)
Acciones para mover a aligned con responsable, plazo y costo.

## Entregables
- **Matriz de screening** (XLSX) con NACE, SC, DNSH × 5, Minimum Safeguards.
- **Memo de dictamen** (DOCX) con cover, dictamen, evidencia citada, KPIs Article 8, brechas, plan.
- (Opcional) Resumen ejecutivo 1-página para inversor o agencia rating.

## Estándar de calidad
- Cero confusión entre **eligible** y **aligned**.
- Toda evidencia citada con documento, artículo y página.
- Compatible con Second Party Opinion para emisión EuGBS.
- Reproducible por un revisor externo con la misma evidencia.

## Integraciones
- `green-bond-structurer` (use-of-proceeds y framework)
- `green-finance-screener` (comparativa con otros mercados)
- `esg-report-generator` (Article 8 disclosure CSRD)
- `iucn-nbs-verifier` (alineación a biodiversidad)
- `docx` · `xlsx`
