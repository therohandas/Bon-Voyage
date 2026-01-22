import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const faqData = [
    {
        category: 'General',
        icon: '🌴',
        questions: [
            {
                q: 'What is Bon Voyage?',
                a: 'Bon Voyage is your ultimate guide to exploring Odisha, India. We provide comprehensive information about tourist destinations, including timings, entry fees, best times to visit, crowd levels, and personalized travel recommendations powered by AI.'
            },
            {
                q: 'Is the information on Bon Voyage free to access?',
                a: 'Yes! All destination information, recommendations, and travel planning tools on Bon Voyage are completely free to use. We believe everyone should have access to quality travel information.'
            },
            {
                q: 'How often is the information updated?',
                a: 'We strive to keep our information as current as possible. Destination details, timings, and entry fees are regularly reviewed and updated. However, we always recommend confirming critical details directly with the destination before your visit.'
            }
        ]
    },
    {
        category: 'Planning Your Trip',
        icon: '🗺️',
        questions: [
            {
                q: 'How do I use the AI Trip Planner?',
                a: 'Navigate to the "AI Trip Planner" from the menu. Select your preferred destinations, specify your travel duration, style, interests, and budget. Our AI will generate a personalized day-by-day itinerary tailored to your preferences.'
            },
            {
                q: 'Can I save destinations to visit later?',
                a: 'Absolutely! Click the heart icon on any destination card to add it to your Favorites. Access your saved destinations anytime from the Favorites page. Your favorites are stored locally and persist across sessions.'
            },
            {
                q: 'How does the Compare feature work?',
                a: 'You can compare up to 3 destinations side-by-side. Click the compare icon on destination cards to add them to your comparison list. This helps you decide between similar destinations by viewing ratings, timings, and amenities together.'
            },
            {
                q: 'What is the best time to visit Odisha?',
                a: 'The best time to visit Odisha is from October to March when the weather is pleasant and ideal for sightseeing. Summers (April-June) can be hot, and the monsoon (July-September) brings heavy rainfall but is great for seeing waterfalls at their peak.'
            }
        ]
    },
    {
        category: 'Destinations',
        icon: '🏛️',
        questions: [
            {
                q: 'How many destinations are listed on Bon Voyage?',
                a: 'We currently feature over 120 destinations across Odisha, including temples, beaches, wildlife sanctuaries, waterfalls, historical sites, and cultural experiences. We\'re constantly adding new places to explore!'
            },
            {
                q: 'Are the crowd level indicators accurate?',
                a: 'Our crowd indicators (Low, Moderate, High) are based on historical data, local insights, and seasonal patterns. They provide a general guide, but actual crowd levels can vary based on holidays, festivals, and special events.'
            },
            {
                q: 'Can I get directions to a destination?',
                a: 'Yes! Each destination page has a "Get Directions" button that opens Google Maps with the location pre-filled, making it easy to navigate from your current location.'
            }
        ]
    },
    {
        category: 'Features & Tools',
        icon: '🛠️',
        questions: [
            {
                q: 'What is the AI Assistant?',
                a: 'Our AI Assistant is a chatbot available on every page (look for the chat bubble in the bottom-right corner). Ask it anything about Odisha tourism, get recommendations, or seek travel advice in real-time.'
            },
            {
                q: 'How do the personalized recommendations work?',
                a: 'Our recommendation engine analyzes your selected interests, travel style, and companion type to suggest destinations that best match your preferences. It considers factors like ratings, crowd levels, and seasonal appropriateness.'
            },
            {
                q: 'Is there a mobile app available?',
                a: 'Currently, Bon Voyage is available as a web application optimized for both desktop and mobile browsers. A dedicated mobile app is on our roadmap for future development.'
            }
        ]
    },
    {
        category: 'Travel Tips',
        icon: '💡',
        questions: [
            {
                q: 'What should I pack for a trip to Odisha?',
                a: 'Pack light, breathable clothing for the warm climate. Include comfortable walking shoes, sunscreen, a hat, and insect repellent. If visiting temples, bring modest clothing that covers shoulders and knees. During monsoon, carry rain gear.'
            },
            {
                q: 'Are there any cultural etiquettes I should know?',
                a: 'When visiting temples, remove footwear before entering and dress modestly. Photography may be restricted in certain areas. Respect local customs and always ask permission before photographing people. Tipping is appreciated but not mandatory.'
            },
            {
                q: 'What local foods should I try in Odisha?',
                a: 'Don\'t miss Dalma (lentils with vegetables), Chhena Poda (cheese dessert), Pakhala Bhata (fermented rice), and the famous Odisha thali. Seafood lovers should try the coastal cuisine in Puri and Gopalpur.'
            }
        ]
    }
];

function FAQItem({ question, answer, isOpen, onToggle }) {
    return (
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <button
                onClick={onToggle}
                style={{
                    width: '100%',
                    padding: '20px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left',
                    color: 'var(--txt-1)',
                    gap: 16
                }}
            >
                <span style={{ fontWeight: 500, fontSize: '1rem', lineHeight: 1.5 }}>
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ flexShrink: 0 }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p style={{
                            color: 'var(--txt-2)',
                            fontSize: '.95rem',
                            lineHeight: 1.7,
                            paddingBottom: 20
                        }}>
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQ() {
    const [openItems, setOpenItems] = useState({});
    const [activeCategory, setActiveCategory] = useState('all');

    const toggleItem = (categoryIndex, questionIndex) => {
        const key = `${categoryIndex}-${questionIndex}`;
        setOpenItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const filteredCategories = activeCategory === 'all'
        ? faqData
        : faqData.filter(cat => cat.category === activeCategory);

    return (
        <div className="page-content">
            <div className="section container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <header style={{ textAlign: 'center', marginBottom: 48 }}>
                        <motion.span
                            className="hero-badge"
                            style={{ marginBottom: 16 }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                            Help Center
                        </motion.span>
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontFamily: "'Playfair Display', serif",
                            marginBottom: 16
                        }}>
                            Frequently Asked Questions
                        </h1>
                        <p style={{
                            color: 'var(--txt-2)',
                            fontSize: '1.1rem',
                            maxWidth: 600,
                            margin: '0 auto'
                        }}>
                            Find answers to common questions about exploring Odisha with Bon Voyage
                        </p>
                    </header>

                    {/* Category Filter */}
                    <div style={{
                        display: 'flex',
                        gap: 10,
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        marginBottom: 40
                    }}>
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`chip ${activeCategory === 'all' ? 'active' : ''}`}
                        >
                            ✦ All
                        </button>
                        {faqData.map(cat => (
                            <button
                                key={cat.category}
                                onClick={() => setActiveCategory(cat.category)}
                                className={`chip ${activeCategory === cat.category ? 'active' : ''}`}
                            >
                                {cat.icon} {cat.category}
                            </button>
                        ))}
                    </div>

                    {/* FAQ Accordion */}
                    <div style={{ maxWidth: 800, margin: '0 auto' }}>
                        {filteredCategories.map((category, catIndex) => (
                            <motion.div
                                key={category.category}
                                className="card"
                                style={{ padding: '24px 32px', marginBottom: 24 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: catIndex * 0.1 }}
                            >
                                <h2 style={{
                                    fontSize: '1.2rem',
                                    marginBottom: 16,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10
                                }}>
                                    <span style={{ fontSize: '1.4rem' }}>{category.icon}</span>
                                    {category.category}
                                </h2>

                                {category.questions.map((item, qIndex) => (
                                    <FAQItem
                                        key={qIndex}
                                        question={item.q}
                                        answer={item.a}
                                        isOpen={openItems[`${catIndex}-${qIndex}`]}
                                        onToggle={() => toggleItem(catIndex, qIndex)}
                                    />
                                ))}
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <motion.div
                        className="card"
                        style={{
                            padding: 40,
                            textAlign: 'center',
                            maxWidth: 600,
                            margin: '40px auto 0',
                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                            border: '1px solid rgba(102, 126, 234, 0.2)'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>💬</div>
                        <h3 style={{ marginBottom: 12 }}>Still have questions?</h3>
                        <p style={{ color: 'var(--txt-2)', marginBottom: 24 }}>
                            Our AI assistant is available 24/7 to help you plan your perfect Odisha adventure.
                        </p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/recommendations" className="btn btn-primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35" />
                                </svg>
                                Get Recommendations
                            </Link>
                            <Link to="/itinerary-generator" className="btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                    <polyline points="14,2 14,8 20,8" />
                                </svg>
                                Plan Your Trip
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
