import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../features/movies/favoritesSlice.jsx';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites?.favoritesList) || [];
  console.log("Favorites from Redux store:", favorites);

  const handleRemoveFavorite = (id) => {
    dispatch(removeFavorite(id));
  };

  if (!favorites) {
    return (
      <div className="container mx-auto px-6 py-8 text-center text-lightGray">
        <p className="text-xl">You have no favorite movies.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 text-lightGray">
      <h2 className="text-3xl font-bold mb-6 text-theaterRed">Your Favorites</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((movie) => (
          <li key={movie.id} className="bg-theaterGray rounded-lg overflow-hidden shadow-md relative">
            <Link to={`/movies/${movie.id}`} className="block">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : 'https://via.placeholder.com/200x300?text=No+Image'
                }
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-400">
                  {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
            </Link>
            <button
              onClick={() => handleRemoveFavorite(movie.id)}
              className="absolute top-2 right-2 bg-theaterRed text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition-colors duration-300"
              aria-label="Remove from Favorites"
            >
              <FaStar />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
