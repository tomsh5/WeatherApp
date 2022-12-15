const initialState = {
  currLocation: {
    name: "haifa",
    key: "213181",
  },
  isCelcius: true,
  isGeoLocation: false,
  isDark: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOCATION": {
      return {
        ...state,
        currLocation: action.loaction,
      };
    }
    case "SET_IS_CELCIUS": {
      return {
        ...state,
        isCelcius: action.isCelcius,
      };
    }
    case "SET_IS_DARK": {
      return {
        ...state,
        isDark: action.isDark,
      };
    }
    case "SET_IS_GEO_LOCATION": {
      return {
        ...state,
        isGeoLocation: action.isGeoLocation,
      };
    }

    default:
      return state;
  }
};

export default weatherReducer;
