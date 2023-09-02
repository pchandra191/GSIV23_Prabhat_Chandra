import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import home from '../assets/home.png'
import search from '../assets/search.png'
import { setMovies } from '../store/actions'; // Import the action for setting movies
import MovieList from '../components/MovieList'; // Import the MovieList component
import axios from 'axios';

const ListPage = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies); // Get movies from the Redux store
    const [page, setPage] = useState(1); // Initialize page state for pagination
    const [loadingMore, setLoadingMore] = useState(false); // Track loading state
    const [searchTerm, setSearchTerm] = useState(''); // Initialize search term state
    const [filteredMovies, setFilteredMovies] = useState(movies); // Initialize filteredMovies state

    // Function to fetch more movies from the API
    const fetchMovies = async () => {
        try {
            setLoadingMore(true); // Set loading state to true

            // Configure API request options
            const options = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/movie/upcoming',
                params: {
                    language: 'en-US',
                    page,
                    sort_by: 'primary_release_date.asc',
                },
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjY3Mzc0YmRlMjBiZTQ0ZGQ2ZWNkYzc2NjgwNzU4NSIsInN1YiI6IjY0ZjFlNGY2OTdhNGU2MDExYmIwMTE0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EuprwxjqoA3DkwDaKk1GycfINMeXX8WAdarakRx_dcM',
                },
            };

            // Make an API request to get movie data
            const response = await axios.request(options);
            const data = response.data;

            // Dispatch movies to Redux store (concatenate with existing movies)
            dispatch(setMovies([...movies, ...data.results]));
            //    fetchMovies(); // Call it immediately
        } catch (error) {
            console.error('Error fetching movies:', error); // Log the error if API request fails
        } finally {
            setLoadingMore(false); // Set loading state back to false
        }
    };

    // Function to handle scrolling for infinite scrolling
    const handleScroll = () => {
        if (
            !loadingMore &&
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.scrollHeight - 1000
        ) {
            setPage((prevPage) => prevPage + 1); // Increment the page number
            setLoadingMore(true); // Set loading state to true
        }
    };

    // Use useEffect to fetch movies when the component loads or the page changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, dispatch]);

    // Use useEffect to filter movies based on the search term
    useEffect(() => {
        const filtered = movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMovies(filtered);
    }, [searchTerm, movies]);

    // Use useEffect to add and remove scroll event listeners
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingMore]);

    // Function to handle changes in the search input
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <div className="movie-card-container main">
                {/* Search input */}
                <div className='topNav'>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className='searchBox'
                        style={{ backgroundImage: `url(${search})`, backgroundPosition: "10px",borderRadius: "16px", backgroundRepeat: 'no-repeat', backgroundSize: '28px', paddingLeft: '3%' }}
                    /> 
                </div>

                {/* Render movies or no movies found message */}
                {filteredMovies.length === 0 ? (
                    <h3>No Movies were found with this name</h3> // Log when no movies match the search term
                ) : (
                    <MovieList movies={filteredMovies} /> // Render the MovieList component with filtered movies
                )}

                {/* Render additional movies when the search term is empty */}
                {searchTerm === '' && <MovieList movies={movies} page={page} />}

                {/* Loading indicator */}
                {loadingMore && <h1 className="loading-more">Loading more...</h1>}
            </div>
        </>
    );
};

export default ListPage;
