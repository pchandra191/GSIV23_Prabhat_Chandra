import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMovieDetails } from '../store/actions';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PageStyle.css';

const MovieDetails = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams(); // Get the movieId from URL params
  const movieDetails = useSelector((state) => state.movieDetails); // Get movie details from Redux store
  const [loadingMore, setLoadingMore] = useState(false); // Track loading state

  // Function to fetch movie details from the API
  const fetchMovies = async () => {
    try {
      setLoadingMore(true); // Set loading state to true

      // Configure API request options
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movieId}`,
        params: { language: 'en-US' },
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjY3Mzc0YmRlMjBiZTQ0ZGQ2ZWNkYzc2NjgwNzU4NSIsInN1YiI6IjY0ZjFlNGY2OTdhNGU2MDExYmIwMTE0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EuprwxjqoA3DkwDaKk1GycfINMeXX8WAdarakRx_dcM',
        },
      };

      // Make an API request to get movie details
      const response = await axios.request(options);
      const data = response.data;

      // Dispatch movie details to Redux store
      dispatch(setMovieDetails(data));
    } catch (error) {
      console.error('Error fetching movie details:', error); // Log the error
    } finally {
      setLoadingMore(false); // Set loading state back to false
    }
  };

  // Use useEffect to fetch movie details when the component loads
  useEffect(() => {
    fetchMovies();
  }, [dispatch]);

  // Display a loading message while data is being fetched
  if (loadingMore) {
    return <p>Loading...</p>;
  }

  // Log a warning if there are no movie details, and return null to render nothing
  if (!movieDetails) {
    console.warn('No movie details available.');
    return null;
  }

  // Destructure movie details for rendering
  const {
    title,
    vote_average,
    release_date,
    runtime,
    director,
    cast,
    overview,
    poster_path,
  } = movieDetails;

  return (
    <div className="movie-details-container">
      <img
        src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
        alt={title}
      />
      <div className="movie-details">
        <h2>
          {title} <span className='notbold'>({vote_average})</span>
        </h2>
        <h5>{release_date} | {runtime} mins | {director}</h5>
        <p>Cast: {cast}</p>
        <p>Description: {overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
