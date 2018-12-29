import * as React from "react";
import * as ReactDOM from "react-dom";
import * as axios from "axios";
import * as yaml from "js-yaml";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./styles/index.scss";
import { AppConnected } from "./App";
import { rootReducer } from "./state/rootReducer";
import { receiveDestinations } from "./state/actions";

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "development" &&
    window.hasOwnProperty("__REDUX_DEVTOOLS_EXTENSION__")
    ? window["__REDUX_DEVTOOLS_EXTENSION__"]()
    : () => {}
);

fetch("travelMap.yaml").then((res: Response) =>
  res.text().then(text => {
    store.dispatch(receiveDestinations(yaml.safeLoad(text)));
    ReactDOM.render(
      <Provider store={store}>
        <AppConnected />
      </Provider>,
      document.getElementById("root")
    );
  })
);
