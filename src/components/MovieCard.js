import React from 'react';
import './Movies.css'; // CSS file for styling
import { Link } from 'react-router-dom'; // Import Link from React Router



const MovieCard = ({ movie }) => (
  <div className="movie-card movie-card-container">
    <Link key={movie.id} to={`/movie/${movie.id}`}>
    <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={movie.title} />
    <div className='title'>
        <p>{movie.title}</p>
        <p>{movie.vote_average}</p>
    </div>
    <p className='desc'>Description: {movie.overview}</p>
  </Link>
  </div>
);

export default MovieCard;
