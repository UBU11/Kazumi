import { useEffect, useState } from 'react';
import { Hero } from '../components/ui/Hero';
import { Carousel } from '../components/ui/Carousel';
import { CarouselSkeleton } from '../components/ui/Skeleton';
import { getTrendingMovies, getTrendingTv, getTrendingAnime, getPopularMovies, getPopularTv } from '../api/tmdb';
import type { MediaItem } from '../types';
import { motion } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';

export const Home = () => {
    const [featured, setFeatured] = useState<MediaItem | null>(null);
    const [trendingMovies, setTrendingMovies] = useState<MediaItem[]>([]);
    const [trendingTv, setTrendingTv] = useState<MediaItem[]>([]);
    const [trendingAnime, setTrendingAnime] = useState<MediaItem[]>([]);
    const [popularMovies, setPopularMovies] = useState<MediaItem[]>([]);
    const [popularTv, setPopularTv] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);

    useTitle('Home - KASUMI');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                console.log('Fetching TMDB data...');

                // Fetch all data in parallel
                const [
                    trendingMoviesData,
                    trendingTvData,
                    trendingAnimeData,
                    popularMoviesData,
                    popularTvData
                ] = await Promise.all([
                    getTrendingMovies(),
                    getTrendingTv(),
                    getTrendingAnime(),
                    getPopularMovies(),
                    getPopularTv()
                ]);

                console.log('Data fetched:', {
                    movies: trendingMoviesData.length,
                    tv: trendingTvData.length,
                    anime: trendingAnimeData.length
                });

                setTrendingMovies(trendingMoviesData);
                setTrendingTv(trendingTvData);
                setTrendingAnime(trendingAnimeData);
                setPopularMovies(popularMoviesData);
                setPopularTv(popularTvData);

                // Set featured item (first trending movie)
                if (trendingMoviesData.length > 0) {
                    setFeatured(trendingMoviesData[0]);
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                // Always set loading to false
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                {trendingMovies.length > 0 && (
                    <Carousel title="TRENDING MOVIES" items={trendingMovies} />
                )}

                {trendingTv.length > 0 && (
                    <Carousel title="TRENDING SERIES" items={trendingTv} />
                )}

                {trendingAnime.length > 0 && (
                    <Carousel title="ANIME SPOTLIGHT" items={trendingAnime} />
                )}

                {popularMovies.length > 0 && (
                    <Carousel title="POPULAR MOVIES" items={popularMovies} />
                )}

                {popularTv.length > 0 && (
                    <Carousel title="POPULAR SERIES" items={popularTv} />
                )}
            </div>
        </motion.div>
    );
};
