import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import { Navbar } from "./cmps/Navbar/Navbar.jsx";
import { WeatherApp } from "./views/WeatherApp/WeatherApp.jsx";
import { FavoritesPage } from "./views/FavoritesPage/FavoritesPage.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route element={<FavoritesPage />} path="/favorites" />
          <Route element={<WeatherApp />} exact="true" path="/" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
