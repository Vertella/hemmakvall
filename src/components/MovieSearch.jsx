import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchMovies } from "../features/movies/moviesSlice";
import MovieCard from "./MovieCard";
import { fetchRandomMovies } from "../features/movies/moviesSlice";

const MovieSearch = () => {
  const [query, setQuery] = useState(""); // State to store the search query entered by the user
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store

  // Select movies data, loading state, and error state from Redux store
  const { moviesList, loading, error } = useSelector((state) => state.movies);

  // useEffect to fetch random movies when the component is mounted
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Dispatch action to fetch random movies
        await dispatch(fetchRandomMovies()).unwrap();
      } catch (error) {
        // Handle any errors that occur during fetch
        console.error("Error fetching random movies:", error);
      }
    };

    fetchMovies(); // Call the function to fetch movies on mount
  }, [dispatch]); // Dependency array ensures this effect runs only once when the component mounts

  // Function to handle movie search based on user input
  const handleSearch = async () => {
    if (!query.trim()) return; // If the search query is empty or only spaces, do nothing
    try {
      // Dispatch action to search for movies with the current query
      await dispatch(searchMovies(query)).unwrap();
    } catch (error) {
      // Handle any errors that occur during search
      console.error("Error searching movies:", error);
    }
  };

   // Function to handle pressing the 'Enter' key to trigger the search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search when 'Enter' is pressed
    }
  };

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
