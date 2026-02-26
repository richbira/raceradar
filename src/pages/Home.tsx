import { useState } from 'react'
import type { Race, RaceDistance, RaceType } from '../types'
import { races } from '../data/races'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState<RaceType | 'all'>('all')
  const [selectedDistance, setSelectedDistance] = useState<RaceDistance | 'all'>('all')

  /*
    Questo prende l'array `races` e lo filtra in base ai tre stati. Per ogni gara controlla:
    - `matchSearch` → il testo che hai scritto è contenuto nella città, regione o nome?
    - `matchType` → il tipo selezionato corrisponde? (o è "all"?)
    - `matchDistance` → la distanza corrisponde? (o è "all"?)

    Solo se tutte e tre le condizioni sono vere, la gara appare nei risultati. Il `.toLowerCase()` serve per rendere la ricerca case-insensitive — "milano" e "Milano" danno lo stesso risultato.
  */
  const filtered = races.filter((race) => {
    const matchSearch =
      race.city.toLowerCase().includes(search.toLowerCase()) ||
      race.region.toLowerCase().includes(search.toLowerCase()) ||
      race.name.toLowerCase().includes(search.toLowerCase())

    const matchType = selectedType === 'all' || race.type === selectedType
    const matchDistance = selectedDistance === 'all' || race.distance === selectedDistance

    return matchSearch && matchType && matchDistance
  })

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-blue-600 text-white py-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">🎯 RaceRadar</h1>
        <p className="text-blue-100 text-lg">Trova le gare vicino a te</p>
      </div>

      {/* FILTRI */}
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-4">

        {/* Barra di ricerca */}
        <input
          type="text"
          placeholder="Cerca per città, regione o nome gara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Filtro tipo */}
        <div className="flex gap-2 flex-wrap">
          {(['all', 'running', 'triathlon', 'trail', 'cycling'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
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
          {(['all', '5k', '10k', 'half-marathon', 'marathon', 'ultra', 'sprint', 'olympic', 'half-ironman', 'ironman'] as const).map((dist) => (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
        </div>
      </div>

    </div>
  )
}

function RaceCard({ race }: { race: Race }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/race/${race.id}`)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-500">{race.type}</span>
        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">{race.distance}</span>
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