/**
 * I-24 Corridor (Nashville, TN) — Geospatial & Socioeconomic Data
 *
 * Data layers for environmental and socioeconomic impact assessment
 * along the Interstate 24 corridor through Nashville metropolitan area.
 *
 * Sources: US Census Bureau (ACS 2023), EPA EJScreen, FEMA NFHL,
 * TDEC, Nashville Open Data Portal, USGS NHD, NLCD 2021
 */

// I-24 corridor centerline through Nashville (simplified polyline)
export const I24_ROUTE = [
  [36.0560, -86.9720], // SW entry — Murfreesboro Rd area
  [36.0720, -86.9380],
  [36.0890, -86.8950],
  [36.1050, -86.8620],
  [36.1180, -86.8310], // Harding Place
  [36.1320, -86.8050],
  [36.1440, -86.7870], // I-440 junction
  [36.1560, -86.7750],
  [36.1620, -86.7680], // Downtown approach
  [36.1680, -86.7620], // James Robertson Pkwy
  [36.1740, -86.7550], // I-24/I-65 merge
  [36.1830, -86.7430],
  [36.1950, -86.7280], // Shelby Ave
  [36.2080, -86.7100],
  [36.2200, -86.6920], // Exit toward Briley Pkwy
  [36.2350, -86.6700],
  [36.2480, -86.6500],
  [36.2600, -86.6280], // NE exit toward Stones River
]

// Major interchanges along I-24
export const INTERCHANGES = [
  { name: 'I-24 / SR-255 (Harding Place)', coords: [36.1180, -86.8310], type: 'diamond' },
  { name: 'I-24 / I-440', coords: [36.1440, -86.7870], type: 'system' },
  { name: 'I-24 / I-40 West', coords: [36.1560, -86.7750], type: 'system' },
  { name: 'I-24 / I-65 (Downtown)', coords: [36.1740, -86.7550], type: 'system' },
  { name: 'I-24 / Shelby Ave', coords: [36.1950, -86.7280], type: 'diamond' },
  { name: 'I-24 / Briley Pkwy', coords: [36.2200, -86.6920], type: 'system' },
]

// Census tract-level socioeconomic data (ACS 2023 estimates)
export const CENSUS_TRACTS = [
  {
    id: 'CT-47037-0131',
    name: 'Antioch North',
    center: [36.0620, -86.9500],
    bounds: [[36.0480, -86.9700], [36.0760, -86.9300]],
    population: 8420,
    medianIncome: 42150,
    povertyRate: 22.3,
    unemploymentRate: 7.8,
    noHealthInsurance: 18.4,
    renterOccupied: 68.2,
    nonWhitePct: 72.1,
    linguisticIsolation: 14.6,
    educationBelowHS: 21.3,
    vehicleAccess: 88.4,
    ejScreenIndex: 82,
  },
  {
    id: 'CT-47037-0132',
    name: 'Antioch South',
    center: [36.0780, -86.9200],
    bounds: [[36.0640, -86.9400], [36.0920, -86.8960]],
    population: 6890,
    medianIncome: 38900,
    povertyRate: 26.1,
    unemploymentRate: 9.2,
    noHealthInsurance: 22.1,
    renterOccupied: 74.5,
    nonWhitePct: 78.4,
    linguisticIsolation: 18.9,
    educationBelowHS: 25.7,
    vehicleAccess: 82.1,
    ejScreenIndex: 89,
  },
  {
    id: 'CT-47037-0140',
    name: 'Haywood Lane',
    center: [36.0950, -86.8800],
    bounds: [[36.0830, -86.9000], [36.1070, -86.8600]],
    population: 5630,
    medianIncome: 45600,
    povertyRate: 18.7,
    unemploymentRate: 6.4,
    noHealthInsurance: 14.2,
    renterOccupied: 58.3,
    nonWhitePct: 61.8,
    linguisticIsolation: 11.2,
    educationBelowHS: 16.4,
    vehicleAccess: 91.3,
    ejScreenIndex: 68,
  },
  {
    id: 'CT-47037-0145',
    name: 'Harding Place',
    center: [36.1180, -86.8300],
    bounds: [[36.1060, -86.8500], [36.1300, -86.8100]],
    population: 7210,
    medianIncome: 51200,
    povertyRate: 15.4,
    unemploymentRate: 5.1,
    noHealthInsurance: 11.8,
    renterOccupied: 52.7,
    nonWhitePct: 54.3,
    linguisticIsolation: 8.7,
    educationBelowHS: 12.1,
    vehicleAccess: 93.8,
    ejScreenIndex: 55,
  },
  {
    id: 'CT-47037-0155',
    name: 'Woodbine / Radnor',
    center: [36.1400, -86.7900],
    bounds: [[36.1280, -86.8100], [36.1520, -86.7700]],
    population: 9340,
    medianIncome: 39800,
    povertyRate: 24.8,
    unemploymentRate: 8.3,
    noHealthInsurance: 20.6,
    renterOccupied: 71.9,
    nonWhitePct: 69.7,
    linguisticIsolation: 16.3,
    educationBelowHS: 23.8,
    vehicleAccess: 86.2,
    ejScreenIndex: 84,
  },
  {
    id: 'CT-47037-0160',
    name: 'South Nashville / Wedgewood-Houston',
    center: [36.1560, -86.7750],
    bounds: [[36.1440, -86.7950], [36.1680, -86.7550]],
    population: 6120,
    medianIncome: 47300,
    povertyRate: 19.2,
    unemploymentRate: 6.8,
    noHealthInsurance: 13.5,
    renterOccupied: 63.4,
    nonWhitePct: 58.2,
    linguisticIsolation: 10.4,
    educationBelowHS: 14.9,
    vehicleAccess: 89.7,
    ejScreenIndex: 71,
  },
  {
    id: 'CT-47037-0170',
    name: 'Downtown / SoBro',
    center: [36.1680, -86.7620],
    bounds: [[36.1580, -86.7780], [36.1780, -86.7460]],
    population: 4850,
    medianIncome: 72400,
    povertyRate: 11.2,
    unemploymentRate: 3.4,
    noHealthInsurance: 7.1,
    renterOccupied: 81.3,
    nonWhitePct: 38.6,
    linguisticIsolation: 4.2,
    educationBelowHS: 5.8,
    vehicleAccess: 78.4,
    ejScreenIndex: 32,
  },
  {
    id: 'CT-47037-0175',
    name: 'East Nashville / Shelby',
    center: [36.1950, -86.7280],
    bounds: [[36.1830, -86.7480], [36.2070, -86.7080]],
    population: 7680,
    medianIncome: 55800,
    povertyRate: 14.6,
    unemploymentRate: 5.5,
    noHealthInsurance: 10.3,
    renterOccupied: 48.6,
    nonWhitePct: 45.2,
    linguisticIsolation: 6.1,
    educationBelowHS: 9.4,
    vehicleAccess: 92.1,
    ejScreenIndex: 48,
  },
  {
    id: 'CT-47037-0185',
    name: 'Old Hickory / Hermitage',
    center: [36.2200, -86.6920],
    bounds: [[36.2080, -86.7120], [36.2320, -86.6720]],
    population: 8950,
    medianIncome: 58400,
    povertyRate: 12.8,
    unemploymentRate: 4.7,
    noHealthInsurance: 9.6,
    renterOccupied: 42.1,
    nonWhitePct: 36.8,
    linguisticIsolation: 5.3,
    educationBelowHS: 8.2,
    vehicleAccess: 95.6,
    ejScreenIndex: 38,
  },
  {
    id: 'CT-47037-0195',
    name: 'Stones River',
    center: [36.2480, -86.6500],
    bounds: [[36.2350, -86.6700], [36.2610, -86.6300]],
    population: 6340,
    medianIncome: 62100,
    povertyRate: 10.4,
    unemploymentRate: 4.1,
    noHealthInsurance: 8.2,
    renterOccupied: 38.7,
    nonWhitePct: 31.2,
    linguisticIsolation: 3.8,
    educationBelowHS: 6.9,
    vehicleAccess: 96.8,
    ejScreenIndex: 28,
  },
]

// Environmental data layers

// Green spaces & parks near I-24
export const GREEN_SPACES = [
  { name: 'Radnor Lake State Park', center: [36.0630, -86.8100], area_ha: 520, type: 'state-park', ndvi: 0.82 },
  { name: 'Seven Oaks Park', center: [36.0880, -86.9100], area_ha: 12, type: 'municipal', ndvi: 0.71 },
  { name: 'Harding Place Greenway', center: [36.1180, -86.8200], area_ha: 8, type: 'greenway', ndvi: 0.65 },
  { name: 'Fort Negley Park', center: [36.1480, -86.7820], area_ha: 25, type: 'historic', ndvi: 0.74 },
  { name: 'Sevier Park', center: [36.1290, -86.7680], area_ha: 6, type: 'municipal', ndvi: 0.68 },
  { name: 'Cumberland Park', center: [36.1640, -86.7700], area_ha: 3, type: 'municipal', ndvi: 0.58 },
  { name: 'Shelby Park & Bottoms', center: [36.1900, -86.7350], area_ha: 128, type: 'municipal', ndvi: 0.76 },
  { name: 'Stones River Greenway', center: [36.2150, -86.6850], area_ha: 45, type: 'greenway', ndvi: 0.73 },
  { name: 'Two Rivers Park', center: [36.2080, -86.6500], area_ha: 162, type: 'municipal', ndvi: 0.77 },
  { name: 'Long Hunter State Park', center: [36.0890, -86.5420], area_ha: 1120, type: 'state-park', ndvi: 0.84 },
]

// Waterways and hydrological features
export const WATERWAYS = [
  {
    name: 'Cumberland River',
    type: 'river',
    path: [
      [36.1450, -86.8400], [36.1550, -86.8100], [36.1620, -86.7800],
      [36.1700, -86.7650], [36.1750, -86.7500], [36.1820, -86.7350],
      [36.1900, -86.7200], [36.2000, -86.7000], [36.2100, -86.6800],
      [36.2200, -86.6600], [36.2350, -86.6400],
    ],
    bufferWidth: 100,
    waterQualityIndex: 62, // EPA WQI (0-100)
    impaired303d: true,
    pollutants: ['E. coli', 'Nutrients', 'Siltation'],
  },
  {
    name: 'Mill Creek',
    type: 'creek',
    path: [
      [36.0550, -86.9600], [36.0700, -86.9300], [36.0850, -86.9000],
      [36.1000, -86.8700], [36.1150, -86.8400], [36.1300, -86.8150],
      [36.1450, -86.8000], [36.1580, -86.7850],
    ],
    bufferWidth: 30,
    waterQualityIndex: 48,
    impaired303d: true,
    pollutants: ['E. coli', 'Habitat Alteration', 'Siltation', 'Nutrients'],
  },
  {
    name: 'Stones River',
    type: 'river',
    path: [
      [36.2300, -86.6300], [36.2250, -86.6450], [36.2200, -86.6600],
      [36.2150, -86.6750], [36.2100, -86.6880],
    ],
    bufferWidth: 60,
    waterQualityIndex: 58,
    impaired303d: true,
    pollutants: ['E. coli', 'Low DO', 'Siltation'],
  },
]

// FEMA flood zones along the corridor
export const FLOOD_ZONES = [
  {
    id: 'FZ-001',
    zone: 'AE',
    label: 'Mill Creek 100-yr Floodplain',
    bounds: [[36.0600, -86.9550], [36.1400, -86.8000]],
    riskLevel: 'high',
    properties: 112,
    estimatedDamageUSD: 24500000,
  },
  {
    id: 'FZ-002',
    zone: 'AE',
    label: 'Cumberland River 100-yr Floodplain',
    bounds: [[36.1550, -86.7900], [36.2250, -86.6600]],
    riskLevel: 'high',
    properties: 340,
    estimatedDamageUSD: 89000000,
  },
  {
    id: 'FZ-003',
    zone: 'X500',
    label: 'Mill Creek 500-yr Floodplain',
    bounds: [[36.0550, -86.9650], [36.1450, -86.7900]],
    riskLevel: 'moderate',
    properties: 285,
    estimatedDamageUSD: 41000000,
  },
]

// Air quality monitoring stations
export const AIR_QUALITY = [
  {
    id: 'AQS-470370023',
    name: 'Harding Place Station',
    coords: [36.1180, -86.8350],
    pm25: 11.8,   // µg/m³ annual mean
    pm10: 22.4,
    no2: 18.6,    // ppb annual mean
    ozone: 0.068, // ppm 4th max 8hr
    coExceedanceDays: 0,
    aqiCategory: 'Moderate',
    nearRoadway: true,
  },
  {
    id: 'AQS-470370040',
    name: 'Downtown Nashville',
    coords: [36.1660, -86.7780],
    pm25: 10.2,
    pm10: 19.8,
    no2: 22.4,
    ozone: 0.064,
    coExceedanceDays: 2,
    aqiCategory: 'Moderate',
    nearRoadway: true,
  },
  {
    id: 'AQS-470370052',
    name: 'Hermitage Station',
    coords: [36.2180, -86.6900],
    pm25: 8.6,
    pm10: 16.2,
    no2: 12.1,
    ozone: 0.071,
    coExceedanceDays: 0,
    aqiCategory: 'Good',
    nearRoadway: false,
  },
]

// Noise impact zones (FHWA TNM model estimates)
export const NOISE_ZONES = [
  { label: '>75 dBA Leq', buffer_m: 50, color: '#dc2626', description: 'Severe — exceeds FHWA NAC Category B' },
  { label: '70-75 dBA Leq', buffer_m: 100, color: '#f97316', description: 'High — approaches NAC threshold' },
  { label: '65-70 dBA Leq', buffer_m: 200, color: '#eab308', description: 'Moderate — perceptible highway noise' },
  { label: '60-65 dBA Leq', buffer_m: 400, color: '#84cc16', description: 'Low — background urban noise' },
]

// Tree canopy coverage by segment
export const TREE_CANOPY = [
  { segment: 'Antioch (SW)', center: [36.0650, -86.9500], coveragePct: 34.2, changeSince2010: -8.1, imperviousPct: 48.3 },
  { segment: 'Haywood Lane', center: [36.0950, -86.8800], coveragePct: 28.7, changeSince2010: -12.4, imperviousPct: 56.1 },
  { segment: 'Harding Place', center: [36.1180, -86.8300], coveragePct: 31.5, changeSince2010: -6.3, imperviousPct: 51.8 },
  { segment: 'Woodbine / Radnor', center: [36.1400, -86.7900], coveragePct: 26.1, changeSince2010: -14.8, imperviousPct: 59.4 },
  { segment: 'Downtown', center: [36.1650, -86.7680], coveragePct: 12.8, changeSince2010: -3.2, imperviousPct: 82.6 },
  { segment: 'East Nashville', center: [36.1950, -86.7280], coveragePct: 38.4, changeSince2010: -5.7, imperviousPct: 44.2 },
  { segment: 'Old Hickory', center: [36.2200, -86.6920], coveragePct: 42.1, changeSince2010: -4.3, imperviousPct: 38.6 },
  { segment: 'Stones River', center: [36.2480, -86.6500], coveragePct: 51.3, changeSince2010: -2.1, imperviousPct: 28.7 },
]

// Transit access points (WeGo Public Transit)
export const TRANSIT_STOPS = [
  { name: 'Murfreesboro Pike / Bell Rd', coords: [36.0720, -86.9380], routes: ['56'], ridership: 420, sheltered: false },
  { name: 'Murfreesboro Pike / Haywood Ln', coords: [36.0890, -86.8950], routes: ['56'], ridership: 380, sheltered: true },
  { name: 'Harding Place / Nolensville Pike', coords: [36.1180, -86.8310], routes: ['52', '56'], ridership: 610, sheltered: true },
  { name: 'Woodbine Transit Hub', coords: [36.1400, -86.7900], routes: ['4', '52', '56'], ridership: 890, sheltered: true },
  { name: 'WeGo Central (Downtown)', coords: [36.1660, -86.7780], routes: ['ALL'], ridership: 4200, sheltered: true },
  { name: 'Shelby Ave / S 5th St', coords: [36.1650, -86.7620], routes: ['56', '26'], ridership: 320, sheltered: false },
  { name: 'Gallatin Pike / Briley Pkwy', coords: [36.2200, -86.6920], routes: ['26'], ridership: 280, sheltered: true },
]

// Environmental Justice composite scoring
export const EJ_INDICATORS = {
  title: 'Environmental Justice Screening (EPA EJScreen methodology)',
  description: 'Composite index combining environmental burden + demographic vulnerability',
  methodology: 'EJ Index = Environmental Indicator × Demographic Index',
  environmentalIndicators: [
    'PM2.5 exposure',
    'Ozone exposure',
    'Diesel PM exposure',
    'Traffic proximity',
    'Lead paint indicator',
    'Superfund proximity',
    'RMP facility proximity',
    'Wastewater discharge',
  ],
  demographicFactors: [
    'Minority population %',
    'Low-income population %',
    'Linguistic isolation %',
    'Less than high school education %',
    'Under 5 years old %',
    'Over 64 years old %',
  ],
}

// Land use composition along 1-km buffer from I-24
export const LAND_USE = [
  { type: 'Residential', pct: 38.2, color: '#fbbf24' },
  { type: 'Commercial', pct: 22.1, color: '#60a5fa' },
  { type: 'Industrial', pct: 11.4, color: '#a78bfa' },
  { type: 'Transportation', pct: 14.8, color: '#94a3b8' },
  { type: 'Green Space / Parks', pct: 8.3, color: '#34d399' },
  { type: 'Water', pct: 2.1, color: '#38bdf8' },
  { type: 'Vacant / Undeveloped', pct: 3.1, color: '#d4d4d4' },
]

// Corridor-wide summary statistics
export const CORRIDOR_SUMMARY = {
  totalLengthKm: 28.4,
  totalLengthMi: 17.6,
  avgDailyTraffic: 165000,
  peakHourVolume: 12800,
  avgSpeedPeakMph: 28,
  avgSpeedOffPeakMph: 62,
  accidentsPerYear: 2840,
  fatalitiesPerYear: 18,
  populationWithin1km: 142600,
  medianIncomeWithin1km: 48900,
  povertyRateWithin1km: 18.2,
  treeCoverWithin1km: 31.4,
  imperviousSurfaceWithin1km: 51.2,
  greenSpaceAccessPct: 42.8,
  floodRiskProperties: 737,
  section303dWaterways: 3,
  ejHighBurdenTracts: 4,
}

// Color scales for data visualization
export const COLOR_SCALES = {
  income: [
    { min: 0, max: 40000, color: '#dc2626', label: '< $40K' },
    { min: 40000, max: 50000, color: '#f97316', label: '$40K–$50K' },
    { min: 50000, max: 60000, color: '#eab308', label: '$50K–$60K' },
    { min: 60000, max: 75000, color: '#84cc16', label: '$60K–$75K' },
    { min: 75000, max: Infinity, color: '#22c55e', label: '> $75K' },
  ],
  poverty: [
    { min: 0, max: 10, color: '#22c55e', label: '< 10%' },
    { min: 10, max: 15, color: '#84cc16', label: '10–15%' },
    { min: 15, max: 20, color: '#eab308', label: '15–20%' },
    { min: 20, max: 25, color: '#f97316', label: '20–25%' },
    { min: 25, max: 100, color: '#dc2626', label: '> 25%' },
  ],
  ejScreen: [
    { min: 0, max: 30, color: '#22c55e', label: 'Low burden' },
    { min: 30, max: 50, color: '#84cc16', label: 'Below average' },
    { min: 50, max: 70, color: '#eab308', label: 'Above average' },
    { min: 70, max: 85, color: '#f97316', label: 'High burden' },
    { min: 85, max: 100, color: '#dc2626', label: 'Very high burden' },
  ],
  ndvi: [
    { min: 0, max: 0.3, color: '#dc2626', label: 'Bare / Built' },
    { min: 0.3, max: 0.5, color: '#f97316', label: 'Sparse veg.' },
    { min: 0.5, max: 0.65, color: '#eab308', label: 'Moderate veg.' },
    { min: 0.65, max: 0.8, color: '#84cc16', label: 'Dense veg.' },
    { min: 0.8, max: 1.0, color: '#22c55e', label: 'Very dense veg.' },
  ],
  airQuality: [
    { min: 0, max: 50, color: '#22c55e', label: 'Good' },
    { min: 50, max: 100, color: '#eab308', label: 'Moderate' },
    { min: 100, max: 150, color: '#f97316', label: 'USG' },
    { min: 150, max: 200, color: '#dc2626', label: 'Unhealthy' },
  ],
}
