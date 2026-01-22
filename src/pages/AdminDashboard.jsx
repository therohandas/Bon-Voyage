import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import locations from '../data/locations.json';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('stats');
    const [favorites, setFavorites] = useState([]);
    const [compareList, setCompareList] = useState([]);

    useEffect(() => {
        // Load data from localStorage
        const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
        const compare = JSON.parse(localStorage.getItem('compareList') || '[]');
        setFavorites(favs);
        setCompareList(compare);
    }, []);

    const clearCache = () => {
        localStorage.clear();
        setFavorites([]);
        setCompareList([]);
        alert('Cache cleared!');
    };

    const stats = {
        totalLocations: locations.length,
        categories: [...new Set(locations.map(l => l.category))],
        cities: [...new Set(locations.map(l => l.city))],
        favoritesCount: favorites.length,
        compareCount: compareList.length
    };

    const tabs = [
        { id: 'stats', label: '📊 Statistics', icon: '📊' },
        { id: 'controls', label: '⚙️ Controls', icon: '⚙️' },
        { id: 'data', label: '📋 User Data', icon: '📋' },
        { id: 'content', label: '📝 Content', icon: '📝' },
        { id: 'system', label: '🖥️ System', icon: '🖥️' }
    ];

    return (
        <div className="page-content" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
            <div className="section container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <header style={{ textAlign: 'center', marginBottom: 40 }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '8px 20px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: 50,
                            marginBottom: 16
                        }}>
                            <span style={{ color: '#ef4444' }}>🔒</span>
                            <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                                ADMIN ACCESS
                            </span>
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontFamily: "'Playfair Display', serif",
                            marginBottom: 8
                        }}>
                            Control Center
                        </h1>
                        <p style={{ color: 'var(--txt-2)' }}>
                            Welcome back, Rohan 👋
                        </p>
                    </header>

                    {/* Tab Navigation */}
                    <div style={{
                        display: 'flex',
                        gap: 8,
                        marginBottom: 32,
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '10px 20px',
                                    background: activeTab === tab.id ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255,255,255,0.05)',
                                    border: `1px solid ${activeTab === tab.id ? 'rgba(74, 222, 128, 0.4)' : 'rgba(255,255,255,0.1)'}`,
                                    borderRadius: 8,
                                    color: activeTab === tab.id ? '#4ade80' : 'var(--txt-1)',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    transition: 'all 0.2s'
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Statistics Tab */}
                    {activeTab === 'stats' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ maxWidth: 1000, margin: '0 auto' }}
                        >
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: 20,
                                marginBottom: 30
                            }}>
                                <StatCard label="Total Locations" value={stats.totalLocations} icon="📍" color="#3b82f6" />
                                <StatCard label="Categories" value={stats.categories.length} icon="🏷️" color="#8b5cf6" />
                                <StatCard label="Cities" value={stats.cities.length} icon="🏙️" color="#ec4899" />
                                <StatCard label="User Favorites" value={stats.favoritesCount} icon="❤️" color="#ef4444" />
                                <StatCard label="Compare List" value={stats.compareCount} icon="⚖️" color="#f59e0b" />
                            </div>

                            <div className="card" style={{ padding: 24 }}>
                                <h3 style={{ marginBottom: 16 }}>Categories Breakdown</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                    {stats.categories.map(cat => {
                                        const count = locations.filter(l => l.category === cat).length;
                                        return (
                                            <div key={cat} style={{
                                                padding: '8px 16px',
                                                background: 'rgba(255,255,255,0.05)',
                                                borderRadius: 6,
                                                fontSize: '0.85rem'
                                            }}>
                                                {cat}: <strong>{count}</strong>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Controls Tab */}
                    {activeTab === 'controls' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ maxWidth: 600, margin: '0 auto' }}
                        >
                            <div className="card" style={{ padding: 24 }}>
                                <h3 style={{ marginBottom: 20 }}>Quick Actions</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <button
                                        onClick={clearCache}
                                        style={{
                                            padding: '14px 20px',
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            border: '1px solid rgba(239, 68, 68, 0.3)',
                                            borderRadius: 8,
                                            color: '#ef4444',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 12
                                        }}
                                    >
                                        <span style={{ fontSize: '1.2rem' }}>🗑️</span>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>Clear All Cache</div>
                                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Remove favorites, compare list, and local storage</div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => window.location.reload()}
                                        style={{
                                            padding: '14px 20px',
                                            background: 'rgba(59, 130, 246, 0.1)',
                                            border: '1px solid rgba(59, 130, 246, 0.3)',
                                            borderRadius: 8,
                                            color: '#3b82f6',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 12
                                        }}
                                    >
                                        <span style={{ fontSize: '1.2rem' }}>🔄</span>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>Refresh App</div>
                                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Force reload the application</div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => {
                                            const data = JSON.stringify(localStorage, null, 2);
                                            const blob = new Blob([data], { type: 'application/json' });
                                            const url = URL.createObjectURL(blob);
                                            const a = document.createElement('a');
                                            a.href = url;
                                            a.download = 'bonvoyage-backup.json';
                                            a.click();
                                        }}
                                        style={{
                                            padding: '14px 20px',
                                            background: 'rgba(74, 222, 128, 0.1)',
                                            border: '1px solid rgba(74, 222, 128, 0.3)',
                                            borderRadius: 8,
                                            color: '#4ade80',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 12
                                        }}
                                    >
                                        <span style={{ fontSize: '1.2rem' }}>💾</span>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>Export Data</div>
                                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Download all local data as JSON</div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* User Data Tab */}
                    {activeTab === 'data' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ maxWidth: 800, margin: '0 auto' }}
                        >
                            <div className="card" style={{ padding: 24, marginBottom: 20 }}>
                                <h3 style={{ marginBottom: 16 }}>User Favorites ({favorites.length})</h3>
                                {favorites.length === 0 ? (
                                    <p style={{ color: 'var(--txt-2)' }}>No favorites saved</p>
                                ) : (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                        {favorites.map((slug, i) => {
                                            const loc = locations.find(l => l.slug === slug);
                                            return (
                                                <Link
                                                    key={i}
                                                    to={`/location/${slug}`}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: 'rgba(239, 68, 68, 0.1)',
                                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                                        borderRadius: 6,
                                                        color: 'var(--txt-1)',
                                                        textDecoration: 'none',
                                                        fontSize: '0.85rem'
                                                    }}
                                                >
                                                    {loc?.name || slug}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="card" style={{ padding: 24 }}>
                                <h3 style={{ marginBottom: 16 }}>Compare List ({compareList.length})</h3>
                                {compareList.length === 0 ? (
                                    <p style={{ color: 'var(--txt-2)' }}>No items in compare list</p>
                                ) : (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                        {compareList.map((slug, i) => {
                                            const loc = locations.find(l => l.slug === slug);
                                            return (
                                                <Link
                                                    key={i}
                                                    to={`/location/${slug}`}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: 'rgba(59, 130, 246, 0.1)',
                                                        border: '1px solid rgba(59, 130, 246, 0.2)',
                                                        borderRadius: 6,
                                                        color: 'var(--txt-1)',
                                                        textDecoration: 'none',
                                                        fontSize: '0.85rem'
                                                    }}
                                                >
                                                    {loc?.name || slug}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Content Tab */}
                    {activeTab === 'content' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ maxWidth: 600, margin: '0 auto' }}
                        >
                            <div className="card" style={{ padding: 24 }}>
                                <h3 style={{ marginBottom: 20 }}>Quick Links</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {[
                                        { to: '/explore', label: 'Explore Locations', icon: '🗺️' },
                                        { to: '/blog', label: 'Blog Posts', icon: '📝' },
                                        { to: '/itinerary-generator', label: 'Itinerary Generator', icon: '📅' },
                                        { to: '/travel-tools', label: 'Travel Tools', icon: '🧰' },
                                        { to: '/faq', label: 'FAQ Page', icon: '❓' },
                                        { to: '/contact', label: 'Contact Page', icon: '📧' }
                                    ].map(link => (
                                        <Link
                                            key={link.to}
                                            to={link.to}
                                            style={{
                                                padding: '14px 20px',
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: 8,
                                                color: 'var(--txt-1)',
                                                textDecoration: 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 12,
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <span style={{ fontSize: '1.2rem' }}>{link.icon}</span>
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* System Tab */}
                    {activeTab === 'system' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ maxWidth: 600, margin: '0 auto' }}
                        >
                            <div className="card" style={{ padding: 24 }}>
                                <h3 style={{ marginBottom: 20 }}>System Information</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <InfoRow label="App Name" value="Bon Voyage" />
                                    <InfoRow label="Version" value="1.6.7" />
                                    <InfoRow label="Environment" value={import.meta.env.MODE} />
                                    <InfoRow label="Build Time" value={new Date().toLocaleString()} />
                                    <InfoRow label="Browser" value={navigator.userAgent.split(' ').slice(-2).join(' ')} />
                                    <InfoRow label="Screen" value={`${window.innerWidth} × ${window.innerHeight}`} />
                                    <InfoRow label="LocalStorage Used" value={`${(JSON.stringify(localStorage).length / 1024).toFixed(2)} KB`} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color }) {
    return (
        <div style={{
            padding: 24,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            textAlign: 'center'
        }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>{icon}</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color }}>{value}</div>
            <div style={{ color: 'var(--txt-2)', fontSize: '0.9rem' }}>{label}</div>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
            <span style={{ color: 'var(--txt-2)' }}>{label}</span>
            <span style={{ fontWeight: 500 }}>{value}</span>
        </div>
    );
}
