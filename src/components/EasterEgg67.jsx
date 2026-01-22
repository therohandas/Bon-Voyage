import { useEffect, useState, useCallback } from 'react';

export default function EasterEgg67() {
    const [triggered, setTriggered] = useState(false);
    const [keys, setKeys] = useState([]);

    // Simple sparkle effect
    const createSparkles = useCallback(() => {
        const container = document.createElement('div');
        container.id = 'sparkle-container';
        container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:999999;overflow:hidden;';
        document.body.appendChild(container);

        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            const x = 30 + Math.random() * 40;
            const y = 30 + Math.random() * 40;
            const delay = Math.random() * 0.5;
            const size = 4 + Math.random() * 8;

            sparkle.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background: white;
                border-radius: 50%;
                box-shadow: 0 0 ${size * 2}px white, 0 0 ${size * 4}px rgba(255,255,255,0.5);
                animation: sparkleAnim 1s ease-out ${delay}s forwards;
                opacity: 0;
            `;
            container.appendChild(sparkle);
        }

        setTimeout(() => container.remove(), 4000);
    }, []);

    // Play sound
    const playSound = useCallback(() => {
        const audio = new Audio('/sounds/67.mp3');
        audio.volume = 0.7;
        audio.play().catch(() => console.log('67!'));
    }, []);

    // Gentle shake
    const shakePage = useCallback(() => {
        document.body.classList.add('anime-shake');
        setTimeout(() => document.body.classList.remove('anime-shake'), 500);
    }, []);

    // Key listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            setKeys(prev => {
                const newKeys = [...prev, e.key].slice(-2);
                if (newKeys.join('') === '67' && !triggered) {
                    setTriggered(true);
                    shakePage();
                    playSound();
                    createSparkles();
                    setTimeout(() => setTriggered(false), 7000);
                    return [];
                }
                return newKeys;
            });
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [triggered, shakePage, playSound, createSparkles]);

    // CSS
    useEffect(() => {
        const style = document.createElement('style');
        style.id = 'easter-egg-67-css';
        style.textContent = `
            @keyframes animeShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            .anime-shake { animation: animeShake 0.05s ease-in-out 10 !important; }
            
            @keyframes popIn {
                0% { transform: scale(0) rotate(-20deg); opacity: 0; }
                60% { transform: scale(1.2) rotate(5deg); opacity: 1; }
                80% { transform: scale(0.95) rotate(-2deg); }
                100% { transform: scale(1) rotate(0deg); opacity: 1; }
            }
            
            @keyframes speedLines {
                0% { opacity: 0; transform: scaleX(0); }
                50% { opacity: 1; transform: scaleX(1); }
                100% { opacity: 0; transform: scaleX(1.5); }
            }
            
            @keyframes sparkleAnim {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1); opacity: 1; }
                100% { transform: scale(0); opacity: 0; }
            }
            
            @keyframes fadeOut {
                0% { opacity: 1; }
                70% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        return () => document.getElementById('easter-egg-67-css')?.remove();
    }, []);

    if (!triggered) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999998,
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(2px)',
            pointerEvents: 'none',
            animation: 'fadeOut 7s ease-out forwards'
        }}>
            {/* Speed lines */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                {[...Array(12)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: '200%',
                        height: '3px',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                        transform: `rotate(${i * 30}deg)`,
                        animation: `speedLines 0.4s ease-out ${i * 0.02}s forwards`,
                        opacity: 0
                    }} />
                ))}
            </div>

            {/* The 67 */}
            <div style={{
                display: 'flex',
                gap: '0.1em',
                fontFamily: "'Segoe UI', Arial, sans-serif",
                fontSize: 'clamp(8rem, 35vw, 18rem)',
                fontWeight: 900,
                color: 'white',
                textShadow: `
                    0 0 20px rgba(255,255,255,0.8),
                    0 0 40px rgba(255,255,255,0.4),
                    0 4px 0 rgba(0,0,0,0.3)
                `,
                letterSpacing: '-0.05em'
            }}>
                <span style={{
                    display: 'inline-block',
                    animation: 'popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
                    opacity: 0
                }}>6</span>
                <span style={{
                    display: 'inline-block',
                    animation: 'popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.1s forwards',
                    opacity: 0
                }}>7</span>
            </div>

            {/* Small accent sparkles around text */}
            {['✦', '✧', '✦', '✧'].map((star, i) => (
                <span key={i} style={{
                    position: 'absolute',
                    left: `${40 + i * 8}%`,
                    top: `${35 + (i % 2) * 30}%`,
                    fontSize: 'clamp(1rem, 3vw, 2rem)',
                    color: 'white',
                    opacity: 0,
                    animation: `sparkleAnim 0.8s ease-out ${0.2 + i * 0.1}s forwards`,
                    textShadow: '0 0 10px white'
                }}>{star}</span>
            ))}
        </div>
    );
}
