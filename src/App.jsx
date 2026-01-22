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
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import EasterEgg67 from "./components/EasterEgg67";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const location = useLocation()
  return (
    <div className="app-shell">
      <EasterEgg67 />
      {location.pathname !== '/' && location.pathname !== '/admin' && <Navbar />}
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
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

