/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/settings.scss";
import React, { Component } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import {
  selectSecretsByCredentialId,
  selectCredentialIdsByDeviceId
} from "reducers/selectors";
// Child Components
import TooltipMenu, { TooltipMenuOption } from "components/common/TooltipMenu";
import HoverTooltip from "components/common/HoverTooltip";
// SVG Imports
import MoreIcon from "images/moreIcon.svg";
import DeleteCredIcon from "images/deletePwCredentialIcon.svg";
import CodeIcon from "images/codeIcon.svg";
import EditIcon from "images/editIcon.svg";
class CredentialAccordionTabDropdownWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      ...props.initialState
    };
    this.menuOptions = [
      {
        value: "Edit Credential",
        icon: <EditIcon />,
        route: `/registrations/${props.selectedDevice}/${
          props.authId
        }/editCredential`,
        disabledHoverTooltipId: "editCredentialDisabled"
      },
      {
        value: "Delete Credential",
        icon: <DeleteCredIcon />,
        route: `/registrations/${props.selectedDevice}/credentials/${
          props.authId
        }/deleteCredential`,
        disabledHoverTooltipId: "deleteCredentialDisabled",
        disabledText: "There are no credentials for this device"
      },
      {
        value: "Edit Raw",
        icon: <CodeIcon />,
        route: `/registrations/${props.selectedDevice}/credentials/${
          props.authId
        }/raw`,
        disabledHoverTooltipId: "editRawDisabled",
        disabledText: "There are no credentials for this device"
      }
    ];
    this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
  }

  getIsDisabled(category) {
    const { numberOfCredentials } = this.props;
    let isDisabled = null;
    switch (category) {
      case "Edit Credential":
        isDisabled = false;
        break;
      case "Delete Credential":
        isDisabled = numberOfCredentials === 0;
        break;
      case "Edit Raw":
        isDisabled = numberOfCredentials === 0;
        break;
      default:
        return new Error("Unknown dropdown category");
    }
    return isDisabled;
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
