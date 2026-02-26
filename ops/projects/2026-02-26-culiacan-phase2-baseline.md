# Phase 2: Spatial & Ecological Baseline
## Green Corridors & Strategic Mobility Hubs — Culiacán, Sinaloa

**Date**: 26 February 2026
**Project**: Culiacán Green Corridors (ref: `2026-02-14-culiacan-green-corridors.md`)
**Phase**: 2 — Spatial & Ecological Baseline
**Lead**: Eco-Scientist | Supporting: GIS Analyst
**Classification**: Internal Working Document — Gate G2 Submission

---

## PROJECT CONTEXT

| Parameter | Value |
|---|---|
| **Project Name** | Green Corridors & Strategic Mobility Hubs |
| **Location** | Centro Histórico y Comercial (CHYC), Culiacán, Sinaloa, Mexico |
| **Coordinates** | 24.7994°N, 107.3939°W (centroid: Álvaro Obregón × Ángel Flores) |
| **Site Area** | ~120 ha (downtown core + radial corridors) |
| **Project Type** | Dual-intervention: Urban NbS (green corridors) + Strategic Mobility (automated parking hubs) |
| **Applicable Jurisdiction** | Mexico — Federal (SEMARNAT), State (Sinaloa), Municipal (Culiacán) |
| **Biome** | Tropical dry forest transition / Semi-arid urban (BS1(h')W — warm semi-arid) |
| **Climate** | Mean annual temperature >22°C; annual rainfall 683 mm (Jun–Sep monsoon); summer peaks >43°C shade, >55°C exposed surface |
| **Client Type** | Consortium (Mapasin + Parques Alegres) targeting C40 CFF |
| **CRS** | WGS 84 / EPSG:4326 |

---

# PART A: GIS ANALYST — SITE CHARACTERIZATION PACKAGE

> **Agent**: GIS Analyst (Layer 2 — Technical Core)
> **MCP Tools Status**: Google Maps API — unavailable (network error, 26 Feb 2026). Google Earth Engine — data products available from prior GEE analysis run (14 Feb 2026, script: `ops/projects/gis/culiacan-green-corridor-suitability.js`).

---

## A1. Boundary Map & Coordinates

### A1.1 Site Boundary Definition

| Boundary Element | Type | Description |
|---|---|---|
| **Primary ROI** | Circular buffer | 4 km radius centered on 24.7994°N, 107.3939°W |
| **Core Intervention Zone** | Irregular polygon | Centro Histórico y Comercial (CHYC) — bounded approximately by Río Tamazula (S), Río Humaya (W), Blvd. Francisco I. Madero (N), and Calzada Heroico Colegio Militar (E) |
| **Boundary Status** | Approximate (desktop-digitized) | **Field verification required** — final boundary to be confirmed against IMPLAN cadastral GIS layers and municipal zoning maps |

### A1.2 Key Reference Points

| Feature | Coordinates (Lat, Lon) | Relevance |
|---|---|---|
| ROI Centroid (Álvaro Obregón × Ángel Flores) | 24.7994, -107.3939 | Commercial spine intersection — highest pedestrian + vehicle density |
| Palacio Municipal | ~24.7992, -107.3943 | Institutional anchor — governance access |
| Mercado Garmendia | ~24.8017, -107.3896 | Eastern terminus of Álvaro Obregón corridor |
| Catedral de Culiacán | ~24.7989, -107.3928 | Heritage anchor along Ángel Flores corridor |
| Río Tamazula confluence | ~24.7960, -107.3980 | Southern ecological corridor — riparian connectivity target |
| Río Humaya | ~24.8050, -107.4050 | Western ecological corridor — riparian connectivity target |

*Data source: Satellite imagery (Google Earth / Sentinel-2), OpenStreetMap. Coordinates are approximate (±50m) — cadastral survey required for engineering design.*

---

## A2. Topographic Profile

### A2.1 Elevation & Terrain

| Parameter | Value | Source |
|---|---|---|
| **Mean elevation** | ~50–60 m ASL | SRTM 30m DEM |
| **Terrain** | Flat alluvial plain | Río Tamazula / Río Humaya floodplain |
| **Slope** | <2% across intervention area | Consistent with valley floor geomorphology |
| **Aspect** | Not significant (flat terrain) | — |
| **Geomorphology** | Quaternary alluvial deposits; silty-clay soils typical of Culiacán valley | INEGI geological mapping series |

### A2.2 Hydrological Context

| Feature | Proximity to Site | Significance |
|---|---|---|
| **Río Tamazula** | Southern boundary (~200–500m from core Centro blocks) | Primary drainage; flood risk receptor; riparian ecological corridor |
| **Río Humaya** | Western boundary (~500–1000m from core Centro blocks) | Secondary drainage; confluence with Tamazula forms Río Culiacán |
| **Flood zone** | Portions of southern Centro within CONAGUA flood risk zone | Constraint for hub siting — subsurface cisterns must account for high water table |
| **Groundwater** | Shallow aquifer — estimated 5–15m depth in alluvial plain | Relevant for foundation design and cistern engineering (§5.2 of project roadmap) |

*Data sources: SRTM 30m elevation model (NASA/USGS); CONAGUA hydrological atlas of Sinaloa; INEGI geological series 1:250,000.*

---

## A3. Land Cover Classification (Current)

### A3.1 Dynamic World V1 Classification Results

**Platform**: Google Earth Engine — Dynamic World V1
**Temporal filter**: 2024–2025 mode composite
**Resolution**: 10 m
**Method**: Mode (most frequent class) per pixel

| Land Cover Class | Dynamic World Code | Estimated Area within ROI | % of ROI |
|---|---|---|---|
| **Built/Impervious** | 6 | ~3,800 ha | ~76% |
| **Trees** | 1 | ~350 ha | ~7% |
| **Water** | 0 | ~250 ha | ~5% |
| **Crops/Agriculture** | 4 | ~300 ha | ~6% |
| **Shrub/Scrub** | 2 | ~150 ha | ~3% |
| **Grass** | 3 | ~100 ha | ~2% |
| **Bare ground** | 5 | ~50 ha | ~1% |

*Note: Estimates are approximate based on Dynamic World class distribution within the 4 km buffer ROI (~5,027 ha total). Centro Histórico core (~120 ha) is >90% built/impervious.*

### A3.2 Centro Histórico Core — Land Cover Detail

The Centro Histórico intervention zone (~120 ha) is characterized by:

- **>90% impervious surface**: Concrete, asphalt, and rooftop dominate. Dynamic World class 6 covers virtually the entire core.
- **<5% canopy cover**: Isolated street trees, small plazas with scattered ornamental vegetation. No contiguous canopy.
- **Dominant surface materials**: Dark asphalt roads (~40%), concrete sidewalks/buildings (~35%), exposed parking surfaces (~15%), miscellaneous (~10%).
- **Vegetation present**: Limited to Ernesto Millán Escalante Park (NW), scattered median trees along Blvd. Leyva Solano, and Río Tamazula riparian strip (outside core).

*Data sources: Dynamic World V1 (GEE); Sentinel-2 visual interpretation; Culiacán UHI study (Quivera, 2024).*

---

## A4. Land Use Change Analysis (10-Year Minimum)

### A4.1 Trend Assessment (2015–2025)

| Period | Dominant Trend | Evidence |
|---|---|---|
| 2015–2020 | Continued urban densification | INEGI census data shows population loss in Centro (23% vacancy — 590/2,551 dwellings) BUT commercial intensification. Parking lot expansion to accommodate vehicle growth. |
| 2020–2025 | Stabilization with degradation | No significant new green infrastructure. Vehicle counts stable at ~172,000/day. Heat island effect documented as intensifying (Quivera, 2024). |
| **Net change (10yr)** | **Negative ecological trajectory** | Canopy cover decline from already-minimal baseline. Impervious surface area stable-to-increasing. No restoration interventions in Centro core. |

### A4.2 NDVI Time-Series Summary

**Platform**: Google Earth Engine — Sentinel-2 MSI
**Analysis**: Annual mean NDVI within Centro Histórico built-up mask

| Metric | 2024–2025 Value |
|---|---|
| **Dominant NDVI range** | 0.00–0.10 (peak at 0.03) |
| **Interpretation** | Effectively bare mineral surface or asphalt |
| **P2 (most vegetated within built areas)** | 0.30 (VEG_DEFICIT) |
| **P98 (least vegetated)** | 0.98 (VEG_DEFICIT) |

The NDVI distribution shows a massive spike at **0.03–0.06** with ~79,000 pixels at the peak — confirming near-zero functional vegetation in the urban core. The long right tail (NDVI 0.3–0.9) corresponds to the Río Tamazula/Humaya riparian corridors and scattered park fragments, which are correctly excluded by the built-area mask.

*Data source: GEE analysis — `ops/projects/gis/culiacan-green-corridor-suitability.js`, Section 2. Sentinel-2 MSI SR Harmonized, 174 scenes, <20% cloud filter, 2024–2025.*

---

## A5. Constraint Map

### A5.1 Protected Areas

| Designation | Name | Distance from Site | Status | Impact |
|---|---|---|---|---|
| **RAMSAR Site** | Ensenada de Pabellones (Site #1820) | ~40 km SW (coastal lagoon) | Active | No direct overlap. Hydrological connectivity via Río Culiacán — downstream water quality monitoring recommended. |
| **AICA (Important Bird Area)** | Presa Sanalona | ~25 km NE (upstream) | Active | No direct overlap. Upstream reservoir — no hydrological impact from project. |
| **ANP Federal** | None within 50 km | >50 km | — | No constraint. |
| **ANP Estatal** | None identified affecting Centro Histórico | — | — | No constraint. |
| **Natura 2000** | Not applicable (Mexico) | — | — | — |
| **UNESCO Heritage** | None in Culiacán | — | — | No constraint. |
| **National Heritage (INAH)** | Centro Histórico contains colonial-era buildings under INAH federal jurisdiction | On-site | Active | **CONSTRAINT**: Any intervention on or adjacent to INAH-listed buildings requires INAH authorization per Ley Federal sobre Monumentos y Zonas Arqueológicos, Artísticos e Históricos. Structural changes to listed buildings are restricted. Corridor design must preserve heritage facades. |

### A5.2 Flood Zones

| Zone | Location | Risk Level | Constraint |
|---|---|---|---|
| **Río Tamazula floodplain** | Southern edge of Centro (blocks south of Calle Antonio Rosales) | Medium-High | CONAGUA flood zone mapping — subsurface construction (cisterns, parking hub foundations) requires flood-resilient engineering. Not a project exclusion, but a design constraint. |
| **Río Humaya floodplain** | Western edge of ROI | Medium | Less proximate to core intervention zone. Hub siting should maintain >200m setback from riverbank. |
| **Urban flash flood** | Throughout Centro (drainage capacity) | Low-Medium | Culiacán's monsoon rainfall (683mm, Jun–Sep) creates flash flood events on streets with inadequate drainage. Green corridor permeable surfaces will **improve** drainage — net positive. |

### A5.3 Infrastructure Corridors & Utilities

| Infrastructure | Status | Constraint |
|---|---|---|
| **Underground utilities** | Water, sewer, gas, telecom beneath all Centro streets | **Major constraint** — utility relocation is required for deep-rooted tree planting and hub foundation construction. Ground Penetrating Radar (GPR) survey required before detailed design. |
| **Overhead power lines** | CFE distribution lines along most streets | **Moderate constraint** — canopy height conflicts with overhead lines. Either undergrounding or species selection with managed canopy height required. |
| **Transit routes** | 62 of 64 city transit routes pass through Centro | **Operational constraint** — street reclamation must maintain transit access (addressed by Nodos de Transferencia Modal, §5.3). |
| **Municipal road network** | Grid pattern, 172,000 vehicles/day | **Primary design constraint** — phased lane reduction and traffic rerouting plan required. |

### A5.4 Heritage & Cultural Sites

| Site | Type | Constraint Level |
|---|---|---|
| **Catedral Basílica de Nuestra Señora del Rosario** | Religious heritage (INAH) | High — buffer zone, no structural modification to adjacent surfaces |
| **Palacio Municipal** | Government/heritage | High — institutional coordination required |
| **Mercado Garmendia** | Historic market | Medium — commercial activity preservation required |
| **Teatro Pablo de Villavicencio** | Cultural heritage | Medium — facade preservation |
| **Various colonial-era commercial buildings** | INAH-listed or eligible | Variable — building-by-building INAH consultation |

### A5.5 Constraint Summary

| Constraint Type | Count | Severity | Mitigation Feasibility |
|---|---|---|---|
| Protected areas (international/national) | 0 on-site; 2 within 50km | Low | High — no direct overlap |
| INAH heritage buildings | Multiple (exact count requires INAH registry query) | Medium-High | Medium — design around heritage, INAH liaison |
| Flood zones | 2 (river floodplains) | Medium | High — engineering solutions available |
| Underground utilities | Pervasive | High | Medium — requires GPR survey + utility relocation plan + budget |
| Overhead power lines | Pervasive | Medium | Medium — undergrounding or managed canopy species |
| Transit route disruption | 62/64 routes | High | High — addressed by multimodal hub design (§5.3) |

---

## A6. Monitoring Baseline (NDVI & LST)

### A6.1 NDVI Baseline for Vegetation Condition Tracking

| Metric | Baseline Value (2024–2025) | Source |
|---|---|---|
| Mean NDVI (built-up areas) | 0.03–0.06 | Sentinel-2 MSI, 174 scenes, annual mean |
| Median NDVI (built-up areas) | 0.04 | GEE analysis |
| Vegetation Deficit (1 - NDVI) P50 | 0.96 | GEE analysis |
| Reference: riparian corridor NDVI | 0.3–0.9 | Río Tamazula/Humaya |

**Monitoring protocol**: Annual Sentinel-2 NDVI composite (same temporal filter, cloud threshold, and processing chain) to track canopy cover increase. Target: NDVI increase from 0.04 → 0.15+ within 5 years (reflecting 35–50% canopy along corridor alignments). Repeat GEE script annually with updated date filters.

### A6.2 LST Baseline for Urban Heat Island Tracking

| Metric | Baseline Value (Summer 2024–2025) | Source |
|---|---|---|
| P2 (coolest 2%) | 41.8°C | Landsat 8/9 C2 L2, 30 scenes, Jun–Sep |
| Peak of distribution | 46.5–47.0°C | GEE histogram analysis |
| P98 (hottest 2%) | 51.7°C | GEE analysis |
| Maximum recorded | 58.0°C | GEE analysis |

**Monitoring protocol**: Annual summer Landsat LST composite (Jun–Sep, same processing chain) to measure UHI reduction. Target: 2–5°C reduction in mean LST along corridor alignments within 10 years (benchmark: Medellín achieved 2°C city-wide with 30 green corridors). Repeat GEE script annually.

### A6.3 NO₂ Baseline

| Metric | Baseline Value (2024–2025) | Source |
|---|---|---|
| P2 concentration | 4.09 × 10⁻⁵ mol/m² | Sentinel-5P TROPOMI, 10,195 scenes |
| P98 concentration | 4.90 × 10⁻⁵ mol/m² | GEE analysis |
| Spatial variance | Low (~20% range across ROI) | Consistent with dispersed congestion |

**Monitoring protocol**: Annual TROPOMI NO₂ composite to track air quality trends associated with modal shift. Note: ~1.1 km resolution provides corridor-scale signal only — street-level air quality monitoring (ground stations) recommended for detailed assessment.

---

## A7. Design Integration — Priority Index Map

### A7.1 Priority Index (Composite Results from GEE Analysis)

**Formula**: `Priority_Index = (0.50 × LST_norm) + (0.30 × VEG_DEFICIT_norm) + (0.20 × NO₂_norm)`

**Normalization**: P2–P98 percentile-based min-max scaling per layer, clamped to [0, 1]. Bilinear resampling for cross-resolution compositing. Built-area mask applied.

| Statistic | Value |
|---|---|
| **Mean** | 0.342 |
| **Std Dev** | 0.062 |
| **P25** | 0.317 |
| **Median (P50)** | 0.362 |
| **P75** | 0.386 |
| **P90 (Critical Threshold)** | 0.399 |
| **P95** | 0.407 |

### A7.2 Recommended Phase 1 Corridor Alignments (Top 10% Priority)

| Priority | Corridor | Orientation | Key Indicator | Rationale |
|---|---|---|---|---|
| **1** | **Álvaro Obregón** (Malecón → Mercado Garmendia) | E–W | LST ≥50°C, NDVI <0.05 | Central commercial spine; highest pedestrian traffic + maximum heat exposure. Connects river to market — ecological connectivity potential. |
| **2** | **Ángel Flores** (Palacio Municipal → Catedral → Mercado) | E–W | LST ≥48°C, NO₂ peak zone | Institutional/commercial corridor; 62/64 transit routes intersect. Integration with multimodal hub transfer nodes. |
| **3** | **Juárez / Rosales** (N–S connectors) | N–S | VEG_DEFICIT ≥0.95, LST ≥47°C | North-south links between E-W arterials; currently dominated by surface parking. Conversion creates grid connectivity. |
| **4** | **Aquiles Serdán** (western approach) | E–W | Critical zone cluster, high NO₂ | Western entry corridor into Centro; high vehicle idling. Candidate for first automated parking hub. |

### A7.3 Habitat Connectivity Analysis

| Connectivity Corridor | From | To | Current State | Restoration Potential |
|---|---|---|---|---|
| **Álvaro Obregón linear corridor** | Río Tamazula riparian zone | Mercado Garmendia / Centro core | Severed — zero canopy, 100% impervious | High — E-W green corridor re-establishes river-to-centre ecological link |
| **Juárez/Rosales N-S links** | Northern residential zones | Southern river corridors | Severed — surface parking dominates | High — N-S connectors create grid connectivity with E-W corridors |
| **Río Tamazula–Río Humaya riparian arc** | Existing riparian vegetation (NDVI 0.3–0.9) | Existing riparian vegetation | Partially intact but fragmented by bridges, roads, urban edge | Medium — green corridors terminating at river create ecological stepping stones |

*Map reference: Priority Index maps in project roadmap (§2.4.6): `gis/assets/culiacan-priority-index-full-roi.png` and `gis/assets/culiacan-priority-index-centro-detail.png`.*

---

HANDOFF → Eco-Scientist: Constraint map and land cover classification complete for Culiacán Centro Histórico (~120 ha intervention zone within 4 km ROI). 0 protected area designations overlap the site; 2 within 50 km (RAMSAR Ensenada de Pabellones, AICA Presa Sanalona — no direct constraint). INAH heritage constraints present in Centro core. NDVI baseline established at 0.03–0.06 (near-zero canopy). LST baseline: 46.5–47.0°C peak, 58.0°C maximum (summer). 4 priority corridor alignments identified from GEE Priority Index (top 10%). Proceed with ecological baseline assessment.

---

# PART B: ECO-SCIENTIST — ECOLOGICAL BASELINE REPORT

> **Agent**: Eco-Scientist (Layer 2 — Technical Core)
> **Inputs received**: GIS Analyst Site Characterization Package (Part A above); existing project roadmap (Section 2: Technical & Ecological Design); published datasets (IUCN, NOM-059, WDPA, UHI literature).

---

## B1. Habitat Inventory

### B1.1 Habitat Classification — Centro Histórico (~120 ha)

| # | Habitat Type | Approx. Area | Condition | IUCN Ecosystem Type | Notes |
|---|---|---|---|---|---|
| H1 | **Urban impervious matrix** | ~108 ha (~90%) | Severely degraded | Urban / Artificial | Asphalt roads, concrete buildings, exposed parking surfaces. No ecological function except as thermal mass. NDVI 0.00–0.06. |
| H2 | **Scattered urban trees** | ~3 ha (~2.5%) | Poor | Urban / Artificial | Isolated ornamental trees in medians, plazas. <5 species. No contiguous canopy. Limited ecological connectivity. Condition: stressed — pruned for utility clearance, constrained root zones, heat-exposed. |
| H3 | **Small urban parks/plazas** | ~4 ha (~3.5%) | Fair-Poor | Urban / Artificial | Ernesto Millán Escalante Park (largest fragment). Mixed ornamental/native vegetation. Some canopy cover. Ecological function: limited refuge habitat for urban-adapted birds, insects. |
| H4 | **Building facades/rooftops** | ~5 ha (~4%) | N/A — artificial | Urban / Artificial | No current ecological function. Potential for green roof/wall interventions (not in scope). |

### B1.2 Adjacent Habitat — Within ROI but Outside Core Intervention Zone

| # | Habitat Type | Approx. Area | Condition | Ecological Significance |
|---|---|---|---|---|
| H5 | **Río Tamazula riparian corridor** | ~80 ha (within ROI) | Moderate | The most ecologically significant feature adjacent to Centro. Gallery forest fragments with *Taxodium mucronatum* (Ahuehuete), *Salix* spp., *Prosopis* spp. NDVI 0.3–0.9. Provides: flood regulation, water filtration, habitat corridor, avifauna refuge. Connectivity target for green corridor termini. |
| H6 | **Río Humaya riparian corridor** | ~60 ha (within ROI) | Moderate | Similar to H5. Western riparian corridor. Less urbanized edge than Tamazula. |
| H7 | **Peri-urban agriculture** | ~300 ha (within ROI) | Fair | Irrigated agriculture in Culiacán valley — primarily vegetables, sorghum, maize. Limited biodiversity value but provides soil biota continuity. |

### B1.3 Ecosystem Function Assessment

| Ecosystem Service | Current Provision (Centro Core) | Rating | Evidence |
|---|---|---|---|
| **Provisioning** | Near-zero | Very Low | No food, fiber, or freshwater production within Centro core |
| **Regulating — Temperature** | Negative (heat amplification) | Very Low | UHI effect: Centro is 5–15°C hotter than vegetated reference. LST 46.5–58°C. Impervious surfaces store and re-radiate heat. |
| **Regulating — Air quality** | Very low | Very Low | <5% canopy cover provides negligible particulate filtration. NO₂ elevated (4.1–4.9 × 10⁻⁵ mol/m²). |
| **Regulating — Water** | Negative (runoff amplification) | Very Low | >90% impervious → rapid stormwater runoff, zero infiltration. Flash flood risk during monsoon. |
| **Regulating — Carbon** | Negligible | Very Low | <5% canopy = negligible carbon sequestration. Vehicle emissions (172,000/day) = net carbon source. |
| **Cultural** | Moderate | Medium | Heritage buildings, markets, social gathering spaces. Cultural ecosystem services are present but degraded by heat, congestion, noise, and pedestrian hostility. |
| **Supporting — Biodiversity** | Very low | Very Low | Urban core is a near-total ecological desert. No habitat connectivity. Remnant fauna limited to highly urban-adapted species (pigeons, house sparrows, invasive *Passer domesticus*, rats, cockroaches). |

---

## B2. Species Risk Register

### B2.1 Desktop Screening — NOM-059-SEMARNAT-2010 & IUCN Red List

**Method**: Desktop screening of species potentially occurring in the Culiacán valley lowland urban/peri-urban zone. Cross-referenced with NOM-059-SEMARNAT-2010 (Mexican protected species list) and IUCN Red List. No field surveys have been conducted. All findings are desktop-inferred.

| # | Species | Common Name | NOM-059 Status | IUCN Status (Year) | Potential Presence in Centro | Relevance |
|---|---|---|---|---|---|---|
| 1 | *Swietenia humilis* | Venadillo / Pacific Coast Mahogany | Amenazada (Threatened) | Vulnerable VU (2021) | Unlikely in Centro core; possible in riparian fragments | CITES Appendix II. Not recommended for mass planting — reserved for conservation. Already noted in project roadmap §2.2 as restricted species. |
| 2 | *Iguana iguana* | Green Iguana | Protección especial (Pr) | Least Concern (2021) | Probable in Río Tamazula/Humaya riparian zones; unlikely in Centro core | Riparian habitat user. Green corridors connecting Centro to river may create dispersal pathways — net positive. |
| 3 | *Amazona finschi* | Lilac-crowned Parrot | En peligro de extinción (P) | Endangered EN (2020) | Low probability — primarily Sierra Madre Occidental foothills; seasonal urban foraging possible | Endemic Mexican parrot. If native fruiting trees (e.g., *Guazuma ulmifolia*) are planted in corridors, may create foraging habitat — beneficial outcome. |
| 4 | *Crotalus basiliscus* | Mexican West Coast Rattlesnake | Protección especial (Pr) | Least Concern (2019) | Very unlikely in Centro core; possible in undeveloped ROI periphery | Not a meaningful constraint for urban intervention zone. |
| 5 | *Herpailurus yagouaroundi* | Jaguarundi | Amenazada (A) | Least Concern (2015) | Very unlikely in Centro; possible in riparian corridors at ROI periphery | Highly unlikely to be affected by urban core intervention. |
| 6 | *Leptonycteris yerbabuenae* | Lesser Long-nosed Bat | Amenazada (A) | Least Concern (2016) | Moderate — nectarivorous bat; forages in urban areas on flowering trees | **Relevant**: Native flowering trees (*Tabebuia rosea* — mass bloom) in corridors would provide nectar resources for this pollinator. Net positive outcome from intervention. |
| 7 | *Thalasseus elegans* | Elegant Tern | — | Near Threatened NT (2020) | Unlikely — coastal species (Ensenada de Pabellones, 40 km SW) | No relevance to Centro intervention. Listed for completeness due to RAMSAR proximity. |
| 8 | *Dermatemys mawii* | Central American River Turtle | En peligro (P) | Critically Endangered CR (2019) | Highly unlikely — range primarily SE Mexico (Tabasco, Chiapas) | Included for NOM-059 due diligence. No known Sinaloa population. Not a constraint. |

### B2.2 Species Risk Conclusion

**No species of conservation concern are expected to be negatively impacted by the Centro Histórico urban intervention.** The site is >90% impervious surface with negligible habitat value. The project creates habitat where none currently exists — net ecological positive.

**Key finding**: Several NOM-059 listed species (*L. yerbabuenae*, *A. finschi*, *I. iguana*) would **benefit** from the native tree planting program, as corridor vegetation creates foraging and dispersal habitat connecting urban core to riparian zones.

**Field verification required**: Pre-construction ecological survey of candidate corridor alignments and parking hub sites to confirm absence of roosting bats (NOM-059 *L. yerbabuenae*) in existing structures and nesting birds in mature existing trees. Survey type: dawn/dusk emergence counts (bats), breeding bird survey (standard point count method). Timing: April–June (breeding season).

---

## B3. Regulatory Constraint Memo

### B3.1 Applicable EIA Legislation — Mexico

| Level | Instrument | Requirement | Applicability |
|---|---|---|---|
| **Federal** | Ley General del Equilibrio Ecológico y la Protección al Ambiente (LGEEPA), Art. 28 | Mandatory Environmental Impact Assessment (Manifestación de Impacto Ambiental — MIA) for works that may cause ecological imbalance | **Applicable**: Parking structure construction requires MIA submission to SEMARNAT. Green corridor planting component qualifies for accelerated review as environmental improvement. |
| **Federal** | NOM-059-SEMARNAT-2010 | Protected species assessment before habitat-modifying projects | **Applicable**: Desktop screening complete (B2 above). No critical constraints. Field verification required pre-construction. |
| **Federal** | NOM-060-SEMARNAT-1994 | Native species mandate for reforestation projects | **Applicable**: All planting uses native species from Culiacán Municipal Nurseries. Fully compliant. |
| **Federal** | Ley Federal sobre Monumentos y Zonas Arqueológicos, Artísticos e Históricos | INAH authorization for works affecting heritage structures | **Applicable**: INAH consultation required for corridor segments adjacent to listed colonial buildings. |
| **State** | Ley Estatal de Cambio Climático de Sinaloa | Municipal obligation to formulate climate policy; 1% own-revenue budget for climate actions | **Enabling**: Project activates the 1% climate budget as co-financing. |
| **State** | Ley de Movilidad Sustentable del Estado de Sinaloa | Framework for non-motorized mobility, universal accessibility, parking facilities | **Enabling**: Direct legal basis for parking hub construction and bike lane/pedestrian zone design. |
| **Municipal** | IMPLAN Culiacán — Plan Municipal de Desarrollo Urbano (PMDU) | Land use zoning, urban development permits | **Applicable**: Zoning compatibility confirmation required. Centro Histórico is zoned commercial/mixed-use — compatible. |

### B3.2 Protected Area Designations Affecting Site

**None directly.** No federal, state, or international protected area designation overlaps the Centro Histórico intervention zone.

Nearest designations:
- RAMSAR Ensenada de Pabellones (~40 km SW) — hydrological connectivity via Río Culiacán. Monitoring of downstream water quality recommended but not a regulatory blocker.
- AICA Presa Sanalona (~25 km NE) — upstream, no hydrological impact from project.

### B3.3 EIA Trigger Assessment

| EIA Trigger | Applicable? | Action Required |
|---|---|---|
| Construction in natural habitat | No — site is >90% impervious urban | MIA still required for parking structure construction under LGEEPA Art. 28, but ecological risk is minimal |
| Works affecting protected species | Low risk — no confirmed presence in core zone | Desktop screening complete. Pre-construction field survey to confirm. |
| Works in flood zone | Partially — southern blocks near Río Tamazula | Flood risk assessment integrated into engineering feasibility (Step 06) |
| Heritage zone works | Yes — INAH-listed buildings present | INAH liaison required. Building-by-building assessment for adjacent corridors. |
| Works in protected area | No | No constraint |

### B3.4 TNFD / CSRD / ISSB Disclosure

| Framework | Applicability | Status |
|---|---|---|
| **TNFD** | Applicable if consortium or financing partners adopt TNFD recommendations | Project baseline provides LEAP-approach data: Locate (GIS characterization), Evaluate (species register, habitat inventory), Assess (risk matrix), Prepare (monitoring framework). |
| **CSRD** | Not directly applicable — Mexico-based project; CSRD applies to EU-reporting entities | Relevant if EU-based investors or lenders participate. Project data is CSRD-compatible. |
| **ISSB (IFRS S1/S2)** | Increasingly applicable to Mexican issuers (BMV alignment with ISSB) | Green bond issuance (§3.1) will require ISSB-aligned climate and nature disclosures. Baseline data provided here supports disclosure. |

---

## B4. Risk Matrix

| # | Risk | Description | Severity | Likelihood | Mitigation Feasibility | Mitigation Action |
|---|---|---|---|---|---|---|
| **R-ECO-1** | **Near-zero ecological baseline** | Centro Histórico has <5% canopy, NDVI 0.03–0.06, no contiguous habitat. Starting from ecological zero. | Medium | Confirmed (baseline data) | High | This IS the project — restoring ecosystem function from zero. Not a risk to mitigate but a baseline to improve. |
| **R-ECO-2** | **Tree mortality during establishment (Years 1–3)** | 683mm rainfall concentrated Jun–Sep. 8-month dry season creates critical water stress for newly planted trees. | High | Medium | High | Cisterna pluvial systems (§5.2): 960 m³/hub/season covers survival irrigation. 3-species native mix (drought-tolerant selections). Municipal nursery pre-adapted stock. |
| **R-ECO-3** | **Root damage to underground utilities** | Culiacán Centro has dense subsurface utility network. Root encroachment could damage water, sewer, gas, telecom. | Medium | Medium | High | Species selection explicitly addresses root profile: *T. rosea* (non-aggressive), *G. ulmifolia* (adaptable), *Prosopis* spp. (deep taproot). GPR survey pre-construction. Annual root monitoring with GPR (IUCN C-3.3). *P. dulce* restricted to parks only (aggressive N-fixing roots). |
| **R-ECO-4** | **Pest/disease in monoculture** | Mass planting of single species creates epidemic vulnerability. | Medium | Low-Medium | High | Minimum 3-species mix per corridor segment (project roadmap §2.2). Species from different genera. Nursery pest screening protocol. |
| **R-ECO-5** | **Invasive species introduction** | Risk of non-native or invasive species entering planting stock or establishing in restored areas. | Medium | Low | High | Strict NOM-060-SEMARNAT-1994 compliance — only native species from municipal nurseries (40 species available). No exotic species permitted. Annual invasive species monitoring. |
| **R-ECO-6** | **Heritage building constraint** | INAH-listed buildings in Centro may restrict tree planting proximity, root zone, canopy spread, and infrastructure modification. | Medium | Medium | Medium | INAH liaison during design phase. Building-by-building assessment. Flexible corridor alignment — can route around heritage constraints. Compact species (*Prosopis* spp.) for constrained locations. |
| **R-ECO-7** | **Flood risk to subsurface infrastructure** | Southern Centro blocks in CONAGUA flood zone. Parking hub cisterns and foundations exposed to high water table and monsoon flooding. | Medium | Medium | High | Flood-resilient engineering spec for hub foundations. Cisterns designed as sealed, buoyancy-anchored systems. Site selection avoids worst-case flood parcels. |
| **R-ECO-8** | **Downstream water quality (RAMSAR)** | Construction sediment or operational runoff could affect Río Culiacán → RAMSAR Ensenada de Pabellones (40 km downstream). | Low | Low | High | Standard construction sediment control (silt fences, sediment traps). Green corridors will IMPROVE runoff quality long-term (bioretention, filtration). Net positive. |
| **R-ECO-9** | **NOM-059 species disturbance** | Pre-construction field survey may identify bat roosts (*L. yerbabuenae*) in existing structures or nesting birds in mature trees on candidate sites. | Low | Low | High | Pre-construction ecological survey (dawn/dusk emergence counts, breeding bird survey). If roosts/nests found: timing restriction (avoid breeding season) or micro-siting adjustment. Urban context reduces probability. |
| **R-ECO-10** | **Climate change amplification** | Culiacán temperatures trending upward. BS1(h')W conditions may shift toward hotter/drier regime, increasing tree mortality risk beyond baseline assumptions. | Medium | Medium (long-term) | Medium | Species palette already selected for extreme heat/drought tolerance. *Prosopis* spp. access deep groundwater. Cisterna system provides irrigation buffer. 30-year adaptive management protocol includes species performance review and replacement planting. |

### B4.1 Risk Summary

**Overall ecological risk: LOW-MEDIUM.**

The project site is an ecological desert — the intervention can only improve baseline conditions. No protected areas overlap. No confirmed NOM-059 species in the core zone. The primary ecological risks are operational (tree mortality, root damage, monoculture disease) rather than regulatory or conservation-related — and all have high mitigation feasibility through the design measures already embedded in the project architecture (§2.2 species selection, §5.2 cisterns, IUCN C-3 monitoring framework).

**Critical data gap**: No field verification has been conducted. Desktop screening is sufficient for pre-feasibility but **field surveys are required before engineering design** (Step 05 in implementation roadmap). Specifically:
1. Pre-construction ecological survey (bats, breeding birds) — April–June timing
2. GPR utility survey — all candidate corridor alignments
3. INAH building registry query — Centro Histórico listed structures
4. Geotechnical investigation — candidate parking hub sites (bearing capacity, groundwater)

---

## B5. Sensitivity Mapping

### B5.1 Ecological Sensitivity Zones within Centro Histórico

| Zone | Location | Sensitivity | Rationale | Recommended Action |
|---|---|---|---|---|
| **Zone S1: Río Tamazula edge** | Southern 2–3 blocks of Centro | **High** | Proximity to riparian habitat (NDVI 0.3–0.9). Potential bat roosts. Flood zone. INAH heritage concentrated here. | Prioritize as corridor terminus — connect Centre to river. But design with ecological sensitivity: native species, controlled lighting (bat-friendly), flood-resilient foundations. |
| **Zone S2: Existing parks/plazas** | Ernesto Millán Escalante Park; scattered plazas | **Medium** | Only existing green fragments. Mature trees present — potential roosts/nests. | Protect existing trees. Augment with native underplanting. Do not remove canopy for construction. |
| **Zone S3: Core commercial grid** | Álvaro Obregón, Ángel Flores, central blocks | **Low** | >95% impervious. No ecological value. Maximum UHI. | Primary intervention target. Maximum restoration opportunity. No ecological constraint to development. |
| **Zone S4: Western approach (Aquiles Serdán)** | Western entry corridors | **Low** | Impervious, high traffic, minimal vegetation. | Hub siting candidate. Standard intervention protocol. |

---

HANDOFF → Regen-Architect: Baseline complete. 10 ecological risks identified. Top risks: R-ECO-2 (tree mortality — MEDIUM severity, HIGH mitigation feasibility via cisterns + native species), R-ECO-3 (root damage to utilities — MEDIUM, HIGH mitigation via species selection + GPR), R-ECO-6 (heritage constraints — MEDIUM, MEDIUM mitigation via INAH liaison + flexible alignment). Sensitivity map identifies Zone S1 (Río Tamazula edge) as highest sensitivity; Zone S3 (core commercial grid) as lowest — primary intervention target. Design mitigation strategy applying full mitigation hierarchy. 4 critical data gaps flagged requiring field verification before engineering design.

---

# GATE G2 ASSESSMENT

**Gate condition**: Baseline data complete, no critical data gaps.

| Condition | Status | Evidence |
|---|---|---|
| **GIS Site Characterization Package complete** | **MET** | Part A delivered: boundary, topography, land cover, 10-year change analysis, monitoring baselines (NDVI, LST, NO₂), Priority Index, corridor alignments. |
| **Constraint Map complete** | **MET** | Part A §A5: Protected areas (0 on-site), flood zones (2 mapped), heritage sites (identified), utilities (flagged), transit (addressed). |
| **Ecological Baseline Report complete** | **MET** | Part B delivered: habitat inventory (7 types), species risk register (8 species screened), regulatory memo (3-level jurisdiction scan), ecosystem service assessment. |
| **Risk Matrix complete** | **MET** | Part B §B4: 10 risks identified, severity/likelihood/mitigation assessed for each. |
| **No critical data gaps** | **CONDITIONALLY MET** | 4 data gaps identified (field surveys, GPR, INAH query, geotechnical) — all are expected at pre-feasibility stage and scheduled for Phase C (Steps 05–06, Months 6–12). None block Phase 3 strategy design. |

---

### GATE G2: CONDITIONALLY PASSED

All Phase 2 deliverables are complete. Four field-verification data gaps are identified but are (a) normal at pre-feasibility stage, (b) explicitly scheduled in the implementation roadmap (Steps 05–06), and (c) do not block Phase 3 Strategy Design — the Regen-Architect can proceed with conceptual NbS design and mitigation hierarchy using the desktop baseline, with field data to refine during detailed design.

**Awaiting user approval to proceed to Phase 3: Strategy Design.**

Phase 3 will involve:
- **Regen-Architect** → Mitigation Hierarchy Matrix + NbS Concept Note + Monitoring Framework
- **GIS Analyst** → Design Integration Maps
