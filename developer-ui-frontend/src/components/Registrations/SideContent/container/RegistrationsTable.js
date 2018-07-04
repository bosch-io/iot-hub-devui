/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Field,
  FieldArray,
  reduxForm,
  formValueSelector
} from "redux-form/immutable";
import RegistrationsTableEntry from "../presentation/RegistrationsTableEntry";
import { connect } from "react-redux";
import { changeEnabled } from "actions/RegistrationActions";
import { selectAllDevices } from "reducers/selectors";
import { fromJS } from "immutable";
import { toJS } from "components/helpers/to-js";

class RegistrationsTableWrapped extends Component {
  render() {
    const {
      devices,
      registrySearchValue,
      setMainPanel,
      setSelectedDevice
    } = this.props;
    return (
      <form>
        <div id="searchbar-form">
          <Field
            name="registrySearchText"
            component="input"
            type="text"
            placeholder="Search for registered Devices..."
            autoComplete="off"
          />
          <i className="bar" />
        </div>
        <div id="reg-listing-wrapper">
          <ul id="reg-listing-fxd-header">
            <li>ID</li>
            <li>enabled</li>
          </ul>
          <FieldArray
            name="registrations"
            component={RegistrationsTableEntry}
            devices={devices}
            registrySearchValue={registrySearchValue}
            setMainPanel={setMainPanel}
            setSelectedDevice={setSelectedDevice}
            changeEnabled={this.props.changeEnabled}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const selector = formValueSelector("registrationsTabListing");
  return {
    initialValues: {
      registrySearchText: "",
      registrations: selectAllDevices(state).map(device =>
        fromJS({
          deviceId: device.get("deviceId"),
          enabled: device.getIn(["registrationInfo", "enabled"])
        })
      )
    },
    registrySearchValue: selector(state, "registrySearchText"),
    devices: selectAllDevices(state)
  };
};

let RegistrationsTableContainer = reduxForm({
  form: "registrationsTabListing",
  enableReinitialize: true
})(RegistrationsTableWrapped);

RegistrationsTableContainer = connect(
  mapStateToProps,
  { changeEnabled }
)(toJS(RegistrationsTableContainer));

RegistrationsTableWrapped.propTypes = {
  devices: PropTypes.array,
  registrySearchValue: PropTypes.string,
  initialValues: PropTypes.object,
  setMainPanel: PropTypes.func.isRequired,
  setSelectedDevice: PropTypes.func.isRequired,
  changeEnabled: PropTypes.func.isRequired
};

const RegistrationsTable = RegistrationsTableContainer;
export default RegistrationsTable;
