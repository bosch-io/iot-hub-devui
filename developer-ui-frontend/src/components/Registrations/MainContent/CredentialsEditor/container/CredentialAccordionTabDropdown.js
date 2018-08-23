/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/settings.scss";
import React from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import {
  selectSecretsByCredentialId,
  selectCredentialIdsByDeviceId
} from "reducers/selectors";
// Child Components
import HoverTooltip from "components/common/HoverTooltip";
import TooltipMenu, { TooltipMenuOption } from "components/common/TooltipMenu";
// SVG Imports
import MoreIcon from "images/moreIcon.svg";
import DeleteCredIcon from "images/deletePwCredentialIcon.svg";
import DeletePwSecretIcon from "images/deletePwSecretIcon.svg";
import AddPwSecretIcon from "images/addPwSecretIcon.svg";

class CredentialAccordionTabDropdownWrapped extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      ...props.initialState
    };
    this.menuOptions = [
      {
        value: "Add Secret",
        icon: <AddPwSecretIcon />,
        route: `/registrations/${props.selectedDevice}/${
          props.authId
        }/additionalSecrets`,
        disabledHoverTooltipId: "addSecretDisabled"
      },
      {
        value: "Delete Secret",
        icon: <DeletePwSecretIcon />,
        route: `/registrations/${props.selectedDevice}/${
          props.authId
        }/deleteSecrets`,
        disabledHoverTooltipId: "deleteSecretDisabled"
      },
      {
        value: "Delete Credential",
        icon: <DeleteCredIcon />,
        route: `/registrations/${props.selectedDevice}/${
          props.authId
        }/deleteCredential`,
        disabledHoverTooltipId: "deleteCredentialDisabled"
      }
    ];
    this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
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

  toggleDropdownMenu() {
    this.setState(prevState => ({ isOpened: !prevState.isOpened }));
  }

  render() {
    const { isOpened } = this.state;
    const tooltipIdOptions = "options-btn";
    const menuBtnId = "registrations-menu-btn";
    return (
      <div id="settings-button-wrapper">
        <MoreIcon
          className="header-icon-right"
          id={menuBtnId}
          data-tip
          data-for={tooltipIdOptions}
          onClick={this.toggleDropdownMenu}
        />
        <TooltipMenu
          open={isOpened}
          toggleOpen={this.toggleDropdownMenu}
          ancorId={menuBtnId}>
          {this.menuOptions.map((option, index) => (
            <TooltipMenuOption
              key={index}
              {...option}
              disabled={this.getIsDisabled(option.value)}
            />
          ))}
        </TooltipMenu>
        {!isOpened && (
          <HoverTooltip id={tooltipIdOptions} text="Edit Credential" />
        )}
        {this.menuOptions
          .filter(option => this.getIsDisabled(option.value))
          .map(option => (
            <HoverTooltip
              key={option.disabledHoverTooltipId}
              id={option.disabledHoverTooltipId}
              text={this.getDisabledText(option.value)}
            />
          ))}
      </div>
    );
  }
}

CredentialAccordionTabDropdownWrapped.propTypes = {
  initialState: PropTypes.object,
  authId: PropTypes.string.isRequired,
  selectedDevice: PropTypes.string,
  numberOfSecrets: PropTypes.number.isRequired,
  numberOfCredentials: PropTypes.number.isRequired
};

const CredentialAccordionTabDropdown = connect((state, ownProps) => ({
  numberOfSecrets: selectSecretsByCredentialId(state, ownProps.authId).size,
  numberOfCredentials: selectCredentialIdsByDeviceId(
    state,
    ownProps.selectedDevice
  ).size
}))(CredentialAccordionTabDropdownWrapped);

export default CredentialAccordionTabDropdown;
