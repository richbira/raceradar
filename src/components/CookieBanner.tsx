import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [visible, setVisible] = useState(
    () => !localStorage.getItem('cookie-consent')
  )

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm">
          <p className="font-semibold mb-1">🍪 Utilizziamo i cookie</p>
          <p className="text-gray-400 text-xs leading-relaxed">
            Usiamo cookie tecnici per il funzionamento del sito. Leggi la nostra{' '}
            <Link to="/privacy" className="underline text-blue-400 hover:text-blue-300">
              Privacy Policy
            </Link>{' '}
            per maggiori informazioni.
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleReject}
            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            Rifiuta
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  )
}