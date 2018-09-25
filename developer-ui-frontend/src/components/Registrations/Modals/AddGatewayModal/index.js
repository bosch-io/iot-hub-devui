/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import { reduxForm, formValueSelector } from "redux-form/immutable";
import { withRouter } from "react-router-dom";
import { toJS } from "components/helpers/to-js";
import { connect } from "react-redux";
import { selectAllDevices } from "reducers/selectors";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import {
  ConfigurationModal,
  ConfigurationModalHeader,
  ConfigurationModalFooter,
  ConfigurationModalBody
} from "components/common/dialogModals";
import GatewayIcon from "images/gatewayIcon.svg";
import { SearchbarM } from "components/common/textInputs";
import GatewaySelectionList from "./presentation/GatewaySelectionList";
import "styles/gatewayStyle.scss";
import { setViaProperty } from "actions/RegistrationActions";

class AddGatewayModalWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      deviceData: props.gatewayDevices.map(device => ({
        deviceId: device,
        selected: false
      }))
    };
    this.changeIsOpen = this.changeIsOpen.bind(this);
    this.confirm = this.confirm.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    const { deviceId } = this.props;
    this.props.setViaProperty(deviceId, values);
    this.changeIsOpen(false);
  }

  changeSelected(id) {
    const deviceIndex = this.state.deviceData.findIndex(
      device => device.deviceId === id
    );
    this.setState(state => {
      const changedEntry = Object.assign({}, state.deviceData[deviceIndex]);
      changedEntry.selected = !changedEntry.selected;
      return {
        deviceData: [
          ...state.deviceData.slice(0, deviceIndex),
          changedEntry,
          ...state.deviceData.slice(deviceIndex + 1, state.deviceData.length)
        ]
      };
    });
  }

  changeIsOpen(opened) {
    this.setState({ isOpen: opened });
  }

  confirm() {}
  render() {
    const { handleSubmit, deviceId, gatewaySearch } = this.props;
    const { deviceData, isOpen } = this.state;
    return isOpen ? (
      <ConfigurationModal
        className="script"
        modalShown={isOpen}
        toggleModal={this.changeIsOpen}
        changeIsOpen={this.changeIsOpen}
      >
        <ConfigurationModalHeader
          icon={<GatewayIcon />}
          subject={"Configure Gateway for " + deviceId}
        />
        <ConfigurationModalBody>
          <div className="main-content">
            <p>
              If this device does not have a direct connection to the Bosch IoT
              Hub (e.g. because it is not IP-enabled), messages can still be
              sent to the Bosch IoT Hub via a gateway device. The gateway device
              receives the message and forwards it to the IoT Hub.
            </p>
            <p>
              Further information can be found in the{" "}
              <a
                href="https://docs.bosch-iot-hub.com/general-concepts/gatewaymode.html"
                target="_blank"
              >
                Gateway mode documentation.
              </a>
            </p>
            <div className="elements-align">
              <SearchbarM
                className="search"
                id="search_content"
                name="gatewaySearchText"
                type="text"
                placeholder="Search for device"
                autoComplete="off"
                asField
              />
              <GatewaySelectionList
                searchText={gatewaySearch}
                deviceData={deviceData}
                changeSelected={this.changeSelected}
              />
            </div>
          </div>
        </ConfigurationModalBody>
        <ConfigurationModalFooter
          confirm={handleSubmit(this.submit)}
          submitType="submit"
          toggleModal={this.changeIsOpen}
        />
      </ConfigurationModal>
    ) : (
      <Redirect to="/registrations" />
    );
  }
}

const mapStateToProps = state => {
  const selector = formValueSelector("gatewayTab");
  const gateways = selectAllDevices(state);
  return {
    gatewaySearch: selector(state, "gatewaySearchText"),
    gatewayDevices: gateways.map(device => device.get("deviceId"))
  };
};

let AddGatewayModalContainer = reduxForm({
  form: "gatewayTab"
})(AddGatewayModalWrapped);

AddGatewayModalContainer = withRouter(
  connect(
    mapStateToProps,
    {
      setViaProperty
    }
  )(toJS(AddGatewayModalContainer))
);

AddGatewayModalWrapped.propTypes = {
  handleSubmit: PropTypes.func,
  gatewaySearch: PropTypes.string,
  gatewayDevices: PropTypes.array.isRequired,
  deviceId: PropTypes.string.isRequired,
  setViaProperty: PropTypes.func.isRequired
};

const AddGateway = AddGatewayModalContainer;
export default AddGateway;
