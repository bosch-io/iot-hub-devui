/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import { formatDateString } from "utils";

export default class RegisteredDeviceItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.selected
    };
    this.toggleChecked = this.toggleChecked.bind(this);
  }

  toggleChecked(check) {
    if (check) {
      this.props.removeDeviceFromSelection(this.props.device.deviceId);
    } else {
      this.props.addSelectedDevice(this.props.device);
    }
    this.setState(prevState => ({ isChecked: !prevState.isChecked }));
  }

  render() {
    const { device, firstNotSubscribed } = this.props;
    return (
      <li
        className={firstNotSubscribed ? "reg-entry withSeparator" : "reg-entry"}
        onClick={() => this.toggleChecked(this.state.isChecked)}>
        <div className="pretty p-svg p-curve p-jelly">
          <input
            type="checkbox"
            id={"checkBoxInput" + device.deviceId}
            checked={this.state.isChecked}
            readOnly
          />
          <div className="state p-info">
            <svg className="svg svg-icon" viewBox="0 0 20 20">
              <path
                d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                style={{ stroke: "white", fill: "white" }}
              />
            </svg>
            <label>{device.deviceId}</label>
          </div>
        </div>
        <span className="lastActiveLabel">
          {"last active " + formatDateString(device.lastActive)}
        </span>
      </li>
    );
  }
}

RegisteredDeviceItem.propTypes = {
  firstNotSubscribed: PropTypes.bool,
  selected: PropTypes.bool,
  device: PropTypes.object,
  addSelectedDevice: PropTypes.func,
  removeDeviceFromSelection: PropTypes.func
};
