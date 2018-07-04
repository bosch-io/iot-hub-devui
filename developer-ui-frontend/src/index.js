/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/app.scss";
require("images/favicon.ico");
import React from "react";
import ReactDOM from "react-dom";

import store from "./store";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import { LastLocationProvider } from "react-router-last-location";
import App from "./components/App";

ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_PATH || "/"}>
      <LastLocationProvider>
        <App />
      </LastLocationProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
