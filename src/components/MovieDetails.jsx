import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"; //Redux hooks
import { fetchMovieDetails, clearMovieDetails } from '../features/movies/moviesSlice';

const MovieDetails = () => {
  const { id } = useParams(); // Get movie ID from URL parameters
  const dispatch = useDispatch(); // Hook to dispatch actions to Redux
  const { movieDetails, loading, error } = useSelector((state) => state.movies); // Select movie details, loading state, and error state from the Redux store

  // Fetch movie details when the component mounts or when the 'id' changes
  useEffect(() => {
    if (id) {
    console.log("Fetching details for movie ID:", id); 
    dispatch(fetchMovieDetails(id)); // Dispatch action to fetch details for the specific movie ID
    }

    // Cleanup function to clear movie details when the component unmounts
    return () => {
      dispatch(clearMovieDetails()); // Clear the movie details from the state
    };
  }, [dispatch, id]); // Dependency array ensures the effect runs when 'dispatch' or 'id' changes

  // Render loading state while movie details are being fetched
  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
        <p className="text-theaterRed text-xl">Loading movie details...</p>
      </div>
    )
  }

  // Render error message if there's an error fetching movie details
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-theaterRed text-xl">Error: {error}</p>
      </div>
    );
  }

  // Render a "Movie not found" message if movie details are not available
  if (!movieDetails) {
    return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-theaterRed text-xl">Movie not found</p>
        </div>
      );
  }

  // Construct the poster image URL if a poster is available, otherwise use a placeholder image
  const posterUrl = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row bg-theaterBlack min-h-screen text-lightGray">
      <img src={posterUrl} alt={movieDetails.title} className="w-full md:w-1/3 rounded-lg shadow-lg" />
      <div className="mt-6 md:mt-0 md:ml-8">
        <h1 className="text-4xl font-bold mb-4 text-theaterRed">{movieDetails.title}</h1>
        <p className="mb-6">{movieDetails.overview}</p>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Release Date:</span> {movieDetails.release_date}
          </p>
          <p>
            <span className="font-semibold">Rating:</span> {movieDetails.vote_average} / 10
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
