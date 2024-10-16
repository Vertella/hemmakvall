import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../features/movies/favoritesSlice.jsx";
import { FaStar, FaRegStar } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favoritesList);
  console.log(favorites);
  const isFavorite = Array.isArray(favorites) && favorites.some((fav) => fav.id === movie.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <div className="bg-theaterGray rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105 relative">
      <Link to={`/movie/${movie.id}`} className="block">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-80 object-cover"
          onError={(e) => {
            e.target.onerror = null; // prevents looping
            e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
          }}
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-lightGray">
            {movie.title}
          </h2>
          <p className="text-sm text-gray-400">
            Release Year: {new Date(movie.release_date).getFullYear()}
          </p>
        </div>
      </Link>
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 text-theaterRed text-2xl focus:outline-none"
        aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      >
        {isFavorite ? <FaStar /> : <FaRegStar />}
      </button>
    </div>
  );
};

export default MovieCard;
