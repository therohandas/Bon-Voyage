import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import FeaturedGrid from "../components/FeaturedGrid";
import "../index.css";

const featured = [
  {
    id: 1,
    title: "Puri (Jagannath Temple)",
    href: "/location/jagannath-temple",
    image: "https://shorturl.at/6jkpi",
    rating: 4.6
  },
  {
    id: 2,
    title: "Konark Sun Temple",
    href: "/location/konark-sun-temple",
    image: "https://shorturl.at/LubwT",
    rating: 4.7
  },
  {
    id: 3,
    title: "Chilika Lake",
    href: "/location/chilika-lake",
    image: "https://tinyurl.com/2w6xekkr",
    rating: 4.7
  },
  {
    id: 4,
    title: "Simlipal National Park",
    href: "/location/simlipal-national-park",
    image: "https://tinyurl.com/mtf7t69p",
    rating: 4.6
  },
  {
    id: 5,
    title: "Gopalpur-on-Sea",
    href: "/location/gopalpur-on-sea",
    image: "https://tinyurl.com/mr4abzha",
    rating: 4.3
  },
  {
    id: 6,
    title: "Raghurajpur Artist Village",
    href: "/location/raghurajpur-artist-village",
    image: "https://tinyurl.com/ytrrn4rf",
    rating: 4.5
  }
];

const stats = [
  { value: "150+", label: "Destinations" },
  { value: "30", label: "Districts Covered" },
  { value: "1000+", label: "Happy Travelers" },
  { value: "4.8", label: "Average Rating" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-bg0 text-txt1 antialiased">
      <Hero />

      <main>
        {/* Featured Destinations */}
        <FeaturedGrid items={featured} />

        {/* Stats Section */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <motion.div
              className="grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="card"
                  style={{
                    padding: '32px 24px',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(47,93,98,.08), rgba(85,122,87,.05))'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #4CAF50, #81C784)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '8px'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ color: 'var(--txt-2)', fontSize: '.95rem' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <section id="map" className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="section-header">
                <h2 className="section-title">Explore the Map</h2>
              </div>
              <p style={{ color: 'var(--txt-2)', marginBottom: '20px', maxWidth: '600px' }}>
                Click on destination pages to see exact locations and get directions.
              </p>
              <div className="map-container" style={{ height: '360px' }}>
                <iframe
                  title="India map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=68.176645%2C6.747139%2C97.402561%2C35.494009&layer=mapnik"
                  style={{ width: '100%', height: '100%', border: 0 }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section">
          <div className="container">
            <motion.div
              className="cta-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="cta-content">
                <h2>Ready to Plan Your Adventure?</h2>
                <p>
                  Tell us what you love — beaches, wildlife, temples, or offbeat trails —
                  and we'll craft a personalized itinerary just for you.
                </p>
              </div>
              <a href="/itinerary-generator" className="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                Open Trip Planner
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
