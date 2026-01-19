import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Location.jsx'
import Spot from './pages/Spot.jsx'
import Footer from './components/Footer.jsx'
import ItineraryGenerator from "./pages/ItineraryGenerator";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import Recommendations from "./pages/Recommendations";
import TravelTools from "./pages/TravelTools";
import AIAssistant from "./components/AIAssistant";

export default function App() {
  const location = useLocation()
  return (
    <div className="app-shell">
      {location.pathname !== '/' && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/itinerary-generator" element={<ItineraryGenerator />} />
          <Route path="/location/:slug" element={<Spot />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/travel-tools" element={<TravelTools />} />
        </Routes>
      </AnimatePresence>
      <AIAssistant />
      <Footer />
    </div>
  )
}
