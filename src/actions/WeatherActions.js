const setLocation = (loaction) => {
  return (dispatch) => {
    dispatch({ type: "SET_LOCATION", loaction });
  };
};
const setIsCelcius = (isCelcius) => {
  return (dispatch) => {
    dispatch({ type: "SET_IS_CELCIUS", isCelcius });
  };
};
const setIsDark = (isDark) => {
  return (dispatch) => {
    dispatch({ type: "SET_IS_DARK", isDark });
  };
};
const setIsGeoLocation = (isGeoLocation) => {
  return (dispatch) => {
    dispatch({ type: "SET_IS_GEO_LOCATION", isGeoLocation });
  };
};

export const WeatherActions = {
  setLocation,
  setIsCelcius,
  setIsDark,
  setIsGeoLocation,
};
