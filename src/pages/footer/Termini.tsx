import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'

export default function Privacy() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate(-1)} className="text-blue-200 hover:text-white text-sm mb-4 flex items-center gap-1">
            ← Torna indietro
          </button>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-gray-600 text-sm leading-relaxed">
          <p className="text-gray-400 italic">Privacy Policy in aggiornamento. Torna presto!</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}