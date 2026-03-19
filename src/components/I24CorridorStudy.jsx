import React, { useState, useMemo, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Polyline, CircleMarker, Rectangle, Popup, Tooltip, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {
  I24_ROUTE, INTERCHANGES, CENSUS_TRACTS, GREEN_SPACES,
  WATERWAYS, FLOOD_ZONES, AIR_QUALITY, NOISE_ZONES,
  TREE_CANOPY, TRANSIT_STOPS, LAND_USE, CORRIDOR_SUMMARY,
  COLOR_SCALES, EJ_INDICATORS,
} from '../data/i24-corridor'

// ------------------------------------------------------------------
// Layer definitions
// ------------------------------------------------------------------
const LAYER_GROUPS = [
  {
    group: 'Socioeconomic',
    layers: [
      { id: 'income', label: 'Median Income', icon: '$' },
      { id: 'poverty', label: 'Poverty Rate', icon: '%' },
      { id: 'ejscreen', label: 'EJ Screen Index', icon: '!' },
      { id: 'transit', label: 'Transit Access', icon: 'T' },
    ],
  },
  {
    group: 'Environmental',
    layers: [
      { id: 'greenspace', label: 'Green Spaces & NDVI', icon: 'G' },
      { id: 'waterways', label: 'Waterways & Quality', icon: 'W' },
      { id: 'flood', label: 'Flood Zones (FEMA)', icon: 'F' },
      { id: 'airquality', label: 'Air Quality', icon: 'A' },
      { id: 'treecanopy', label: 'Tree Canopy', icon: 'C' },
      { id: 'noise', label: 'Noise Impact', icon: 'N' },
    ],
  },
  {
    group: 'Infrastructure',
    layers: [
      { id: 'corridor', label: 'I-24 Corridor', icon: 'I' },
      { id: 'landuse', label: 'Land Use', icon: 'L' },
    ],
  },
]

// ------------------------------------------------------------------
// Utilities
// ------------------------------------------------------------------
function getColor(value, scale) {
  for (const s of scale) {
    if (value >= s.min && value < s.max) return s.color
  }
  return '#94a3b8'
}

function formatNumber(n) {
  return n.toLocaleString('en-US')
}

function formatCurrency(n) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`
  return `$${n}`
}

// ------------------------------------------------------------------
// Map fit helper
// ------------------------------------------------------------------
function FitBounds({ bounds }) {
  const map = useMap()
  useEffect(() => {
    if (bounds) map.fitBounds(bounds, { padding: [30, 30] })
  }, [bounds, map])
  return null
}

// ------------------------------------------------------------------
// Sub-components: Map layers
// ------------------------------------------------------------------

function CorridorLayer() {
  return (
    <>
      <Polyline positions={I24_ROUTE} pathOptions={{ color: '#0A1628', weight: 4, opacity: 0.9 }} />
      {INTERCHANGES.map((ix) => (
        <CircleMarker
          key={ix.name}
          center={ix.coords}
          radius={ix.type === 'system' ? 7 : 5}
          pathOptions={{
            color: '#0A1628',
            fillColor: ix.type === 'system' ? '#f97316' : '#eab308',
            fillOpacity: 0.9,
            weight: 2,
          }}
        >
          <Tooltip direction="top" offset={[0, -8]}>{ix.name}</Tooltip>
        </CircleMarker>
      ))}
    </>
  )
}

function IncomeLayer() {
  return CENSUS_TRACTS.map((ct) => (
    <Rectangle
      key={ct.id}
      bounds={ct.bounds}
      pathOptions={{
        color: getColor(ct.medianIncome, COLOR_SCALES.income),
        fillColor: getColor(ct.medianIncome, COLOR_SCALES.income),
        fillOpacity: 0.35,
        weight: 2,
      }}
    >
      <Popup>
        <div className="text-xs leading-relaxed">
          <p className="font-semibold text-sm mb-1">{ct.name}</p>
          <p>Median Income: <strong>${formatNumber(ct.medianIncome)}</strong></p>
          <p>Population: {formatNumber(ct.population)}</p>
          <p>Renter-occupied: {ct.renterOccupied}%</p>
          <p>Non-white: {ct.nonWhitePct}%</p>
        </div>
      </Popup>
    </Rectangle>
  ))
}

function PovertyLayer() {
  return CENSUS_TRACTS.map((ct) => (
    <Rectangle
      key={ct.id}
      bounds={ct.bounds}
      pathOptions={{
        color: getColor(ct.povertyRate, COLOR_SCALES.poverty),
        fillColor: getColor(ct.povertyRate, COLOR_SCALES.poverty),
        fillOpacity: 0.35,
        weight: 2,
      }}
    >
      <Popup>
        <div className="text-xs leading-relaxed">
          <p className="font-semibold text-sm mb-1">{ct.name}</p>
          <p>Poverty Rate: <strong>{ct.povertyRate}%</strong></p>
          <p>Unemployment: {ct.unemploymentRate}%</p>
          <p>No Health Ins.: {ct.noHealthInsurance}%</p>
          <p>Education &lt; HS: {ct.educationBelowHS}%</p>
        </div>
      </Popup>
    </Rectangle>
  ))
}

function EJScreenLayer() {
  return CENSUS_TRACTS.map((ct) => (
    <Rectangle
      key={ct.id}
      bounds={ct.bounds}
      pathOptions={{
        color: getColor(ct.ejScreenIndex, COLOR_SCALES.ejScreen),
        fillColor: getColor(ct.ejScreenIndex, COLOR_SCALES.ejScreen),
        fillOpacity: 0.4,
        weight: 2,
      }}
    >
      <Popup>
        <div className="text-xs leading-relaxed">
          <p className="font-semibold text-sm mb-1">{ct.name}</p>
          <p>EJ Screen Index: <strong>{ct.ejScreenIndex}/100</strong></p>
          <p>Minority Pop.: {ct.nonWhitePct}%</p>
          <p>Linguistic Isolation: {ct.linguisticIsolation}%</p>
          <p>Poverty Rate: {ct.povertyRate}%</p>
        </div>
      </Popup>
    </Rectangle>
  ))
}

function TransitLayer() {
  return TRANSIT_STOPS.map((ts) => (
    <CircleMarker
      key={ts.name}
      center={ts.coords}
      radius={Math.max(4, Math.sqrt(ts.ridership) / 4)}
      pathOptions={{
        color: '#3b82f6',
        fillColor: ts.sheltered ? '#3b82f6' : '#93c5fd',
        fillOpacity: 0.7,
        weight: 2,
      }}
    >
      <Popup>
        <div className="text-xs leading-relaxed">
          <p className="font-semibold text-sm mb-1">{ts.name}</p>
          <p>Routes: {ts.routes.join(', ')}</p>
          <p>Daily Ridership: ~{formatNumber(ts.ridership)}</p>
          <p>Shelter: {ts.sheltered ? 'Yes' : 'No'}</p>
        </div>
      </Popup>
    </CircleMarker>
  ))
}

function GreenSpaceLayer() {
  return GREEN_SPACES.map((gs) => (
    <CircleMarker
      key={gs.name}
      center={gs.center}
      radius={Math.max(5, Math.sqrt(gs.area_ha) / 1.5)}
      pathOptions={{
        color: getColor(gs.ndvi, COLOR_SCALES.ndvi),
        fillColor: getColor(gs.ndvi, COLOR_SCALES.ndvi),
        fillOpacity: 0.5,
        weight: 2,
      }}
    >
      <Popup>
        <div className="text-xs leading-relaxed">
          <p className="font-semibold text-sm mb-1">{gs.name}</p>
          <p>Type: {gs.type}</p>
          <p>Area: {gs.area_ha} ha</p>
          <p>NDVI: {gs.ndvi}</p>
        </div>
      </Popup>
    </CircleMarker>
  ))
}

function WaterwaysLayer() {
  return WATERWAYS.map((w) => (
    <Polyline
      key={w.name}
      positions={w.path}
      pathOptions={{
        color: w.impaired303d ? '#f97316' : '#3b82f6',
        weight: w.type === 'river' ? 4 : 2,
        opacity: 0.8,
        dashArray: w.impaired303d ? '8 4' : undefined,
      }}
    >
      <Popup>
        <div className="text-xs leading-relaxed">
          <p className="font-semibold text-sm mb-1">{w.name}</p>
          <p>Water Quality Index: <strong>{w.waterQualityIndex}/100</strong></p>
          <p>303(d) Impaired: {w.impaired303d ? 'Yes' : 'No'}</p>
          {w.pollutants.length > 0 && (
            <p>Pollutants: {w.pollutants.join(', ')}</p>
          )}
        </div>
      </Popup>
    </Polyline>
  ))
}

function FloodLayer() {
  return FLOOD_ZONES.map((fz) => (
    <Rectangle
      key={fz.id}
      bounds={fz.bounds}
      pathOptions={{
        color: fz.riskLevel === 'high' ? '#dc2626' : '#f97316',
        fillColor: fz.riskLevel === 'high' ? '#dc2626' : '#f97316',
        fillOpacity: 0.18,
        weight: 2,
        dashArray: fz.zone === 'X500' ? '6 4' : undefined,
      }}
    >
      <Popup>
        <div className="text-xs leading-relaxed">
          <p className="font-semibold text-sm mb-1">{fz.label}</p>
          <p>FEMA Zone: {fz.zone}</p>
          <p>Risk: {fz.riskLevel}</p>
          <p>Properties Affected: {formatNumber(fz.properties)}</p>
          <p>Est. Damage: {formatCurrency(fz.estimatedDamageUSD)}</p>
        </div>
      </Popup>
    </Rectangle>
  ))
}

function AirQualityLayer() {
  return AIR_QUALITY.map((aq) => (
    <CircleMarker
      key={aq.id}
      center={aq.coords}
      radius={12}
      pathOptions={{
        color: aq.aqiCategory === 'Good' ? '#22c55e' : '#eab308',
        fillColor: aq.aqiCategory === 'Good' ? '#22c55e' : '#eab308',
        fillOpacity: 0.5,
        weight: 2,
      }}
    >
      <Popup>
        <div className="text-xs leading-relaxed">
          <p className="font-semibold text-sm mb-1">{aq.name}</p>
          <p>PM2.5: {aq.pm25} µg/m³</p>
          <p>NO₂: {aq.no2} ppb</p>
          <p>O₃: {aq.ozone} ppm (8hr max)</p>
          <p>AQI Category: {aq.aqiCategory}</p>
          <p>Near Roadway: {aq.nearRoadway ? 'Yes' : 'No'}</p>
        </div>
      </Popup>
    </CircleMarker>
  ))
}

function TreeCanopyLayer() {
  return TREE_CANOPY.map((tc) => (
    <CircleMarker
      key={tc.segment}
      center={tc.center}
      radius={10}
      pathOptions={{
        color: tc.coveragePct > 35 ? '#22c55e' : tc.coveragePct > 25 ? '#eab308' : '#dc2626',
        fillColor: tc.coveragePct > 35 ? '#22c55e' : tc.coveragePct > 25 ? '#eab308' : '#dc2626',
        fillOpacity: 0.5,
        weight: 2,
      }}
    >
      <Popup>
        <div className="text-xs leading-relaxed">
          <p className="font-semibold text-sm mb-1">{tc.segment}</p>
          <p>Tree Cover: <strong>{tc.coveragePct}%</strong></p>
          <p>Change since 2010: <span className="text-red-600">{tc.changeSince2010}%</span></p>
          <p>Impervious Surface: {tc.imperviousPct}%</p>
        </div>
      </Popup>
    </CircleMarker>
  ))
}

function NoiseLayer() {
  // Simplified noise buffer visualization along route midpoint
  const midpoint = I24_ROUTE[Math.floor(I24_ROUTE.length / 2)]
  return NOISE_ZONES.map((nz) => (
    <CircleMarker
      key={nz.label}
      center={midpoint}
      radius={nz.buffer_m / 12}
      pathOptions={{
        color: nz.color,
        fillColor: nz.color,
        fillOpacity: 0.12,
        weight: 1,
      }}
    >
      <Tooltip permanent={false}>{nz.label} — {nz.description}</Tooltip>
    </CircleMarker>
  ))
}

// ------------------------------------------------------------------
// Legend component
// ------------------------------------------------------------------
function Legend({ activeLayer }) {
  const scales = {
    income: COLOR_SCALES.income,
    poverty: COLOR_SCALES.poverty,
    ejscreen: COLOR_SCALES.ejScreen,
    greenspace: COLOR_SCALES.ndvi,
    airquality: COLOR_SCALES.airQuality,
  }

  const scale = scales[activeLayer]
  if (!scale) return null

  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-white border border-sovereign-silver p-3 text-xs">
      <p className="font-semibold text-sovereign-ink mb-2 uppercase tracking-wider text-label">Legend</p>
      {scale.map((s) => (
        <div key={s.label} className="flex items-center gap-2 mb-1">
          <span className="w-3 h-3 inline-block" style={{ backgroundColor: s.color }} />
          <span className="text-sovereign-graphite">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

// ------------------------------------------------------------------
// Sidebar panel: Corridor statistics
// ------------------------------------------------------------------
function StatPanel({ activeLayer }) {
  const cs = CORRIDOR_SUMMARY
  return (
    <div className="space-y-6">
      {/* Corridor overview */}
      <div>
        <h3 className="text-label uppercase tracking-wider text-sovereign-graphite mb-3">Corridor Overview</h3>
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Length" value={`${cs.totalLengthMi} mi`} />
          <Stat label="Avg. Daily Traffic" value={formatNumber(cs.avgDailyTraffic)} />
          <Stat label="Pop. within 1 km" value={formatNumber(cs.populationWithin1km)} />
          <Stat label="Median Income" value={formatCurrency(cs.medianIncomeWithin1km)} />
          <Stat label="Poverty Rate" value={`${cs.povertyRateWithin1km}%`} />
          <Stat label="Tree Cover" value={`${cs.treeCoverWithin1km}%`} />
        </div>
      </div>

      {/* Layer-specific details */}
      {activeLayer === 'income' && (
        <div>
          <h3 className="text-label uppercase tracking-wider text-sovereign-graphite mb-3">Income Distribution</h3>
          {CENSUS_TRACTS.map((ct) => (
            <div key={ct.id} className="flex justify-between py-1 border-b border-sovereign-ash text-xs">
              <span className="text-sovereign-graphite">{ct.name}</span>
              <span className="font-mono font-semibold">${formatNumber(ct.medianIncome)}</span>
            </div>
          ))}
        </div>
      )}

      {activeLayer === 'poverty' && (
        <div>
          <h3 className="text-label uppercase tracking-wider text-sovereign-graphite mb-3">Poverty & Vulnerability</h3>
          {CENSUS_TRACTS.sort((a, b) => b.povertyRate - a.povertyRate).map((ct) => (
            <div key={ct.id} className="flex justify-between py-1 border-b border-sovereign-ash text-xs">
              <span className="text-sovereign-graphite">{ct.name}</span>
              <span className={`font-mono font-semibold ${ct.povertyRate > 20 ? 'text-red-600' : ''}`}>
                {ct.povertyRate}%
              </span>
            </div>
          ))}
        </div>
      )}

      {activeLayer === 'ejscreen' && (
        <div>
          <h3 className="text-label uppercase tracking-wider text-sovereign-graphite mb-3">Environmental Justice</h3>
          <p className="text-xs text-sovereign-graphite mb-3">{EJ_INDICATORS.description}</p>
          {CENSUS_TRACTS.sort((a, b) => b.ejScreenIndex - a.ejScreenIndex).map((ct) => (
            <div key={ct.id} className="flex justify-between py-1 border-b border-sovereign-ash text-xs">
              <span className="text-sovereign-graphite">{ct.name}</span>
              <span className={`font-mono font-semibold ${ct.ejScreenIndex > 70 ? 'text-red-600' : ''}`}>
                {ct.ejScreenIndex}/100
              </span>
            </div>
          ))}
        </div>
      )}

      {activeLayer === 'greenspace' && (
        <div>
          <h3 className="text-label uppercase tracking-wider text-sovereign-graphite mb-3">Green Infrastructure</h3>
          {GREEN_SPACES.map((gs) => (
            <div key={gs.name} className="flex justify-between py-1 border-b border-sovereign-ash text-xs">
              <span className="text-sovereign-graphite">{gs.name}</span>
              <span className="font-mono">{gs.area_ha} ha · NDVI {gs.ndvi}</span>
            </div>
          ))}
        </div>
      )}

      {activeLayer === 'waterways' && (
        <div>
          <h3 className="text-label uppercase tracking-wider text-sovereign-graphite mb-3">Water Quality</h3>
          {WATERWAYS.map((w) => (
            <div key={w.name} className="py-2 border-b border-sovereign-ash text-xs">
              <p className="font-semibold text-sovereign-ink">{w.name}</p>
              <p className="text-sovereign-graphite">WQI: {w.waterQualityIndex}/100 · {w.impaired303d ? '303(d) Impaired' : 'Not impaired'}</p>
              {w.pollutants.length > 0 && <p className="text-sovereign-steel">{w.pollutants.join(', ')}</p>}
            </div>
          ))}
        </div>
      )}

      {activeLayer === 'flood' && (
        <div>
          <h3 className="text-label uppercase tracking-wider text-sovereign-graphite mb-3">Flood Risk</h3>
          <Stat label="Total Properties at Risk" value={formatNumber(cs.floodRiskProperties)} />
          {FLOOD_ZONES.map((fz) => (
            <div key={fz.id} className="py-2 border-b border-sovereign-ash text-xs">
              <p className="font-semibold text-sovereign-ink">{fz.label}</p>
              <p className="text-sovereign-graphite">Zone {fz.zone} · {formatNumber(fz.properties)} properties · {formatCurrency(fz.estimatedDamageUSD)}</p>
            </div>
          ))}
        </div>
      )}

      {activeLayer === 'airquality' && (
        <div>
          <h3 className="text-label uppercase tracking-wider text-sovereign-graphite mb-3">Air Quality Monitoring</h3>
          {AIR_QUALITY.map((aq) => (
            <div key={aq.id} className="py-2 border-b border-sovereign-ash text-xs">
              <p className="font-semibold text-sovereign-ink">{aq.name}</p>
              <p className="text-sovereign-graphite">PM2.5: {aq.pm25} · NO₂: {aq.no2} · O₃: {aq.ozone}</p>
              <p className="text-sovereign-steel">{aq.aqiCategory}{aq.nearRoadway ? ' · Near-roadway' : ''}</p>
            </div>
          ))}
        </div>
      )}

      {activeLayer === 'treecanopy' && (
        <div>
          <h3 className="text-label uppercase tracking-wider text-sovereign-graphite mb-3">Tree Canopy by Segment</h3>
          {TREE_CANOPY.map((tc) => (
            <div key={tc.segment} className="flex justify-between py-1 border-b border-sovereign-ash text-xs">
              <span className="text-sovereign-graphite">{tc.segment}</span>
              <span className="font-mono">
                {tc.coveragePct}% <span className="text-red-600">({tc.changeSince2010}%)</span>
              </span>
            </div>
          ))}
        </div>
      )}

      {activeLayer === 'landuse' && (
        <div>
          <h3 className="text-label uppercase tracking-wider text-sovereign-graphite mb-3">Land Use (1 km buffer)</h3>
          {LAND_USE.map((lu) => (
            <div key={lu.type} className="flex items-center gap-2 py-1 border-b border-sovereign-ash text-xs">
              <span className="w-3 h-3 inline-block flex-shrink-0" style={{ backgroundColor: lu.color }} />
              <span className="text-sovereign-graphite flex-1">{lu.type}</span>
              <span className="font-mono font-semibold">{lu.pct}%</span>
            </div>
          ))}
        </div>
      )}

      {/* Safety stats */}
      <div>
        <h3 className="text-label uppercase tracking-wider text-sovereign-graphite mb-3">Safety (Annual)</h3>
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Accidents/yr" value={formatNumber(cs.accidentsPerYear)} />
          <Stat label="Fatalities/yr" value={cs.fatalitiesPerYear} />
          <Stat label="Peak Speed" value={`${cs.avgSpeedPeakMph} mph`} />
          <Stat label="Off-peak Speed" value={`${cs.avgSpeedOffPeakMph} mph`} />
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-sovereign-ivory p-2">
      <p className="text-label uppercase tracking-wider text-sovereign-steel">{label}</p>
      <p className="text-sm font-semibold text-sovereign-ink font-mono">{value}</p>
    </div>
  )
}

// ------------------------------------------------------------------
// Main component
// ------------------------------------------------------------------
export default function I24CorridorStudy() {
  const [activeLayers, setActiveLayers] = useState(new Set(['corridor']))
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activePanel, setActivePanel] = useState('corridor')

  const mapBounds = useMemo(() => [
    [36.0460, -86.9820],
    [36.2700, -86.6180],
  ], [])

  function toggleLayer(id) {
    setActiveLayers((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
    setActivePanel(id)
  }

  // Determine primary active layer for legend/stats
  const primaryLayer = activePanel

  return (
    <section id="i24-study" className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b-2 border-navy px-6 py-8 lg:px-12">
        <p className="text-label uppercase tracking-wider text-sovereign-graphite mb-2">
          GIS Analysis — Davidson County, Tennessee
        </p>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-2">
          I-24 Corridor Socioeconomic & Environmental Study
        </h2>
        <p className="text-sm text-sovereign-graphite max-w-3xl">
          Multi-layer spatial analysis of the Interstate 24 corridor through Nashville.
          Environmental burden indicators overlaid with socioeconomic vulnerability data
          following EPA EJScreen methodology. Sources: US Census ACS, FEMA NFHL, TDEC, EPA AQS, NLCD.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row" style={{ height: 'calc(100vh - 160px)' }}>
        {/* Sidebar: layer controls + stats */}
        <div
          className={`${sidebarOpen ? 'w-full lg:w-80' : 'w-0 lg:w-0'} flex-shrink-0 border-r border-sovereign-silver overflow-y-auto transition-all`}
        >
          {sidebarOpen && (
            <div className="p-4 space-y-4">
              {/* Layer toggles */}
              <div>
                <h3 className="text-label uppercase tracking-wider text-sovereign-graphite mb-3">Data Layers</h3>
                {LAYER_GROUPS.map((group) => (
                  <div key={group.group} className="mb-3">
                    <p className="text-xs font-semibold text-sovereign-steel uppercase tracking-wider mb-1">
                      {group.group}
                    </p>
                    {group.layers.map((layer) => (
                      <button
                        key={layer.id}
                        onClick={() => toggleLayer(layer.id)}
                        className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs text-left transition-colors ${
                          activeLayers.has(layer.id)
                            ? 'bg-navy text-white'
                            : 'bg-sovereign-ivory text-sovereign-ink hover:bg-sovereign-ash'
                        } mb-1`}
                      >
                        <span className="w-5 h-5 flex items-center justify-center bg-white/10 text-[10px] font-mono font-bold">
                          {layer.icon}
                        </span>
                        <span>{layer.label}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              {/* Stats panel */}
              <div className="border-t-2 border-navy pt-4">
                <StatPanel activeLayer={primaryLayer} />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex items-center justify-center w-6 flex-shrink-0 bg-sovereign-ivory border-r border-sovereign-silver hover:bg-sovereign-ash text-sovereign-graphite text-xs"
        >
          {sidebarOpen ? '\u25C0' : '\u25B6'}
        </button>

        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer
            bounds={mapBounds}
            scrollWheelZoom={true}
            className="w-full h-full z-0"
            style={{ minHeight: '400px' }}
          >
            <FitBounds bounds={mapBounds} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Render active layers */}
            {activeLayers.has('corridor') && <CorridorLayer />}
            {activeLayers.has('income') && <IncomeLayer />}
            {activeLayers.has('poverty') && <PovertyLayer />}
            {activeLayers.has('ejscreen') && <EJScreenLayer />}
            {activeLayers.has('transit') && <TransitLayer />}
            {activeLayers.has('greenspace') && <GreenSpaceLayer />}
            {activeLayers.has('waterways') && <WaterwaysLayer />}
            {activeLayers.has('flood') && <FloodLayer />}
            {activeLayers.has('airquality') && <AirQualityLayer />}
            {activeLayers.has('treecanopy') && <TreeCanopyLayer />}
            {activeLayers.has('noise') && <NoiseLayer />}
          </MapContainer>

          {/* Legend overlay */}
          <Legend activeLayer={primaryLayer} />

          {/* Mobile toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden absolute top-4 left-4 z-[1000] bg-navy text-white px-3 py-1.5 text-xs font-semibold"
          >
            {sidebarOpen ? 'Map' : 'Layers'}
          </button>
        </div>
      </div>
    </section>
  )
}
