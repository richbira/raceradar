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

          <span className="text-xs uppercase tracking-wide text-blue-200">
            {race.type}
          </span>

          <h1 className="text-3xl font-bold mt-1">{race.name}</h1>

          <p className="text-blue-100 mt-1">
            📍 {race.city}, {race.region}
          </p>

          {/* Badge distanze */}
          <div className="flex gap-2 flex-wrap mt-3">
            {race.distances.map((dist) => (
              <span
                key={dist}
                className="bg-white/20 text-white text-xs px-3 py-1 rounded-full"
              >
                {DISTANCE_INFO[dist].label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENUTO */}
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">

        {/* Info principali */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Data</p>
            <p className="text-lg font-semibold text-gray-800">
              📅 {new Date(race.date).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Costo iscrizione</p>
            <p className="text-lg font-semibold text-gray-800">
              💶 {race.price_eur}€
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Dislivello</p>
            <p className="text-lg font-semibold text-gray-800">
              ⛰️ {race.elevation_m}m
            </p>
          </div>

          {/*}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Distanze disponibili</p>
            <p className="text-lg font-semibold text-gray-800">
              {race.distances.map(d => DISTANCE_INFO[d].label).join(', ')}
            </p>
          </div>*/}
        </div>

        {/* Percorsi */}
        {race.distances.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4 text-center">
              Percorsi
            </h2>

            {/* single-row, shrink items to stay on one line */}
            <div className="flex flex-row flex-nowrap gap-4 items-start">
              {race.distances.map((dist) => {
                const info = DISTANCE_INFO[dist]
                return (
                  <div key={dist} className="flex-1 min-w-0 text-center">
                    <h3 className="font-semibold text-gray-800 mb-1 truncate">{info.label}</h3>

                    <div className="flex gap-2 justify-center items-center">
                      {info.swim && (
                        <div className="text-center">
                          <p className="text-xl">🏊</p>
                          <p className="text-xs font-bold text-gray-800 truncate">{info.swim}</p>
                        </div>
                      )}

                      {info.bike && (
                        <div className="text-center">
                          <p className="text-xl">🚴</p>
                          <p className="text-xs font-bold text-gray-800 truncate">{info.bike}</p>
                        </div>
                      )}

                      <div className="text-center">
                        <p className="text-xl">🏃</p>
                        <p className="text-xs font-bold text-gray-800 truncate">{info.run}</p>
                      </div>
                    </div>

                    <p className="text-gray-500 text-xs mt-3 truncate">{info.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Descrizione */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Descrizione
          </h2>
          <p className="text-gray-700">{race.description}</p>
        </div>

        {/* Dettagli organizzativi */}
        {(race.competition || race.associations || race.startTimes || race.organizer || race.contactEmail || race.contactPhone || race.instagram || race.privateEmail || race.flyerUrl) && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
              📋 Dettagli organizzativi
            </h2>
            <div className="space-y-2 text-gray-800 text-sm">
              {race.competition && (
                <div>
                  <span className="font-semibold">🏆 Competitività:</span> {race.competition}
                </div>
              )}
              {race.associations && (
                <div>
                  <span className="font-semibold">🤝 Associazioni:</span> {race.associations.join(', ')}
                </div>
              )}
              {race.startTimes && (
                <div>
                  <span className="font-semibold">⏰ Orari di partenza:</span> {race.startTimes.join(', ')}
                </div>
              )}
              {race.organizer && (
                <div>
                  <span className="font-semibold">🧑‍💼 Organizzatore:</span> {race.organizer}
                </div>
              )}
              {race.contactEmail && (
                <div>
                  <span className="font-semibold">📧 Email:</span>{' '}
                  <a href={`mailto:${race.contactEmail}`} className="text-blue-600 underline">
                    {race.contactEmail}
                  </a>
                </div>
              )}
              {race.contactPhone && (
                <div>
                  <span className="font-semibold">📞 Telefono:</span>{' '}
                  <a href={`tel:${race.contactPhone}`} className="text-blue-600 underline">
                    {race.contactPhone}
                  </a>
                </div>
              )}
              {race.instagram && (
                <div>
                  <span className="font-semibold">📸 Instagram:</span>{' '}
                  <a
                    href={
                      race.instagram.startsWith('http')
                        ? race.instagram
                        : `https://instagram.com/${race.instagram}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {race.instagram}
                  </a>
                </div>
              )}
              {race.privateEmail && (
                <div>
                  <span className="font-semibold">🔒 Email privata:</span>{' '}
                  <a href={`mailto:${race.privateEmail}`} className="text-blue-600 underline">
                    {race.privateEmail}
                  </a>
                </div>
              )}
              {race.flyerUrl && (
                <div>
                  <span className="font-semibold">📄 Volantino:</span>{' '}
                  <a
                    href={race.flyerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Scarica qui
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

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