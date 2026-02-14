// ============================================================================
// ESW — Ecosystem Services World
// Green Corridors & Strategic Mobility Hubs — Culiacán, Sinaloa
// GIS Multi-Criteria Suitability Analysis for Street-Level Intervention
//
// Platform:   Google Earth Engine (JavaScript API)
// Analyst:    GIS Senior Specialist, ESW
// Date:       2026-02-14
// Project:    ops/projects/2026-02-14-culiacan-green-corridors.md (Section 2.1)
// Purpose:    Identify priority streets for parking-to-green-infrastructure
//             conversion using 4-layer composite suitability index.
//
// Layers:
//   L1 — Urban Heat Island (LST)          → Landsat 8/9 Collection 2 Level 2
//   L2 — Vegetation Deficit (1 - NDVI)    → Sentinel-2 MSI
//   L3 — Vehicular NO2 Pollution          → Sentinel-5P TROPOMI
//   L4 — Impervious Surface Mask          → Dynamic World V1
//
// Weights:  LST 50% | NDVI Deficit 30% | NO2 20%
// Output:   Priority_Index (0–1) — higher = more urgent intervention
// ============================================================================


// ---------------------------------------------------------------------------
// 0. REGION OF INTEREST (ROI)
// ---------------------------------------------------------------------------
// Centro Histórico y Comercial (CHYC) de Culiacán, Sinaloa
// Centered on the intersection of Álvaro Obregón and Ángel Flores
// 4 km buffer captures the full downtown core + radial corridors (~120 ha intervention area)

var culiacanCenter = ee.Geometry.Point([-107.3939, 24.7994]);
var roi = culiacanCenter.buffer(4000); // 4 km radius

Map.centerObject(roi, 14);
Map.setOptions('SATELLITE');


// ---------------------------------------------------------------------------
// 1. LAYER 1 — URBAN HEAT ISLAND (LST) — Landsat 8/9 Collection 2 Level 2
// ---------------------------------------------------------------------------
// Landsat C2 L2 stores Surface Temperature in Band ST_B10 as scaled integers.
// Scale factor: 0.00341802, Offset: 149.0 → converts to Kelvin.
// We filter June–September (Culiacán summer: >43°C shade, 55°C exposed surface)
// for 2024–2025 to capture peak UHI conditions.

// Cloud mask function for Landsat C2 L2 using QA_PIXEL band
function maskLandsatClouds(image) {
  var qa = image.select('QA_PIXEL');
  // Bits 3 (cloud) and 4 (cloud shadow) should be 0
  var cloudBit = 1 << 3;
  var shadowBit = 1 << 4;
  var mask = qa.bitwiseAnd(cloudBit).eq(0)
    .and(qa.bitwiseAnd(shadowBit).eq(0));
  return image.updateMask(mask);
}

// Compute LST in Celsius from ST_B10
function computeLST(image) {
  var lstKelvin = image.select('ST_B10')
    .multiply(0.00341802)
    .add(149.0);
  var lstCelsius = lstKelvin.subtract(273.15);
  return lstCelsius.rename('LST_C');
}

// Landsat 8 summer composites
var l8Summer = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(roi)
  .filter(ee.Filter.calendarRange(6, 9, 'month'))   // June–September
  .filter(ee.Filter.calendarRange(2024, 2025, 'year'))
  .map(maskLandsatClouds)
  .map(computeLST);

// Landsat 9 summer composites
var l9Summer = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
  .filterBounds(roi)
  .filter(ee.Filter.calendarRange(6, 9, 'month'))
  .filter(ee.Filter.calendarRange(2024, 2025, 'year'))
  .map(maskLandsatClouds)
  .map(computeLST);

// Merge and compute mean LST
var lstCollection = l8Summer.merge(l9Summer);
var lstMean = lstCollection.mean().clip(roi);

print('L1 — LST: Scene count (Landsat 8+9, Jun-Sep 2024-2025):', lstCollection.size());

// Visualization
var lstVis = {
  min: 30,
  max: 55,
  palette: [
    '1a0a3e', '461078', '721f81', '9e2f7f', 'cd4071', 'f1605d',
    'f99848', 'fccd25', 'f7f7b6'  // 'inferno' approximation
  ]
};

Map.addLayer(lstMean, lstVis, 'L1 — LST Summer Mean (°C)', true);


// ---------------------------------------------------------------------------
// 2. LAYER 2 — VEGETATION DEFICIT (Inverse NDVI) — Sentinel-2 MSI
// ---------------------------------------------------------------------------
// NDVI = (B8 - B4) / (B8 + B4)
// We want the DEFICIT: areas with LOW NDVI (impervious, bare soil, concrete)
// Inverted: Vegetation_Deficit = 1 - NDVI
// High values = less vegetation = higher priority for greening

// Cloud mask for Sentinel-2 using SCL band (Scene Classification Layer)
function maskS2Clouds(image) {
  var scl = image.select('SCL');
  // Keep only vegetation (4), bare soil (5), water (6) — mask clouds (8,9,10), shadow (3)
  var mask = scl.neq(3)   // cloud shadow
    .and(scl.neq(8))      // cloud medium probability
    .and(scl.neq(9))      // cloud high probability
    .and(scl.neq(10))     // thin cirrus
    .and(scl.neq(11));    // snow/ice
  return image.updateMask(mask);
}

function computeNDVI(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  return ndvi;
}

var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(roi)
  .filter(ee.Filter.calendarRange(2024, 2025, 'year'))
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .map(maskS2Clouds)
  .map(computeNDVI);

var ndviMean = s2.mean().clip(roi);
var vegDeficit = ndviMean.multiply(-1).add(1).rename('VEG_DEFICIT'); // 1 - NDVI

print('L2 — NDVI: Scene count (Sentinel-2, 2024-2025):', s2.size());

// NDVI visualization (natural: green = vegetated)
var ndviVis = {
  min: -0.1,
  max: 0.8,
  palette: [
    '440154', '482878', '3e4989', '31688e', '26828e', '1f9e89',
    '35b779', '6ece58', 'b5de2b', 'fde725'  // 'viridis'
  ]
};

// Vegetation deficit visualization (red = no vegetation)
var deficitVis = {
  min: 0.2,
  max: 1.0,
  palette: ['2b8c3e', '8cc63f', 'f7f739', 'f5a623', 'e8471c', 'b5000c']
};

Map.addLayer(ndviMean, ndviVis, 'L2a — NDVI Annual Mean', false);
Map.addLayer(vegDeficit, deficitVis, 'L2b — Vegetation Deficit (1-NDVI)', true);


// ---------------------------------------------------------------------------
// 3. LAYER 3 — VEHICULAR NO2 POLLUTION — Sentinel-5P TROPOMI
// ---------------------------------------------------------------------------
// Tropospheric NO2 column density (mol/m²) as proxy for traffic intensity.
// High NO2 zones = high vehicle idling/congestion = priority for modal shift.
// Resolution: ~1113m — coarser than other layers but captures corridor-scale patterns.

var no2 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .filterBounds(roi)
  .filter(ee.Filter.calendarRange(2024, 2025, 'year'))
  .select('tropospheric_NO2_column_number_density');

var no2Mean = no2.mean().clip(roi).rename('NO2');

print('L3 — NO2: Scene count (TROPOMI, 2024-2025):', no2.size());

var no2Vis = {
  min: 0.00003,
  max: 0.00012,
  palette: ['0d0887', '5b02a3', '9a179b', 'cb4678', 'eb7852', 'fbb32f', 'f0f921']
};

Map.addLayer(no2Mean, no2Vis, 'L3 — NO2 Tropospheric Column Density', true);


// ---------------------------------------------------------------------------
// 4. LAYER 4 — IMPERVIOUS SURFACE MASK — Dynamic World V1
// ---------------------------------------------------------------------------
// Dynamic World provides per-pixel land use classification at 10m resolution.
// Class 6 = "built" area. We use this as a MASK: only analyze built/impervious
// surfaces — exclude rivers (Tamazula, Humaya), existing parks, agriculture.
// This ensures the Priority Index targets streets, lots, and buildings only.

var dwCollection = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filterBounds(roi)
  .filter(ee.Filter.calendarRange(2024, 2025, 'year'))
  .select('label');

// Mode (most frequent class) composite for stable classification
var dwMode = dwCollection.mode().clip(roi);

// Built area = class 6 in Dynamic World
var builtMask = dwMode.eq(6);

// Also include class 7 (crops) as secondary — some surface lots are classified as bare/crops
var imperviousMask = dwMode.eq(6).or(dwMode.eq(7));

// Visualization: built areas highlighted
var builtVis = {palette: ['000000', 'ff4444'], min: 0, max: 1};
Map.addLayer(builtMask.selfMask(), builtVis, 'L4 — Built Area Mask (Dynamic World)', false);


// ---------------------------------------------------------------------------
// 5. MULTI-CRITERIA SUITABILITY ANALYSIS — Priority Index
// ---------------------------------------------------------------------------
// Normalize all layers to 0–1 range using min-max scaling within the ROI.
// Then apply weighted overlay:
//   Priority_Index = (0.50 × LST_norm) + (0.30 × VegDeficit_norm) + (0.20 × NO2_norm)
//
// Apply built-area mask: only compute index for impervious surfaces.

// --- 5a. Compute min/max for normalization ---

// Helper: get percentile-based min/max to exclude outliers (2nd and 98th percentiles)
function getPercentiles(image, bandName, geometry) {
  var stats = image.reduceRegion({
    reducer: ee.Reducer.percentile([2, 98]),
    geometry: geometry,
    scale: 30,
    maxPixels: 1e9,
    bestEffort: true
  });
  return stats;
}

// LST normalization
var lstStats = getPercentiles(lstMean, 'LST_C', roi);
var lstP2 = ee.Number(lstStats.get('LST_C_p2'));
var lstP98 = ee.Number(lstStats.get('LST_C_p98'));
var lstNorm = lstMean.subtract(lstP2).divide(lstP98.subtract(lstP2)).clamp(0, 1)
  .rename('LST_norm');

// Vegetation Deficit normalization
var defStats = getPercentiles(vegDeficit, 'VEG_DEFICIT', roi);
var defP2 = ee.Number(defStats.get('VEG_DEFICIT_p2'));
var defP98 = ee.Number(defStats.get('VEG_DEFICIT_p98'));
var defNorm = vegDeficit.subtract(defP2).divide(defP98.subtract(defP2)).clamp(0, 1)
  .rename('DEFICIT_norm');

// NO2 normalization
var no2Stats = getPercentiles(no2Mean, 'NO2', roi);
var no2P2 = ee.Number(no2Stats.get('NO2_p2'));
var no2P98 = ee.Number(no2Stats.get('NO2_p98'));
var no2Norm = no2Mean.subtract(no2P2).divide(no2P98.subtract(no2P2)).clamp(0, 1)
  .rename('NO2_norm');

// Print normalization ranges for QA
print('--- Normalization Ranges (P2–P98) ---');
print('LST (°C):', lstP2, '–', lstP98);
print('Veg Deficit:', defP2, '–', defP98);
print('NO2 (mol/m²):', no2P2, '–', no2P98);

// --- 5b. Resample to common resolution ---
// LST is 30m (Landsat), NDVI is 10m (Sentinel-2), NO2 is ~1113m (TROPOMI)
// Resample all to 10m (Sentinel-2 native) using bilinear interpolation
// then apply the built mask at 10m resolution

var lstResampled = lstNorm
  .resample('bilinear')
  .reproject({crs: 'EPSG:4326', scale: 10});

var no2Resampled = no2Norm
  .resample('bilinear')
  .reproject({crs: 'EPSG:4326', scale: 10});

// --- 5c. Weighted composite ---
var weights = {
  lst: 0.50,    // Heat is the #1 killer in Culiacán (43–55°C summer)
  deficit: 0.30, // Vegetation deficit = opportunity for canopy
  no2: 0.20     // Traffic/congestion proxy for modal shift priority
};

var priorityIndex = lstResampled.multiply(weights.lst)
  .add(defNorm.multiply(weights.deficit))
  .add(no2Resampled.multiply(weights.no2))
  .rename('Priority_Index');

// Apply built-area mask — only analyze impervious surfaces
var priorityMasked = priorityIndex.updateMask(builtMask);

// --- 5d. Visualization ---
var priorityVis = {
  min: 0.2,
  max: 0.9,
  palette: [
    '1a1a2e',  // Low priority: dark blue-gray
    '16213e',
    '0f3460',
    '533483',
    'e94560',  // High priority: intense red
    'ff1744',  // Critical: vivid red
    'ff0000'   // Maximum urgency
  ]
};

Map.addLayer(priorityMasked, priorityVis, '★ PRIORITY INDEX — Intervention Urgency', true);

// Add ROI boundary for reference
var roiOutline = ee.Image().byte().paint({
  featureCollection: ee.FeatureCollection([ee.Feature(roi)]),
  color: 1,
  width: 2
});
Map.addLayer(roiOutline, {palette: '00ff9d'}, 'ROI — 4km Buffer', true);


// ---------------------------------------------------------------------------
// 6. HISTOGRAMS — Console Output
// ---------------------------------------------------------------------------

// LST Histogram
var lstHistogram = ui.Chart.image.histogram({
  image: lstMean,
  region: roi,
  scale: 30,
  maxPixels: 1e9,
  maxBuckets: 50
}).setOptions({
  title: 'L1 — Land Surface Temperature Distribution (°C) — Culiacán Centro, Summer 2024–2025',
  hAxis: {title: 'LST (°C)', viewWindow: {min: 25, max: 60}},
  vAxis: {title: 'Pixel Count'},
  colors: ['#e94560'],
  legend: {position: 'none'}
});

print(lstHistogram);

// NDVI Histogram
var ndviHistogram = ui.Chart.image.histogram({
  image: ndviMean,
  region: roi,
  scale: 10,
  maxPixels: 1e9,
  maxBuckets: 50
}).setOptions({
  title: 'L2 — NDVI Distribution — Culiacán Centro, Annual Mean 2024–2025',
  hAxis: {title: 'NDVI', viewWindow: {min: -0.2, max: 1.0}},
  vAxis: {title: 'Pixel Count'},
  colors: ['#1f9e89'],
  legend: {position: 'none'}
});

print(ndviHistogram);

// Priority Index Histogram (built areas only)
var priorityHistogram = ui.Chart.image.histogram({
  image: priorityMasked,
  region: roi,
  scale: 10,
  maxPixels: 1e9,
  maxBuckets: 50
}).setOptions({
  title: '★ Priority Index Distribution — Built Areas Only',
  hAxis: {title: 'Priority Index (0 = Low, 1 = Critical)', viewWindow: {min: 0, max: 1}},
  vAxis: {title: 'Pixel Count'},
  colors: ['#ff1744'],
  legend: {position: 'none'}
});

print(priorityHistogram);


// ---------------------------------------------------------------------------
// 7. SUMMARY STATISTICS — Console Output
// ---------------------------------------------------------------------------

var priorityStats = priorityMasked.reduceRegion({
  reducer: ee.Reducer.mean()
    .combine(ee.Reducer.stdDev(), '', true)
    .combine(ee.Reducer.percentile([25, 50, 75, 90, 95]), '', true),
  geometry: roi,
  scale: 10,
  maxPixels: 1e9,
  bestEffort: true
});

print('--- Priority Index Statistics (Built Areas) ---');
print(priorityStats);


// ---------------------------------------------------------------------------
// 8. CRITICAL ZONES EXTRACTION — Top 10% Urgency
// ---------------------------------------------------------------------------
// Identify pixels in the top 10% of the Priority Index as "critical intervention zones"
// These represent the hottest, most vegetation-deficient, highest-traffic impervious
// surfaces — the optimal locations for parking-to-green-corridor conversion.

var p90 = priorityMasked.reduceRegion({
  reducer: ee.Reducer.percentile([90]),
  geometry: roi,
  scale: 10,
  maxPixels: 1e9,
  bestEffort: true
});

var threshold90 = ee.Number(p90.get('Priority_Index_p90'));
print('Critical Zone Threshold (P90):', threshold90);

var criticalZones = priorityMasked.gte(threshold90).selfMask();

Map.addLayer(criticalZones, {palette: ['ff0000'], opacity: 0.7},
  '★★ CRITICAL ZONES — Top 10% Priority', true);


// ---------------------------------------------------------------------------
// 9. EXPORT — GeoTIFF for QGIS/ArcGIS Post-Processing
// ---------------------------------------------------------------------------
// Export the Priority Index as a GeoTIFF for further analysis:
// - Street-level overlay with municipal cadastre
// - Integration with IMPLAN mobility data (172,000 vehicles/day)
// - Parking lot identification and capacity estimation
// - Corridor alignment design in CAD/BIM

Export.image.toDrive({
  image: priorityMasked,
  description: 'Culiacan_Priority_Index_10m',
  folder: 'ESW_Culiacan_GreenCorridors',
  region: roi,
  scale: 10,
  crs: 'EPSG:4326',
  maxPixels: 1e10,
  fileFormat: 'GeoTIFF'
});

// Export critical zones as vector (for overlay on street maps)
var criticalVector = criticalZones.reduceToVectors({
  geometry: roi,
  scale: 10,
  maxPixels: 1e10,
  geometryType: 'polygon',
  eightConnected: true,
  bestEffort: true
});

Export.table.toDrive({
  collection: criticalVector,
  description: 'Culiacan_Critical_Zones_Vector',
  folder: 'ESW_Culiacan_GreenCorridors',
  fileFormat: 'SHP'
});


// ---------------------------------------------------------------------------
// 10. LEGEND (UI Panel)
// ---------------------------------------------------------------------------

var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    backgroundColor: 'rgba(0,0,0,0.85)'
  }
});

legend.add(ui.Label({
  value: 'ESW — Green Corridor Priority Index',
  style: {fontWeight: 'bold', fontSize: '14px', color: '#00ff9d', margin: '0 0 6px 0'}
}));

legend.add(ui.Label({
  value: 'Weights: LST 50% | Veg Deficit 30% | NO₂ 20%',
  style: {fontSize: '11px', color: '#aaaaaa', margin: '0 0 8px 0'}
}));

var legendColors = ['1a1a2e', '0f3460', '533483', 'e94560', 'ff1744', 'ff0000'];
var legendLabels = ['Low', '', 'Medium', '', 'High', 'Critical'];

for (var i = 0; i < legendColors.length; i++) {
  var row = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {margin: '2px 0'}
  });
  row.add(ui.Label({
    value: '',
    style: {
      backgroundColor: '#' + legendColors[i],
      padding: '8px 16px',
      margin: '0 8px 0 0'
    }
  }));
  if (legendLabels[i] !== '') {
    row.add(ui.Label({
      value: legendLabels[i],
      style: {color: '#ffffff', fontSize: '11px', margin: '2px 0'}
    }));
  }
  legend.add(row);
}

Map.add(legend);

print('============================================================');
print('ESW — Culiacán Green Corridor Suitability Analysis Complete');
print('Layers loaded. Run exports from Tasks panel.');
print('============================================================');
