/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import { reduxForm, formValueSelector } from "redux-form/immutable";
import { withRouter } from "react-router-dom";
import { toJS } from "components/helpers/to-js";
import { connect } from "react-redux";
import { reset } from "redux-form";
import { selectAllDevices, selectRegistrationInfo } from "reducers/selectors";
import PropTypes from "prop-types";
import styled from "styled-components";
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
import "styles/gateway.scss";
import { setViaProperty } from "actions/RegistrationActions";

const ConfigurationModalBig = styled(ConfigurationModal)`
  height: 70vh !important;
`;

class AddGatewayModalWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
    this.changeIsOpen = this.changeIsOpen.bind(this);
    this.confirm = this.confirm.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.submit = this.submit.bind(this);
    this.resetSelected = this.resetSelected.bind(this);
  }

  submit(values) {
    const { deviceId } = this.props;
    this.props.setViaProperty(deviceId, values);
    this.changeIsOpen(false);
  }

  changeSelected(id) {
    const { deviceData } = this.props;
    const deviceIndex = deviceData.findIndex(device => device.deviceId === id);
    const changedEntry = Object.assign({}, deviceData[deviceIndex]);
    changedEntry.selected = !changedEntry.selected;
    return {
      deviceData: [
        ...deviceData.slice(0, deviceIndex),
        changedEntry,
        ...deviceData.slice(deviceIndex + 1, deviceData.length)
      ]
    };
  }

  changeIsOpen(opened) {
    this.setState({ isOpen: opened });
  }

  resetSelected() {
    this.props.reset("selectedDevice");
  }

  confirm() {}
  render() {
    const {
      handleSubmit,
      deviceId,
      gatewaySearch,
      deviceData,
      viaProperty,
      selectedGateway
    } = this.props;
    const { isOpen } = this.state;
    return isOpen ? (
      <ConfigurationModalBig
        modalShown={isOpen}
        toggleModal={this.changeIsOpen}
        changeIsOpen={this.changeIsOpen}
      >
        <ConfigurationModalHeader
          icon={<GatewayIcon />}
          subject={"Configure Gateway for " + deviceId}
        />
        <ConfigurationModalBody
          style={{
            padding: "0px 6rem",
            background: "rgba(226, 226, 226, 0.45)"
          }}
        >
          <div className="main-content">
            <div className="description-text">
              <p>
                If this device does not have a direct connection to the Bosch
                IoT Hub (e.g. because it is not IP-enabled), messages can still
                be sent to the Bosch IoT Hub via a gateway device. The gateway
                device receives the message and forwards it to the IoT Hub.
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
            </div>
            <div className="selection-form">
              <SearchbarM
                className="search"
                id="search_content"
                name="gatewaySearchText"
                type="text"
                placeholder="Search for a device..."
                onIconClick={handleSubmit(this.resetSelected)}
                autoComplete="off"
                asField
              />
              <form onSubmit={handleSubmit(this.resetSelected)}>
                <GatewaySelectionList
                  name="selectedDevice"
                  searchText={gatewaySearch}
                  deviceData={deviceData}
                  changeSelected={this.changeSelected}
                  resetSelected={handleSubmit(this.resetSelected)}
                  selectedGateway={selectedGateway}
                  viaProperty={viaProperty}
                />
              </form>
            </div>
          </div>
        </ConfigurationModalBody>
        <ConfigurationModalFooter
          confirm={handleSubmit(this.submit)}
          submitType="submit"
          toggleModal={this.changeIsOpen}
        />
      </ConfigurationModalBig>
    ) : (
      <Redirect to={`/registrations/${deviceId}/registration`} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const selector = formValueSelector("gatewayTab");
  const gateways = selectAllDevices(state);
  return {
    gatewaySearch: selector(state, "gatewaySearchText"),
    selectedGateway: selector && selector(state, "via"),
    viaProperty: selectRegistrationInfo(state, ownProps.deviceId).get("via"),
    gatewayDevices: gateways.map(device => device.get("deviceId")),
    deviceData: gateways.map(device => ({
      deviceId: device.get("deviceId"),
      selected: false
    })),
    initialValues: {
      selectedDevice: ownProps.match.params.selectedDeviceId || null
    }
  };
};

let AddGatewayModalContainer = reduxForm({
  form: "gatewayTab"
})(AddGatewayModalWrapped);

AddGatewayModalContainer = withRouter(
  connect(
    mapStateToProps,
    {
      setViaProperty,
      reset
    }
  )(toJS(AddGatewayModalContainer))
);

AddGatewayModalWrapped.propTypes = {
  handleSubmit: PropTypes.func,
  gatewaySearch: PropTypes.string,
  selectedGateway: PropTypes.string,
  viaProperty: PropTypes.string,
  gatewayDevices: PropTypes.array.isRequired,
  deviceId: PropTypes.string.isRequired,
  setViaProperty: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  deviceData: PropTypes.arrayOf(
    PropTypes.shape({ deviceId: PropTypes.string, selected: PropTypes.bool })
  )
};

const AddGateway = AddGatewayModalContainer;
export default AddGateway;
