import { useMemo } from 'react'
import type { Race, RaceDistance, RaceType } from '../types'
import { RACE_TYPES } from '../types'
import { useRaces } from '../hooks/useRaces'
import { useSearchParams, useNavigate } from 'react-router-dom'
import SearchAutocomplete from '../components/SearchAutocomplete'

const DISTANCES_BY_TYPE: Record<RaceType | 'all', (RaceDistance | 'all')[]> = {
  all: ['all', '5k', '10k', 'Half-Marathon', 'Marathon', 'Ultra', 'Sprint', 'Olympic', 'Half-Ironman', 'Ironman', 'Hyrox-Single', 'Hyrox-Doubles', 'Hyrox-Relay'],
  Running: ['all', '5k', '10k', 'Half-Marathon', 'Marathon', 'Ultra'],
  Triathlon: ['all', 'Sprint', 'Olympic', 'Half-Ironman', 'Ironman'],
  Trail: ['all', 'Ultra'],
  Cycling: ['all'],
  Hyrox: ['all', 'Hyrox-Single', 'Hyrox-Doubles', 'Hyrox-Relay'],
}
const ALL_TYPES: (RaceType | 'all')[] = ['all', ...RACE_TYPES]
const PAGE_SIZE = 10

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { races, loading, error } = useRaces()

  // Leggi i filtri dall'URL
  const search = searchParams.get('q') ?? ''
  const selectedType = (searchParams.get('type') ?? 'all') as RaceType | 'all'
  const selectedDistance = (searchParams.get('distance') ?? 'all') as RaceDistance | 'all'
  const dateFrom = searchParams.get('from') ?? ''
  const dateTo = searchParams.get('to') ?? ''
  const page = parseInt(searchParams.get('page') ?? '1')

  // Aggiorna un singolo parametro nell'URL
const setParam = (key: string, value: string, resetPage = true) => {
  const next = new URLSearchParams(searchParams)
  if (value === '' || value === 'all') {
    next.delete(key)
  } else {
    next.set(key, value)
  }
  if (resetPage) {
    next.delete('page')
  }
  setSearchParams(next)
}

  const onTypeClick = (type: RaceType | 'all') => {
    const next = new URLSearchParams(searchParams)
    if (type === 'all') {
      next.delete('type')
    } else {
      next.set('type', type)
    }
    next.delete('distance')
    next.delete('page')
    setSearchParams(next)
  }

  const availableDistances = DISTANCES_BY_TYPE[selectedType]

const filtered = useMemo(() => {
  return races.filter((race) => {
    const searchLower = search.toLowerCase()
    const matchSearch =
      race.city.toLowerCase().includes(searchLower) ||
      race.region.toLowerCase().includes(searchLower) ||
      race.name.toLowerCase().includes(searchLower)
    const matchType = selectedType === 'all' || race.type === selectedType
    const matchDistance = selectedDistance === 'all' || race.distances.includes(selectedDistance)
    const matchDateFrom = !dateFrom || race.date >= dateFrom
    const matchDateTo = !dateTo || race.date <= dateTo
    return matchSearch && matchType && matchDistance && matchDateFrom && matchDateTo
  })
}, [races, search, selectedType, selectedDistance, dateFrom, dateTo])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  if (loading) return (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-gray-400 animate-pulse">Caricamento gare...</p>
  </div>
)

if (error) return (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-red-400">Errore: {error}</p>
  </div>
)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-blue-600 text-white py-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">🎯 RaceRadar</h1>
        <p className="text-blue-100 text-lg">Discover running races, triathlons and trail events</p>
      </div>

      {/* FILTRI */}
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-4">

        {/* Search Box */}
        <div className="flex items-stretch bg-white border border-gray-200 rounded-full shadow-md overflow-visible relative">
          <div className="flex-1 flex items-center px-6 py-4 rounded-full hover:bg-gray-100 transition-colors cursor-text min-w-0">
            <SearchAutocomplete
              value={search}
              onChange={(val) => setParam('q', val)}
              onSelect={() => {}}
            />
          </div>
          <div className="w-px bg-gray-200 my-3" />
          <div className="flex flex-col justify-center px-6 py-4 hover:bg-gray-100 transition-colors rounded-full cursor-pointer">
            <p className="text-xs font-bold text-gray-800 mb-1">Dal</p>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setParam('from', e.target.value)}
              className="text-sm text-gray-500 focus:outline-none bg-transparent cursor-pointer w-36"
            />
          </div>
          <div className="w-px bg-gray-200 my-3" />
          <div className="flex flex-col justify-center px-6 py-4 hover:bg-gray-100 transition-colors rounded-full cursor-pointer">
            <p className="text-xs font-bold text-gray-800 mb-1">Al</p>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setParam('to', e.target.value)}
              className="text-sm text-gray-500 focus:outline-none bg-transparent cursor-pointer w-36"
            />
          </div>
          {/* Reset */}
          {(search || dateFrom || dateTo) && (
            <button
              onClick={() => {
                const next = new URLSearchParams(searchParams)
                next.delete('q')
                next.delete('from')
                next.delete('to')
                next.delete('page')
                setSearchParams(next)
              }}
              className="px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-gray-100 transition-colors rounded-r-full text-lg"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filtro tipo */}
        <div className="flex gap-2 flex-wrap">
          {ALL_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => onTypeClick(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                selectedType === type
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
              }`}
            >
              {type === 'all' ? 'Tutti' : type}
            </button>
          ))}
        </div>

        {/* Filtro distanza — appare solo se tipo selezionato */}
        {selectedType !== 'all' && (
          <div className="flex gap-2 flex-wrap">
            {availableDistances.map((dist) => (
              <button
                key={dist}
                onClick={() => setParam('distance', dist)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  selectedDistance === dist
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'
                }`}
              >
                {dist === 'all' ? 'Tutte le distanze' : dist}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* RISULTATI */}
      <div className="max-w-4xl mx-auto px-4 pb-10">
        <p className="text-gray-500 mb-4 text-sm">{filtered.length} gare trovate</p>

        {filtered.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            Nessuna gara trovata con questi filtri.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {paginated.map((race, index) => (
            <RaceCard key={`${race.id}-${search}-${selectedType}-${selectedDistance}`} race={race} index={index} />
          ))}
        </div>

        {/* PAGINAZIONE */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setParam('page', String(page - 1), false)}
              disabled={page === 1}
              className="px-4 py-2 rounded-full border text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-white text-gray-600 border-gray-300 hover:border-blue-400"
            >
              ← Precedente
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setParam('page', String(p), false)}
                className={`w-9 h-9 rounded-full text-sm font-medium border transition-colors ${
                  page === p
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setParam('page', String(page + 1),false)}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-full border text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-white text-gray-600 border-gray-300 hover:border-blue-400"
            >
              Successiva →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function RaceCard({ race, index }: { race: Race; index: number }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/race/${race.id}`)}
      className="race-card-enter bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-500">{race.type}</span>
        <div className="flex gap-1 flex-wrap">
          {race.distances.map((dist) => (
            <span key={dist} className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
              {dist}
            </span>
          ))}
        </div>
      </div>
      <h2 className="text-lg font-bold text-gray-800 mb-1">{race.name}</h2>
      <p className="text-sm text-gray-500 mb-3">📍 {race.city}, {race.region}</p>
      <div className="flex justify-between text-sm text-gray-600">
        <span>📅 {new Date(race.date).toLocaleDateString('it-IT')}
          {race.endDate && ` - ${new Date(race.endDate).toLocaleDateString('it-IT')}`}
        </span>
        <span>💶 {race.price_eur}€</span>
      </div>
    </div>
  )
}
