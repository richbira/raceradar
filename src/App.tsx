import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RaceDetail from './pages/RaceDetail'
import ProposeRace from './pages/ProposeRace'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/race/:id" element={<RaceDetail />} />
        <Route path="/proponi-gara" element={<ProposeRace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App