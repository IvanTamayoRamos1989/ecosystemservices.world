---
name: classical-academic-deck
description: Presentaciones PPTX en registro académico clásico para conferencias, lecciones magistrales ARCHIP, deliverables del Norman Foster Institute, cátedras doctorales y comités académicos. Activa para presentación académica, lectura magistral, conferencia ARCHIP, NFI lecture, defensa doctoral slides, presentación a comité doctoral, presentación con estética clásica, paleta papel + umber cálido, Cambria slides, Helvetica Neue slides, slides sin chrome corporativo, presentación tesis IMPACT-LC, conferencia universitaria, think tank. Activa también cuando el usuario rechace la estética corporativa ACCIONA (rojo/negro) y pida registro tranquilo, clásico, contemplativo. NUNCA aplicar rojo ACCIONA, color saturado o iconografía corporativa. Paleta default fondo papel #F4EFE6, texto carbón #1F1B17, acento umber cálido #8B5A2B; tipografía Cambria (display) + Helvetica Neue Light (cuerpo); líneas finas 0.5pt; espaciado generoso; máximo 30 palabras por slide. Responde en el idioma del usuario.
---

# Classical Academic Deck

## Propósito
Producir presentaciones en registro **académico-clásico** — el opuesto deliberado al template corporativo. Para conferencias universitarias, cátedras doctorales, ARCHIP, Norman Foster Institute, comités doctorales y think tanks.

## Sistema visual (no negociable)

### Paleta
| Token | HEX | Uso |
|---|---|---|
| Fondo papel | `#F4EFE6` | Background dominante |
| Texto carbón | `#1F1B17` | Cuerpo, títulos |
| Umber cálido | `#8B5A2B` | Acentos, números, separadores |
| Sepia claro | `#C9B79C` | Subrayados secundarios |
| Verde oliva tenue | `#6B7A4A` | (Reserva) vegetación |

### Tipografía
- **Display**: Cambria (regular y bold).
- **Cuerpo**: Helvetica Neue Light o humanista equivalente (Inter Light, Source Sans Light).
- **Numeración y eyebrow**: Cambria small caps con letterspacing +50.
- Tamaños mínimos: cuerpo 22 pt, título 36 pt, eyebrow 14 pt.

### Reglas de composición
1. **Una idea por slide**.
2. **Máximo 30 palabras** por slide (no cuentan citas).
3. **Líneas separadoras** finas 0.5 pt en umber.
4. **Sin sombras, sin gradientes, sin chrome corporativo, sin iconografía Material/Tabler**.
5. **Imágenes solo** si son: obras de arte canónicas, mapas históricos, diagramas a mano, fotografía de archivo, ilustración botánica.
6. **Sin logotipo de patrocinador** salvo requerimiento explícito.

## Estructura narrativa canónica
| Slide | Contenido |
|---|---|
| 1. Portada | Título + autor + afiliación + fecha + lugar |
| 2. Eyebrow | Frase corta que sitúa la pregunta |
| 3. Problema | Por qué importa este problema, ahora |
| 4–6. Estado del arte | Qué se ha hecho, qué falta |
| 7. Aporte original | Tesis declarativa única |
| 8–N. Evidencia | Casos, datos, comparaciones |
| N+1. Discusión | Confrontación con literatura |
| N+2. Implicaciones | Académicas, profesionales, regulatorias |
| Final. Thesis statement | Una sola frase, sin pie de página |

## Procedimiento

### Paso 1 — Contenido
Capítulo doctoral o paper de referencia. Audiencia, duración, idioma, si admite preguntas.

### Paso 2 — Arco narrativo antes de slides
Prosa de máximo 1 página. Validar con el autor antes de tocar PPTX.

### Paso 3 — Generación PPTX
- Plantilla con tokens del sistema visual.
- Cada slide: eyebrow · title · visual · cuerpo de 1 idea.
- Slide final con thesis statement único, sin "Gracias" decorativo.

### Paso 4 — Validación
- Legible desde 12 m (back row del aula).
- Lecturable sin presentador.
- Sin pies de página ruidosos.

## Entregables
- Archivo `.pptx` (16:9 a 1920×1080).
- (Opcional) PDF de exportación.
- Carpeta de assets con fuente citada.

## Estándar de calidad
- Imposible confundir con un deck corporativo.
- Lecturable a 12 m.
- Cada imagen citada con fuente.
- Thesis statement único e inequívoco.

## Integraciones
- `thesis-chapter-architect` (input narrativo)
- `pptx` (motor de generación)
- `image_search` (búsqueda iconográfica clásica)
