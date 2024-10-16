import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../features/movies/favoritesSlice.jsx';
import moviesReducer from '../features/movies/moviesSlice';
import { favoritesMiddleware } from './favoritesMiddleware';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favoritesMiddleware),
});

export default store;
