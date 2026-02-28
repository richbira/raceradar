import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRunClubs } from '../../hooks/useRunClubs'
import Footer from '../../components/Footer'
import type { RunClub } from '../../types'
import Header from '../../components/Header'
import SkeletonCard from '../../components/SkeletonCard'

const PAGE_SIZE = 10

export default function RunClubs() {
  const navigate = useNavigate()
  const { runClubs, loading, error } = useRunClubs()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const handleSearch = (val: string) => {
    setSearch(val)
    setPage(1)
  }

  const filtered = useMemo(() => {
    const s = search.toLowerCase()
    return runClubs.filter((club) =>
      club.city.toLowerCase().includes(s) ||
      club.region.toLowerCase().includes(s) ||
      club.name.toLowerCase().includes(s)
    )
  }, [runClubs, search])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {!loading && !error && (
        <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-4">
          <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-md px-6 py-4 gap-3">
            <span className="text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Cerca per città o regione..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 focus:outline-none text-sm text-gray-700 bg-transparent"
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">{filtered.length} run club trovati</p>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-gray-400 hidden sm:inline">Il tuo club non c'è?</span>
              <button
                onClick={() => navigate('/proponi-run-club')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap"
              >
                + Proponi un Run Club
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 pb-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400">Errore: {error}</p>
          </div>
        ) : (
          <>
            {filtered.length === 0 && (
              <div className="text-center text-gray-400 py-12 flex flex-col items-center gap-4">
                <p>Nessun run club trovato.</p>
                <button
                  onClick={() => navigate('/proponi-run-club')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors text-sm"
                >
                  + Proponi il tuo Run Club
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paginated.map((club, index) => (
                <RunClubCard key={club.id} club={club} index={index} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setPage(p => p - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-full border text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                >
                  ← Precedente
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
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
                  onClick={() => setPage(p => p + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-full border text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                >
                  Successiva →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

function RunClubCard({ club, index }: { club: RunClub; index: number }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/run-clubs/${club.id}`)}
      className="race-card-enter bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-500">
          Run Club
        </span>
        {club.price_eur === 0 || !club.price_eur ? (
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Gratuito</span>
        ) : (
          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">€{club.price_eur}/anno</span>
        )}
      </div>

      <h2 className="text-lg font-bold text-gray-800 mb-1">{club.name}</h2>
      <p className="text-sm text-gray-500 mb-3">📍 {club.city}, {club.region}</p>

      {club.days && (
        <p className="text-sm text-gray-600 mb-1">
          📅 {club.days.join(' · ')}
          {club.time && ` · 🕐 ${club.time}`}
        </p>
      )}

      {club.level && (
        <div className="flex gap-1 flex-wrap mt-2">
          {club.level.map((l) => (
            <span key={l} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
              {l}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-3">
        {club.instagram && (
          
            <a href={club.instagram.startsWith('http')
              ? club.instagram
              : `https://instagram.com/${club.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-blue-500 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            📸 Instagram
          </a>
        )}
        {club.strava && (
          
            <a href={`https://strava.com/clubs/${club.strava}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-orange-500 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            🏅 Strava
          </a>
        )}
        {club.whatsapp && (
          
            <a href={club.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-green-500 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  )
}