import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Location.jsx'
import Spot from './pages/Spot.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const location = useLocation()
  return (
    <div className="app-shell">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/location/:slug" element={<Spot />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
