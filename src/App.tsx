import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RaceDetail from './pages/RaceDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/race/:id" element={<RaceDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App