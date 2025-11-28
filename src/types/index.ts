export interface MediaItem {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
    media_type: 'movie' | 'tv' | 'anime';
}

export interface MovieDetails extends MediaItem {
    runtime: number;
    genres: { id: number; name: string }[];
}

export interface TvDetails extends MediaItem {
    number_of_seasons: number;
    seasons: Season[];
}

export interface Season {
    season_number: number;
    episode_count: number;
    name: string;
}

export interface Episode {
    id: number;
    episode_number: number;
    name: string;
    overview: string;
    still_path: string;
}
