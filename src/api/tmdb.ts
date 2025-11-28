import type { MediaItem } from '../types';

// OMDb API Configuration
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const OMDB_BASE_URL = 'https://www.omdbapi.com';

interface OMDbMovie {
    imdbID: string;
    Title: string;
    Year: string;
    Type: 'movie' | 'series';
    Poster: string;
    Plot?: string;
    imdbRating?: string;
    Released?: string;
}

interface OMDbSearchResponse {
    Search: OMDbMovie[];
    totalResults: string;
    Response: string;
    Error?: string;
}

interface OMDbDetailResponse extends OMDbMovie {
    Plot: string;
    imdbRating: string;
    Released: string;
    Genre: string;
    Response: string;
}

// --- ROBUST FALLBACK DATA (Backup if OMDb fails) ---
const FALLBACK_MOVIES: MediaItem[] = [
    { id: 603, title: "The Matrix", poster_path: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", backdrop_path: "https://image.tmdb.org/t/p/original/7c9UVPPiTPltouxRVY6N9uugaVA.jpg", overview: "A computer hacker learns from mysterious rebels about the true nature of his reality.", vote_average: 8.2, release_date: "1999-03-30", media_type: 'movie' },
    { id: 27205, title: "Inception", poster_path: "https://image.tmdb.org/t/p/w500/9gk7admal4ZLVD9q6b0YlrF4246.jpg", backdrop_path: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg", overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious.", vote_average: 8.4, release_date: "2010-07-15", media_type: 'movie' },
    { id: 157336, title: "Interstellar", poster_path: "https://image.tmdb.org/t/p/w500/gEU2QniL6C8z1BHu8kGMaX0n8i.jpg", backdrop_path: "https://image.tmdb.org/t/p/original/xJHokMBLkbke0um54U7Xv2T26DA.jpg", overview: "Explorers make use of a newly discovered wormhole to surpass the limitations on human space travel.", vote_average: 8.4, release_date: "2014-11-05", media_type: 'movie' },
    { id: 19995, title: "Avatar", poster_path: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg", backdrop_path: "https://image.tmdb.org/t/p/original/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg", overview: "A paraplegic Marine is dispatched to the moon Pandora on a unique mission.", vote_average: 7.6, release_date: "2009-12-15", media_type: 'movie' },
    { id: 299534, title: "Avengers: Endgame", poster_path: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg", backdrop_path: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg", overview: "The Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.", vote_average: 8.3, release_date: "2019-04-24", media_type: 'movie' },
    { id: 550, title: "Fight Club", poster_path: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7Qf4n6a8MIx.jpg", backdrop_path: "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg", overview: "An insomniac office worker and a devil-may-care soap maker form an underground fight club.", vote_average: 8.4, release_date: "1999-10-15", media_type: 'movie' }
];

const FALLBACK_TV: MediaItem[] = [
    { id: 66732, title: "Stranger Things", poster_path: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg", backdrop_path: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYkJu64HIIV.jpg", overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments.", vote_average: 8.6, release_date: "2016-07-15", media_type: 'tv' },
    { id: 1399, title: "Game of Thrones", poster_path: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg", backdrop_path: "https://image.tmdb.org/t/p/original/2OMB0yn59o8bJOt3oPIM88sz5q6.jpg", overview: "Nine noble families fight for control over the lands of Westeros.", vote_average: 8.4, release_date: "2011-04-17", media_type: 'tv' },
    { id: 94605, title: "Arcane", poster_path: "https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg", backdrop_path: "https://image.tmdb.org/t/p/original/w6k7gq3qR5gK1B4eZeX9p9e9d9j.jpg", overview: "The origins of two iconic League champions, set in the utopian Piltover and the oppressed underground of Zaun.", vote_average: 8.7, release_date: "2021-11-06", media_type: 'tv' },
    { id: 82856, title: "The Mandalorian", poster_path: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg", backdrop_path: "https://image.tmdb.org/t/p/original/o7qi2v4uWQ8bZ1tW3KI0Ztn2epk.jpg", overview: "The travels of a lone bounty hunter in the outer reaches of the galaxy.", vote_average: 8.5, release_date: "2019-11-12", media_type: 'tv' }
];

const FALLBACK_ANIME: MediaItem[] = [
    { id: 1429, title: "Attack on Titan", poster_path: "https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdPuy61.jpg", backdrop_path: "https://image.tmdb.org/t/p/original/cMry7Ik7zTPL2xid6b47z88J2tS.jpg", overview: "Humanity lives inside cities surrounded by enormous walls that protect them from Titans.", vote_average: 8.6, release_date: "2013-04-07", media_type: 'anime' },
    { id: 85937, title: "Demon Slayer", poster_path: "https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEYdB9authIx.jpg", backdrop_path: "https://image.tmdb.org/t/p/original/nTvM4mhqNlHIvUkI1gVnW6XP7GG.jpg", overview: "A family is attacked by demons and only two members survive.", vote_average: 8.7, release_date: "2019-04-06", media_type: 'anime' },
    { id: 46260, title: "Naruto Shippuden", poster_path: "https://image.tmdb.org/t/p/w500/zAYRe2bJxpWTVrwwmBc00VFkAf4.jpg", backdrop_path: "https://image.tmdb.org/t/p/original/d1RHScaZc7I8j0lDke1c4AxI435.jpg", overview: "Naruto Uzumaki, an adolescent ninja, searches for recognition and dreams of becoming the Hokage.", vote_average: 8.6, release_date: "2007-02-15", media_type: 'anime' }
];

// Transform OMDb data to our MediaItem format
const transformOMDbItem = (item: OMDbMovie, mediaType?: 'movie' | 'tv' | 'anime'): MediaItem => {
    const type = mediaType || (item.Type === 'series' ? 'tv' : 'movie');

    return {
        id: parseInt(item.imdbID.replace('tt', '')) || Math.floor(Math.random() * 1000000),
        title: item.Title,
        poster_path: item.Poster !== 'N/A' ? item.Poster : '',
        backdrop_path: item.Poster !== 'N/A' ? item.Poster : '',
        overview: item.Plot || 'No description available.',
        vote_average: item.imdbRating && item.imdbRating !== 'N/A' ? parseFloat(item.imdbRating) : 7.5,
        release_date: item.Released || item.Year || 'Unknown',
        media_type: type
    };
};

// Curated lists for OMDb fetching
const POPULAR_MOVIES_LIST = ['The Matrix', 'Inception', 'Interstellar', 'The Dark Knight', 'Pulp Fiction', 'Avatar', 'Gladiator', 'Dune'];
const POPULAR_TV_LIST = ['Breaking Bad', 'Game of Thrones', 'Stranger Things', 'The Mandalorian', 'The Boys', 'Wednesday', 'The Last of Us'];
const POPULAR_ANIME_LIST = ['Attack on Titan', 'Demon Slayer', 'One Piece', 'Naruto', 'Death Note', 'Dragon Ball Z'];

// Fetch multiple items with fallback
const fetchMultiple = async (titles: string[], type: 'movie' | 'tv' | 'anime', fallbackData: MediaItem[]): Promise<MediaItem[]> => {
    try {
        const promises = titles.map(async (title) => {
            try {
                const searchType = type === 'anime' ? 'series' : type;
                const response = await fetch(
                    `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}&type=${searchType}`
                );
                const data: OMDbDetailResponse = await response.json();

                if (data.Response === 'True') {
                    return transformOMDbItem(data, type);
                }
                return null;
            } catch (error) {
                return null;
            }
        });

        const results = await Promise.all(promises);
        const validResults = results.filter((item): item is MediaItem => item !== null);

        // If OMDb failed completely (empty results), return fallback
        if (validResults.length === 0) {
            console.warn('OMDb returned no results, using fallback');
            return fallbackData;
        }

        return validResults;
    } catch (error) {
        console.error('Error fetching multiple from OMDb:', error);
        return fallbackData;
    }
};

export const getTrendingMovies = async (): Promise<MediaItem[]> => {
    return fetchMultiple(POPULAR_MOVIES_LIST, 'movie', FALLBACK_MOVIES);
};

export const getTrendingTv = async (): Promise<MediaItem[]> => {
    return fetchMultiple(POPULAR_TV_LIST, 'tv', FALLBACK_TV);
};

export const getTrendingAnime = async (): Promise<MediaItem[]> => {
    return fetchMultiple(POPULAR_ANIME_LIST, 'anime', FALLBACK_ANIME);
};

export const getPopularMovies = async (): Promise<MediaItem[]> => {
    return getTrendingMovies();
};

export const getPopularTv = async (): Promise<MediaItem[]> => {
    return getTrendingTv();
};

export const searchMulti = async (query: string): Promise<MediaItem[]> => {
    if (!query.trim()) return [];

    try {
        console.log('Searching OMDb for:', query);

        const response = await fetch(
            `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`
        );

        const data: OMDbSearchResponse = await response.json();

        if (data.Response === 'True' && data.Search) {
            // Get detailed info for top results
            const detailedResults = await Promise.all(
                data.Search.slice(0, 10).map(async (item) => {
                    try {
                        const detailResponse = await fetch(
                            `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&i=${item.imdbID}`
                        );
                        const detailData: OMDbDetailResponse = await detailResponse.json();
                        return detailData.Response === 'True' ? transformOMDbItem(detailData) : transformOMDbItem(item);
                    } catch {
                        return transformOMDbItem(item);
                    }
                })
            );
            return detailedResults;
        }

        return [];
    } catch (error) {
        console.error('Error searching OMDb:', error);
        // Fallback search
        const allFallback = [...FALLBACK_MOVIES, ...FALLBACK_TV, ...FALLBACK_ANIME];
        return allFallback.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    }
};

export const getDetails = async (id: number, type: 'movie' | 'tv' | 'anime'): Promise<MediaItem | undefined> => {
    try {
        // Try to reconstruct IMDb ID if possible, otherwise use fallback logic
        // Note: Since we generate fake IDs for fallback items, this might not always match a real IMDb ID
        // But for search results from OMDb, the ID is the numeric part of tt1234567

        const imdbId = `tt${id.toString().padStart(7, '0')}`;
        const response = await fetch(
            `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&i=${imdbId}`
        );

        const data: OMDbDetailResponse = await response.json();

        if (data.Response === 'True') {
            return transformOMDbItem(data, type);
        }

        // If not found by ID, try finding in fallback
        const allFallback = [...FALLBACK_MOVIES, ...FALLBACK_TV, ...FALLBACK_ANIME];
        return allFallback.find(item => item.id === id);
    } catch (error) {
        const allFallback = [...FALLBACK_MOVIES, ...FALLBACK_TV, ...FALLBACK_ANIME];
        return allFallback.find(item => item.id === id);
    }
};

export const getByCategory = async (category: 'movie' | 'tv' | 'anime'): Promise<MediaItem[]> => {
    if (category === 'movie') return getTrendingMovies();
    if (category === 'tv') return getTrendingTv();
    if (category === 'anime') return getTrendingAnime();
    return [];
};
