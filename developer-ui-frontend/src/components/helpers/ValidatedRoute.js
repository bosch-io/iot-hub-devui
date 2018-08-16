/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { hasDevice } from "reducers/selectors";
import PropTypes from "prop-types";
/**
 * This component functions as a Validator for entered Routes:
 * Since the information, which device is currently selected in the UI is always
 * taken from the URL match params of the <Route /> component, it is important to
 * check, if the entered URL has a corresponding item inside the Redux store.
 */
/* eslint-disable  react/no-multi-comp */
const ValidatedRoute = ({ path, render, fallbackPath, isValid, ...props }) =>
  isValid ? (
    <Route path={path} render={render} {...props} />
  ) : (
    <Redirect to={fallbackPath} />
  );

ValidatedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  fallbackPath: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  validatedParam: PropTypes.string.isRequired
};

/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react/no-did-update-set-state */
class ValidatedRegistrationRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true
    };
  }
  componentDidMount() {
    console.log(this.props.match);
    if (!this.props.validate(this.props.match.params.selectedDeviceId)) {
      this.setState({ isValid: false });
    }
  }
  componentDidUpdate(prevProps) {
    console.log(this.props.match);
    if (
      prevProps.match &&
      this.props.match &&
      this.props.match.params.selectedDeviceId !==
        prevProps.match.params.selectedDeviceId
    ) {
      if (!this.props.validate(this.props.match.params.selectedDeviceId)) {
        this.setState({ isValid: false });
      } else {
        this.setState({ isValid: true });
      }
    }
  }

  render() {
    return (
      <ValidatedRoute
        fallbackPath="/registrations"
        isValid={this.state.isValid}
        {...this.props}
      />
    );
  }
}

ValidatedRegistrationRoute = withRouter(
  connect(state => ({
    validate: deviceId => hasDevice(state, deviceId)
  }))(ValidatedRegistrationRoute)
);

ValidatedRegistrationRoute.propTypes = {
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default ValidatedRoute;
export { ValidatedRegistrationRoute };
