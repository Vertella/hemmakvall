// src/features/movies/moviesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Access environment variables
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Async thunk to search movies by title
export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: query,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Error searching movies:", error);
      return rejectWithValue(error.response ? error.response.data : { status_message: 'Unknown error occurred' });
    }
  }
);

// Async thunk to fetch movie details by ID
export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return rejectWithValue(error.response ? error.response.data : { status_message: 'Unknown error occurred' });
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    moviesList: [],
    movieDetails: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearMovieDetails: (state) => {
      state.movieDetails = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle searchMovies
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesList = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload && action.payload.status_message) || 'Failed to search movies';

      })
      // Handle fetchMovieDetails
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload && action.payload.status_message) || 'Failed to search movies';

      });
  },
});

export const { clearMovieDetails } = moviesSlice.actions;
export default moviesSlice.reducer;
