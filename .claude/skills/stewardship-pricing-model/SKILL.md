---
name: stewardship-pricing-model
description: Modelo de pricing de la mayordomía (stewardship) de la función ecológica — NUNCA del ecosistema como commodity. Cuantifica trabajo humano, CapEx y OpEx para mantener función ecosistémica sana y los transforma en flujos de pago bancables. Activa para stewardship pricing, pago por mantenimiento ecosistémico, valoración del cuidado ecológico, OpEx ecológico, CapEx restauración, payment for ecosystem services PES alternativa, contraprestación por mantenimiento NbS, pago por jardinería ecológica corredor verde, modelo financiero infraestructura verde operación, costo de mantener bioswale humedal artificial, payment mechanism para NbS, ESCO modelo aplicado a verde, contrato de servicios ecológicos largo plazo, availability payment ambiental. Activa también cuando un proyecto NbS necesite responder "¿quién paga el mantenimiento durante 30 años?" Opera autónomamente: descompone función ecológica en tareas, asigna mano de obra/materiales/monitoreo/reposición, calcula OpEx anual y CapEx decenal, propone vehículo de pago (fideicomiso, escrow municipal, payment-by-results, availability payment ambiental). Posición del autor: NUNCA precio al "ecosistema"; SIEMPRE precio al trabajo humano. Responde en el idioma del usuario.
---

# Stewardship Pricing Model

## Propósito
Resolver la pregunta que descarta la mayoría de proyectos NbS e infraestructura verde: **¿quién paga el mantenimiento a 30 años?** Por una vía ideológicamente coherente: **no se le pone precio al ecosistema; se le pone precio al trabajo humano de mantenerlo**.

## Principio operativo (no negociable)
> "Don't price the ecosystem; price the stewardship of it. The labour, CapEx, and OpEx of keeping ecological function healthy — that is the asset."

Este skill **rechaza explícitamente**:
- Valorar "servicios ecosistémicos" como unidades de mercado (TEEB/SEEA aplicado mecánicamente).
- Esquemas PES que descontextualizan al usufructuario del territorio.
- Métricas de "valor económico de la biodiversidad" sin instrumento de pago.

Y construye:
- **Stock de trabajo** que mantiene la función ecológica saludable.
- **Flujo de pagos** que financia ese trabajo de forma recurrente, contractual y bancable.

## Procedimiento

### Paso 1 — Descomposición en tareas operables
Por cada componente NbS (bioswale, humedal artificial, corredor arbóreo, techo verde, dren francés vegetado):

| Tarea | Frecuencia | Insumo | Mano de obra |
|---|---|---|---|
| Poda selectiva | trimestral | herramienta menor | 1 jardinero / día / 0.5 ha |
| Riego de establecimiento | diario × 2 años | agua + goteo | automatizado |
| Reposición de individuos | anual | viveros locales | 1 cuadrilla |
| Monitoreo biótico | semestral | equipo + lab | biólogo |
| Limpieza de azolves | semestral | retroexcavadora | cuadrilla |
| Reposición decenal | cada 10 años | CapEx parcial | EPC parcial |

### Paso 2 — Costeo
- Insumos a precios regionales verificados (México: `ccy-materiales`, `ccy-apu`).
- Mano de obra a tarifas locales actualizadas.
- Monitoreo con frecuencia, alcance, proveedor.
- CapEx decenal por componente.

### Paso 3 — Flujo de pago

| Año | OpEx | CapEx reposición | Total | Pago anual al operador |
|---|---|---|---|---|
| 1 | … | 0 | … | … |
| 2 | … | 0 | … | … |
| 10 | … | (reposición parcial) | … | … |

Modelo en moneda nominal y real; ajustar por inflación regional.

### Paso 4 — Vehículo de pago
Elegir (o combinar) y justificar:
- **Fideicomiso de fuente de pago**: tarifa, contribución de mejoras, participación federal.
- **Escrow municipal** capitalizado al inicio (típico con grant catalítico).
- **Availability payment ambiental** dentro de P3.
- **Payment-by-results** atado a KPIs ecológicos verificables.
- **ESCO ecológica**: operador asume riesgo de desempeño a cambio de upside.

### Paso 5 — Validación de bancabilidad
- Fuente de pago estable a 20–30 años.
- KPI medible por tercero independiente.
- Contrato sobrevive a cambio de administración (en México: blindaje legal).
- Operador con capacidad organizacional (verificar con MMCR).

### Paso 6 — Conexión a finance arquitectónico
Insumo para:
- Bono verde con uso de fondos en OpEx ecológico (framework adaptado).
- Sustainability-linked loan con KPI ecológico.
- Tramo de blended finance dedicado al stewardship.

## Entregables
- **Modelo XLSX**: supuestos, OpEx por componente, CapEx decenal, waterfall de pagos, sensibilidad.
- **Memo conceptual** (DOCX) explicando el vehículo de pago, su bancabilidad y anclaje contractual.
- (Opcional) Slide ejecutivo para comité de inversión.

## Estándar de calidad
- Cero "valor del ecosistema" en dólares por hectárea.
- Cada tarea con frecuencia, costo y responsable identificado.
- Vehículo de pago jurídicamente verificado en la geografía aplicable.
- Modelo auditable celda por celda.

## Integraciones
- `mexican-water-concession` (vehículos en México)
- `iucn-nbs-verifier` (validación NbS)
- `fideicomiso-spv-architect`
- `acciona-excel` · `docx`
