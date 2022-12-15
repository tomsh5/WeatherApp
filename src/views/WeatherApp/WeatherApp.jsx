import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../actions/allActions";
import { weatherService } from "../../services/weather-service";
import { geoLocationService } from "../../services/geoLocation-service.js";
import { DayPreview } from "../../cmps/DayPreview/DayPreview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const WeatherApp = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favoritesReducer.favorites);
  const currLocation = useSelector(
    (state) => state.weatherReducer.currLocation
  );
  const isCelciusTemp = useSelector((state) => state.weatherReducer.isCelcius);
  const isGeoLocation = useSelector(
    (state) => state.weatherReducer.isGeoLocation
  );
  const searchBar = useRef(null);
  const [currWeather, setCurrWeather] = useState(null);
  const [curr5DaysWeather, setCurr5DaysWeather] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [isCurrLoactionFavorite, setIsCurrLoactionFavorite] = useState(false);
  const [possibleLocations, setPossibleLocations] = useState([]);

  useEffect(() => {
    if (!isGeoLocation) {
      getGeoLocation();
    }
  }, []);

  useEffect(() => {
    if (currLocation) {
      getCurrWeather(currLocation.key);
    }
  }, [currLocation, isCelciusTemp]);

  useEffect(() => {
    checkIfFavorite();
  }, [currLocation]);

  const getGeoLocation = async () => {
    try {
      const currGeoLocation = await geoLocationService.getGeoLocaion();
      dispatch(allActions.WeatherActions.setIsGeoLocation(true));
      getLocationByGeoCoords(currGeoLocation);
    } catch {
      notify("server couldn't get your current location", "error");
    }
  };

  const getLocationByGeoCoords = async (geo) => {
    try {
      const location = await geoLocationService.getLocationByGeoCoords(geo);
      dispatch(
        allActions.WeatherActions.setLocation({
          name: location.LocalizedName,
          key: location.Key,
        })
      );
    } catch {
      notify("server couldn't get the wather, try again", "error");
    }
  };

  const getLocationKey = async (city) => {
    try {
      const currLoactionKey = await weatherService.getLocationByName(city);
      return currLoactionKey.Key;
    } catch {
      notify("location name is not valid, try again", "error");
    }
  };

  const getCurrWeather = async (key) => {
    try {
      const currDayWeather = await weatherService.getCurrentWeather(key);
      const curr5DaysWeather = await weatherService.getFiveDaysWeather(
        key,
        isCelciusTemp
      );
      setCurrWeather(currDayWeather);
      setCurr5DaysWeather(curr5DaysWeather);
    } catch {
      notify("server couldn't get the wather, try again", "error");
    }
  };

  const onSearch = async () => {
    try {
      const key = await getLocationKey(searchTerm);
      await getCurrWeather(key);
      const name = searchTerm;
      dispatch(allActions.WeatherActions.setLocation({ name: name, key: key }));
      searchBar.current.value = "";
    } catch {
      notify("location name is incorrect, try again", "error");
    }
  };

  const handleChange = ({ target }) => {
    if (target.value.match("^[a-zA-Z ]*$") != null) {
      setSearchTerm(target.value);
      onAutoComplete();
    } else {
      searchBar.current.value = "";
      notify("Please enter only english letters", "error");
    }
  };

  const onAutoComplete = async () => {
    try {
      if (searchTerm) {
        const locationList = await weatherService.getAllPossibleLocations(
          searchTerm
        );
        setPossibleLocations(locationList);
      } else {
        setPossibleLocations([]);
      }
    } catch (e) {}
  };

  const onSelect = ({ target }) => {
    const locationName = target.innerText;
    searchBar.current.value = locationName;
    setSearchTerm(locationName);
    setPossibleLocations([]);
  };

  const handleOnFocus = () => {
    searchTerm && onAutoComplete();
  };

  const toggleFavorite = () => {
    const action = isCurrLoactionFavorite
      ? "removeFromFavorites"
      : "addToFavorites";

    dispatch(allActions.FavoritesActions[action](currLocation));
    setIsCurrLoactionFavorite(!isCurrLoactionFavorite);

    const msgAction = isCurrLoactionFavorite ? "removed from" : "added to";
    notify(`${currLocation.name} was ${msgAction} favorites`, "success");
  };

  const checkIfFavorite = () => {
    if (favorites.length && currLocation) {
      const isLocationFavorite = favorites.some((city) => {
        return city.key === currLocation.key;
      });
      setIsCurrLoactionFavorite(isLocationFavorite);
    }
  };
  const notify = (msg, type) => toast[type](msg);

  return (
    <div className="weather-app main-layout">
      <div className="search-conatiner flex justify-center">
        <div className="search-bar-container flex justify-center">
          <input
            ref={searchBar}
            onChange={handleChange}
            onFocus={handleOnFocus}
            type="text"
          />
          <button className="search-btn" onClick={onSearch}>
            Go
          </button>
        </div>
        {searchTerm && possibleLocations.length > 0 && (
          <div className="flex justify-center">
            <div className="auto-complete ">
              <ul>
                {possibleLocations.map((location) => (
                  <li key={location.key} onClick={onSelect}>
                    {location.LocalizedName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="curr-weather flex space-between align-center">
        <div className="city-conatiner flex space-between align-center">
          {currWeather && (
            <div className="flex column">
              <div className="city-name flex align-center">
                <h1>{currLocation.name}</h1>
                <i
                  onClick={toggleFavorite}
                  className={
                    isCurrLoactionFavorite ? "fas fa-star" : "far fa-star"
                  }
                ></i>
              </div>
              <div className="weather-temp flex align-center">
                <div>
                  {currWeather && (
                    <img
                      src={`images/weather${currWeather.WeatherIcon}.png`}
                      alt=""
                    />
                  )}
                </div>
                {isCelciusTemp ? (
                  <span>
                    {Math.floor(currWeather.Temperature.Metric.Value)}°
                  </span>
                ) : (
                  <span>
                    {Math.floor(currWeather.Temperature.Imperial.Value)}°
                  </span>
                )}
                {isCelciusTemp ? (
                  <span>{currWeather.Temperature.Metric.Unit}</span>
                ) : (
                  <span>{currWeather.Temperature.Imperial.Unit}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex column align-center">
        {currWeather && (
          <div>
            <h1 className="weather-txt">{currWeather.WeatherText}</h1>
          </div>
        )}
        {curr5DaysWeather && (
          <div className="days-list">
            {curr5DaysWeather.map((dayForcast) => (
              <DayPreview key={dayForcast.EpochDate} dayForcast={dayForcast} />
            ))}
          </div>
        )}
      </div>
      <ToastContainer
        position="top-center"
        limit={5}
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
