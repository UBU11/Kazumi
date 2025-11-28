import type { MediaItem } from '../types';

// Fallback mock data - Always available
const FALLBACK_MOVIES: MediaItem[] = [
    {
        id: 603,
        title: "The Matrix",
        poster_path: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/7c9UVPPiTPltouxRVY6N9uugaVA.jpg",
        overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
        vote_average: 8.2,
        release_date: "1999-03-30",
        media_type: 'movie'
    },
    {
        id: 27205,
        title: "Inception",
        poster_path: "https://image.tmdb.org/t/p/w500/9gk7admal4ZLVD9q6b0YlrF4246.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
        overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.",
        vote_average: 8.4,
        release_date: "2010-07-15",
        media_type: 'movie'
    },
    {
        id: 157336,
        title: "Interstellar",
        poster_path: "https://image.tmdb.org/t/p/w500/gEU2QniL6C8z1BHu8kGMaX0n8i.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/xJHokMBLkbke0um54U7Xv2T26DA.jpg",
        overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.",
        vote_average: 8.4,
        release_date: "2014-11-05",
        media_type: 'movie'
    },
    {
        id: 348,
        title: "Alien",
        poster_path: "https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/AmR3JG1VQVxU8TfAvljUhfSFUOx.jpg",
        overview: "During its return to the earth, commercial spaceship Nostromo intercepts a distress signal from a distant planet.",
        vote_average: 8.1,
        release_date: "1979-05-25",
        media_type: 'movie'
    },
    {
        id: 19995,
        title: "Avatar",
        poster_path: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg",
        overview: "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission.",
        vote_average: 7.6,
        release_date: "2009-12-15",
        media_type: 'movie'
    }
];

const FALLBACK_TV: MediaItem[] = [
    {
        id: 66732,
        title: "Stranger Things",
        poster_path: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYkJu64HIIV.jpg",
        overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
        vote_average: 8.6,
        release_date: "2016-07-15",
        media_type: 'tv'
    },
    {
        id: 94605,
        title: "Arcane",
        poster_path: "https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/w6k7gq3qR5gK1B4eZeX9p9e9d9j.jpg",
        overview: "Set in Utopian Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions.",
        vote_average: 8.7,
        release_date: "2021-11-06",
        media_type: 'tv'
    },
    {
        id: 210855,
        title: "The Mandalorian",
        poster_path: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/o7qi2v4uWQ8bZ1tW3KI0Ztn2epk.jpg",
        overview: "After the fall of the Galactic Empire, lawlessness has spread throughout the galaxy. A lone gunfighter makes his way through the outer reaches.",
        vote_average: 8.5,
        release_date: "2019-11-12",
        media_type: 'tv'
    }
];

// Simple fetch with timeout
const fetchWithTimeout = async (url: string, timeout = 3000): Promise<Response> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
};

// Trending Movies - Use fallback immediately
export const getTrendingMovies = async (): Promise<MediaItem[]> => {
    console.log('Fetching trending movies...');
    return new Promise((resolve) => {
        // Return fallback data immediately
        setTimeout(() => resolve(FALLBACK_MOVIES), 100);
    });
};

// Trending TV - Use fallback immediately
export const getTrendingTv = async (): Promise<MediaItem[]> => {
    console.log('Fetching trending TV...');
    return new Promise((resolve) => {
        setTimeout(() => resolve(FALLBACK_TV), 100);
    });
};

// Trending Anime - Use fallback immediately
export const getTrendingAnime = async (): Promise<MediaItem[]> => {
    console.log('Fetching anime...');
    return new Promise((resolve) => {
        setTimeout(() => resolve(FALLBACK_TV.map(item => ({ ...item, media_type: 'anime' as const }))), 100);
    });
};

// Popular Movies - Use fallback
export const getPopularMovies = async (): Promise<MediaItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...FALLBACK_MOVIES].reverse()), 100);
    });
};

// Popular TV - Use fallback
export const getPopularTv = async (): Promise<MediaItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...FALLBACK_TV].reverse()), 100);
    });
};

// Multi Search
export const searchMulti = async (query: string): Promise<MediaItem[]> => {
    if (!query.trim()) return [];

    return [...FALLBACK_MOVIES, ...FALLBACK_TV].filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );
};

// Get Details
export const getDetails = async (id: number, type: 'movie' | 'tv' | 'anime'): Promise<MediaItem | undefined> => {
    return [...FALLBACK_MOVIES, ...FALLBACK_TV].find(item => item.id === id);
};

// Get by Category
export const getByCategory = async (category: 'movie' | 'tv' | 'anime'): Promise<MediaItem[]> => {
    if (category === 'movie') return getTrendingMovies();
    if (category === 'tv') return getTrendingTv();
    if (category === 'anime') return getTrendingAnime();
    return [];
};
