/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import * as devicesListTransition from "animations/devicesListTransitions";
import { Field } from "redux-form/immutable";
import { TransitionMotion } from "react-motion";

export default class RegistrationsTableEntry extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }
  getStyles() {
    const { devices, fields, registrySearchValue } = this.props;
    const styles = [];
    fields.forEach((el, index, fieldsProp) => {
      // 2x .get needed (first get is a function property on the fieldsProp object prop of the FieldArray, second get is from Immutable.js)
      const id = fieldsProp
        .get(index)
        .get("deviceId")
        .toString();
      if (id.includes(registrySearchValue)) {
        styles.push({
          key: el,
          data: {
            deviceId: fieldsProp.get(index).get("deviceId"),
            enabled: devices[index].registrationInfo.enabled
          },
          style: devicesListTransition.startingStyleConfigRegistrySearch
        });
      }
    });
    return styles;
  }

  handleItemClick(deviceId) {
    this.props.setMainPanel(true);
    this.props.setSelectedDevice(deviceId);
  }

  handleCheckboxClick(deviceId, enabled) {
    this.props.changeEnabled(deviceId, !enabled);
  }

  render() {
    const { fields, registrySearchValue, devices } = this.props;
    return (
      <ul id="reg-listing-content">
        <TransitionMotion
          defaultStyles={devicesListTransition.getDefaultStyles(devices)}
          styles={this.getStyles()}
          willLeave={devicesListTransition.willLeave}
          willEnter={devicesListTransition.willEnter}>
          {interpStyles => {
            let registeredFields = [];
            /* eslint-disable consistent-return */
            fields.forEach((el, index, fieldsProp) => {
              if (index < interpStyles.length) {
                const {
                  key,
                  data: { deviceId, enabled },
                  style
                } = interpStyles[index];
                return registeredFields.push(
                  <div
                    style={style}
                    className="reg-item"
                    onClick={() => this.handleItemClick(deviceId)}
                    key={key}>
                    <li>
                      <span>{deviceId}</span>
                      <div className="pretty p-svg p-curve p-jelly">
                        <Field
                          name={`${key}.enabled`}
                          id={fieldsProp.get(index).get("deviceId")}
                          component="input"
                          type="checkbox"
                          onChange={() =>
                            this.handleCheckboxClick(deviceId, enabled)
                          }
                        />
                        <div className="state p-info">
                          <svg className="svg svg-icon" viewBox="0 0 20 20">
                            <path
                              d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                              style={{ stroke: "white", fill: "white" }}
                            />
                          </svg>
                          <label />
                        </div>
                      </div>
                    </li>
                  </div>
                );
              }
            });
            return <div>{registeredFields}</div>;
          }}
        </TransitionMotion>
      </ul>
    );
  }
}

RegistrationsTableEntry.propTypes = {
  fields: PropTypes.object,
  registrySearchValue: PropTypes.string,
  devices: PropTypes.array,
  setMainPanel: PropTypes.func.isRequired,
  setSelectedDevice: PropTypes.func.isRequired,
  changeEnabled: PropTypes.func.isRequired
};
