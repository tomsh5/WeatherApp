const addToFavorites = (city) => {
  return (dispatch) => {
    dispatch({ type: "ADD_TO_FAVORITES", city });
  };
};
const removeFromFavorites = (city) => {
  return (dispatch) => {
    dispatch({ type: "REMOVE_FROM_FAVORITES", city });
  };
};

export const FavoritesActions = {
  addToFavorites,
  removeFromFavorites,
};
