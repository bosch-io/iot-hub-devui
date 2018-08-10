/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/settings.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteCredential } from "actions/CredentialActions";
import CredentialAccordionTabDropdownMenu from "./CredentialAccordionTabDropdownMenu";
import HoverTooltip from "components/common/HoverTooltip";
import { ConfirmationModal } from "components/common/dialogModals";
// SVG Imports
import MoreIcon from "images/moreIcon.svg";

class CredentialAccordionTabDropdownWrapped extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      ...props.initialState
    };
    this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
  }

  toggleDropdownMenu() {
    this.setState(prevState => ({ isOpened: !prevState.isOpened }));
    setTimeout(() => this.setState({ inEditingView: false }), 300);
  }

  render() {
    const { authId, selectedDevice } = this.props;
    const { isOpened } = this.state;
    const tooltipIdOptions = "options-btn";
    return [
      <div key="dropdownFrag1" id="settings-wrapper">
        <div id="settings-button-wrapper">
          <MoreIcon
            className="header-icon-right"
            onClick={!this.state.isOpened ? this.toggleDropdownMenu : null} // if already opened, the ClickOutside Wrapper gets responsible for toggling
            data-tip
            data-for={tooltipIdOptions}
          />
          {!isOpened && (
            <HoverTooltip id={tooltipIdOptions} text="Edit Credential" />
          )}
        </div>
        <CredentialAccordionTabDropdownMenu
          isOpened={this.state.isOpened}
          authId={authId}
          selectedDevice={selectedDevice}
          inEditingView={this.state.inEditingView}
          toggleDropdownMenu={this.toggleDropdownMenu}
        />
      </div>
    ];
  }
}

const CredentialAccordionTabDropdown = connect(
  null,
  { deleteCredential }
)(CredentialAccordionTabDropdownWrapped);

CredentialAccordionTabDropdownWrapped.propTypes = {
  initialState: PropTypes.object,
  authId: PropTypes.string.isRequired,
  selectedDevice: PropTypes.string,
  deleteCredential: PropTypes.func.isRequired
};

export default CredentialAccordionTabDropdown;
