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
import AddSecretModal from "./AddSecretModal";
import ConfirmationModal from "components/common/ConfirmationModal";
import DeleteSecretModal from "./DeleteSecretModal";
// SVG Imports
import MoreIcon from "images/moreIcon.svg";

class CredentialAccordionTabDropdownWrapped extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      currentModal: {
        opened: false,
        type: null
      },
      ...props.initialState
    };
    this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleDropdownMenu() {
    this.setState(prevState => ({ isOpened: !prevState.isOpened }));
    setTimeout(() => this.setState({ inEditingView: false }), 300);
  }

  toggleModal(type) {
    this.setState(state => ({
      currentModal: {
        opened: !state.currentModal.opened,
        type: type ? type : state.currentModal.type
      }
    }));
  }

  render() {
    const { authId, selectedDevice } = this.props;
    const { isOpened } = this.state;
    const tooltipIdOptions = "options-btn";
    let CurrentModalJsx = null;
    if (this.state.currentModal.opened) {
      switch (this.state.currentModal.type) {
        case "Add Secret":
          CurrentModalJsx = (
            <AddSecretModal
              key="dropdownFrag2"
              deviceId={selectedDevice}
              isOpen={this.state.currentModal.opened}
              authId={authId}
              changeIsOpen={this.toggleModal}
            />
          );
          break;
        case "Delete Secret":
          CurrentModalJsx = (
            <DeleteSecretModal
              key="dropdownFrag2"
              deviceId={selectedDevice}
              isOpen={this.state.currentModal.opened}
              authId={authId}
              changeIsOpen={this.toggleModal}
            />
          );
          break;
        case "Delete Credential":
          CurrentModalJsx = (
            <ConfirmationModal
              key="dropdownFrag2"
              modalShown={this.state.currentModal.opened}
              subject={`Delete ${authId}?`}
              toggleModal={this.toggleModal}
              confirm={() =>
                this.props.deleteCredential(selectedDevice, authId)
              }>
              <p>Are you sure, you want to delete this credential?</p>
            </ConfirmationModal>
          );
          break;
        default:
          CurrentModalJsx = null;
      }
    }
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
          toggleModal={this.toggleModal}
        />
      </div>,
      CurrentModalJsx
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
