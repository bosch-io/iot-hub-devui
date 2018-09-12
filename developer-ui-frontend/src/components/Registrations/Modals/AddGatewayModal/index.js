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
    console.log(
      "It works with values " + values + " for the device " + deviceId
    );
    console.log(values._root.entries[0][1]);
    this.changeIsOpen(false);
  }

  changeSelected(id) {
    console.log("The selected device is: " + id);
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
        <ConfigurationModalBody className="mainContent">
          <p className="paragraph">
            A short descirption of what the gateway device is. Maybe with a link
            to the [documentantion]. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua.
          </p>
          <div className="elementsAlign">
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

const selector = formValueSelector("gatewayTab");

const mapStateToProps = state => {
  const gatewaySearch = selector(state, "gatewaySearchText");
  const gatewayDevices = selectAllDevices(state).map(device =>
    device.get("deviceId")
  );
  return {
    gatewaySearch,
    gatewayDevices
  };
};

let AddGatewayModalContainer = reduxForm({
  form: "gatewayTab"
})(AddGatewayModalWrapped);

AddGatewayModalContainer = withRouter(
  connect(mapStateToProps)(toJS(AddGatewayModalContainer))
);

AddGatewayModalWrapped.propTypes = {
  handleSubmit: PropTypes.func,
  gatewaySearch: PropTypes.string,
  gatewayDevices: PropTypes.array.isRequired,
  deviceId: PropTypes.string.isRequired
};

const AddGateway = AddGatewayModalContainer;
export default AddGateway;
