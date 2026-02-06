import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Montserrat';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';

const { fontFamily } = loadFont();

const COLOR_BG = '#FFFFFF';
const COLOR_PRIMARY = '#003366'; // Dark Blue
const COLOR_ACCENT = '#D4AF37'; // Gold
const COLOR_TEXT = '#333333';
const COLOR_LIGHT_GRAY = '#F5F5F5';

const TitleText: React.FC<{ children: React.ReactNode; color?: string; fontSize?: number; delay?: number }> = ({ 
    children, 
    color = COLOR_PRIMARY, 
    fontSize = 60, 
    delay = 0 
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    
    const opacity = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const slide = interpolate(frame - delay, [0, 20], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <div style={{ 
            fontFamily, 
            fontWeight: 700, 
            fontSize, 
            color, 
            opacity, 
            transform: `translateY(${slide}px)`,
            textAlign: 'center',
            lineHeight: 1.2,
            margin: '10px 0'
        }}>
            {children}
        </div>
    );
};

const SubtitleText: React.FC<{ children: React.ReactNode; color?: string; fontSize?: number; delay?: number }> = ({ 
    children, 
    color = COLOR_TEXT, 
    fontSize = 32, 
    delay = 0 
}) => {
    const frame = useCurrentFrame();
    
    const opacity = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <div style={{ 
            fontFamily, 
            fontWeight: 400, 
            fontSize, 
            color, 
            opacity,
            textAlign: 'center',
            marginTop: 10
        }}>
            {children}
        </div>
    );
};

const Scene1_Intro = () => {
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR_BG }}>
            <SubtitleText delay={10}>ECOLE TECHNIQUE SAINT KIZITO MUSHA</SubtitleText>
            <TitleText delay={30} fontSize={80}>INVITES YOU TO A</TitleText>
            <TitleText delay={50} color={COLOR_ACCENT} fontSize={100}>FUNDRAISING<br/>CEREMONY</TitleText>
        </AbsoluteFill>
    );
};

const Scene2_Cause = () => {
    const frame = useCurrentFrame();
    const scale = interpolate(frame, [0, 100], [1, 1.05]);

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR_BG }}>
             <div style={{ 
                transform: `scale(${scale})`, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' 
            }}>
                <SubtitleText delay={0} fontSize={40}>Help us build</SubtitleText>
                <div style={{ margin: '40px 0' }}>
                    <Heart color={COLOR_PRIMARY} size={120} fill={COLOR_PRIMARY} style={{ opacity: 0.2 }} />
                </div>
                <TitleText delay={20} fontSize={90}>THE VIRGIN MARY<br/>STATUE</TitleText>
            </div>
        </AbsoluteFill>
    );
};

const Scene3_Goal = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    
    const progress = spring({
        frame: frame - 20,
        fps,
        config: { damping: 100 }
    });
    
    const amount = Math.floor(interpolate(progress, [0, 1], [0, 1000000]));
    
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR_BG }}>
            <SubtitleText fontSize={50}>TARGET AMOUNT</SubtitleText>
            <div style={{
                fontFamily,
                fontSize: 140,
                fontWeight: 800,
                color: COLOR_ACCENT,
                marginTop: 30
            }}>
                {amount.toLocaleString()} RWF
            </div>
        </AbsoluteFill>
    );
};

const InfoCard = ({ icon: Icon, title, sub, delay }: { icon: any, title: string, sub: string, delay: number }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame - delay, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const y = interpolate(frame - delay, [0, 15], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity,
            transform: `translateY(${y}px)`,
            backgroundColor: COLOR_LIGHT_GRAY,
            padding: 40,
            borderRadius: 20,
            minWidth: 300,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
            <Icon size={60} color={COLOR_PRIMARY} style={{ marginBottom: 20 }} />
            <div style={{ fontFamily, fontSize: 30, fontWeight: 700, color: COLOR_PRIMARY, marginBottom: 10 }}>{title}</div>
            <div style={{ fontFamily, fontSize: 24, color: COLOR_TEXT }}>{sub}</div>
        </div>
    );
};

const Scene4_Details = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: COLOR_BG }}>
            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TitleText fontSize={60} delay={0}>SAVE THE DATE</TitleText>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    gap: 40, 
                    marginTop: 60,
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <InfoCard icon={Calendar} title="07 Feb 2026" sub="Saturday" delay={15} />
                    <InfoCard icon={Clock} title="13:00 PM" sub="Afternoon" delay={30} />
                    <InfoCard icon={MapPin} title="Gymnaz" sub="School Grounds" delay={45} />
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};

const Scene5_Outro = () => {
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR_PRIMARY }}>
            <TitleText color="#FFFFFF" fontSize={70} delay={10}>YOUR CONTRIBUTION<br/>MATTERS</TitleText>
            <SubtitleText color={COLOR_ACCENT} fontSize={40} delay={40}>THANK YOU!</SubtitleText>
        </AbsoluteFill>
    );
};

export const FundraisingVideo: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: COLOR_BG }}>
            <Sequence from={0} durationInFrames={150}>
                <Scene1_Intro />
            </Sequence>
            <Sequence from={150} durationInFrames={150}>
                <Scene2_Cause />
            </Sequence>
            <Sequence from={300} durationInFrames={150}>
                <Scene3_Goal />
            </Sequence>
            <Sequence from={450} durationInFrames={300}>
                <Scene4_Details />
            </Sequence>
            <Sequence from={750} durationInFrames={150}>
                <Scene5_Outro />
            </Sequence>
        </AbsoluteFill>
    );
};
