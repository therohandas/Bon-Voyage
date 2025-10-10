import React from 'react'
import { useParams } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import MapView from '../components/MapView.jsx'
import locations from '../data/locations.json'
import crowdMap from '../data/crowd.json'
import { useLang } from '../contexts/LanguageContext.jsx'
import { tText } from '../utils/i18n.js'

export default function Spot() {
  const { slug } = useParams()
  const { lang } = useLang()
  const item = locations.find(l => l.slug === slug)
  if (!item) return <PageTransition><div className="container" style={{padding:'24px'}}>Location not found.</div></PageTransition>

  const crowdStatus = (crowdMap && crowdMap[item.slug]) || item.crowd || 'Unknown'
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`
  const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`

  return (
    <PageTransition>
      <main className="container" style={{paddingTop:24}}>
        <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:20}}>
          <div className="card" style={{padding:20}}>
            <h1 style={{marginTop:0}}>{tText(item.name, lang)}</h1>
            <div style={{display:'flex', gap:8, alignItems:'center', marginBottom:12}}>
              <span className="badge">Crowd: {tText(crowdStatus, lang)}</span>
              <span className="badge">Rating: {tText(item.rating, lang)}</span>
              <span className="badge">Best time: {tText(item.best_time, lang)}</span>
            </div>
            <p style={{color:'var(--muted)'}}>{tText(item.description, lang)}</p>

            <div style={{marginTop:16}}>
              <h3 style={{marginBottom:8}}>Details</h3>
              <table style={{width:'100%'}}>
                <tbody>
                  <tr><td style={{padding:6, width:140}}>Timings</td><td style={{padding:6}}>{tText(item.timings, lang)}</td></tr>
                  <tr><td style={{padding:6}}>Entry Fee</td><td style={{padding:6}}>{tText(item.entry_fee, lang)}</td></tr>
                  <tr><td style={{padding:6}}>Activities</td><td style={{padding:6}}>{Array.isArray(item.activities) ? item.activities.join(', ') : tText(item.activities, lang)}</td></tr>
                </tbody>
              </table>
            </div>

            <div style={{marginTop:16, display:'flex', gap:12}}>
              <a className="btn" href={mapsLink} target="_blank" rel="noreferrer">Open in Google Maps</a>
              <a className="btn" href={directionsLink} target="_blank" rel="noreferrer">Get Directions</a>
            </div>
          </div>

          <div className="card" style={{padding:12}}>
            <MapView center={[item.lat, item.lng]} markers={[{lat:item.lat, lng:item.lng, title:tText(item.name, lang)}]} />
          </div>
        </div>
      </main>
    </PageTransition>
  )
}
