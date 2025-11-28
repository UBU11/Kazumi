export const getMovieEmbed = (tmdbId: number | string) => `https://vidsrc.cc/v2/embed/movie/${tmdbId}`;

export const getTvEmbed = (tmdbId: number | string, season: number, episode: number) => `https://vidsrc.cc/v2/embed/tv/${tmdbId}/${season}/${episode}`;

export const getAnimeEmbed = (tmdbId: number | string, episode: number, type: 'sub' | 'dub' = 'sub') => `https://vidsrc.cc/v2/embed/anime/${tmdbId}/${episode}/${type}`; // Note: Verify if vidsrc supports 'anime' endpoint directly or if it uses distinct IDs. Following user spec.
