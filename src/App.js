// src/App.js
import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ListPage from './pages/ListPage';
import MovieDetailsPage from './pages/MovieDetails';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/"  element={<ListPage />} />
      <Route exact path="/movie/:movieId"  element={<MovieDetailsPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
