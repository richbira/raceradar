import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RaceDetail from './pages/races/RaceDetail'
import ProposeRace from './pages/races/ProposeRace'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import Termini from './pages/footer/Termini'
import Privacy from './pages/footer/Privacy'
import CookieBanner from './components/CookieBanner'
import Contatti from './pages/footer/Contatti'
import RunClubs from './pages/runClub/RunClubs'
import ProposeRunClub from './pages/runClub/ProposeRunClub'
import RunClubDetail from './pages/runClub/RunClubDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/race/:id" element={<RaceDetail />} />
        <Route path="/proponi-gara" element={<ProposeRace />} />

        {/* Pagine per admin*/}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Pagine FOOTER*/}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/termini" element={<Termini />} />
        <Route path="/contatti" element={<Contatti />} />
        
        {/* Pagine Run Club*/}
        <Route path="/run-clubs" element={<RunClubs />} />
        <Route path="/proponi-run-club" element={<ProposeRunClub />} />
        <Route path="/run-clubs/:id" element={<RunClubDetail />} />
      </Routes>
      <CookieBanner />
    </BrowserRouter>
  )
}

export default App