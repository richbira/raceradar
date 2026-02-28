import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { RACE_TYPES } from '../types'
import type { RaceType } from '../types'
import Footer from '../components/Footer'

const DISTANCES_BY_TYPE: Record<RaceType, string[]> = {
  Running: ['5k', '10k', 'Half-Marathon', 'Marathon', 'Ultra'],
  Triathlon: ['Sprint', 'Olympic', 'Half-Ironman', 'Ironman'],
  Trail: ['Ultra'],
  Cycling: [],
  Hyrox: ['Hyrox-Single', 'Hyrox-Doubles', 'Hyrox-Relay'],
}

export default function ProposeRace() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: '',
    type: '' as RaceType | '',
    distances: [] as string[],
    date: '',
    end_date: '',
    city: '',
    region: '',
    website: '',
    price_eur: '',
    description: '',
    organizer: '',
    contact_email: '',
    instagram: '',
  })
  // aggiungere venue,contact_phone, orario di partenza,

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const toggleDistance = (dist: string) => {
    setForm((prev) => ({
      ...prev,
      distances: prev.distances.includes(dist)
        ? prev.distances.filter((d) => d !== dist)
        : [...prev.distances, dist],
    }))
  }

  const handleSubmit = async () => {
    // Validazione base
    if (!form.name || !form.type || !form.date || !form.city || !form.region) {
      setError('Compila almeno: nome, tipo, data, città e regione.')
      return
    }
    if (form.distances.length === 0) {
      setError('Seleziona almeno una distanza.')
      return
    }

    setLoading(true)
    setError(null)

    const { error } = await supabase.from('pending_races').insert({
      name: form.name,
      type: form.type,
      distances: form.distances,
      date: form.date,
      end_date: form.end_date || null,
      city: form.city,
      region: form.region,
      country: 'Italia', // Piu in futuro scegliere paese
      website: form.website || null,
      price_eur: form.price_eur ? parseFloat(form.price_eur) : null,
      description: form.description || null,
      organizer: form.organizer || null,
      contact_email: form.contact_email || null,
      instagram: form.instagram || null,
      status: 'pending',
    })

    setLoading(false)

    if (error) {
      setError('Errore durante l\'invio. Riprova più tardi.')
    } else {
      setSuccess(true)
    }
  }

  if (success) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
        <p className="text-4xl mb-4">🎉</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Grazie!</h2>
        <p className="text-gray-500 mb-6">La tua gara è stata inviata e verrà revisionata dal nostro team.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
        >
          Torna alla Home
        </button>
      </div>
    </div>
  )

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
          <h1 className="text-3xl font-bold">📝 Proponi una gara</h1>
          <p className="text-blue-100 mt-1">Compila il form e il nostro team la verificherà.</p>
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

          {/* Nome */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Nome gara *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="es. Milano City Marathon"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Tipo *</label>
            <div className="flex gap-2 flex-wrap">
              {RACE_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    set('type', type)
                    setForm((prev) => ({ ...prev, type, distances: [] }))
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    form.type === type
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Distanze */}
          {form.type && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Distanze *</label>
              <div className="flex gap-2 flex-wrap">
                {DISTANCES_BY_TYPE[form.type as RaceType].map((dist) => (
                  <button
                    key={dist}
                    onClick={() => toggleDistance(dist)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                      form.distances.includes(dist)
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'
                    }`}
                  >
                    {dist}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Data *</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Data fine <span className="text-gray-400">(opzionale)</span></label>
              <input
                type="date"
                value={form.end_date}
                onChange={(e) => set('end_date', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Città e Regione */}
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
        </div>

        {/* Info aggiuntive */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Info aggiuntive</h2>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Sito web</label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => set('website', e.target.value)}
              placeholder="https://..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Prezzo iscrizione (€)</label>
            <input
              type="number"
              value={form.price_eur}
              onChange={(e) => set('price_eur', e.target.value)}
              placeholder="es. 50"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Descrizione</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Descrivi brevemente la gara..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Organizzatore</label>
            <input
              type="text"
              value={form.organizer}
              onChange={(e) => set('organizer', e.target.value)}
              placeholder="es. ASD Milano Running"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email contatto</label>
              <input
                type="email"
                value={form.contact_email}
                onChange={(e) => set('contact_email', e.target.value)}
                placeholder="info@gara.it"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Instagram</label>
              <input
                type="text"
                value={form.instagram}
                onChange={(e) => set('instagram', e.target.value)}
                placeholder="@nomeaccount"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-4 rounded-2xl font-semibold transition-colors"
        >
          {loading ? '⏳ Invio in corso...' : '📝 Invia proposta'}
        </button>

      </div>
      <Footer />
    </div>
  )
}