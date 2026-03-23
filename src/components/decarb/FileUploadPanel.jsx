import React, { useRef, useState } from 'react'
import { parseCSV } from '../../lib/decarbEngine'

const TEMPLATE_HEADERS = [
  'nombre', 'descripcion', 'scope', 'categoria', 'cantidad', 'unidad', 'factor_key'
]

const TEMPLATE_ROWS = [
  ['Electricidad planta', 'Consumo anual red eléctrica', '2', 'electricidad_comprada', '4500000', 'kWh', 'electricidad_kwh'],
  ['Calderas gas natural', 'Proceso térmico industrial', '1', 'caldera_gas_natural', '800000', 'm3', 'gas_natural_m3'],
  ['Flota diésel', 'Vehículos de distribución', '1', 'transporte_flota', '450000', 'litros', 'diesel_litros'],
  ['Refrigeración', 'Fugas R-410A', '1', 'refrigeracion_fugitivas', '150', 'kg', 'r410a_kg'],
]

const FACTOR_OPTIONS = [
  { key: 'electricidad_kwh', label: 'Electricidad (kWh)' },
  { key: 'gas_natural_m3', label: 'Gas natural (m³)' },
  { key: 'gas_natural_kwh', label: 'Gas natural (kWh)' },
  { key: 'diesel_litros', label: 'Diésel (litros)' },
  { key: 'gasolina_litros', label: 'Gasolina (litros)' },
  { key: 'fueloil_litros', label: 'Fuelóil (litros)' },
  { key: 'glp_litros', label: 'GLP (litros)' },
  { key: 'r410a_kg', label: 'R-410A (kg)' },
  { key: 'r134a_kg', label: 'R-134a (kg)' },
  { key: 'r404a_kg', label: 'R-404A (kg)' },
]

const SCOPE_OPTIONS = [
  { value: 1, label: 'Scope 1 — Directas' },
  { value: 2, label: 'Scope 2 — Indirectas (energía)' },
  { value: 3, label: 'Scope 3 — Otras indirectas' },
]

const CATEGORY_OPTIONS = [
  'electricidad_comprada', 'caldera_gas_natural', 'transporte_flota',
  'refrigeracion_fugitivas', 'generacion_electrica', 'proceso_industrial',
  'vehiculo_empresa', 'otro',
]

export default function FileUploadPanel({ onDataLoaded, sources, setSources }) {
  const fileRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState('')
  const [orgData, setOrgData] = useState({
    nombre: '', pais: 'España', sector: '', empleados: '', ingresos: '', anio: '2023',
    consolidacion: '100',
  })

  const handleFile = (file) => {
    if (!file) return
    setError('')
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target.result
        const parsed = parseCSV(text)
        if (parsed.length === 0) {
          setError('El archivo no contiene datos válidos.')
          return
        }
        const mapped = parsed.map((row, i) => ({
          id: `SRC-${String(i + 1).padStart(3, '0')}`,
          nombre: row.nombre || row.name || `Fuente ${i + 1}`,
          descripcion: row.descripcion || row.description || '',
          scope: parseInt(row.scope) || 1,
          categoria: row.categoria || row.category || 'otro',
          cantidad: parseFloat(row.cantidad || row.quantity || row.amount) || 0,
          unidad: row.unidad || row.unit || '',
          factor_key: row.factor_key || row.factor || '',
          scope2_method: row.scope2_method || 'LBM',
        }))
        setSources(mapped)
      } catch {
        setError('Error al procesar el archivo. Verifique el formato CSV.')
      }
    }
    reader.readAsText(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const downloadTemplate = () => {
    const csv = '\uFEFF' + TEMPLATE_HEADERS.join(';') + '\n' +
      TEMPLATE_ROWS.map(r => r.join(';')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'plantilla_inventario_GEI.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const loadDemo = () => {
    setOrgData({
      nombre: 'Industrias Verdes S.A.', pais: 'España', sector: 'Manufactura',
      empleados: '500', ingresos: '85000000', anio: '2023', consolidacion: '100',
    })
    setSources(TEMPLATE_ROWS.map((r, i) => ({
      id: `SRC-${String(i + 1).padStart(3, '0')}`,
      nombre: r[0], descripcion: r[1], scope: parseInt(r[2]),
      categoria: r[3], cantidad: parseFloat(r[4]),
      unidad: r[5], factor_key: r[6], scope2_method: 'LBM',
    })))
    setFileName('demo_data.csv')
  }

  const addSource = () => {
    const newId = `SRC-${String(sources.length + 1).padStart(3, '0')}`
    setSources([...sources, {
      id: newId, nombre: '', descripcion: '', scope: 1,
      categoria: 'otro', cantidad: 0, unidad: '', factor_key: '', scope2_method: 'LBM',
    }])
  }

  const updateSource = (index, field, value) => {
    const updated = [...sources]
    updated[index] = { ...updated[index], [field]: value }
    setSources(updated)
  }

  const removeSource = (index) => {
    setSources(sources.filter((_, i) => i !== index))
  }

  const canProceed = sources.length > 0 && sources.some(s => s.cantidad > 0 && s.factor_key)

  return (
    <div className="space-y-8">
      {/* Organization Data */}
      <div>
        <h3 className="font-serif text-xl text-navy mb-4">A. Datos de la Organización</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { key: 'nombre', label: 'Nombre', type: 'text', span: 2 },
            { key: 'pais', label: 'País', type: 'text' },
            { key: 'sector', label: 'Sector', type: 'text' },
            { key: 'empleados', label: 'Empleados', type: 'number' },
            { key: 'ingresos', label: 'Ingresos (€)', type: 'number' },
            { key: 'anio', label: 'Año reporte', type: 'number' },
            { key: 'consolidacion', label: 'Consolidación (%)', type: 'number' },
          ].map(f => (
            <div key={f.key} className={f.span ? `col-span-${f.span}` : ''}>
              <label className="text-label uppercase text-slate block mb-1">{f.label}</label>
              <input
                type={f.type}
                value={orgData[f.key]}
                onChange={e => setOrgData({ ...orgData, [f.key]: e.target.value })}
                className="w-full border border-sovereign-silver px-3 py-2 text-sm text-charcoal focus:border-navy focus:outline-none bg-white"
              />
            </div>
          ))}
        </div>
      </div>

      {/* File Upload */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-xl text-navy">B. Carga de Datos de Actividad</h3>
          <div className="flex gap-2">
            <button onClick={downloadTemplate}
              className="text-label uppercase px-4 py-2 border border-sovereign-silver text-slate hover:text-navy hover:border-navy transition-colors">
              Descargar Plantilla
            </button>
            <button onClick={loadDemo}
              className="text-label uppercase px-4 py-2 bg-navy text-white hover:bg-navy-800 transition-colors">
              Cargar Demo
            </button>
          </div>
        </div>

        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
            dragOver ? 'border-navy bg-navy-50' : 'border-sovereign-silver hover:border-navy'
          }`}
        >
          <input ref={fileRef} type="file" accept=".csv,.txt" className="hidden"
            onChange={e => handleFile(e.target.files[0])} />
          <svg className="w-8 h-8 mx-auto mb-3 text-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          {fileName ? (
            <p className="text-sm text-navy font-medium">{fileName} — {sources.length} fuentes cargadas</p>
          ) : (
            <>
              <p className="text-sm text-charcoal">Arrastre su archivo CSV aquí o haga clic para seleccionar</p>
              <p className="text-xs text-slate mt-1">Formato: nombre;scope;categoria;cantidad;unidad;factor_key</p>
            </>
          )}
        </div>
        {error && <p className="text-sm text-status-blocked mt-2">{error}</p>}
      </div>

      {/* Manual Source Table */}
      {sources.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl text-navy">C. Fuentes de Emisión ({sources.length})</h3>
            <button onClick={addSource}
              className="text-label uppercase px-4 py-2 border border-sovereign-silver text-slate hover:text-navy hover:border-navy transition-colors">
              + Añadir Fuente
            </button>
          </div>

          <div className="overflow-x-auto border border-sovereign-silver">
            <table className="w-full sovereign-table text-sm">
              <thead>
                <tr className="bg-sovereign-ash">
                  <th className="w-8"></th>
                  <th>Nombre</th>
                  <th>Scope</th>
                  <th>Categoría</th>
                  <th>Cantidad</th>
                  <th>Unidad</th>
                  <th>Factor de Emisión</th>
                </tr>
              </thead>
              <tbody>
                {sources.map((src, i) => (
                  <tr key={src.id}>
                    <td className="text-center">
                      <button onClick={() => removeSource(i)} className="text-slate hover:text-status-blocked text-xs">
                        ×
                      </button>
                    </td>
                    <td>
                      <input value={src.nombre} onChange={e => updateSource(i, 'nombre', e.target.value)}
                        className="w-full border-0 bg-transparent text-sm focus:outline-none" />
                    </td>
                    <td>
                      <select value={src.scope} onChange={e => updateSource(i, 'scope', parseInt(e.target.value))}
                        className="w-full border-0 bg-transparent text-sm focus:outline-none">
                        {SCOPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </td>
                    <td>
                      <select value={src.categoria} onChange={e => updateSource(i, 'categoria', e.target.value)}
                        className="w-full border-0 bg-transparent text-sm focus:outline-none">
                        {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>)}
                      </select>
                    </td>
                    <td>
                      <input type="number" value={src.cantidad}
                        onChange={e => updateSource(i, 'cantidad', parseFloat(e.target.value) || 0)}
                        className="w-full border-0 bg-transparent text-sm text-right font-mono focus:outline-none" />
                    </td>
                    <td className="text-xs text-slate">{src.unidad || '—'}</td>
                    <td>
                      <select value={src.factor_key} onChange={e => updateSource(i, 'factor_key', e.target.value)}
                        className="w-full border-0 bg-transparent text-sm focus:outline-none">
                        <option value="">Seleccionar...</option>
                        {FACTOR_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Proceed */}
      <div className="flex justify-end pt-4 border-t border-sovereign-silver">
        <button
          disabled={!canProceed}
          onClick={() => onDataLoaded({ org: orgData, sources })}
          className={`text-label uppercase px-8 py-3 transition-colors ${
            canProceed
              ? 'bg-navy text-white hover:bg-navy-800'
              : 'bg-sovereign-silver text-slate cursor-not-allowed'
          }`}
        >
          Calcular Emisiones →
        </button>
      </div>
    </div>
  )
}
