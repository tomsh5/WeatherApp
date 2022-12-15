import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../actions/allActions";
import "./Navbar.scss";

export function Navbar() {
  const dispatch = useDispatch();
  const isCelciusTemp = useSelector((state) => state.weatherReducer.isCelcius);
  const isDark = useSelector((state) => state.weatherReducer.isDark);

  useEffect(() => {
    document.body.className = isDark ? "night-img" : "day-img";
  }, [isDark]);

  const toggleTemp = () => {
    dispatch(allActions.WeatherActions.setIsCelcius(!isCelciusTemp));
  };

  const toggleIsDark = () => {
    dispatch(allActions.WeatherActions.setIsDark(!isDark));
  };

  return (
    <div className="navbar flex space-between align-center">
      <div className="logo-container flex align-center space-between">
        <i className="fas fa-rainbow logo">
          <NavLink activeclassname="active-path" to="/" exact="true"></NavLink>{" "}
        </i>
        <div>
          <a
            className={isCelciusTemp ? "active" : ""}
            onClick={toggleTemp}
            href
          >
            C°{" "}
          </a>
          |
          <a
            className={isCelciusTemp ? "" : "active"}
            onClick={toggleTemp}
            href
          >
            {" "}
            F°
          </a>
        </div>
        <div>
          {!isDark ? (
            <i onClick={() => toggleIsDark()} className="fas fa-sun"></i>
          ) : (
            <i onClick={() => toggleIsDark()} className="fas fa-moon"></i>
          )}
        </div>
      </div>
      <ul className="flex">
        <li>
          <NavLink activeclassname="active-path" to="/" exact="true">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname="active-path" to="/favorites" exact="true">
            Favorites
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

// export const _Navbar = withRouter(_Navbar);
