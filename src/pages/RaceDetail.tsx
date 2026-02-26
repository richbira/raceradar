import { useParams, useNavigate } from 'react-router-dom'
import { races } from '../data/races'
import { DISTANCE_INFO } from '../types'

export default function RaceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const race = races.find((r) => r.id === id)

  if (!race) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Gara non trovata.</p>
      </div>
    )
  }

  const info = DISTANCE_INFO[race.distance]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-blue-600 text-white py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-200 hover:text-white text-sm mb-4 flex items-center gap-1"
          >
            ← Torna indietro
          </button>
          <span className="text-xs uppercase tracking-wide text-blue-200">{race.type}</span>
          <h1 className="text-3xl font-bold mt-1">{race.name}</h1>
          <p className="text-blue-100 mt-1">📍 {race.city}, {race.region}</p>
        </div>
      </div>

      {/* CONTENUTO */}
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">

        {/* Info principali */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Data</p>
            <p className="text-lg font-semibold text-gray-800">
              📅 {new Date(race.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Costo iscrizione</p>
            <p className="text-lg font-semibold text-gray-800">💶 {race.price_eur}€</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Dislivello</p>
            <p className="text-lg font-semibold text-gray-800">⛰️ {race.elevation_m}m</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Tipo di gara</p>
            <p className="text-lg font-semibold text-gray-800">{info.label}</p>
          </div>
        </div>

        {/* Distanze dettagliate */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Percorso</h2>
          <div className="flex gap-6 flex-wrap">
            {info.swim && (
              <div className="text-center">
                <p className="text-3xl">🏊</p>
                <p className="text-lg font-bold text-gray-800">{info.swim}</p>
                <p className="text-xs text-gray-400">Nuoto</p>
              </div>
            )}
            {info.bike && (
              <div className="text-center">
                <p className="text-3xl">🚴</p>
                <p className="text-lg font-bold text-gray-800">{info.bike}</p>
                <p className="text-xs text-gray-400">Bici</p>
              </div>
            )}
            <div className="text-center">
              <p className="text-3xl">🏃</p>
              <p className="text-lg font-bold text-gray-800">{info.run}</p>
              <p className="text-xs text-gray-400">Corsa</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4">{info.description}</p>
        </div>

        {/* Descrizione */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Descrizione</h2>
          <p className="text-gray-700">{race.description}</p>
        </div>

{/* Link iscrizione */}
        <a
          href={race.website}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-2xl font-semibold transition-colors"
        >
          🔗 Vai al sito ufficiale
        </a>

      </div>
    </div>
  )
}