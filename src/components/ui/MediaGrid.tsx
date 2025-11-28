import React from 'react';
import type { MediaItem } from '../../types';
import { MediaCard } from './MediaCard';
import { motion } from 'framer-motion';

interface MediaGridProps {
    title: string;
    items: MediaItem[];
}

export const MediaGrid: React.FC<MediaGridProps> = ({ title, items }) => {
    return (
        <div className="py-12 container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-display tracking-wider border-l-4 border-neon-blue pl-4 relative">
                    <span className="relative z-10">{title}</span>
                    <span className="absolute inset-0 blur-lg bg-neon-blue/20 -z-10" />
                </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                        <MediaCard item={item} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
