import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Google Apps Script Web App URL - set this in your .env file as VITE_GOOGLE_SHEET_URL
const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL || '';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'general',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Prepare form data with timestamp
            const submissionData = {
                ...formData,
                timestamp: new Date().toISOString(),
                source: 'Bon Voyage Contact Form'
            };

            if (GOOGLE_SHEET_URL) {
                // Submit to Google Sheets via Apps Script
                const response = await fetch(GOOGLE_SHEET_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Required for Google Apps Script
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(submissionData)
                });

                // With no-cors, we can't read the response, but if no error was thrown, assume success
                console.log('Form submitted to Google Sheets');
            } else {
                // Fallback: Log to console if no URL configured
                console.log('Contact form submission (no sheet URL configured):', submissionData);
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            setSubmitted(true);
        } catch (err) {
            console.error('Form submission error:', err);
            setError('Failed to send message. Please try again or email us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactMethods = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            ),
            title: 'Email Us',
            value: 'hello@bonvoyage.travel',
            desc: 'We reply within 24 hours',
            color: '#667eea'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            ),
            title: 'Visit Us',
            value: 'Bhubaneswar, Odisha',
            desc: 'India 751001',
            color: '#4ade80'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
            ),
            title: 'Call Us',
            value: '+91 123 456 7890',
            desc: 'Mon-Sat, 9AM-6PM IST',
            color: '#fbbf24'
        }
    ];

    const socialLinks = [
        { name: 'Twitter', icon: '𝕏', url: '#' },
        { name: 'Instagram', icon: '📷', url: '#' },
        { name: 'Facebook', icon: 'f', url: '#' },
        { name: 'YouTube', icon: '▶', url: '#' }
    ];

    if (submitted) {
        return (
            <div className="page-content">
                <div className="section container">
                    <motion.div
                        className="card"
                        style={{ padding: 60, textAlign: 'center', maxWidth: 600, margin: '0 auto' }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.2 }}
                            style={{ fontSize: '4rem', marginBottom: 24 }}
                        >
                            ✈️
                        </motion.div>
                        <h2 style={{ marginBottom: 12 }}>Message Sent!</h2>
                        <p style={{ color: 'var(--txt-2)', marginBottom: 32 }}>
                            Thank you for reaching out. We'll get back to you within 24 hours.
                        </p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => {
                                    setSubmitted(false);
                                    setFormData({ name: '', email: '', subject: 'general', message: '' });
                                }}
                                className="btn"
                            >
                                Send Another Message
                            </button>
                            <Link to="/" className="btn btn-primary">
                                Back to Home
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

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
                                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                            </svg>
                            Get in Touch
                        </motion.span>
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontFamily: "'Playfair Display', serif",
                            marginBottom: 16
                        }}>
                            We'd Love to Hear From You
                        </h1>
                        <p style={{
                            color: 'var(--txt-2)',
                            fontSize: '1.1rem',
                            maxWidth: 600,
                            margin: '0 auto'
                        }}>
                            Have questions about traveling in Odisha? Need help planning your trip? We're here to help!
                        </p>
                    </header>

                    {/* Contact Methods */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: 20,
                        marginBottom: 48
                    }}>
                        {contactMethods.map((method, idx) => (
                            <motion.div
                                key={method.title}
                                className="card"
                                style={{
                                    padding: 24,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -4 }}
                            >
                                <div style={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: '50%',
                                    background: `${method.color}15`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px',
                                    color: method.color
                                }}>
                                    {method.icon}
                                </div>
                                <h3 style={{ marginBottom: 8 }}>{method.title}</h3>
                                <p style={{ fontWeight: 500, marginBottom: 4 }}>{method.value}</p>
                                <p style={{ color: 'var(--muted)', fontSize: '.85rem' }}>{method.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Main Content Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: 32
                    }}>
                        {/* Contact Form */}
                        <motion.div
                            className="card"
                            style={{ padding: 32 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 style={{ marginBottom: 24 }}>Send us a Message</h2>

                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: 20 }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: 8,
                                        fontWeight: 500,
                                        fontSize: '.9rem'
                                    }}>
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        style={{
                                            width: '100%',
                                            padding: '14px 16px',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: 10,
                                            color: 'var(--txt-1)',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: 20 }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: 8,
                                        fontWeight: 500,
                                        fontSize: '.9rem'
                                    }}>
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        style={{
                                            width: '100%',
                                            padding: '14px 16px',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: 10,
                                            color: 'var(--txt-1)',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: 20 }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: 8,
                                        fontWeight: 500,
                                        fontSize: '.9rem'
                                    }}>
                                        Subject
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="btn"
                                        style={{
                                            width: '100%',
                                            padding: '14px 16px',
                                            cursor: 'pointer',
                                            textAlign: 'left'
                                        }}
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="trip">Trip Planning Help</option>
                                        <option value="feedback">Feedback & Suggestions</option>
                                        <option value="partnership">Partnership Opportunities</option>
                                        <option value="bug">Report an Issue</option>
                                    </select>
                                </div>

                                <div style={{ marginBottom: 24 }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: 8,
                                        fontWeight: 500,
                                        fontSize: '.9rem'
                                    }}>
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        placeholder="Tell us how we can help you..."
                                        style={{
                                            width: '100%',
                                            padding: '14px 16px',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: 10,
                                            color: 'var(--txt-1)',
                                            fontSize: '1rem',
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
                                        marginBottom: 20,
                                        fontSize: '.9rem'
                                    }}>
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: 16,
                                        fontSize: '1rem'
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            >
                                                ✈️
                                            </motion.span>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="22" y1="2" x2="11" y2="13" />
                                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                            </svg>
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        {/* Info Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {/* Map placeholder */}
                            <div
                                className="card"
                                style={{
                                    padding: 0,
                                    height: 200,
                                    marginBottom: 24,
                                    overflow: 'hidden',
                                    position: 'relative',
                                    background: 'linear-gradient(135deg, #1a2f23 0%, #0f1a14 100%)'
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    gap: 12
                                }}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4a6b54" strokeWidth="1.5">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span style={{ color: '#4a6b54', fontSize: '.9rem' }}>Bhubaneswar, Odisha</span>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                                <h3 style={{ marginBottom: 16 }}>Quick Links</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <Link to="/faq" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12,
                                        padding: '12px 16px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: 8,
                                        color: 'var(--txt-1)',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s'
                                    }}>
                                        <span>❓</span>
                                        <span>Frequently Asked Questions</span>
                                    </Link>
                                    <Link to="/recommendations" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12,
                                        padding: '12px 16px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: 8,
                                        color: 'var(--txt-1)',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s'
                                    }}>
                                        <span>🎯</span>
                                        <span>Get Personalized Recommendations</span>
                                    </Link>
                                    <Link to="/itinerary-generator" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12,
                                        padding: '12px 16px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: 8,
                                        color: 'var(--txt-1)',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s'
                                    }}>
                                        <span>✨</span>
                                        <span>AI Trip Planner</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="card" style={{ padding: 24 }}>
                                <h3 style={{ marginBottom: 16 }}>Follow Us</h3>
                                <p style={{ color: 'var(--txt-2)', fontSize: '.9rem', marginBottom: 16 }}>
                                    Stay updated with travel tips and destination highlights
                                </p>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    {socialLinks.map(social => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            style={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: 10,
                                                background: 'rgba(255,255,255,0.05)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'var(--txt-1)',
                                                textDecoration: 'none',
                                                fontSize: '1.1rem',
                                                transition: 'all 0.2s'
                                            }}
                                            title={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
