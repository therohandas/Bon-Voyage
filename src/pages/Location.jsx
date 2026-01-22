import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card.jsx";
import locationsRaw from "../data/locations.json";
import { useLang } from "../contexts/LanguageContext.jsx";
import { tText } from "../utils/i18n.js";
import { getImageProps } from "../utils/imageUtils";
import { Link } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton.jsx";
import CompareButton from "../components/CompareButton.jsx";

export default function Explore() {
  const { lang } = useLang ? useLang() : { lang: "en" };
  const [query, setQuery] = useState("");
  const [crowdFilter, setCrowdFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating-desc");

  // normalize locations to ensure safe text extraction
  const locations = useMemo(() => {
    return (locationsRaw || []).map((loc) => {
      return {
        ...loc,
        _name: tText(loc.name, lang),
        _city: tText(loc.city, lang),
        _crowd: tText(loc.crowd, lang),
        _rating: tText(loc.rating, lang),
      };
    });
  }, [locationsRaw, lang]);

  const crowdOptions = useMemo(() => {
    const set = new Set(locations.map((l) => l._crowd));
    return ["all", ...Array.from(set)];
  }, [locations]);

  const filtered = useMemo(() => {
    let list = locations.filter((l) => {
      const matchesQuery =
        !query ||
        l._name.toLowerCase().includes(query.toLowerCase()) ||
        l._city.toLowerCase().includes(query.toLowerCase());
      const matchesCrowd = crowdFilter === "all" || l._crowd === crowdFilter;
      return matchesQuery && matchesCrowd;
    });

    if (sortBy === "rating-desc") {
      list.sort((a, b) => Number(b.rating) - Number(a.rating));
    } else if (sortBy === "rating-asc") {
      list.sort((a, b) => Number(a.rating) - Number(b.rating));
    } else if (sortBy === "name-asc") {
      list.sort((a, b) => a._name.localeCompare(b._name));
    }

    return list;
  }, [locations, query, crowdFilter, sortBy]);

  return (
    <div className="page-content">
      <div className="section container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Header */}
          <header className="section-header" style={{ marginBottom: 32 }}>
            <div>
              <h1 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
                Explore Destinations
              </h1>
              <p style={{ color: 'var(--txt-2)', marginTop: 8, maxWidth: 500 }}>
                Find quieter spots, hikes, and hidden gems — filtered to your vibe.
              </p>
            </div>

            {/* Search & Sort */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="search-wrap">
                <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search destinations..."
                  className="search-input"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="btn"
                style={{ padding: '10px 16px', cursor: 'pointer' }}
              >
                <option value="rating-desc">Top rated</option>
                <option value="rating-asc">Lowest rating</option>
                <option value="name-asc">Name A–Z</option>
              </select>
            </div>
          </header>

          {/* Filter Chips */}
          <div className="filter-bar">
            {crowdOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setCrowdFilter(opt)}
                className={`chip ${crowdFilter === opt ? 'active' : ''}`}
              >
                {opt === 'all' ? '✦ All' : opt}
              </button>
            ))}
          </div>

          {/* Results Grid */}
          <section>
            {filtered.length === 0 && (
              <motion.div
                className="card"
                style={{ padding: 40, textAlign: 'center' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p style={{ color: 'var(--txt-2)', fontSize: '1.1rem' }}>
                  No results found — try clearing filters.
                </p>
              </motion.div>
            )}

            <div className="destination-grid">
              {filtered.map((loc, index) => (
                <motion.div
                  key={loc.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
                >
                  <div style={{ position: 'relative' }}>
                    <Link
                      to={`/location/${loc.slug}`}
                      className="destination-card"
                      style={{ display: 'block' }}
                    >
                      <div className="destination-image-wrap">
                        <img
                          {...getImageProps(loc)}
                          alt={loc._name}
                          className="destination-image"
                          loading="lazy"
                        />
                        <div className="destination-image-overlay" />
                        <div className="destination-rating">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                          </svg>
                          {loc.rating}
                        </div>
                      </div>

                      <div className="destination-content">
                        <h3 className="destination-title">{loc._name}</h3>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: 12
                        }}>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            <span className="badge">{loc._crowd}</span>
                            <span style={{ color: 'var(--muted)', fontSize: '.85rem' }}>
                              {loc.best_time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Action buttons */}
                    <div style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      display: 'flex',
                      gap: 6,
                      zIndex: 5
                    }}>
                      <CompareButton destination={loc} size="small" />
                      <FavoriteButton destination={loc} size="small" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
