/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { CREDENTIAL_OPTIONS } from "_APP_CONSTANTS";
import CredentialOption from "../presentation/CredentialOption";
import { connect } from "react-redux";
import {
  selectSecretsByCredentialId,
  selectCredentialIdsByDeviceId
} from "reducers/selectors";
import HoverTooltip from "components/common/HoverTooltip";

class CredentialDropdownOptionsWrapped extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSettingsItem: null
    };
    this.changeSelectedSetting = this.changeSelectedSetting.bind(this);
    this.getIsDisabled = this.getIsDisabled.bind(this);
  }

  getIsDisabled(category) {
    const { numberOfSecrets, numberOfCredentials } = this.props;
    let isDisabled = null;
    switch (category) {
      case "Add Secret":
        isDisabled = false;
        break;
      case "Delete Secret":
        isDisabled = numberOfSecrets <= 1;
        break;
      case "Delete Credential":
        isDisabled = numberOfCredentials <= 1;
        break;
      default:
        return new Error("Unknown dropdown category");
    }

    return isDisabled;
  }

  getDisabledText(categoryName) {
    let text = "";
    switch (categoryName) {
      case "Delete Secret":
        text = "You must have at least one secret in a credential";
        break;
      case "Delete Credential":
        text = "You must have at least one credential in a registration";
        break;
      default:
        return new Error("Unknown Credential Dropdown Category");
    }

    return text;
  }

  changeSelectedSetting(entry) {
    const selectedItemRef = this.props.selectedItemRef.getRenderedComponent();
    this.setState({ selectedSettingsItem: entry });
    // Take the DOM value as selected <option> in <select>
    selectedItemRef.value = entry;
    // Simulate an actual click on the selected <option> of the hidden <select>
    const clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: false
    });
    const changeEvent = new Event("change", {
      bubbles: true
    });
    selectedItemRef.options[selectedItemRef.selectedIndex].dispatchEvent(
      clickEvent
    );
    selectedItemRef.dispatchEvent(changeEvent);
  }

  render() {
    const { toggleDropdownMenu, selectedDevice, authId } = this.props;
    return (
      <Fragment>
        <ul>
          {CREDENTIAL_OPTIONS.map((category, index) => (
            <CredentialOption
              categoryName={category}
              selectedDevice={selectedDevice}
              authId={authId}
              key={index}
              disabled={this.getIsDisabled(category)}
              toggleDropdownMenu={toggleDropdownMenu}
              changeSelectedDropdown={en => this.changeSelectedSetting(en)}
            />
          ))}
        </ul>
        {this.getIsDisabled("Delete Secret") && (
          <HoverTooltip
            id={"tt-deleteSecret-disabled"}
            text={this.getDisabledText("Delete Secret")}
            effect="float"
            delayShow={0}
          />
        )}
        {this.getIsDisabled("Delete Credential") && (
          <HoverTooltip
            id={"tt-deleteCredential-disabled"}
            text={this.getDisabledText("Delete Credential")}
            effect="float"
            delayShow={0}
          />
        )}
      </Fragment>
    );
  }
}

const CredentialDropdownOptions = connect((state, ownProps) => ({
  numberOfSecrets: selectSecretsByCredentialId(state, ownProps.authId).size,
  numberOfCredentials: selectCredentialIdsByDeviceId(
    state,
    ownProps.selectedDevice
  ).size
}))(CredentialDropdownOptionsWrapped);

CredentialDropdownOptionsWrapped.propTypes = {
  selectedDevice: PropTypes.string.isRequired,
  toggleDropdownMenu: PropTypes.func,
  selectedItemRef: PropTypes.object,
  numberOfSecrets: PropTypes.number.isRequired,
  numberOfCredentials: PropTypes.number.isRequired,
  authId: PropTypes.string.isRequired
};

export default CredentialDropdownOptions;
