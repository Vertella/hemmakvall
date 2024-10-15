import axios from 'axios';

// Replace with your actual API key
const API_KEY = '23cf41a55ff9850834a29faa5f1616fc';
const BASE_URL = 'http://api.themoviedb.org/3';

export const fetchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error; // Propagate the error for further handling
  }
};

// Fetch movie details by ID
export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
