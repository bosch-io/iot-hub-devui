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
import { selectAllDevices } from "reducers/selectors";
import { toJS } from "components/helpers/to-js";
import { SearchbarM } from "components/common/textInputs";

class RegistrationsTableWrapped extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
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

  handleCheckboxClick(deviceId, enabled) {
    this.props.changeEnabled(deviceId, !enabled);
  }

  render() {
    const { deviceData, registrySearchValue } = this.props;
    return (
      <form onSubmit={e => e.preventDefault()}>
        <SearchbarM
          name="registrySearchText"
          type="text"
          placeholder="Search for registered Devices..."
          autoComplete="off"
          asField
        />
        <ChecklistSelect
          useSwitches
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
            onCheckboxClick={this.handleCheckboxClick}
          />
        </ChecklistSelect>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const selector = formValueSelector("registrationsTabListing");
  const devices = selectAllDevices(state);
  return {
    registrySearchValue: selector(state, "registrySearchText"),
    deviceData: devices.map(device => ({
      deviceId: device.get("deviceId"),
      enabled: device.getIn(["registrationInfo", "enabled"])
    }))
  };
};

let RegistrationsTableContainer = reduxForm({
  form: "registrationsTabListing"
})(RegistrationsTableWrapped);

RegistrationsTableContainer = withRouter(
  connect(
    mapStateToProps,
    { changeEnabled }
  )(toJS(RegistrationsTableContainer))
);

RegistrationsTableWrapped.propTypes = {
  deviceData: PropTypes.arrayOf(
    PropTypes.shape({ deviceId: PropTypes.string, enabled: PropTypes.bool })
  ),
  setMainPanel: PropTypes.func.isRequired,
  changeEnabled: PropTypes.func.isRequired,
  registrySearchValue: PropTypes.string,
  history: PropTypes.object.isRequired
};

const RegistrationsTable = RegistrationsTableContainer;
export default RegistrationsTable;
