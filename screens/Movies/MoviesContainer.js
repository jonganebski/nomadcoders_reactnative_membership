import React, { useState, useEffect } from "react";
import { movieApi } from "../../api";
import MoviesPresenter from "./MoviesPresenter";

export default () => {
  const [movies, setMovies] = useState({
    isLoading: true,
    nowPlaying: [],
    popular: [],
    upcoming: [],
    nowPlayingError: null,
    popularError: null,
    upcomingError: null,
  });
  const getData = async () => {
    const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
    const [popular, popularError] = await movieApi.popular();
    const [upcoming, upcomingError] = await movieApi.upcoming();
    setMovies({
      isLoading: false,
      nowPlaying,
      popular,
      upcoming,
      nowPlayingError,
      popularError,
      upcomingError,
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return <MoviesPresenter {...movies}></MoviesPresenter>;
};
