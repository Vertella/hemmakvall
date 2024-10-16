import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from '../features/movies/moviesSlice';

const MovieDetails = () => {
  const { id } = useParams(); // Get movie ID from URL
  const dispatch = useDispatch();
  const { movieDetails, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    console.log("Fetching details for movie ID:", id); // Add this line
    dispatch(fetchMovieDetails(id));

    return () => {
      dispatch(clearMovieDetails());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
        <p className="text-theaterRed text-xl">Loading movie details...</p>
      </div>
    )
  }

  if (!movie) {
    return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-theaterRed text-xl">Movie not found</p>
        </div>
      );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row bg-theaterBlack min-h-screen text-lightGray">
      <img src={posterUrl} alt={movie.title} className="w-full md:w-1/3 rounded-lg shadow-lg" />
      <div className="mt-6 md:mt-0 md:ml-8">
        <h1 className="text-4xl font-bold mb-4 text-theaterRed">{movie.title}</h1>
        <p className="mb-6">{movie.overview}</p>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Release Date:</span> {movie.release_date}
          </p>
          <p>
            <span className="font-semibold">Rating:</span> {movie.vote_average} / 10
          </p>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
