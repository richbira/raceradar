import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-6 px-4 mt-10">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-400">
        <p>© 2026 RaceRadar</p>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
          <Link to="/termini" className="hover:text-gray-600 transition-colors">Termini</Link>
          <Link to="/contatti" className="hover:text-gray-600 transition-colors">Contatti</Link>
        </div>
      </div>
    </footer>
  )
}