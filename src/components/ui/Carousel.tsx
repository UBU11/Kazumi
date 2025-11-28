import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaCard } from './MediaCard';
import type { MediaItem } from '../../types';
import { motion } from 'framer-motion';

interface CarouselProps {
    title: string;
    items: MediaItem[];
}

export const Carousel: React.FC<CarouselProps> = ({ title, items }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -600 : 600;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative py-12 group">
            {/* Title - Radio Display Style */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="px-6 lg:px-12 mb-8"
            >
                <div className="flex items-center gap-4">
                    <h2
                        className="text-2xl font-bold text-[#EDEDED] uppercase tracking-[0.2em]"
                        style={{ fontFamily: 'Rajdhani, monospace' }}
                    >
                        {title}
                    </h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-[#1C8C4E] to-transparent" />

                    {/* Frequency Indicator */}
                    <div className="flex gap-px">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-px h-3 bg-[#1C8C4E] opacity-50" />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Navigation Buttons - Radio Knob Style */}
            <button
                onClick={() => scroll('left')}
                className="hidden md:block absolute left-2 top-1/2 -translate-y-1/2 z-30 radio-knob opacity-0 group-hover:opacity-100 transition-opacity analog-jitter"
            >
                <ChevronLeft className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-[#1C8C4E]" />
            </button>

            <button
                onClick={() => scroll('right')}
                className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 z-30 radio-knob opacity-0 group-hover:opacity-100 transition-opacity analog-jitter"
            >
                <ChevronRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-[#1C8C4E]" />
            </button>

            {/* Carousel Container */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-scroll scrollbar-hide px-6 lg:px-12 scroll-smooth"
            >
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="flex-shrink-0 w-48 md:w-56"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                        <MediaCard item={item} />
                    </motion.div>
                ))}
            </div>

            {/* Bottom Frequency Line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1C8C4E]/30 to-transparent" />
        </div>
    );
};
