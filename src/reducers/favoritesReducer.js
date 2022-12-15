const initialState = {
    favorites: []
}

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_FAVORITES": {
            return {
                ...state,
                favorites: [...state.favorites, action.city]
            }
        }
        case "REMOVE_FROM_FAVORITES": {
            return {
                ...state,
                favorites: state.favorites.filter(favorite => favorite.key !== action.city.key)
            }
        }

        default:
            return state
    }
}

export default favoritesReducer