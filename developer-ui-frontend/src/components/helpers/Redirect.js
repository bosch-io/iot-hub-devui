/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import withRouter from "react-router-dom/withRouter";
import { withLastLocation } from "react-router-last-location";

// Own implementation due to multiple renders in react-routers <Redirect /> transitioned routes
class RedirectWrapped extends Component {
  componentWillMount() {
    const { lastLocation, history, to } = this.props;
    if (!lastLocation) {
      // Use the mutable history API to indicate that this location was the first page
      history.location.state = { redirectOriginFirst: true };
    }
    // Do the redirect
    history.push(to);
  }
  render() {
    return null;
  }
}

const Redirect = withRouter(withLastLocation(RedirectWrapped));

RedirectWrapped.propTypes = {
  to: PropTypes.string.isRequired,
  lastLocation: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default Redirect;
