import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card.jsx";
import locationsRaw from "../data/locations.json";
import { useLang } from "../contexts/LanguageContext.jsx";
import { tText } from "../utils/i18n.js";
import { Link } from "react-router-dom";

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
    <div className="section container">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
        <header style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:20, marginBottom:18}}>
          <div>
            <h1 style={{margin:0, fontSize: 'clamp(20px, 2.6vw, 30px)'}}>Explore</h1>
            <p style={{margin: '6px 0 0', color:'var(--muted)'}}>Find quieter spots, hikes, and hidden gems — filtered to your vibe.</p>
          </div>

          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <div style={{display:'flex', gap:8, alignItems:'center'}} className="card" >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or city"
                style={{
                  padding: '10px 12px',
                  border:'none',
                  outline:'none',
                  background:'transparent',
                  color:'var(--txt-1)',
                  width:220
                }}
              />
            </div>

            <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="btn" style={{padding:'8px 10px'}}>
              <option value="rating-desc">Top rated</option>
              <option value="rating-asc">Lowest rating</option>
              <option value="name-asc">Name A–Z</option>
            </select>
          </div>
        </header>

        <div style={{display:'flex', gap:10, marginBottom:16, flexWrap:'wrap'}}>
          {crowdOptions.map(opt => (
            <button
              key={opt}
              onClick={()=>setCrowdFilter(opt)}
              className="btn"
              style={{opacity: crowdFilter===opt?1:0.78, padding:'8px 10px', borderRadius:12, background: crowdFilter===opt ? 'linear-gradient(90deg,var(--e-sage),var(--e-fern))' : undefined}}
            >
              {opt === 'all' ? 'All' : opt}
            </button>
          ))}
        </div>

        <section>
          <div className="grid">
            {filtered.length === 0 && (
              <div className="card col-12" style={{padding:20}}>No results — try clearing filters.</div>
            )}

            {filtered.map((loc) => (
              <div key={loc.id} className="col-4" style={{padding:8}}>
                <Card className="spot-card" style={{padding:12, cursor:'pointer'}}>
                  <Link to={`/location/${loc.slug}`} style={{textDecoration:'none', color:'inherit'}}>
                    <div style={{position:'relative', overflow:'hidden', borderRadius:12}}>
                      <img src={loc.image} alt={loc._name} style={{width:'100%', height:200, objectFit:'cover', display:'block', transition:'transform .45s ease'}} />
                      <div style={{position:'absolute', left:12, bottom:12, background:'linear-gradient(90deg, rgba(16,19,15,0.6), rgba(16,19,15,0.2))', padding:'8px 10px', borderRadius:10}}>
                        <strong style={{display:'block', fontSize:16}}>{loc._name}</strong>
                        <small style={{color:'var(--muted)'}}>{loc._city} • ★ {loc.rating}</small>
                      </div>
                    </div>

                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:10}}>
                      <div style={{display:'flex', gap:8, alignItems:'center'}}>
                        <span className="badge">{loc._crowd}</span>
                        <span style={{color:'var(--muted)'}}>{loc.best_time}</span>
                      </div>
                      <div>
                        <button className="btn">View</button>
                      </div>
                    </div>
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
