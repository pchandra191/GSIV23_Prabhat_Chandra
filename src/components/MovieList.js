// src/components/MovieList.js
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => (
  <div className="movie-list">
 {movies.map((movie, index) => (
  <MovieCard key={movie.id || index} movie={movie} />
))}
  </div>
);

export default MovieList;
