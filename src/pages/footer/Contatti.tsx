import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'

export default function Contatti() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate(-1)} className="text-blue-200 hover:text-white text-sm mb-4 flex items-center gap-1">
            ← Torna indietro
          </button>
          <h1 className="text-3xl font-bold">Contatti</h1>
          <p className="text-blue-100 mt-1">Hai domande o vuoi segnalarci qualcosa?</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">

        {/* Card contatti */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Scrivici</h2>

          <a
            href="mailto:info@raceradar.it"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <span className="text-2xl">📧</span>
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-gray-400">info@raceradar.it</p>
            </div>
          </a>

          <a
            href="https://instagram.com/raceradar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <span className="text-2xl">📸</span>
            <div>
              <p className="font-medium">Instagram</p>
              <p className="text-sm text-gray-400">@raceradar</p>
            </div>
          </a>
        </div>

        {/* Card proponi gara */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Vuoi aggiungere una gara?</h2>
          <p className="text-sm text-gray-600 mb-4">Se sei un organizzatore e vuoi pubblicare la tua gara su RaceRadar, usa il nostro form dedicato.</p>
          <button
            onClick={() => navigate('/proponi-gara')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
          >
            📝 Proponi una gara
          </button>
        </div>

      </div>

      <Footer />
    </div>
  )
}