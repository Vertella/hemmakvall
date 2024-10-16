import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchMovies } from "../features/movies/moviesSlice";
import MovieCard from "./MovieCard";
import { fetchRandomMovies } from "../features/movies/moviesSlice";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const { moviesList, loading, error } = useSelector((state) => state.movies);

   // Fetch random movies when the component mounts
   useEffect(() => {
    const fetchMovies = async () => {
      try {
        await dispatch(fetchRandomMovies()).unwrap(); // Dispatch random movies action
      } catch (error) {
        console.error("Error fetching random movies:", error);
      }
    };
    
    fetchMovies();
  }, [dispatch]);

  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent empty searches
    try {
      await dispatch(searchMovies(query)).unwrap();
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };
  

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col sm:flex-row items-center mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for a movie..."
          className="w-full sm:w-2/3 p-3 rounded-md bg-theaterGray text-lightGray placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-theaterRed"
        />
        <button
          onClick={handleSearch}
          className="mt-4 sm:mt-0 sm:ml-4 px-6 py-3 bg-theaterRed text-white rounded-md hover:bg-red-600 transition-colors duration-300"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading movies...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {moviesList.map((movie) => (
          <li key={movie.id} className="relative">
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
