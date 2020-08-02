import axios from "axios";

const TMDB_KEY = "f3f9b78b41bb039af5ae5b0b73675d0b";

const makeRequest = (path, params) =>
  axios.get(`https://api.themoviedb.org/3${path}`, {
    params: { ...params, api_key: TMDB_KEY },
  });

const getAnything = async (path, params = {}) => {
  try {
    const { data: { results } = {} } = await makeRequest(path, params);
    return [results, null];
  } catch (error) {
    return [null, error];
  }
};

export const movieApi = {
  nowPlaying: () => getAnything("/movie/now_playing"),
  popular: () => getAnything("/movie/popular"),
  upcoming: () => getAnything("/movie/upcoming", { region: "kr" }),
  search: (query) => getAnything("/search/movie", { query }),
  movie: (id) => getAnything(`/movie/${id}`),
  discover: () => getAnything("/dicover/movie"),
};
export const tvApi = {
  today: () => getAnything("/tv/airing_today"),
  thisWeek: () => getAnything("/tv/on_the_air"),
  topRated: () => getAnything("tv/top_rated"),
  popular: () => getAnything("/tv/popular"),
  search: (query) => getAnything("search/tv", { query }),
  show: (id) => getAnything(`/tv/${id}`),
};
