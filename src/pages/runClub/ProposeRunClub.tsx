import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import Footer from '../../components/Footer'

const DAYS = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']
const LEVELS = ['Beginner', 'Intermedio', 'Avanzato', 'Tutti i livelli']

export default function ProposeRunClub() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: '',
    city: '',
    region: '',
    level: [] as string[],
    days: [] as string[],
    time: '',
    price_eur: '',
    description: '',
    website: '',
    instagram: '',
    whatsapp: '',
    strava: '',
    organizer: '',
    contact_email: '',
  })

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const toggleItem = (key: 'days' | 'level', item: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(item)
        ? prev[key].filter((d) => d !== item)
        : [...prev[key], item],
    }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.city || !form.region) {
      setError('Compila almeno: nome, città e regione.')
      return
    }

    setLoading(true)
    setError(null)

    const { error } = await supabase.from('pending_run_clubs').insert({
      name: form.name,
      city: form.city,
      region: form.region,
      country: 'Italia',
      level: form.level.length > 0 ? form.level : null,
      days: form.days.length > 0 ? form.days : null,
      time: form.time || null,
      price_eur: form.price_eur ? parseFloat(form.price_eur) : 0,
      description: form.description || null,
      website: form.website || null,
      instagram: form.instagram || null,
      whatsapp: form.whatsapp || null,
      strava: form.strava || null,
      organizer: form.organizer || null,
      contact_email: form.contact_email || null,
      status: 'pending',
    })

    setLoading(false)

    if (error) {
      setError('Errore durante l\'invio. Riprova.')
    } else {
      setSuccess(true)
    }
  }

  if (success) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
        <p className="text-4xl mb-4">🎉</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Grazie!</h2>
        <p className="text-gray-500 mb-6">Il tuo Run Club è stato inviato e verrà revisionato dal nostro team.</p>
        <button
          onClick={() => navigate('/run-clubs')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
        >
          Torna ai Run Club
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-blue-600 text-white py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate(-1)} className="text-blue-200 hover:text-white text-sm mb-4 flex items-center gap-1">
            ← Torna indietro
          </button>
          <h1 className="text-3xl font-bold">🏃 Proponi un Run Club</h1>
          <p className="text-blue-100 mt-1">Compila il form e il nostro team lo verificherà.</p>
        </div>
      </div>

      {/* FORM */}
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Info base */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Info base</h2>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Nome Run Club *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="es. Milano Running Crew"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Città *</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => set('city', e.target.value)}
                placeholder="es. Milano"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Regione *</label>
              <input
                type="text"
                value={form.region}
                onChange={(e) => set('region', e.target.value)}
                placeholder="es. Lombardia"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Livello */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Livello</label>
            <div className="flex gap-2 flex-wrap">
              {LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => toggleItem('level', level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    form.level.includes(level)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Giorni */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Giorni di allenamento</label>
            <div className="flex gap-2 flex-wrap">
              {DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleItem('days', day)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    form.days.includes(day)
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Orario e prezzo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Orario</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => set('time', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Quota annuale (€)</label>
              <input
                type="number"
                value={form.price_eur}
                onChange={(e) => set('price_eur', e.target.value)}
                placeholder="0 se gratuito"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Descrizione</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Descrivi il tuo run club..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>
        </div>

        {/* Social e contatti */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Social e contatti</h2>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Sito web</label>
            <input type="url" value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="https://..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Instagram</label>
              <input type="text" value={form.instagram} onChange={(e) => set('instagram', e.target.value)} placeholder="@nomeaccount" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Strava</label>
              <input type="text" value={form.strava} onChange={(e) => set('strava', e.target.value)} placeholder="nome club su Strava" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">WhatsApp</label>
              <input type="url" value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="https://chat.whatsapp.com/..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Organizzatore</label>
              <input type="text" value={form.organizer} onChange={(e) => set('organizer', e.target.value)} placeholder="Nome organizzatore" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email contatto</label>
            <input type="email" value={form.contact_email} onChange={(e) => set('contact_email', e.target.value)} placeholder="info@runclub.it" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-4 rounded-2xl font-semibold transition-colors"
        >
          {loading ? '⏳ Invio in corso...' : '🏃 Invia proposta'}
        </button>

      </div>
      <Footer />
    </div>
  )
}