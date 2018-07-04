/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable */
import { connect } from "react-redux";
import DevicesListing from "../presentation/DevicesListing";
import { toJS } from "components/helpers/to-js";
import { handleDeleteSub } from "actions/WebsocketActions";
import { selectSubscribedDevices } from "reducers/selectors";

const mapStateToProps = (state, ownProps) => {
  return {
    devices: selectSubscribedDevices(state),
    expanded: ownProps.expanded,
    asField: false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteSub: deviceId => dispatch(handleDeleteSub(deviceId))
  };
};

const SubscribedDevicesListing = connect(mapStateToProps, mapDispatchToProps)(
  toJS(DevicesListing)
);

export default SubscribedDevicesListing;
