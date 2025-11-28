import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/ui/Hero';
import { Carousel } from '../components/ui/Carousel';
import { CarouselSkeleton } from '../components/ui/Skeleton';
import { getTrendingMovies, getTrendingTv, getTrendingAnime, getPopularMovies, getPopularTv } from '../api/tmdb';
import type { MediaItem } from '../types';
import { motion } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';

export const Home = () => {
    const location = useLocation();
    const path = location.pathname;

    const [featured, setFeatured] = useState<MediaItem | null>(null);
    const [trendingMovies, setTrendingMovies] = useState<MediaItem[]>([]);
    const [trendingTv, setTrendingTv] = useState<MediaItem[]>([]);
    const [trendingAnime, setTrendingAnime] = useState<MediaItem[]>([]);
    const [popularMovies, setPopularMovies] = useState<MediaItem[]>([]);
    const [popularTv, setPopularTv] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Determine page type
    const isMovies = path === '/movies';
    const isSeries = path === '/series';
    const isAnime = path === '/anime';
    const isHome = path === '/';

    const pageTitle = isMovies ? 'Movies' : isSeries ? 'Series' : isAnime ? 'Anime' : 'Home';
    useTitle(`${pageTitle} - KASUMI`);

    useEffect(() => {


        // Refactored fetch logic for better control
        const loadContent = async () => {
            setLoading(true);
            try {
                let featuredItem: MediaItem | null = null;

                if (isHome) {
                    const [tm, tt, ta, pm, pt] = await Promise.all([
                        getTrendingMovies(),
                        getTrendingTv(),
                        getTrendingAnime(),
                        getPopularMovies(),
                        getPopularTv()
                    ]);
                    setTrendingMovies(tm);
                    setTrendingTv(tt);
                    setTrendingAnime(ta);
                    setPopularMovies(pm);
                    setPopularTv(pt);
                    featuredItem = tm[0];
                } else if (isMovies) {
                    const [tm, pm] = await Promise.all([
                        getTrendingMovies(),
                        getPopularMovies()
                    ]);
                    setTrendingMovies(tm);
                    setPopularMovies(pm);
                    featuredItem = tm[0];
                } else if (isSeries) {
                    const [tt, pt] = await Promise.all([
                        getTrendingTv(),
                        getPopularTv()
                    ]);
                    setTrendingTv(tt);
                    setPopularTv(pt);
                    featuredItem = tt[0];
                } else if (isAnime) {
                    const ta = await getTrendingAnime();
                    setTrendingAnime(ta);
                    featuredItem = ta[0];
                }

                if (featuredItem) {
                    setFeatured(featuredItem);
                }
            } catch (error) {
                console.error("Failed to load content", error);
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [path, isHome, isMovies, isSeries, isAnime]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A]">
                {/* Loading Hero Skeleton */}
                <div className="relative w-full h-screen bg-gradient-to-b from-[#1C1C1C] to-[#0A0A0A]">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {/* Retro Loading - Frequency Bars */}
                        <div className="flex items-end gap-1 h-20 mb-6">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 bg-[#1C8C4E]"
                                    animate={{
                                        height: ['20%', '100%', '20%'],
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        delay: i * 0.1,
                                    }}
                                />
                            ))}
                        </div>
                        <p className="text-[#1C8C4E] text-sm uppercase tracking-[0.3em] font-mono">
                            TUNING FREQUENCY...
                        </p>
                    </div>
                </div>

                {/* Carousel Skeletons */}
                <div className="relative -mt-32 z-30">
                    <CarouselSkeleton />
                    <CarouselSkeleton />
                    <CarouselSkeleton />
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#0A0A0A]"
        >
            {featured && <Hero item={featured} />}

            <div className="relative -mt-32 z-30 space-y-8 pb-20">
                {/* Movies Section */}
                {(isHome || isMovies) && trendingMovies.length > 0 && (
                    <Carousel title="TRENDING MOVIES" items={trendingMovies} />
                )}
                {(isHome || isMovies) && popularMovies.length > 0 && (
                    <Carousel title="POPULAR MOVIES" items={popularMovies} />
                )}

                {/* Series Section */}
                {(isHome || isSeries) && trendingTv.length > 0 && (
                    <Carousel title="TRENDING SERIES" items={trendingTv} />
                )}
                {(isHome || isSeries) && popularTv.length > 0 && (
                    <Carousel title="POPULAR SERIES" items={popularTv} />
                )}

                {/* Anime Section */}
                {(isHome || isAnime) && trendingAnime.length > 0 && (
                    <Carousel title="ANIME SPOTLIGHT" items={trendingAnime} />
                )}
            </div>
        </motion.div>
    );
};
