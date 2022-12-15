import axios from "axios";

const API_KEY = "MRbqWelhoiX5VrRhfOFr3EmhNeiQUsZ2";
const BASE_URL = `https://dataservice.accuweather.com/`;

async function getGeoLocaion() {
  try {
    const position = await _getPosition();
    return position;
  } catch (err) {
    console.log(
      "Cannot access geo locaiton, please check the browser permisions",
      err
    );
  }
}

async function _getPosition() {
  if ("geolocation" in navigator) {
    let position = await new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej, { timeout: 2000 });
    });
    return { lat: position.coords.latitude, long: position.coords.longitude };
  }
}

async function getLocationByGeoCoords(position) {
  try {
    if (position) {
      const url = `${BASE_URL}locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${position.lat}%2C${position.long}&language=en-us&details=false&toplevel=true`;
      const res = await axios.get(url);
      return res.data;
    }
  } catch (err) {
    console.log("Cannot get current weather, please try again", err);
  }
}

export const geoLocationService = {
  getGeoLocaion,
  getLocationByGeoCoords,
};
