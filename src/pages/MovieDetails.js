import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMovieDetails } from '../store/actions';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './PageStyle.css';
import home from '../assets/home.png'
import back from '../assets/back.png'

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
      console.log(data);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Split the release_date to extract the year
  const releaseYear = release_date ? release_date.split("-")[0] : "";

  return (
    <div>
      <div className='topNav'>
      <Link to={`/`}>
          <img
            src={back}
            alt="back"
            height={30}
            style={{ marginTop: "10px"}}
          />
        </Link>
        <h3 > Movie Details</h3>
        <Link to={`/`}>
          <img
            src={home}
            alt="home"
            height={60}
          />
        </Link>
      </div>
      <div className="movie-details-container">

        <img
          src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
          alt={title}
        />
        <div className="movie-details">
          <h2>
            {title} <span className='notbold'>({vote_average})</span>
          </h2>
          <h5>{releaseYear} | {runtime} mins | {director}</h5>
          <p>Cast: {cast}</p>
          <p>Description: {overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
