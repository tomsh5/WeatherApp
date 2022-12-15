import axios from "axios";

const API_KEY = "MRbqWelhoiX5VrRhfOFr3EmhNeiQUsZ2";
const BASE_URL = `https://dataservice.accuweather.com/`;

async function getLocationByName(cityName) {
  try {
    const url = `${BASE_URL}locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${cityName}&language=en-us`;
    const res = await axios.get(url);
    return res.data[0];
  } catch (err) {
    console.log("Cannot get location, please try again", err);
  }
}
async function getAllPossibleLocations(searchTerm) {
  try {
    const url = `${BASE_URL}locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchTerm}&language=en-us`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log("Cannot get location, please try again", err);
  }
}

async function getCurrentWeather(locationKey) {
  try {
    const url = `${BASE_URL}currentconditions/v1/${locationKey}?apikey=${API_KEY}&language=en-us&details=false`;
    const res = await axios.get(url);
    return res.data[0];
  } catch (err) {
    console.log("Cannot get current weather, please try again", err);
  }
}

async function getFiveDaysWeather(locationKey, isCelciusTemp) {
  const url = `${BASE_URL}forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&language=en-us&details=false&metric=${isCelciusTemp}`;
  try {
    const res = await axios.get(url);
    return res.data.DailyForecasts;
  } catch (e) {
    console.log(e);
  }
}

export const weatherService = {
  getLocationByName,
  getCurrentWeather,
  getFiveDaysWeather,
  getAllPossibleLocations,
};
