/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable */
import PropTypes from "prop-types";
import { toJS } from "components/helpers/to-js";
import { connect } from "react-redux";
import DeviceSelectionList from "../presentation/DeviceSelectionList";
import { formValueSelector } from "redux-form/immutable";
import { selectUnobservedRegistrations } from "reducers/selectors";

const selector = formValueSelector("initialSubscriptionsForm");

const mapStateToProps = (state, ownProps) => {
  const registrySearch = selector(state, "registrySearch");
  const registeredDevices = selectUnobservedRegistrations(state);
  return {
    registeredDevices,
    searchText: registrySearch,
    showCallToAction: Boolean(
      (!registrySearch || registrySearch === "") && registeredDevices.size > 0
    ),
    selectedDevices: ownProps.selectedDevices
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeDeviceFromSelection: ownProps.removeDeviceFromSelection,
    addSelectedDevice: ownProps.addSelectedDevice
  };
};

const DeviceSelectionListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(DeviceSelectionList));

DeviceSelectionListContainer.propTypes = {
  addSelectedDevice: PropTypes.func.isRequired,
  removeDeviceFromSelection: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  showCallToAction: PropTypes.bool,
  selectedDevices: PropTypes.array
};

export default DeviceSelectionListContainer;
