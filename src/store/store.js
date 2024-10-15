import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice.jsx';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default store;
