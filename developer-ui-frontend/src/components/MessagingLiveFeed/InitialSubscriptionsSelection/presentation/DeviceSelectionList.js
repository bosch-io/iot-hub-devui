/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import RegisteredDeviceItem from "./RegisteredDeviceItem";
require("velocity-animate");
require("velocity-animate/velocity.ui");
import { VelocityTransitionGroup } from "velocity-react";
import Typed from "typed.js";
import { typeJsConf } from "animations/typingAnimations";
import { Link } from "react-router-dom";

const ExpandAnimations = {
  expand: {
    animation: "transition.slideDownIn",
    duration: 100,
    delay: 200,
    stagger: 30,
    display: "flex"
  },
  collapse: {
    animation: "transition.slideUpOut",
    duration: 60
  }
};

class DeviceSelectionList extends Component {
  componentDidMount() {
    this.typed = this.props.showCallToAction
      ? new Typed(this.el, typeJsConf)
      : null;
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.showCallToAction && this.props.showCallToAction) {
      this.typed = new Typed(this.el, typeJsConf);
    }
  }

  componentWillUnmount() {
    this.typed && this.typed.destroy();
  }

  render() {
    const {
      registeredDevices,
      selectedDevices,
      searchText,
      showCallToAction
    } = this.props;
    // Selected Devices are always shown first and filtered out in the other registeredDevices
    const registeredNotSelectedDevices = registeredDevices.filter(
      regDevice =>
        !selectedDevices.some(
          selDevice =>
            regDevice.deviceId.toString() === selDevice.deviceId.toString()
        )
    );
    const displayedRegisteredNotSelected = registeredNotSelectedDevices.filter(
      device =>
        device.deviceId.toString().startsWith(searchText) && searchText !== ""
    );

    const mappedSelected = selectedDevices.map(dev => ({
      ...dev,
      selected: true
    }));
    const mappedNotSelected = displayedRegisteredNotSelected.map(dev => ({
      ...dev,
      selected: false
    }));
    const displayedDevices = [...mappedSelected, ...mappedNotSelected];
    const separatorIndex = selectedDevices.length;
    return (
      <div id="reg-listing-wrapper" className="shadow-z-1">
        <ul id="reg-listing-fxd-header">
          <li>ID</li>
          <li>Status</li>
        </ul>
        <ul className="reg-listing">
          <VelocityTransitionGroup
            enter={ExpandAnimations.expand}
            leave={ExpandAnimations.collapse}>
            {displayedDevices.map((device, index) => (
              <RegisteredDeviceItem
                firstNotSubscribed={separatorIndex === index && index !== 0}
                key={device.deviceId}
                selected={device.selected}
                device={device}
                addSelectedDevice={this.props.addSelectedDevice}
                removeDeviceFromSelection={this.props.removeDeviceFromSelection}
              />
            ))}
          </VelocityTransitionGroup>
        </ul>
        {showCallToAction && (
          <div className="no-content">
            <span
              style={{ whiteSpace: "pre" }}
              ref={el => {
                this.el = el;
              }}
            />
          </div>
        )}
        {registeredDevices.length === 0 && (
          <div className="redirect-call">
            <span>There seem to be no devices registered yet.</span>
            <button type="button">
              <Link to="/registrations">Register a device to get started</Link>.
            </button>
          </div>
        )}
      </div>
    );
  }
}

DeviceSelectionList.defaultProps = {
  searchText: ""
};

DeviceSelectionList.propTypes = {
  searchText: PropTypes.string,
  registeredDevices: PropTypes.array,
  addSelectedDevice: PropTypes.func,
  removeDeviceFromSelection: PropTypes.func,
  selectedDevices: PropTypes.array,
  showCallToAction: PropTypes.bool.isRequired
};

export default DeviceSelectionList;
