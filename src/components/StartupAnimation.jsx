import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StartupAnimation = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        // Synchronized phase transitions - cleaner timing
        const timers = [
            setTimeout(() => setPhase(1), 300),      // Phase 1: Logo & title start
            setTimeout(() => setPhase(2), 1800),     // Phase 2: Tagline & destinations
            setTimeout(() => setPhase(3), 3500),     // Phase 3: Full reveal
            setTimeout(() => setPhase(4), 6000),     // Phase 4: Ready to exit
            setTimeout(() => {
                setIsVisible(false);
                setTimeout(() => onComplete?.(), 700);
            }, 7500),
        ];

        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    // Floating particles - fewer, better placed
    const particles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 4,
    }));

    // Destinations with coordinated reveal
    const destinations = [
        { x: 18, y: 32, name: 'Puri', icon: '🏛️', delay: 0 },
        { x: 75, y: 25, name: 'Konark', icon: '☀️', delay: 0.15 },
        { x: 38, y: 62, name: 'Chilika', icon: '🦩', delay: 0.3 },
        { x: 68, y: 58, name: 'Simlipal', icon: '🐯', delay: 0.45 },
        { x: 28, y: 78, name: 'Gopalpur', icon: '🏖️', delay: 0.6 },
    ];

    // Title letters for staggered animation
    const titleText = "Bon Voyage";
    const letters = titleText.split('');

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="startup-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        background: '#0a0d0a',
                    }}
                >
                    {/* Background gradients */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `
              radial-gradient(ellipse 80% 60% at 50% 50%, rgba(47, 93, 98, 0.2), transparent 70%),
              radial-gradient(ellipse 60% 40% at 80% 20%, rgba(201, 162, 39, 0.1), transparent 50%),
              radial-gradient(ellipse 50% 50% at 20% 80%, rgba(85, 122, 87, 0.15), transparent 50%)
            `,
                    }} />

                    {/* Floating particles */}
                    {particles.map((p) => (
                        <motion.div
                            key={p.id}
                            style={{
                                position: 'absolute',
                                left: `${p.x}%`,
                                top: `${p.y}%`,
                                width: p.size,
                                height: p.size,
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(201, 162, 39, 0.8), transparent 70%)',
                                boxShadow: '0 0 6px rgba(201, 162, 39, 0.4)',
                            }}
                            animate={{
                                opacity: [0, 0.7, 0],
                                y: [0, -40],
                                scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: p.duration,
                                delay: p.delay,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}

                    {/* Konark Wheel - Real PNG Image */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: '8%',
                            right: '6%',
                            width: '150px',
                            height: '150px',
                        }}
                        initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                        animate={{
                            opacity: phase >= 1 ? 0.25 : 0,
                            scale: phase >= 1 ? 1 : 0.5,
                            rotate: phase >= 1 ? 360 : -90,
                        }}
                        transition={{
                            opacity: { duration: 0.8 },
                            scale: { duration: 0.8 },
                            rotate: { duration: 20, repeat: Infinity, ease: 'linear' }
                        }}
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Wheel_of_Konark%2C_Orissa%2C_India.JPG/240px-Wheel_of_Konark%2C_Orissa%2C_India.JPG"
                            alt="Konark Wheel"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                filter: 'brightness(1.2) sepia(0.3) hue-rotate(60deg)',
                                opacity: 0.9,
                            }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    </motion.div>

                    {/* Destination pins */}
                    {destinations.map((dest, i) => (
                        <motion.div
                            key={i}
                            style={{
                                position: 'absolute',
                                left: `${dest.x}%`,
                                top: `${dest.y}%`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 5,
                            }}
                            initial={{ opacity: 0, scale: 0, y: -20 }}
                            animate={{
                                opacity: phase >= 2 ? 1 : 0,
                                scale: phase >= 2 ? 1 : 0,
                                y: phase >= 2 ? 0 : -20,
                            }}
                            transition={{
                                duration: 0.5,
                                delay: dest.delay,
                                type: 'spring',
                                stiffness: 200,
                            }}
                        >
                            <span style={{ fontSize: '1.6rem', filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.4))' }}>
                                {dest.icon}
                            </span>
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    background: 'rgba(76, 175, 80, 0.25)',
                                    zIndex: -1,
                                }}
                                animate={{ scale: [0.5, 2, 0.5], opacity: [0.6, 0, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                            />
                            <span style={{
                                marginTop: '6px',
                                fontSize: '0.6rem',
                                fontWeight: 600,
                                color: '#9db79e',
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                textShadow: '0 2px 6px rgba(0,0,0,0.5)',
                            }}>
                                {dest.name}
                            </span>
                        </motion.div>
                    ))}

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
                                width: '350px',
                                height: '350px',
                                background: 'radial-gradient(circle, rgba(76, 175, 80, 0.3), transparent 70%)',
                                borderRadius: '50%',
                                filter: 'blur(60px)',
                                zIndex: -1,
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.4, 0.6, 0.4],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        {/* Title with letter-by-letter animation */}
                        <h1 style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: 'clamp(3rem, 12vw, 6rem)',
                            fontWeight: 700,
                            margin: 0,
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
                                        background: 'linear-gradient(135deg, #ffffff 0%, #81C784 50%, #C9A227 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                                    animate={{
                                        opacity: phase >= 1 ? 1 : 0,
                                        y: phase >= 1 ? 0 : 50,
                                        rotateX: phase >= 1 ? 0 : -90,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.1 + i * 0.08,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </motion.span>
                            ))}
                        </h1>

                        {/* Tagline */}
                        <motion.p
                            style={{
                                fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)',
                                color: '#c9d4c7',
                                marginTop: '16px',
                                marginBottom: '8px',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                fontWeight: 500,
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: phase >= 2 ? 1 : 0,
                                y: phase >= 2 ? 0 : 20,
                            }}
                            transition={{ duration: 0.6 }}
                        >
                            Discover the Soul of Odisha
                        </motion.p>

                        {/* Subtitle */}
                        <motion.p
                            style={{
                                fontSize: 'clamp(0.75rem, 2vw, 0.95rem)',
                                color: '#869184',
                                marginBottom: '30px',
                                letterSpacing: '0.1em',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: phase >= 2 ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Temples • Beaches • Wildlife • Culture
                        </motion.p>

                        {/* Progress bar */}
                        <motion.div
                            style={{
                                width: '220px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: phase >= 1 ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <div style={{
                                width: '100%',
                                height: '4px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '4px',
                                overflow: 'hidden',
                            }}>
                                <motion.div
                                    style={{
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #4CAF50, #81C784, #C9A227)',
                                        borderRadius: '4px',
                                        boxShadow: '0 0 15px rgba(76, 175, 80, 0.5)',
                                    }}
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 7, ease: 'easeInOut' }}
                                />
                            </div>
                            <motion.span
                                style={{
                                    fontSize: '0.75rem',
                                    color: '#869184',
                                    letterSpacing: '0.05em',
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {phase < 2 && 'Loading...'}
                                {phase === 2 && 'Discovering destinations...'}
                                {phase === 3 && 'Preparing your journey...'}
                                {phase >= 4 && 'Welcome to Odisha!'}
                            </motion.span>
                        </motion.div>
                    </div>

                    {/* Decorative stamps */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            bottom: '15%',
                            left: '8%',
                            padding: '10px 14px',
                            border: '2px solid #9db79e',
                            borderRadius: '6px',
                            background: 'rgba(10, 13, 10, 0.4)',
                            backdropFilter: 'blur(5px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            transform: 'rotate(-10deg)',
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: phase >= 3 ? 0.5 : 0,
                            scale: phase >= 3 ? 1 : 0,
                        }}
                        transition={{ duration: 0.5, type: 'spring' }}
                    >
                        <span style={{ fontSize: '1rem', color: '#9db79e', fontWeight: 700 }}>ଓଡ଼ିଶା</span>
                        <span style={{ fontSize: '0.6rem', color: '#9db79e', letterSpacing: '0.1em' }}>ODISHA</span>
                    </motion.div>

                    <motion.div
                        style={{
                            position: 'absolute',
                            top: '18%',
                            left: '10%',
                            width: '70px',
                            height: '70px',
                            border: '2px solid #9db79e',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(10, 13, 10, 0.4)',
                            backdropFilter: 'blur(5px)',
                            transform: 'rotate(8deg)',
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: phase >= 3 ? 0.4 : 0,
                            scale: phase >= 3 ? 1 : 0,
                        }}
                        transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
                    >
                        <span style={{ fontSize: '0.55rem', color: '#9db79e', fontWeight: 700, textAlign: 'center' }}>
                            ✈ BON<br />VOYAGE
                        </span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StartupAnimation;
