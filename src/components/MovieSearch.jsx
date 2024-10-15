import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../api/movieApi";
import MovieCard from "./MovieCard";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent empty searches
    try {
      const results = await fetchMovies(query);
      setMovies(results);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      // Optionally, set an error state to display a message to the user
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col sm:flex-row items-center mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <li key={movie.id} className="relative">
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
