import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import type { MediaItem } from '../../types';
import { Link } from 'react-router-dom';

interface MediaCardProps {
    item: MediaItem;
    className?: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, className }) => {
    return (
        <Link to={`/${item.media_type}/${item.id}`} className={className}>
            <motion.div
                className="group relative w-full aspect-[2/3] overflow-hidden cursor-pointer comic-outline bg-[#0A0A0A]"
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.2 }}
            >
                {/* Image - Monochrome */}
                <img
                    src={item.poster_path || 'https://via.placeholder.com/300x450?text=No+Signal'}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-500"
                    style={{
                        filter: 'grayscale(100%) contrast(1.2)',
                    }}
                />

                {/* Halftone Corner (Subtle) */}
                <div
                    className="absolute top-0 right-0 w-20 h-20 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.6) 1px, transparent 1px)',
                        backgroundSize: '3px 3px'
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Neon Rim on Hover */}
                <motion.div
                    className="absolute inset-0 border border-[#1C8C4E] opacity-0 group-hover:opacity-100 transition-opacity neon-glow"
                    initial={{ opacity: 0 }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                    {/* Play Button - Radio Knob Style */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1.1, rotate: 15 }}
                    >
                        <div className="radio-knob w-16 h-16">
                            <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-[#1C8C4E] ml-0.5" fill="#1C8C4E" />
                        </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-[#EDEDED] font-bold text-sm mb-2 line-clamp-2 leading-tight uppercase tracking-wide" style={{ fontFamily: 'Rajdhani, monospace' }}>
                        {item.title}
                    </h3>

                    {/* Meta - Frequency Display */}
                    <div className="flex items-center gap-3 text-xs">
                        <div className="radio-frame px-2 py-1">
                            <span className="text-[#1C8C4E] font-mono">{item.vote_average.toFixed(1)}</span>
                        </div>
                        <div className="w-px h-3 bg-[#1C1C1C]" />
                        <span className="text-[#EDEDED] font-mono">{new Date(item.release_date).getFullYear()}</span>
                    </div>

                    {/* Frequency Bars */}
                    <div className="flex items-end gap-px mt-2 h-4">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-[#1C8C4E]"
                                style={{ height: `${(i + 1) * 12.5}%` }}
                                animate={{
                                    opacity: [0.3, 0.8, 0.3]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.1
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* NEW Tag - Minimal Speech Bubble */}
                {new Date(item.release_date).getFullYear() >= new Date().getFullYear() - 1 && (
                    <motion.div
                        className="absolute top-2 right-2 z-30"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                    >
                        <div className="speech-tag bg-[#1C8C4E] text-[#000000] border-[#1C8C4E]">
                            NEW
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </Link>
    );
};
