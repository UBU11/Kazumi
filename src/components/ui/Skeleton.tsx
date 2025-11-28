import React from 'react';
import { motion } from 'framer-motion';

export const MediaCardSkeleton = () => {
    return (
        <div className="w-full aspect-[2/3] comic-outline bg-[#0A0A0A] overflow-hidden">
            <motion.div
                className="w-full h-full bg-gradient-to-br from-[#1C1C1C] to-[#0A0A0A]"
                animate={{
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Frequency bars animation */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end gap-px h-12">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="flex-1 bg-[#1C8C4E]/20"
                            animate={{
                                height: ['20%', '80%', '20%']
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.1
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export const CarouselSkeleton = () => {
    return (
        <div className="py-12">
            {/* Title Skeleton */}
            <div className="px-6 lg:px-12 mb-8">
                <div className="h-8 w-48 bg-[#1C1C1C] radio-frame" />
            </div>

            {/* Cards Skeleton */}
            <div className="flex gap-4 px-6 lg:px-12">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex-shrink-0 w-48 md:w-56">
                        <MediaCardSkeleton />
                    </div>
                ))}
            </div>
        </div>
    );
};
