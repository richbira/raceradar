import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RaceDetail from './pages/RaceDetail'
import ProposeRace from './pages/ProposeRace'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/race/:id" element={<RaceDetail />} />
        <Route path="/proponi-gara" element={<ProposeRace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App