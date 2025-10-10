import PageTransition from '../components/PageTransition.jsx'
import Hero from '../components/Hero.jsx'
import Card from '../components/Card.jsx'
import { Link } from 'react-router-dom'
import locations from '../data/locations.json'
import { useLang } from '../contexts/LanguageContext.jsx'
import { tText } from '../utils/i18n.js'

export default function Home() {
  const { lang } = useLang()

  // Shuffle locations and pick 9
  const randomSpots = [...locations]
    .sort(() => Math.random() - 0.5) // shuffle
    .slice(0, 9) // pick 9

  return (
    <PageTransition>
      <Hero />
      <section className="section">
        <div className="container">
          <h2 style={{ marginBottom: 16 }}>Popular Spots</h2>
          <div className="grid">
            {randomSpots.map((spot) => (
              <Card key={spot.id} className="spot-card col-4">
                <Link
                  to={'/location/' + spot.slug}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <img
                    className="spot-img"
                    src={spot.image}
                    alt={tText(spot.name, lang)}
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <strong>{tText(spot.name, lang)}</strong>
                    <span style={{ fontSize: '.9rem', color: 'var(--e-sand)' }}>
                      ★ {tText(spot.rating, lang)}
                    </span>
                  </div>
                  <div className="spot-meta">
                    <span>{tText(spot.city, lang)}</span>
                    <span>{tText(spot.crowd, lang)}</span>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
