import { createSlice } from '@reduxjs/toolkit';

const loadFavorites = () => {
  try {
    const serializedState = localStorage.getItem('favorites');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Failed to load favorites from localStorage:", e);
    return [];
  }
};

const saveFavorites = (favorites) => {
  try {
    const serializedState = JSON.stringify(favorites);
    localStorage.setItem('favorites', serializedState);
  } catch (e) {
    console.warn("Failed to save favorites to localStorage:", e);
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: loadFavorites(),
  },
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.items.find(movie => movie.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveFavorites(state.items);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(movie => movie.id !== action.payload);
      saveFavorites(state.items);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
