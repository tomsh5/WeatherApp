import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import rootReducer from "./reducers/allReducers";
import { legacy_createStore, applyMiddleware, compose } from "redux";
import "./index.scss";
import App from "./App";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
