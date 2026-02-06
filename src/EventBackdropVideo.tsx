import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile, spring, Easing } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Montserrat';
import { loadFont as loadSerif } from '@remotion/google-fonts/PlayfairDisplay';
import { Star, Quote, HeartHandshake, Sparkles } from 'lucide-react';

const { fontFamily } = loadFont();
const { fontFamily: serifFont } = loadSerif();

const COLOR_BG = '#FFFFFF';
const COLOR_PRIMARY = '#003366'; 
const COLOR_ACCENT = '#D4AF37'; 
const COLOR_TEXT = '#333333';
const COLOR_SUBTLE_BG = '#F8F9FA';

// Floating Particles Background
const FloatingParticles = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();
    
    // Create deterministic particles based on index
    const particles = new Array(20).fill(0).map((_, i) => {
        // Use index to create pseudo-random values
        const xSeed = (i * 137.5) % width;
        const ySeed = (i * 293.7) % height;
        const speed = 0.5 + (i % 7) * 0.1;
        const size = 3 + (i % 5) * 2;
        
        const y = (ySeed - frame * speed) % (height + 100);
        const finalY = y < -50 ? y + height + 100 : y;
        
        return {
            x: xSeed,
            y: finalY,
            size,
            opacity: 0.2 + ((i * 37) % 50) / 100
        };
    });

    return (
        <AbsoluteFill style={{ zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {particles.map((p, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: p.x,
                        top: p.y,
                        width: p.size,
                        height: p.size,
                        borderRadius: '50%',
                        backgroundColor: COLOR_ACCENT,
                        opacity: p.opacity,
                        boxShadow: `0 0 ${p.size * 2}px ${COLOR_ACCENT}`,
                        filter: 'blur(1px)'
                    }}
                />
            ))}
        </AbsoluteFill>
    );
};

// Reusable Background Pattern with Pulse
const SubtleBackground = () => {
    const frame = useCurrentFrame();
    const pulse = Math.sin(frame / 60) * 0.05 + 1; // Gentle breathing effect

    return (
        <AbsoluteFill style={{ overflow: 'hidden', zIndex: -1 }}>
            <FloatingParticles />
            <div style={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: 600,
                height: 600,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, rgba(255,255,255,0) 70%)',
                transform: `scale(${pulse})`,
                transition: 'transform 0.1s linear'
            }} />
             <div style={{
                position: 'absolute',
                bottom: -100,
                left: -100,
                width: 800,
                height: 800,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 51, 102, 0.03) 0%, rgba(255,255,255,0) 70%)',
                transform: `scale(${pulse * 1.05})`,
                transition: 'transform 0.1s linear'
            }} />
        </AbsoluteFill>
    );
};

const StaggeredText: React.FC<{ text: string; delay?: number; style?: React.CSSProperties }> = ({ text, delay = 0, style }) => {
    const frame = useCurrentFrame();
    const words = text.split(' ');
    
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.3em', ...style }}>
            {words.map((word, i) => {
                const wordStart = delay + i * 5;
                const opacity = interpolate(frame, [wordStart, wordStart + 15], [0, 1], { extrapolateRight: 'clamp' });
                const y = interpolate(frame, [wordStart, wordStart + 15], [20, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
                
                return (
                    <span key={i} style={{ opacity, transform: `translateY(${y}px)`, display: 'inline-block' }}>
                        {word}
                    </span>
                );
            })}
        </div>
    );
};

const BigMessage: React.FC<{ title: string; subtitle?: string; color?: string }> = ({ title, subtitle, color = COLOR_PRIMARY }) => {
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 100 }}>
            <StaggeredText 
                text={title} 
                delay={10}
                style={{ 
                    fontFamily, 
                    fontWeight: 800, 
                    fontSize: 100, 
                    color, 
                    textAlign: 'center',
                    lineHeight: 1.1,
                    textTransform: 'uppercase',
                    letterSpacing: -2,
                    textShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }} 
            />
            {subtitle && (
                <div style={{ 
                    fontFamily, 
                    fontWeight: 500, 
                    fontSize: 32, 
                    color: COLOR_TEXT, 
                    marginTop: 30,
                    letterSpacing: 4,
                    textTransform: 'uppercase',
                    borderTop: `2px solid ${COLOR_ACCENT}`,
                    paddingTop: 20
                }}>
                   <StaggeredText text={subtitle} delay={40} />
                </div>
            )}
        </AbsoluteFill>
    );
};

const Scene1_Welcome = () => (
    <AbsoluteFill style={{ backgroundColor: COLOR_BG }}>
        <SubtleBackground />
        <BigMessage title="A Warm Welcome" subtitle="Ecole Technique Saint Kizito Musha" />
    </AbsoluteFill>
);

const Scene2_Purpose = () => {
    const frame = useCurrentFrame();
    // Slow, reverent scale effect (Ken Burns style)
    const statueScale = interpolate(frame, [0, 300], [1.05, 1.15]);
    const textY = interpolate(frame, [0, 30], [50, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
    const opacity = interpolate(frame, [0, 20], [0, 1]);

    return (
        <AbsoluteFill style={{ backgroundColor: COLOR_PRIMARY, overflow: 'hidden' }}>
             <FloatingParticles />
             <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                opacity: 0.15,
                backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)',
                backgroundSize: '40px 40px',
            }} />
            
            <div style={{ position: 'absolute', right: -100, top: -50, bottom: -100, transform: `scale(${statueScale})`, opacity: 0.9 }}>
                <Img src={staticFile('statue.png')} style={{ height: '120%' }} />
            </div>

            <div style={{ 
                position: 'absolute', 
                left: 100, 
                top: '50%', 
                transform: `translateY(calc(-50% + ${textY}px))`, 
                zIndex: 1,
                maxWidth: 900,
                opacity
            }}>
                <div style={{ fontFamily, fontWeight: 700, fontSize: 30, color: COLOR_ACCENT, letterSpacing: 2, marginBottom: 10 }}>OUR MISSION</div>
                <div style={{ fontFamily: serifFont, fontWeight: 700, fontSize: 90, color: '#FFFFFF', lineHeight: 1 }}>
                    A Symbol of<br/>Faith & Hope
                </div>
                <div style={{ fontFamily, fontSize: 28, color: '#E0E0E0', marginTop: 30, lineHeight: 1.5 }}>
                    Join us in creating a spiritual landmark for our students.<br/>
                    <span style={{ color: COLOR_ACCENT, fontWeight: 700 }}>Be part of their journey.</span>
                </div>
            </div>
        </AbsoluteFill>
    );
};

const Scene3_Motivation = () => {
    const frame = useCurrentFrame();
    const quoteOpacity = interpolate(frame, [0, 20], [0, 0.3]);
    const quoteScale = interpolate(frame, [0, 30], [0.8, 1], { easing: Easing.out(Easing.back(1.5)) });

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR_SUBTLE_BG }}>
            <SubtleBackground />
            <div style={{ maxWidth: 1400, textAlign: 'center', padding: 60, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 50, opacity: quoteOpacity, transform: `scale(${quoteScale})` }}>
                    <Quote size={80} color={COLOR_ACCENT} />
                </div>
                
                <div style={{ fontFamily: serifFont, fontWeight: 700, fontSize: 75, color: COLOR_PRIMARY, fontStyle: 'italic', lineHeight: 1.2, margin: '40px 0' }}>
                    <StaggeredText text='"God loves a cheerful giver"' delay={10} />
                </div>
                
                <div style={{ 
                    fontFamily, 
                    fontWeight: 500, 
                    fontSize: 28, 
                    color: COLOR_TEXT, 
                    marginTop: 40, 
                    maxWidth: 900, 
                    margin: '40px auto 0',
                    lineHeight: 1.6 
                }}>
                    Your contribution is not just monetary;<br/> 
                    it is an act of faith that will inspire generations of students at St. Kizito.
                </div>
                
                <div style={{ position: 'absolute', bottom: 0, right: 50, opacity: quoteOpacity, transform: `scale(${quoteScale}) rotate(180deg)` }}>
                    <Quote size={80} color={COLOR_ACCENT} />
                </div>
            </div>
        </AbsoluteFill>
    );
};

const Scene4_GoalReminder = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    
    // Smoother spring animation
    const progress = spring({ 
        frame: frame - 20, 
        fps, 
        config: { damping: 20, stiffness: 60 } 
    });

    // Ensure we reach exactly 1,000,000 using Math.round and clamping
    const rawAmount = interpolate(progress, [0, 1], [0, 1000000], { extrapolateRight: 'clamp' });
    const amount = Math.round(rawAmount);

    const scale = interpolate(progress, [0.8, 1], [1, 1.05]);
    const glow = interpolate(progress, [0.8, 1], [0, 20]);
    
    // Shimmer effect
    const shimmerPos = (frame * 15) % 1000 - 500;

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR_PRIMARY, overflow: 'hidden' }}>
            <div style={{ 
                position: 'absolute', 
                width: '100%', height: '100%', 
                background: `radial-gradient(circle, ${COLOR_PRIMARY} 0%, #001a33 100%)` 
            }} />
            
            <FloatingParticles />

            <div style={{ zIndex: 1, textAlign: 'center' }}>
                <div style={{ 
                    fontFamily, 
                    fontSize: 32, 
                    color: COLOR_ACCENT, 
                    letterSpacing: 6, 
                    fontWeight: 700,
                    marginBottom: 20 
                }}>
                    OUR GOAL
                </div>
                
                <div style={{ 
                    fontFamily, 
                    fontSize: 150, 
                    fontWeight: 900, 
                    color: '#FFFFFF',
                    fontVariantNumeric: 'tabular-nums', 
                    textShadow: `0 10px 40px rgba(0,0,0,0.4), 0 0 ${glow}px ${COLOR_ACCENT}`,
                    transform: `scale(${scale})`,
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    gap: 20,
                    position: 'relative'
                }}>
                     {/* Shimmer Overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)`,
                        transform: `translateX(${shimmerPos}px) skewX(-20deg)`,
                        pointerEvents: 'none',
                        zIndex: 2
                    }} />

                    <span>{amount.toLocaleString()}</span>
                    <span style={{ 
                        fontSize: 60, 
                        color: COLOR_ACCENT, 
                        fontWeight: 700,
                        opacity: 0.9,
                        letterSpacing: 2
                    }}>
                        RWF
                    </span>
                </div>
                
                <div style={{ 
                    marginTop: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 15,
                    opacity: interpolate(frame, [50, 80], [0, 1])
                }}>
                    <HeartHandshake color={COLOR_ACCENT} size={40} />
                    <span style={{ fontFamily, fontSize: 32, color: '#FFFFFF', fontWeight: 500 }}>
                        Thank you for your generosity
                    </span>
                </div>
            </div>
        </AbsoluteFill>
    );
};

export const EventBackdropVideo: React.FC = () => {
    const frame = useCurrentFrame();
    
    // Watermark visibility logic
    const showWatermark = (frame >= 150 && frame < 450) || frame >= 700;
    
    return (
        <AbsoluteFill style={{ backgroundColor: COLOR_BG }}>
            <Sequence from={0} durationInFrames={150}>
                <Scene1_Welcome />
            </Sequence>
            <Sequence from={150} durationInFrames={300}>
                <Scene2_Purpose />
            </Sequence>
            <Sequence from={450} durationInFrames={250}>
                <Scene3_Motivation />
            </Sequence>
            <Sequence from={700} durationInFrames={200}>
                <Scene4_GoalReminder />
            </Sequence>
            
            {/* Watermark */}
            <div style={{
                position: 'absolute',
                bottom: 40,
                left: 0,
                right: 0,
                textAlign: 'center',
                fontFamily,
                fontSize: 16,
                color: showWatermark ? '#FFFFFF' : COLOR_TEXT,
                opacity: 0.3,
                fontWeight: 500,
                letterSpacing: 2,
                transition: 'color 0.5s ease'
            }}>
                EDITED BY JEAN LEON
            </div>
        </AbsoluteFill>
    );
};
