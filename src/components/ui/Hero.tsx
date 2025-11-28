import React from 'react';
import { motion } from 'framer-motion';
import { Play, Info, Star } from 'lucide-react';
import type { MediaItem } from '../../types';
import { Link } from 'react-router-dom';

interface HeroProps {
    item: MediaItem;
}

export const Hero: React.FC<HeroProps> = ({ item }) => {
    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Background Image - High Contrast Monochrome */}
            <div className="absolute inset-0">
                <img
                    src={item.backdrop_path || item.poster_path}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    style={{
                        filter: 'grayscale(100%) contrast(1.3) brightness(0.7)',
                    }}
                />

                {/* Subtle Halftone Overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.8) 1px, transparent 1px)',
                        backgroundSize: '4px 4px'
                    }}
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#000000]/50" />
            </div>

            {/* Scanline Effect */}
            <div className="scanline absolute inset-0 pointer-events-none" />

            {/* Content */}
            <div className="relative z-20 h-full min-h-screen max-w-[1920px] mx-auto px-6 lg:px-12 flex flex-col justify-center pt-24 pb-20">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="max-w-3xl tuner-slide"
                >
                    {/* Genre Tags - Speech Bubble Style */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="speech-tag">
                            <span className="text-[#1C8C4E]">FEATURED</span>
                        </div>
                        <div className="speech-tag">
                            <span className="text-[#EDEDED]">SCI-FI</span>
                        </div>
                        <div className="speech-tag">
                            <span className="text-[#EDEDED]">THRILLER</span>
                        </div>
                    </motion.div>

                    {/* Title - Retro Display Style */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 uppercase leading-none text-[#EDEDED] tracking-tight"
                        style={{
                            fontFamily: 'Rajdhani, monospace',
                            textShadow: '4px 4px 0 rgba(0,0,0,0.5), 0 0 20px rgba(0,240,255,0.2)',
                        }}
                    >
                        {item.title}
                    </motion.h1>

                    {/* Analog Tuner Progress Bar */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mb-8 origin-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-[#1C1C1C] relative">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-[#1C8C4E] neon-glow"
                                    style={{ width: `${(item.vote_average / 10) * 100}%` }}
                                />
                                {/* Tuner Marks */}
                                <div className="absolute top-0 left-0 right-0 flex justify-between">
                                    {[...Array(11)].map((_, i) => (
                                        <div key={i} className="w-px h-2 bg-[#1C1C1C] -translate-y-1/2" />
                                    ))}
                                </div>
                            </div>
                            <div className="radio-frame px-3 py-1">
                                <span className="text-xs text-[#1C8C4E] font-mono">{item.vote_average.toFixed(1)}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Metadata - Radio Display Style */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex items-center gap-6 mb-8 text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-[#1C8C4E]" />
                            <span className="text-[#EDEDED] font-mono">{item.vote_average.toFixed(1)}/10</span>
                        </div>
                        <div className="w-px h-4 bg-[#1C1C1C]" />
                        <span className="text-[#EDEDED] font-mono">{new Date(item.release_date).getFullYear()}</span>
                        <div className="w-px h-4 bg-[#1C1C1C]" />
                        <span className="text-[#EDEDED] uppercase tracking-wider text-xs">{item.media_type}</span>
                    </motion.div>

                    {/* Synopsis - Radio Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="radio-frame p-6 mb-10 max-w-2xl halftone-shadow"
                    >
                        <p className="text-[#EDEDED] text-base leading-relaxed">
                            {item.overview}
                        </p>
                    </motion.div>

                    {/* Action Buttons - Radio Knobs Style */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link to={`/${item.media_type}/${item.id}`}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative radio-frame px-8 py-4 bg-[#1C8C4E] overflow-hidden analog-jitter"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                <span className="relative flex items-center gap-3 text-[#FFFFFF] font-bold uppercase tracking-wider text-sm" style={{ fontFamily: 'Rajdhani, monospace' }}>
                                    <Play size={20} fill="currentColor" />
                                    PLAY
                                </span>
                            </motion.button>
                        </Link>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="radio-frame px-8 py-4 bg-transparent border border-[#EDEDED] analog-jitter"
                        >
                            <span className="flex items-center gap-3 text-[#EDEDED] font-bold uppercase tracking-wider text-sm" style={{ fontFamily: 'Rajdhani, monospace' }}>
                                <Info size={20} />
                                MORE INFO
                            </span>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Frequency Bars - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-20 flex items-end justify-center gap-1 px-12 pb-4 pointer-events-none">
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-1 bg-[#1C8C4E]/30"
                        style={{ height: `${Math.random() * 60 + 10}%` }}
                        animate={{
                            height: [`${Math.random() * 60 + 10}%`, `${Math.random() * 60 + 10}%`],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.05
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
