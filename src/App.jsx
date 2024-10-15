import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar.jsx';
import MovieSearch from './components/MovieSearch.jsx';
import Favorites from './components/Favorites.jsx';
import MovieDetails from './components/MovieDetails.jsx';
import { Helmet } from 'react-helmet';

function App() {

  return (
    <Router>
       <div
        className="min-h-screen bg-theaterBlack bg-cover bg-center"
        style={{ backgroundImage: `url('./assets/theater.jpg')` }}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Movie App</title>
          <meta name="description" content="Search and manage your favorite movies." />
          <meta name="keywords" content="movies, search, favorites, Hemmakvälls Filmbibliotek" />
          <link rel="canonical" href="https://vertella.github.io/hemmakvall/" />
          {/* Open Graph Tags for Social Media */}
          <meta property="og:title" content="Hemmakvälls Filmbibliotek" />
          <meta property="og:description" content="Search and manage your favorite movies." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://vertella.github.io/hemmakvall/" />
          <meta property="og:image" content="https://vertella.github.io/hemmakvall/theater.jpg" />
        </Helmet>
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
