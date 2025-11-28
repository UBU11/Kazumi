import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MediaItem } from '../../types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Top10CarouselProps {
    title: string;
    items: MediaItem[];
}

export const Top10Carousel: React.FC<Top10CarouselProps> = ({ items }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -600 : 600;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative py-16 overflow-hidden">
            {/* Title - Comic Style */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="px-6 lg:px-12 mb-12"
            >
                <div className="flex items-center gap-6">
                    <h2
                        className="text-6xl md:text-8xl font-black comic-text"
                        style={{
                            fontFamily: 'Bangers, cursive',
                            color: '#ED1D24',
                            letterSpacing: '-0.05em'
                        }}
                    >
                        TOP 10
                    </h2>
                    <div className="bg-[#FFC107] px-6 py-3 border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] transform -rotate-3">
                        <p className="text-black text-2xl font-bold uppercase tracking-wider" style={{ fontFamily: 'Bangers, cursive' }}>CONTENT</p>
                        <p className="text-black text-2xl font-bold uppercase tracking-wider" style={{ fontFamily: 'Bangers, cursive' }}>TODAY</p>
                    </div>
                </div>
            </motion.div>

            {/* Navigation Buttons */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/80 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft size={28} className="text-white" />
            </button>

            <button
                onClick={() => scroll('right')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/80 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
            >
                <ChevronRight size={28} className="text-white" />
            </button>

            {/* Carousel */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-scroll scrollbar-hide px-6 lg:px-12 scroll-smooth group"
            >
                {items.slice(0, 10).map((item, index) => (
                    <Link
                        key={item.id}
                        to={`/${item.media_type}/${item.id}`}
                        className="flex-shrink-0 relative"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05, zIndex: 10 }}
                            className="relative w-64 h-96 overflow-hidden cursor-pointer group/card border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
                        >
                            {/* Giant Number - Comic Style */}
                            <div
                                className="absolute -left-8 bottom-0 z-10 text-[220px] font-black leading-none comic-text"
                                style={{
                                    fontFamily: 'Bangers, cursive',
                                    color: '#FFC107',
                                }}
                            >
                                {index + 1}
                            </div>

                            {/* Image */}
                            <img
                                src={item.poster_path || 'https://via.placeholder.com/300x450'}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                style={{ filter: 'contrast(1.2) saturate(1.4)' }}
                            />

                            {/* Halftone Overlay */}
                            <div className="absolute inset-0 halftone opacity-20 group-hover/card:opacity-40 transition-opacity" />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover/card:opacity-90 transition-opacity" />

                            {/* Title on Hover - Comic Style */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover/card:opacity-100 transition-opacity bg-[#ED1D24] border-t-4 border-black">
                                <h3 className="text-white font-bold text-lg line-clamp-2 uppercase" style={{ fontFamily: 'Bangers, cursive' }}>
                                    {item.title}
                                </h3>
                                <p className="text-[#FFC107] text-sm font-bold">⭐ {item.vote_average.toFixed(1)}</p>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
