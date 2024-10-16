// src/store/middleware/favoritesMiddleware.js

export const favoritesMiddleware = (storeAPI) => (next) => (action) => {
    const result = next(action);
    const { favorites } = storeAPI.getState();
  
    // Persist only if the action is related to favorites
    if (action.type.startsWith('favorites/')) {
      localStorage.setItem('favorites', JSON.stringify(favorites.favoritesList));
    }
  
    return result;
  };
  