import type { MediaItem } from '../types';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || '8265bd1679663a7ea12ac168da84d2e8'; // Free demo key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

interface TMDBMovie {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    media_type?: 'movie' | 'tv';
}

interface TMDBResponse {
    results: TMDBMovie[];
    page: number;
    total_pages: number;
    total_results: number;
}

const transformTMDBItem = (item: TMDBMovie, mediaType?: 'movie' | 'tv' | 'anime'): MediaItem => ({
    id: item.id,
    title: item.title || item.name || 'Untitled',
    poster_path: item.poster_path ? `${TMDB_IMAGE_BASE}/w500${item.poster_path}` : null,
    backdrop_path: item.backdrop_path ? `${TMDB_IMAGE_BASE}/original${item.backdrop_path}` : null,
    overview: item.overview || 'No description available.',
    vote_average: item.vote_average || 0,
    release_date: item.release_date || item.first_air_date || 'Unknown',
    media_type: mediaType || item.media_type || 'movie'
});

// Trending Movies
export const getTrendingMovies = async (): Promise<MediaItem[]> => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
        );
        const data: TMDBResponse = await response.json();
        return data.results.map(item => transformTMDBItem(item, 'movie'));
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
};

// Trending TV Series
export const getTrendingTv = async (): Promise<MediaItem[]> => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}`
        );
        const data: TMDBResponse = await response.json();
        return data.results.map(item => transformTMDBItem(item, 'tv'));
    } catch (error) {
        console.error('Error fetching trending TV:', error);
        return [];
    }
};

// Trending Anime (Animation genre)
export const getTrendingAnime = async (): Promise<MediaItem[]> => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_genres=16&sort_by=popularity.desc&with_original_language=ja`
        );
        const data: TMDBResponse = await response.json();
        return data.results.slice(0, 20).map(item => transformTMDBItem(item, 'anime'));
    } catch (error) {
        console.error('Error fetching anime:', error);
        return [];
    }
};

// Popular Movies
export const getPopularMovies = async (): Promise<MediaItem[]> => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
        );
        const data: TMDBResponse = await response.json();
        return data.results.map(item => transformTMDBItem(item, 'movie'));
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
};

// Popular TV Series
export const getPopularTv = async (): Promise<MediaItem[]> => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`
        );
        const data: TMDBResponse = await response.json();
        return data.results.map(item => transformTMDBItem(item, 'tv'));
    } catch (error) {
        console.error('Error fetching popular TV:', error);
        return [];
    }
};

// Multi Search (Movies + TV + Anime)
export const searchMulti = async (query: string): Promise<MediaItem[]> => {
    if (!query.trim()) return [];

    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`
        );
        const data: TMDBResponse = await response.json();
        return data.results
            .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
            .map(item => transformTMDBItem(item));
    } catch (error) {
        console.error('Error searching:', error);
        return [];
    }
};

// Get Details
export const getDetails = async (id: number, type: 'movie' | 'tv' | 'anime'): Promise<MediaItem | undefined> => {
    try {
        const endpoint = type === 'anime' ? 'tv' : type;
        const response = await fetch(
            `${TMDB_BASE_URL}/${endpoint}/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`
        );
        const data: TMDBMovie = await response.json();
        return transformTMDBItem(data, type);
    } catch (error) {
        console.error('Error fetching details:', error);
        return undefined;
    }
};

// Get by Category
export const getByCategory = async (category: 'movie' | 'tv' | 'anime'): Promise<MediaItem[]> => {
    if (category === 'movie') return getTrendingMovies();
    if (category === 'tv') return getTrendingTv();
    if (category === 'anime') return getTrendingAnime();
    return [];
};
