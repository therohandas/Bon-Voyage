import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import locations from '../data/locations.json';
import { generateAIItinerary } from '../services/aiService';
import { useFavorites } from '../contexts/FavoritesContext';
import { getImageProps } from '../utils/imageUtils';

export default function ItineraryGenerator() {
  const { favorites } = useFavorites();

  // Form state
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [duration, setDuration] = useState(3);
  const [travelStyle, setTravelStyle] = useState('moderate');
  const [interests, setInterests] = useState([]);
  const [budget, setBudget] = useState('midRange');
  const [companions, setCompanions] = useState('couple');
  const [specialRequests, setSpecialRequests] = useState('');

  // UI state
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [error, setError] = useState(null);

  const interestOptions = [
    { key: 'beaches', label: 'Beaches', emoji: '🏖️' },
    { key: 'temples', label: 'Temples & Spirituality', emoji: '🛕' },
    { key: 'wildlife', label: 'Wildlife & Nature', emoji: '🦁' },
    { key: 'adventure', label: 'Adventure & Trekking', emoji: '🥾' },
    { key: 'culture', label: 'Culture & History', emoji: '🏛️' },
    { key: 'food', label: 'Food & Culinary', emoji: '🍽️' },
    { key: 'photography', label: 'Photography', emoji: '📸' },
    { key: 'relaxation', label: 'Relaxation', emoji: '🧘' }
  ];

  const companionOptions = [
    { key: 'solo', label: 'Solo', emoji: '🧑' },
    { key: 'couple', label: 'Couple', emoji: '❤️' },
    { key: 'family', label: 'Family with Kids', emoji: '👨‍👩‍👧‍👦' },
    { key: 'friends', label: 'Friends Group', emoji: '👯' },
    { key: 'seniors', label: 'Senior Citizens', emoji: '👴' }
  ];

  const toggleDestination = (loc) => {
    setSelectedDestinations(prev => {
      const exists = prev.find(d => d.id === loc.id);
      if (exists) {
        return prev.filter(d => d.id !== loc.id);
      }
      return [...prev, loc];
    });
  };

  const toggleInterest = (key) => {
    setInterests(prev =>
      prev.includes(key) ? prev.filter(i => i !== key) : [...prev, key]
    );
  };

  const getName = (name) => {
    if (typeof name === 'string') return name;
    if (typeof name === 'object') return name.en || Object.values(name)[0];
    return 'Unknown';
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const itinerary = await generateAIItinerary({
        destinations: selectedDestinations,
        duration,
        travelStyle,
        interests,
        budget,
        companions,
        specialRequests
      });

      setGeneratedItinerary(itinerary);
      setStep(4);
    } catch (err) {
      console.error('Generation failed:', err);
      setError('Failed to generate itinerary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="page-content">
      <div className="section container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <header style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="hero-badge" style={{ marginBottom: 16 }}>
              <span style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ✨ Powered by AI
              </span>
            </span>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontFamily: "'Playfair Display', serif",
              marginBottom: 12
            }}>
              AI Trip Planner
            </h1>
            <p style={{ color: 'var(--txt-2)', maxWidth: 600, margin: '0 auto' }}>
              Tell us your preferences and let AI create a personalized day-by-day itinerary for your Odisha adventure.
            </p>
          </header>

          {/* Progress Steps */}
          {step < 4 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 40
            }}>
              {[1, 2, 3].map(s => (
                <div
                  key={s}
                  style={{
                    width: s === step ? 40 : 12,
                    height: 12,
                    borderRadius: 6,
                    background: s <= step
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'rgba(255,255,255,0.1)',
                    transition: 'all 0.3s'
                  }}
                />
              ))}
            </div>
          )}

          {/* Step 1: Select Destinations */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="card" style={{ padding: 32, maxWidth: 900, margin: '0 auto' }}>
                  <h2 style={{ marginBottom: 8 }}>Where do you want to go?</h2>
                  <p style={{ color: 'var(--muted)', marginBottom: 24 }}>
                    Select destinations for your trip (or leave empty for AI recommendations)
                  </p>

                  {/* Favorites shortcut */}
                  {favorites.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <h4 style={{ fontSize: '.9rem', color: 'var(--muted)', marginBottom: 12 }}>
                        ❤️ From your favorites
                      </h4>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {favorites.map(fav => (
                          <button
                            key={fav.id}
                            onClick={() => toggleDestination(fav)}
                            style={{
                              padding: '8px 16px',
                              background: selectedDestinations.find(d => d.id === fav.id)
                                ? 'rgba(74, 222, 128, 0.15)'
                                : 'rgba(255,255,255,0.05)',
                              border: `1px solid ${selectedDestinations.find(d => d.id === fav.id)
                                ? 'rgba(74, 222, 128, 0.4)'
                                : 'rgba(255,255,255,0.1)'}`,
                              borderRadius: 8,
                              cursor: 'pointer',
                              color: selectedDestinations.find(d => d.id === fav.id)
                                ? '#4ade80'
                                : 'var(--txt-1)'
                            }}
                          >
                            {getName(fav.name)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All destinations grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: 12,
                    maxHeight: 350,
                    overflowY: 'auto',
                    padding: 4
                  }}>
                    {locations.map(loc => {
                      const isSelected = selectedDestinations.find(d => d.id === loc.id);
                      return (
                        <motion.button
                          key={loc.id}
                          onClick={() => toggleDestination(loc)}
                          style={{
                            padding: 0,
                            background: 'none',
                            border: `2px solid ${isSelected ? '#667eea' : 'transparent'}`,
                            borderRadius: 12,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div style={{ position: 'relative', height: 80 }}>
                            <img
                              {...getImageProps(loc)}
                              alt={getName(loc.name)}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: isSelected ? 1 : 0.7
                              }}
                            />
                            {isSelected && (
                              <div style={{
                                position: 'absolute',
                                top: 6,
                                right: 6,
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                background: '#667eea',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                ✓
                              </div>
                            )}
                          </div>
                          <div style={{ padding: '8px 10px', fontSize: '.8rem' }}>
                            {getName(loc.name)}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--muted)' }}>
                      {selectedDestinations.length} destination{selectedDestinations.length !== 1 ? 's' : ''} selected
                    </span>
                    <button
                      onClick={() => setStep(2)}
                      className="btn btn-primary"
                    >
                      Continue
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Trip Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="card" style={{ padding: 32, maxWidth: 700, margin: '0 auto' }}>
                  <h2 style={{ marginBottom: 24 }}>Tell us about your trip</h2>

                  {/* Duration */}
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ display: 'block', marginBottom: 12, fontWeight: 500 }}>
                      How many days?
                    </label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {[2, 3, 4, 5, 7, 10, 14].map(d => (
                        <button
                          key={d}
                          onClick={() => setDuration(d)}
                          style={{
                            padding: '10px 20px',
                            background: duration === d
                              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                              : 'rgba(255,255,255,0.05)',
                            border: 'none',
                            borderRadius: 8,
                            cursor: 'pointer',
                            color: 'white',
                            fontWeight: duration === d ? 600 : 400
                          }}
                        >
                          {d} days
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Travel Style */}
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ display: 'block', marginBottom: 12, fontWeight: 500 }}>
                      Your travel style
                    </label>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      {[
                        { key: 'relaxed', label: 'Relaxed', desc: 'Take it slow, plenty of rest' },
                        { key: 'moderate', label: 'Balanced', desc: 'Mix of activity and rest' },
                        { key: 'adventure', label: 'Packed', desc: 'Maximum experiences' }
                      ].map(style => (
                        <button
                          key={style.key}
                          onClick={() => setTravelStyle(style.key)}
                          style={{
                            flex: '1 1 150px',
                            padding: '16px',
                            background: travelStyle === style.key
                              ? 'rgba(102, 126, 234, 0.15)'
                              : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${travelStyle === style.key
                              ? 'rgba(102, 126, 234, 0.4)'
                              : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: 12,
                            cursor: 'pointer',
                            color: travelStyle === style.key ? '#667eea' : 'var(--txt-1)',
                            textAlign: 'left'
                          }}
                        >
                          <div style={{ fontWeight: 600 }}>{style.label}</div>
                          <div style={{ fontSize: '.8rem', color: 'var(--muted)', marginTop: 4 }}>
                            {style.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Companions */}
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ display: 'block', marginBottom: 12, fontWeight: 500 }}>
                      Who's traveling?
                    </label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {companionOptions.map(c => (
                        <button
                          key={c.key}
                          onClick={() => setCompanions(c.key)}
                          style={{
                            padding: '10px 16px',
                            background: companions === c.key
                              ? 'rgba(251, 191, 36, 0.15)'
                              : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${companions === c.key
                              ? 'rgba(251, 191, 36, 0.4)'
                              : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: 8,
                            cursor: 'pointer',
                            color: companions === c.key ? '#fbbf24' : 'var(--txt-1)'
                          }}
                        >
                          {c.emoji} {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ display: 'block', marginBottom: 12, fontWeight: 500 }}>
                      Budget preference
                    </label>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      {[
                        { key: 'budget', label: '💰 Budget', desc: 'Hostels, street food' },
                        { key: 'midRange', label: '💵 Comfortable', desc: 'Hotels, restaurants' },
                        { key: 'luxury', label: '💎 Luxury', desc: 'Premium experiences' }
                      ].map(b => (
                        <button
                          key={b.key}
                          onClick={() => setBudget(b.key)}
                          style={{
                            flex: '1 1 120px',
                            padding: '14px',
                            background: budget === b.key
                              ? 'rgba(74, 222, 128, 0.15)'
                              : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${budget === b.key
                              ? 'rgba(74, 222, 128, 0.4)'
                              : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: 10,
                            cursor: 'pointer',
                            color: budget === b.key ? '#4ade80' : 'var(--txt-1)',
                            textAlign: 'center'
                          }}
                        >
                          <div style={{ fontWeight: 500 }}>{b.label}</div>
                          <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: 4 }}>
                            {b.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                    <button onClick={() => setStep(1)} className="btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                    <button onClick={() => setStep(3)} className="btn btn-primary">
                      Continue
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Interests */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="card" style={{ padding: 32, maxWidth: 700, margin: '0 auto' }}>
                  <h2 style={{ marginBottom: 8 }}>What interests you most?</h2>
                  <p style={{ color: 'var(--muted)', marginBottom: 24 }}>
                    Select all that apply - this helps AI personalize your itinerary
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
                    {interestOptions.map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => toggleInterest(opt.key)}
                        style={{
                          padding: '14px 20px',
                          background: interests.includes(opt.key)
                            ? 'rgba(102, 126, 234, 0.15)'
                            : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${interests.includes(opt.key)
                            ? 'rgba(102, 126, 234, 0.4)'
                            : 'rgba(255,255,255,0.1)'}`,
                          borderRadius: 10,
                          cursor: 'pointer',
                          color: interests.includes(opt.key) ? '#667eea' : 'var(--txt-1)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          fontSize: '.95rem'
                        }}
                      >
                        <span style={{ fontSize: '1.2rem' }}>{opt.emoji}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {/* Special Requests */}
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ display: 'block', marginBottom: 12, fontWeight: 500 }}>
                      Any special requests? (optional)
                    </label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="E.g., wheelchair accessibility needed, vegetarian food only, early morning activities..."
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 10,
                        color: 'var(--txt-1)',
                        fontSize: '.95rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {error && (
                    <div style={{
                      padding: '12px 16px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: 8,
                      color: '#ef4444',
                      marginBottom: 20
                    }}>
                      {error}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={() => setStep(2)} className="btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="btn btn-primary"
                      style={{
                        background: isGenerating ? 'var(--muted)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      }}
                    >
                      {isGenerating ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            ✨
                          </motion.span>
                          Generating...
                        </>
                      ) : (
                        <>
                          <span>✨</span>
                          Generate AI Itinerary
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Generated Itinerary */}
            {step === 4 && generatedItinerary && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Itinerary Header */}
                <div className="card" style={{ padding: 32, marginBottom: 24, textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem', marginBottom: 12, display: 'block' }}>🎉</span>
                  <h1 style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: 12
                  }}>
                    {generatedItinerary.title}
                  </h1>
                  <p style={{ color: 'var(--txt-2)', maxWidth: 600, margin: '0 auto 20px' }}>
                    {generatedItinerary.summary}
                  </p>
                  <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <span className="badge">
                      📅 {generatedItinerary.days?.length || duration} Days
                    </span>
                    <span className="badge" style={{ background: 'rgba(74, 222, 128, 0.15)' }}>
                      💰 Est. {formatCurrency(generatedItinerary.totalBudget || 0)}
                    </span>
                    <span className="badge">
                      🌤️ {generatedItinerary.bestTimeToVisit}
                    </span>
                  </div>
                </div>

                {/* Day-by-Day Itinerary */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {generatedItinerary.days?.map((day, idx) => (
                    <motion.div
                      key={idx}
                      className="card"
                      style={{ padding: 24 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                        <div style={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '1.2rem'
                        }}>
                          {day.day}
                        </div>
                        <div>
                          <h3 style={{ marginBottom: 4 }}>{day.title}</h3>
                        </div>
                      </div>

                      {/* Activities */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
                        {day.activities?.map((act, actIdx) => (
                          <div
                            key={actIdx}
                            style={{
                              padding: 16,
                              background: 'rgba(255,255,255,0.03)',
                              borderRadius: 12,
                              borderLeft: '3px solid #667eea'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                              <span style={{
                                fontWeight: 600,
                                color: '#667eea',
                                fontSize: '.85rem'
                              }}>
                                {act.time}
                              </span>
                              {act.duration && (
                                <span style={{ color: 'var(--muted)', fontSize: '.8rem' }}>
                                  ⏱️ {act.duration}
                                </span>
                              )}
                            </div>
                            <h4 style={{ marginBottom: 6 }}>{act.activity}</h4>
                            <p style={{ color: 'var(--txt-2)', fontSize: '.9rem', marginBottom: 8 }}>
                              {act.description}
                            </p>
                            {act.tips && (
                              <p style={{ fontSize: '.8rem', color: '#fbbf24', fontStyle: 'italic' }}>
                                💡 {act.tips}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Meals */}
                      {day.meals && (
                        <div style={{ marginBottom: 16 }}>
                          <h4 style={{ fontSize: '.9rem', color: 'var(--muted)', marginBottom: 10 }}>
                            🍽️ Food Recommendations
                          </h4>
                          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            {Object.entries(day.meals).map(([meal, rec]) => (
                              <div
                                key={meal}
                                style={{
                                  padding: '8px 14px',
                                  background: 'rgba(251, 191, 36, 0.1)',
                                  borderRadius: 8,
                                  fontSize: '.85rem'
                                }}
                              >
                                <strong style={{ textTransform: 'capitalize' }}>{meal}:</strong> {rec}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Day Budget */}
                      {day.budget && (
                        <div style={{
                          padding: 16,
                          background: 'rgba(74, 222, 128, 0.05)',
                          borderRadius: 10
                        }}>
                          <h4 style={{ fontSize: '.85rem', color: 'var(--muted)', marginBottom: 10 }}>
                            💰 Day {day.day} Estimated Cost
                          </h4>
                          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            {Object.entries(day.budget).map(([cat, amount]) => (
                              <div key={cat} style={{ fontSize: '.85rem' }}>
                                <span style={{ color: 'var(--muted)', textTransform: 'capitalize' }}>{cat}:</span>{' '}
                                <strong>{formatCurrency(amount)}</strong>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Packing Tips */}
                {generatedItinerary.packingTips?.length > 0 && (
                  <div className="card" style={{ padding: 24, marginTop: 24 }}>
                    <h3 style={{ marginBottom: 16 }}>🎒 Packing Tips</h3>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {generatedItinerary.packingTips.map((tip, idx) => (
                        <span key={idx} className="badge">{tip}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  gap: 16,
                  justifyContent: 'center',
                  marginTop: 32,
                  flexWrap: 'wrap'
                }}>
                  <button onClick={() => setStep(1)} className="btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 4v6h6M23 20v-6h-6" />
                      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                    </svg>
                    Plan Another Trip
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="btn btn-primary"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 6 2 18 2 18 9" />
                      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                      <rect x="6" y="14" width="12" height="8" />
                    </svg>
                    Print Itinerary
                  </button>
                </div>

                <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '.8rem', marginTop: 24 }}>
                  ✨ Generated by AI. Please verify details before booking.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}