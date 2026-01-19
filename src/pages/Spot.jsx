import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import MapView from '../components/MapView.jsx'
import locations from '../data/locations.json'
import crowdMap from '../data/crowd.json'
import galleryData from '../data/galleryData.json'
import { useLang } from '../contexts/LanguageContext.jsx'
import { tText } from '../utils/i18n.js'
import FavoriteButton from '../components/FavoriteButton.jsx'
import CompareButton from '../components/CompareButton.jsx'
import WeatherWidget from '../components/WeatherWidget.jsx'
import PhotoGallery from '../components/PhotoGallery.jsx'
import ReviewsSection from '../components/ReviewsSection.jsx'
import NearbyAttractions from '../components/NearbyAttractions.jsx'
import BestTimeCalendar from '../components/BestTimeCalendar.jsx'
import AIInsights from '../components/AIInsights.jsx'

export default function Spot() {
  const { slug } = useParams()
  const { lang } = useLang()
  const item = locations.find(l => l.slug === slug)

  if (!item) {
    return (
      <PageTransition>
        <div className="page-content">
          <div className="container section" style={{ textAlign: 'center', paddingTop: 120 }}>
            <h1 style={{ marginBottom: 16 }}>Location not found</h1>
            <p style={{ color: 'var(--txt-2)', marginBottom: 24 }}>
              The destination you're looking for doesn't exist.
            </p>
            <Link to="/explore" className="btn btn-primary">
              Back to Explore
            </Link>
          </div>
        </div>
      </PageTransition>
    )
  }

  const crowdStatus = (crowdMap && crowdMap[item.slug]) || item.crowd || 'Unknown'
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`
  const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`
  const name = tText(item.name, lang)

  // Get gallery images for this location
  const images = galleryData[item.slug] || galleryData.default || []

  return (
    <PageTransition>
      <div className="page-content">
        {/* Hero Image */}
        <div style={{
          position: 'relative',
          height: '45vh',
          minHeight: 300,
          overflow: 'hidden'
        }}>
          <img
            src={item.image}
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(0deg, var(--bg-0) 0%, rgba(10,13,10,.4) 50%, transparent 100%)'
          }} />

          {/* Breadcrumb */}
          <div className="container" style={{
            position: 'absolute',
            top: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Link
              to="/explore"
              className="btn"
              style={{ padding: '8px 16px', fontSize: '.85rem' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Explore
            </Link>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 8 }}>
              <CompareButton destination={item} showLabel />
              <FavoriteButton destination={item} showLabel />
            </div>
          </div>
        </div>

        <main className="container" style={{ marginTop: -80, position: 'relative', zIndex: 10 }}>
          {/* Main Content Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 24,
            marginBottom: 32
          }}>
            {/* Main Content Card */}
            <motion.div
              className="card"
              style={{ padding: 32 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                fontFamily: "'Playfair Display', serif",
                marginBottom: 16
              }}>
                {name}
              </h1>

              {/* Badges */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
                <span className="badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 4 }}>
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  {tText(crowdStatus, lang)}
                </span>
                <span className="badge" style={{ background: 'rgba(201,162,39,.15)', borderColor: 'rgba(201,162,39,.3)', color: 'var(--e-gold)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 4 }}>
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  {tText(item.rating, lang)}
                </span>
                <span className="badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 4 }}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                  {tText(item.best_time, lang)}
                </span>
              </div>

              <p style={{ color: 'var(--txt-2)', lineHeight: 1.7, marginBottom: 28 }}>
                {tText(item.description, lang)}
              </p>

              {/* Details Table */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>Essential Info</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 16
                }}>
                  <div className="card" style={{ padding: 16, background: 'rgba(255,255,255,.02)' }}>
                    <div style={{ color: 'var(--muted)', fontSize: '.85rem', marginBottom: 4 }}>Timings</div>
                    <div>{tText(item.timings, lang)}</div>
                  </div>
                  <div className="card" style={{ padding: 16, background: 'rgba(255,255,255,.02)' }}>
                    <div style={{ color: 'var(--muted)', fontSize: '.85rem', marginBottom: 4 }}>Entry Fee</div>
                    <div>{tText(item.entry_fee, lang)}</div>
                  </div>
                  <div className="card" style={{ padding: 16, background: 'rgba(255,255,255,.02)' }}>
                    <div style={{ color: 'var(--muted)', fontSize: '.85rem', marginBottom: 4 }}>Activities</div>
                    <div>{Array.isArray(item.activities) ? item.activities.join(', ') : tText(item.activities, lang)}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a className="btn btn-primary" href={mapsLink} target="_blank" rel="noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Open in Maps
                </a>
                <a className="btn" href={directionsLink} target="_blank" rel="noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 11l19-9-9 19-2-8-8-2z" />
                  </svg>
                  Get Directions
                </a>
                <Link to="/itinerary-generator" className="btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Add to Trip
                </Link>
              </div>
            </motion.div>

            {/* Map Card */}
            <motion.div
              className="card"
              style={{ padding: 16, minHeight: 350 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <MapView
                center={[item.lat, item.lng]}
                markers={[{ lat: item.lat, lng: item.lng, title: name }]}
              />
            </motion.div>
          </div>

          {/* Second Row - Weather & Best Time */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 24,
            marginBottom: 32
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <WeatherWidget lat={item.lat} lng={item.lng} locationName={name} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <BestTimeCalendar locationSlug={item.slug} />
            </motion.div>
          </div>

          {/* AI Insights */}
          <motion.div
            style={{ marginBottom: 32 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <AIInsights destination={item} />
          </motion.div>

          {/* Photo Gallery */}
          {images.length > 0 && (
            <motion.div
              style={{ marginBottom: 32 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <PhotoGallery images={images} locationName={name} />
            </motion.div>
          )}

          {/* Nearby Attractions */}
          <motion.div
            style={{ marginBottom: 32 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <NearbyAttractions currentLocation={item} maxDistance={50} />
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            style={{ marginBottom: 32 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ReviewsSection locationSlug={item.slug} />
          </motion.div>
        </main>
      </div>
    </PageTransition>
  )
}
