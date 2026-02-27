import { useMemo, useState } from 'react'
import type { Race, RaceDistance, RaceType } from '../types'
import { races } from '../data/races'
import { useNavigate } from 'react-router-dom'
import SearchAutocomplete from '../components/SearchAutocomplete'

const ALL_TYPES: (RaceType | 'all')[] = ['all', 'Running', 'Triathlon', 'Trail', 'Cycling']

const DISTANCES_BY_TYPE: Record<RaceType | 'all', (RaceDistance | 'all')[]> = {
  all: ['all', '5k', '10k', 'Half-Marathon', 'Marathon', 'Ultra', 'Sprint', 'Olympic', 'Half-Ironman', 'Ironman'],
  Running: ['all', '5k', '10k', 'Half-Marathon', 'Marathon', 'Ultra'],
  Triathlon: ['all', 'Sprint', 'Olympic', 'Half-Ironman', 'Ironman'],
  Trail: ['all', 'Ultra'],
  Cycling: ['all'],
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState<RaceType | 'all'>('all')
  const [selectedDistance, setSelectedDistance] = useState<RaceDistance | 'all'>('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const onTypeClick = (type: RaceType | 'all') => {
    setSelectedType(type)
    setSelectedDistance('all')
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
  }, [search, selectedType, selectedDistance, dateFrom, dateTo])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-blue-600 text-white py-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">🎯 RaceRadar</h1>
        <p className="text-blue-100 text-lg">Discover running races, triathlons and trail events</p>
      </div>

      {/* FILTRI */}
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-4">

        {/* Search Box stile Airbnb */}
        <div className="flex items-stretch bg-white border border-gray-200 rounded-full shadow-md overflow-visible relative">

          {/* DOVE */}
          <div className="flex-1 flex items-center px-6 py-4 rounded-full hover:bg-gray-100 transition-colors cursor-text min-w-0">
            <SearchAutocomplete
              value={search}
              onChange={setSearch}
              onSelect={() => {}}
            />
          </div>

          {/* Divisore */}
          <div className="w-px bg-gray-200 my-3" />

          {/* DAL */}
          <div className="flex flex-col justify-center px-6 py-4 hover:bg-gray-100 transition-colors rounded-full cursor-pointer">
            <p className="text-xs font-bold text-gray-800 mb-1">Dal</p>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="text-sm text-gray-500 focus:outline-none bg-transparent cursor-pointer w-36"
            />
          </div>

          {/* Divisore */}
          <div className="w-px bg-gray-200 my-3" />

          {/* AL */}
          <div className="flex flex-col justify-center px-6 py-4 hover:bg-gray-100 transition-colors rounded-full cursor-pointer">
            <p className="text-xs font-bold text-gray-800 mb-1">Al</p>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="text-sm text-gray-500 focus:outline-none bg-transparent cursor-pointer w-36"
            />
          </div>
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

        {/* Filtro distanza */}
        <div className="flex gap-2 flex-wrap">
          {availableDistances.map((dist) => (
            <button
              key={dist}
              onClick={() => setSelectedDistance(dist)}
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
          {filtered.map((race, index) => (
            <RaceCard key={`${race.id}-${search}-${selectedType}-${selectedDistance}`} race={race} index={index} />
          ))}
        </div>
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
        <span>📅 {new Date(race.date).toLocaleDateString('it-IT')}</span>
        <span>💶 {race.price_eur}€</span>
      </div>
    </div>
  )
}