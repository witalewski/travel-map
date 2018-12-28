import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./styles/index.scss";
import { AppConnected } from "./App";
import { rootReducer } from "./state/rootReducer";

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "development" &&
    window.hasOwnProperty("__REDUX_DEVTOOLS_EXTENSION__")
    ? window["__REDUX_DEVTOOLS_EXTENSION__"]()
    : () => {}
);

ReactDOM.render(
  <Provider store={store}>
    <AppConnected />
  </Provider>,
  document.getElementById("root")
);
