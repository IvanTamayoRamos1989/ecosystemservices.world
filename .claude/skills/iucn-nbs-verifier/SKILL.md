---
name: iucn-nbs-verifier
description: Auditor de proyectos Nature-based Solutions contra el IUCN Global Standard for NbS (8 criterios, 28 indicadores). Detecta NbS-washing y certifica conformidad real. Activa para IUCN NbS Standard, verificación NbS, auditoría nature-based solutions, criterios 1-8 IUCN, indicadores 28 NbS, NbS-washing, greenwashing en soluciones basadas en naturaleza, conformidad IUCN, brecha de cumplimiento NbS, calificación bronze/silver/gold IUCN equivalente, candidato a NbS Finance Accelerator, validación NbS para green bond, CAF BiodiverCiudades, GCF, validar componente NbS de PTAR o corredor verde. Activa también cuando un proyecto se etiquete como "NbS" sin evidencia y necesite auditoría. Opera autónomamente: aplica los 8 criterios y los 28 indicadores, asigna scoring, identifica brechas, produce dictamen y plan de remediación. Cuando un proyecto NO califica, lo dice explícitamente y propone reclasificación. Responde en el idioma del usuario.
---

# IUCN NbS Verifier

## Propósito
Auditar proyectos presentados como **Nature-based Solutions** contra el **IUCN Global Standard for NbS** (2020): 8 criterios, 28 indicadores. Distinguir **NbS reales de NbS-washing** antes de entrar a financiamiento serio (CAF BiodiverCiudades, GCF, IUCN NbS Finance Accelerator, green bond use-of-proceeds).

## Marco canónico
| # | Criterio | Indicadores |
|---|---|---|
| C1 | Aborda eficazmente un reto societal | 1, 2, 3 |
| C2 | Diseño informado por escala | 4, 5, 6 |
| C3 | Ganancia neta para biodiversidad e integridad ecosistémica | 7, 8, 9, 10 |
| C4 | Económicamente viable | 11, 12, 13 |
| C5 | Gobernanza inclusiva, transparente, empoderadora | 14, 15, 16, 17 |
| C6 | Trade-offs equilibrados equitativamente | 18, 19, 20 |
| C7 | Gestión adaptativa basada en evidencia | 21, 22, 23 |
| C8 | Sostenible y dominante en jurisdicción adecuada | 24, 25, 26, 27, 28 |

Scoring por indicador: **0 Insufficient · 1 Partial · 2 Adequate · 3 Strong**.

## Procedimiento

### Paso 1 — Encuadre
- Tipo, geografía, escala (hectáreas, beneficiarios), etapa.
- ¿Etiquetado como NbS? ¿Por quién? ¿Evidencia?
- Lecturas previas contra otros estándares (Verra CCB, Climate Bonds, TNFD).

### Paso 2 — Evidencia por indicador
- Línea base ecológica (especies, conectividad, calidad de hábitat).
- Línea base social (poblaciones afectadas, derechos, tenencia, FPIC).
- Diseño técnico (planos, especificaciones, alternativas).
- Modelo financiero (CapEx, OpEx, fuente de pago).
- Plan de monitoreo y gestión adaptativa.
- Estructura de gobernanza.

### Paso 3 — Scoring indicador por indicador

| Indicador | Score | Evidencia | Brecha |
|---|---|---|---|
| I1.1 | 2 | EIA con análisis costo-beneficio social | Falta cuantificación de población vulnerable |
| I3.1 (biodiversity net gain) | 1 | … | Sin inventario pre/post comparable |

### Paso 4 — Score por criterio y agregado
- Por criterio: promedio simple de indicadores.
- Agregado: promedio ponderado (C3 y C5 con mayor peso).

### Paso 5 — Clasificación

| Score agregado | Clasificación |
|---|---|
| ≥ 2.5 | **NbS conforme** — apto para etiquetado y financiamiento |
| 1.5 – 2.4 | **NbS condicional** — apto con plan de remediación |
| 1.0 – 1.4 | **No-NbS** — reclasificar como infraestructura verde o green-grey |
| < 1.0 | **NbS-washing** — etiqueta indebida; rechazar |

### Paso 6 — Plan de remediación
Para cada indicador < 2: acción concreta, responsable, plazo, costo. Alcanzable en 12–24 meses.

### Paso 7 — Dictamen
Documento corto y firme: clasificación, indicadores críticos, plan, recomendación **proceder · proceder con condiciones · reclasificar · rechazar**.

## Entregables
- **Matriz IUCN 28 × scoring** (XLSX).
- **Dictamen de conformidad** (DOCX) con cover, scoring agregado, hallazgos, recomendación.
- (Opcional) Resumen ejecutivo 1-página para inversor o autoridad.

## Estándar de calidad
- Si no califica, se dice explícitamente y sin suavizar.
- Toda evidencia citada por documento y página.
- Plan de remediación realista y costeado.
- Defendible ante revisor IUCN, GCF o CAF.

## Integraciones
- `impact-lc-engine` (alimenta etapa Planning & Design)
- `regen-nexus-scorer` · `regenerative-design`
- `mexican-water-concession` (validación NbS en rescate PTAR)
- `green-bond-structurer` (use-of-proceeds)
- `docx` · `xlsx`
