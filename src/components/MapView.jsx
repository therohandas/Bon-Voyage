// MapView: simple iframe-based map using OpenStreetMap embed
import React from 'react'

export default function MapView({ center = [0,0], markers = [] , zoom=15 }){
  const lat = center[0]
  const lng = center[1]
  const bbox = `${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}`
  const marker = encodeURIComponent(`${lat},${lng}`)
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`

  return (
    <div style={{width:'100%', height: '100%'}}>
      <iframe
        title="map"
        src={src}
        style={{border:0, width:'100%', height:420}}
      />
      <div style={{marginTop:8, display:'flex', gap:8, justifyContent:'flex-end'}}>
        <a className="badge" href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`} target="_blank" rel="noreferrer">Open OSM</a>
        <a className="badge" href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`} target="_blank" rel="noreferrer">Open Google Maps</a>
      </div>
    </div>
  )
}
