import { useNavigate, useLocation } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="bg-blue-600 text-white py-10 px-4 text-center">
      <h1
        className="text-4xl font-bold mb-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        🎯 RaceRadar
      </h1>
      <p className="text-blue-100 text-lg">
        Discover running races, triathlons and trail events
      </p>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => navigate('/')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            location.pathname === '/'
              ? 'bg-white text-blue-600'
              : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
        >
          🏁 Gare
        </button>
        <button
          onClick={() => navigate('/run-clubs')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            location.pathname === '/run-clubs'
              ? 'bg-white text-blue-600'
              : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
        >
          🏃 Run Club
        </button>
      </div>
    </div>
  )
}