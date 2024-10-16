import { createSlice } from '@reduxjs/toolkit';


let initialFavorites = [];
try {
  initialFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
} catch (error) {
  console.error("Error parsing favorites from localStorage:", error);
}
const initialState = {
  favoritesList: initialFavorites,
};


const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const movie = action.payload;
      if (!state.favoritesList.find((item) => item.id === movie.id)) {
        state.favoritesList.push(movie);
      }
    },
    removeFavorite: (state, action) => {
      const movieId = action.payload;
      state.favoritesList = state.favoritesList.filter((item) => item.id !== movieId);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
