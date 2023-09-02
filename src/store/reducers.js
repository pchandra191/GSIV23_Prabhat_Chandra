// src/store/reducers.js
const initialState = {
    movies: [],
    movieDetails: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_MOVIES':
        return { ...state, movies: action.payload };
        case 'SET_MOVIESDETAILS':
        return { ...state, movieDetails: action.payload };
      default:
        return state;
    }
  };

  
  
//   export default rootReducer;
  // src/store/reducers/index.js
// import { combineReducers } from 'redux';
// import moviesReducer from './moviesReducer';
// import movieDetailsReducer from './movieDetailsReducer'; // Import the movie details reducer

// const rootReducer = combineReducers({
//   movies: moviesReducer,
//   movieDetails: movieDetailsReducer, // Add the movie details reducer
// });

export default rootReducer;
