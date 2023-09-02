// src/store/actions.js
export const setMovies = (movies) => ({
    type: 'SET_MOVIES',
    payload: movies,
  });


  export const setMovieDetails = (movieDetails) => ({
    type: 'SET_MOVIESDETAILS',
    payload: movieDetails,
  });
