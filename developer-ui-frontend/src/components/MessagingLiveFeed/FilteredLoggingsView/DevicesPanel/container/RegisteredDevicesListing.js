/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import { FieldArray, formValueSelector } from "redux-form/immutable";
import DevicesListing from "../presentation/DevicesListing";
import { connect } from "react-redux";
import { toJS } from "components/helpers/to-js";
import { selectAllDevices } from "reducers/selectors";

export const RegisteredDevicesListingWrapped = ({
  devices,
  expanded,
  registrySearchValue
}) => (
  <FieldArray
    name="registrations"
    component={DevicesListing}
    asField
    devices={devices}
    expanded={expanded}
    registrySearchValue={registrySearchValue}
  />
);

const mapStateToProps = state => {
  const selector = formValueSelector("additionalSubscriptionsForm");
  return {
    registrySearchValue: selector(state, "additionalSubsRegistrySearch"),
    devices: selectAllDevices(state)
  };
};

const RegisteredDevicesListing = connect(mapStateToProps)(
  toJS(RegisteredDevicesListingWrapped)
);
export default RegisteredDevicesListing;

RegisteredDevicesListingWrapped.propTypes = {
  devices: PropTypes.array,
  expanded: PropTypes.bool,
  registrySearchValue: PropTypes.string,
  redirectToRegistrations: PropTypes.func
};
