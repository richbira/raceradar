import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'

type PendingRace = {
  id: string
  name: string
  type: string
  distances: string[]
  date: string
  city: string
  region: string
  website: string | null
  price_eur: number | null
  description: string | null
  organizer: string | null
  contact_email: string | null
  instagram: string | null
  submitted_at: string
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const [pending, setPending] = useState<PendingRace[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  async function fetchPending() {
    const { data } = await supabase
      .from('pending_races')
      .select('*')
      .eq('status', 'pending')
      .order('submitted_at', { ascending: true })

    setPending(data ?? [])
    setLoading(false)
  }
// Sostituisci i due useEffect con questo unico useEffect
useEffect(() => {
  if (authLoading) return

  if (!user) {
    navigate('/admin/login')
    return
  }

  // fetchPending dentro l'effect direttamente
  supabase
    .from('pending_races')
    .select('*')
    .eq('status', 'pending')
    .order('submitted_at', { ascending: true })
    .then(({ data }) => {
      setPending(data ?? [])
      setLoading(false)
    })
    }, [user, authLoading, navigate])

  async function handleApprove(race: PendingRace) {
    setActionLoading(race.id)

    // Inserisci in races
    await supabase.from('races').insert({
      name: race.name,
      type: race.type,
      distances: race.distances,
      date: race.date,
      city: race.city,
      region: race.region,
      country: 'Italia',
      website: race.website,
      price_eur: race.price_eur,
      description: race.description,
      organizer: race.organizer,
      contact_email: race.contact_email,
      instagram: race.instagram,
      status: 'approved',
    })

    // Elimina da pending
    await supabase.from('pending_races').delete().eq('id', race.id)

    setActionLoading(null)
    fetchPending()
  }

  async function handleReject(id: string) {
    setActionLoading(id)
    await supabase.from('pending_races').delete().eq('id', id)
    setActionLoading(null)
    fetchPending()
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 animate-pulse">Caricamento...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-blue-600 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
  <div>
    <h1 className="text-2xl font-bold">🛠️ Admin Dashboard</h1>
    <p className="text-blue-100 text-sm mt-1">{user?.email}</p>
  </div>
  <div className="flex gap-2">
    <button
      onClick={() => navigate('/')}
      className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
    >
      🏠 Home
    </button>
    <button
      onClick={handleLogout}
      className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
    >
      Logout
    </button>
  </div>
</div>
      </div>

      {/* CONTENUTO */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Gare in attesa di approvazione
          <span className="ml-2 bg-orange-100 text-orange-600 text-sm px-2 py-0.5 rounded-full">
            {pending.length}
          </span>
        </h2>

        {pending.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            Nessuna gara in attesa. 🎉
          </div>
        )}

        <div className="flex flex-col gap-4">
          {pending.map((race) => (
            <div key={race.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-blue-500">
                    {race.type}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800">{race.name}</h3>
                  <p className="text-sm text-gray-500">
                    📍 {race.city}, {race.region} · 📅 {new Date(race.date).toLocaleDateString('it-IT')}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(race.submitted_at).toLocaleDateString('it-IT')}
                </span>
              </div>

              {/* Distanze */}
              <div className="flex gap-1 flex-wrap mb-3">
                {race.distances.map((dist) => (
                  <span key={dist} className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    {dist}
                  </span>
                ))}
              </div>

              {/* Info */}
              <div className="text-sm text-gray-600 space-y-1 mb-4">
                {race.price_eur && <p>💶 €{race.price_eur}</p>}
                {race.website && <p>🌐 <a href={race.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{race.website}</a></p>}
                {race.organizer && <p>🧑‍💼 {race.organizer}</p>}
                {race.contact_email && <p>📧 {race.contact_email}</p>}
                {race.instagram && <p>📸 {race.instagram}</p>}
                {race.description && <p className="text-gray-500 italic">"{race.description}"</p>}
              </div>

              {/* Azioni */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(race)}
                  disabled={actionLoading === race.id}
                  className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white py-2 rounded-xl text-sm font-semibold transition-colors"
                >
                  {actionLoading === race.id ? '⏳' : '✅ Approva'}
                </button>
                <button
                  onClick={() => handleReject(race.id)}
                  disabled={actionLoading === race.id}
                  className="flex-1 bg-red-100 hover:bg-red-200 disabled:opacity-50 text-red-600 py-2 rounded-xl text-sm font-semibold transition-colors"
                >
                  {actionLoading === race.id ? '⏳' : '❌ Rifiuta'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}