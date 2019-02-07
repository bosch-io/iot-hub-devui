/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/app.scss";
require("images/favicon.ico");
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import Portals from "components/Portals";

const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./styles/_globalVars.scss');

import store from "./store";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import { LastLocationProvider } from "react-router-last-location";
import App from "./components/App";

ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL || "/"}>
      <LastLocationProvider>
        <ThemeProvider theme={theme}>
          <Fragment>
            <App />
            <Portals />
          </Fragment>
        </ThemeProvider>
      </LastLocationProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
