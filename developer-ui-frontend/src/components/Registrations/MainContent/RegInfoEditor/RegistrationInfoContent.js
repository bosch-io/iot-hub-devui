/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import "styles/jsonEditor.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  selectDeviceById,
  selectIsFetchingByDeviceId
} from "reducers/selectors";
import { updateRegistrationInfo } from "actions/RegistrationActions";
import { addCustomNotification } from "actions/globalActions";
// Code Syntax Highlighting for the modal view (Prism.js)
import Prism from "prismjs";
import Parser from "html-react-parser";
import Spinner from "components/common/Spinner";

class RegistrationInfoContentWrapped extends Component {
  render() {
    const { regInfo } = this.props;
    return (
      <div id="info-console" className="reg-mode">
        {this.props.isFetching && (
          <span className="fetching-overlay">
            <Spinner type="bubbles" />
          </span>
        )}
        <pre>
          {Parser(
            Prism.highlight(
              JSON.stringify(regInfo, null, 2),
              Prism.languages.json
            )
          )}
        </pre>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const regInfo = ownProps.selectedDevice
    ? selectDeviceById(state, ownProps.selectedDevice)
        .get("registrationInfo")
        .toJS()
    : null;
  const deviceId = ownProps.selectedDevice;
  return {
    regInfo: Object.assign({ "device-id": deviceId }, regInfo),
    deviceId,
    isFetching: selectIsFetchingByDeviceId(state, deviceId)
  };
};
const mapDispatchToProps = dispatch => ({
  updateRegInfo: (deviceId, info) =>
    dispatch(updateRegistrationInfo(deviceId, info)),
  triggerNotification: (text, level) =>
    dispatch(addCustomNotification(text, level))
});
const RegistrationInfoContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationInfoContentWrapped);

RegistrationInfoContentWrapped.propTypes = {
  deviceId: PropTypes.string,
  regInfo: PropTypes.object,
  updateRegInfo: PropTypes.func.isRequired,
  triggerNotification: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default RegistrationInfoContent;
