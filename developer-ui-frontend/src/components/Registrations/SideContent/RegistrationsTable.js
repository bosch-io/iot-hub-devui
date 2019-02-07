/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm, formValueSelector } from "redux-form/immutable";
import { withRouter } from "react-router-dom";
import ChecklistSelect, {
  ChecklistSelectHeader,
  ChecklistOptionEntries
} from "components/common/ChecklistSelect";
import { connect } from "react-redux";
import { changeEnabled } from "actions/RegistrationActions";
import {
  fetchAllRegistrations,
  fetchCredentialsByDeviceId
} from "actions/DataFetchActions";
import { selectAllDevices } from "reducers/selectors";
import { toJS } from "components/helpers/to-js";
import { SearchbarM } from "components/common/textInputs";
import RefreshButton from "images/refreshButton.svg";
import HoverTooltip from "components/common/HoverTooltip";

class RegistrationsTableWrapped extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  updatePath(path, item) {
    const pathArr = path.split("/");
    let newPathArr = null;
    if (!item) {
      newPathArr = pathArr.slice(0, 2);
    } else {
      // Redirect to the Registration Info tab per default
      newPathArr = [...pathArr.slice(0, 2), item, "registration"];
    }
    return newPathArr.join("/");
  }

  handleItemClick(item) {
    this.props.setMainPanel(true);
    const newPath = this.updatePath(this.props.history.location.pathname, item);
    this.props.history.push(newPath);
  }

  handleCheckboxClick(deviceId) {
    const { deviceData } = this.props;
    const enabled = deviceData.find(device => device.deviceId === deviceId)
      .enabled;
    this.props.changeEnabled(deviceId, !enabled);
  }

  handleRefreshClick() {
    const { initialValues } = this.props;
    const selectedDeviceId = initialValues.get("selectedDevice");
    this.props.fetchAllRegistrations();
    this.props.fetchCredentialsByDeviceId(selectedDeviceId);
  }

  render() {
    const { deviceData, registrySearchValue, initialValues } = this.props;
    const selectedDevice = initialValues.get("selectedDevice");
    const tooltipRefresh = "refresh-device-data";
    return (
      <form onSubmit={e => e.preventDefault()}>
        <SearchbarM
          id={tooltipRefresh}
          name="registrySearchText"
          type="text"
          placeholder="Search for registered Devices..."
          autoComplete="off"
          icon={<RefreshButton />}
          onIconClick={this.handleRefreshClick}
          tooltipAncor={tooltipRefresh}
          asField
        />
        <HoverTooltip
          id={tooltipRefresh}
          text={`Refresh current registrations${
            selectedDevice ? ` and ${selectedDevice} device data` : ""
          }`}
        />
        <ChecklistSelect
          useSwitches
          highlightSelected
          asField
          name="selectedDevice"
          className="reg-listing">
          <ChecklistSelectHeader textTitle="ID" checkedTitle="enabled" />
          <ChecklistOptionEntries
            data={deviceData.map(entry => ({
              text: entry.deviceId,
              checked: entry.enabled
            }))}
            filterText={registrySearchValue}
            onClick={item => this.handleItemClick(item)}
            onCheckboxClick={item => this.handleCheckboxClick(item)}
          />
        </ChecklistSelect>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const selector = formValueSelector("registrationsTabListing");
  const devices = selectAllDevices(state);
  return {
    registrySearchValue: selector(state, "registrySearchText"),
    deviceData: devices.map(device => ({
      deviceId: device.get("deviceId"),
      enabled: device.getIn(["registrationInfo", "enabled"])
    })),
    initialValues: {
      selectedDevice: ownProps.match.params.selectedDeviceId || null
    }
  };
};

let RegistrationsTableContainer = reduxForm({
  form: "registrationsTabListing"
})(RegistrationsTableWrapped);

RegistrationsTableContainer = withRouter(
  connect(
    mapStateToProps,
    { changeEnabled, fetchAllRegistrations, fetchCredentialsByDeviceId }
  )(toJS(RegistrationsTableContainer))
);

RegistrationsTableWrapped.propTypes = {
  deviceData: PropTypes.arrayOf(
    PropTypes.shape({ deviceId: PropTypes.string, enabled: PropTypes.bool })
  ),
  setMainPanel: PropTypes.func.isRequired,
  changeEnabled: PropTypes.func.isRequired,
  fetchAllRegistrations: PropTypes.func.isRequired,
  fetchCredentialsByDeviceId: PropTypes.func.isRequired,
  registrySearchValue: PropTypes.string,
  initialValues: PropTypes.object,
  history: PropTypes.object.isRequired
};

const RegistrationsTable = RegistrationsTableContainer;
export default RegistrationsTable;
