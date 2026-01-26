import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StartupAnimation = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 300),
            setTimeout(() => setPhase(2), 2500),
            setTimeout(() => {
                setIsVisible(false);
                setTimeout(() => onComplete?.(), 600);
            }, 5000),
        ];

        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    const titleText = "Bon Voyage";
    const letters = titleText.split('');

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#0a0d0a',
                    }}
                >
                    {/* Subtle background glow */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(47, 93, 98, 0.15), transparent 70%)',
                    }} />

                    {/* Main content */}
                    <div style={{
                        position: 'relative',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: '20px',
                    }}>
                        {/* Glow behind text */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                width: '300px',
                                height: '300px',
                                background: 'radial-gradient(circle, rgba(76, 175, 80, 0.25), transparent 70%)',
                                borderRadius: '50%',
                                filter: 'blur(50px)',
                                zIndex: -1,
                            }}
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.4, 0.6, 0.4],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        {/* Title with letter-by-letter animation */}
                        <h1 style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: 'clamp(3rem, 14vw, 7rem)',
                            fontWeight: 700,
                            margin: 0,
                            marginBottom: '40px',
                            lineHeight: 1.1,
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}>
                            {letters.map((letter, i) => (
                                <motion.span
                                    key={i}
                                    style={{
                                        display: 'inline-block',
                                        background: 'linear-gradient(135deg, #ffffff 0%, #81C784 60%, #4CAF50 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                    initial={{ opacity: 0, y: 40, rotateX: -90 }}
                                    animate={{
                                        opacity: phase >= 1 ? 1 : 0,
                                        y: phase >= 1 ? 0 : 40,
                                        rotateX: phase >= 1 ? 0 : -90,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.1,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </motion.span>
                            ))}
                        </h1>

                        {/* Progress bar */}
                        <motion.div
                            style={{
                                width: '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: phase >= 1 ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <div style={{
                                width: '100%',
                                height: '3px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '3px',
                                overflow: 'hidden',
                            }}>
                                <motion.div
                                    style={{
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #4CAF50, #81C784, #A5D6A7)',
                                        borderRadius: '3px',
                                        boxShadow: '0 0 12px rgba(76, 175, 80, 0.5)',
                                    }}
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 4.5, ease: 'easeInOut' }}
                                />
                            </div>
                            <motion.span
                                style={{
                                    fontSize: '0.75rem',
                                    color: '#869184',
                                    letterSpacing: '0.08em',
                                }}
                            >
                                {phase < 2 ? 'Loading...' : 'Welcome!'}
                            </motion.span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StartupAnimation;
