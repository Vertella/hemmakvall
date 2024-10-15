import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar.jsx';
import MovieSearch from './components/MovieSearch.jsx';
import Favorites from './components/Favorites.jsx';
import MovieDetails from './components/MovieDetails.jsx';

function App() {

  return (
    <Router>
       <div
        className="min-h-screen bg-theaterBlack bg-cover bg-center"
        style={{ backgroundImage: `url('./assets/theater.jpg')` }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieSearch />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  )
};

export default App
