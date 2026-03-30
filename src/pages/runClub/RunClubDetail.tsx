import { useRunClub } from '../../hooks/useRunClub'
import Footer from '../../components/Footer'
import SkeletonCard from '../../components/SkeletonCard'
import { useNavigate, useParams } from 'react-router-dom'



export default function RunClubDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { runClub, loading, error } = useRunClub(id)

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <SkeletonCard />
      </div>
      <Footer />
    </div>
  )

  if (error || !runClub) return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Run Club non trovato.</p>
      </div>
      <Footer />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div className="bg-blue-600 text-white py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-200 hover:text-white text-sm mb-4 flex items-center gap-1"
          >
            ← Torna indietro
          </button>
          <span className="text-blue-200 text-sm font-medium uppercase tracking-wide">Run Club</span>
          <h1 className="text-3xl font-bold mt-1">{runClub.name}</h1>
          <p className="text-blue-100 mt-1">📍 {runClub.city}, {runClub.region}</p>
          {runClub.venue && (<p className="text-blue-100 mt-1">📍 {runClub.venue}</p>)}
        </div>
      </div>

      {/* CONTENUTO */}
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">

        {/* Info principali */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Info</h2>
          <div className="grid grid-cols-2 gap-6">

            {runClub.days && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Giorni</p>
                <p className="text-lg font-bold text-gray-800">📅 {runClub.days.join(', ')}</p>
              </div>
            )}

            {runClub.time && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Orario</p>
                <p className="text-lg font-bold text-gray-800">🕐 {runClub.time}</p>
              </div>
            )}

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Quota</p>
              <p className="text-lg font-bold text-gray-800">
                {runClub.price_eur && runClub.price_eur > 0
                  ? `💶 €${runClub.price_eur}/anno`
                  : '✅ Gratuito'
                }
              </p>
            </div>

            {runClub.organizer && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Organizzatore</p>
                <p className="text-lg font-bold text-gray-800">🧑‍💼 {runClub.organizer}</p>
              </div>
            )}
          </div>
        </div>

        {/* Livelli */}
        {runClub.level && runClub.level.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Livello</h2>
            <div className="flex gap-2 flex-wrap">
              {runClub.level.map((l: string) => (
                <span key={l} className="bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-full text-sm font-medium">
                  {l}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Descrizione */}
        {runClub.description && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Descrizione</h2>
            <p className="text-gray-600 leading-relaxed">{runClub.description}</p>
          </div>
        )}

        {/* Social e contatti */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Contatti e Social</h2>
          <div className="flex flex-col gap-3">
            {runClub.website && (
              <a href={runClub.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                <span className="text-xl">🌐</span>
                <div>
                  <p className="font-medium text-sm">Sito web</p>
                  <p className="text-xs text-gray-400">{runClub.website}</p>
                </div>
              </a>
            )}
            {runClub.instagram && (
              
                < a href={runClub.instagram.startsWith('http') ? runClub.instagram : `https://instagram.com/${runClub.instagram.replace('@', '')}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 hover:text-pink-500 transition-colors">
                <span className="text-xl">📸</span>
                <div>
                  <p className="font-medium text-sm">Instagram</p>
                  <p className="text-xs text-gray-400">{runClub.instagram}</p>
                </div>
              </a>
            )}
            {runClub.strava && (
              <a href={`https://strava.com/clubs/${runClub.strava}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 hover:text-orange-500 transition-colors">
                <span className="text-xl">🏅</span>
                <div>
                  <p className="font-medium text-sm">Strava</p>
                  <p className="text-xs text-gray-400">{runClub.strava}</p>
                  <p className="text-xs text-gray-400">{runClub.stravaUrl}</p>
                </div>
              </a>
            )}
            {runClub.whatsapp && (
              <a href={runClub.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 hover:text-green-500 transition-colors">
                <span className="text-xl">💬</span>
                <div>
                  <p className="font-medium text-sm">WhatsApp</p>
                  <p className="text-xs text-gray-400">Unisciti al gruppo</p>
                </div>
              </a>
            )}
            {runClub.contactEmail && (
              <a href={`mailto:${runClub.contactEmail}`}
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                <span className="text-xl">📧</span>
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-xs text-gray-400">{runClub.contactEmail}</p>
                </div>
              </a>
            )}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}