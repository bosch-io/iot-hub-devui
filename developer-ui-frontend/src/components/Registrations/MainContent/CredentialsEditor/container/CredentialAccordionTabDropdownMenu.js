/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import CredentialDropdownOptions from "./CredentialDropdownOptions";
import { updateSetting } from "actions/UserSettingsActions";
import { connect } from "react-redux";
import enhanceWithClickOutside from "react-click-outside";
import { Field, reduxForm, formValueSelector } from "redux-form/immutable";

class CredentialAccordionTabDropdownMenu extends React.Component {
  handleClickOutside(e) {
    if (this.props.isOpened) {
      this.props.toggleDropdownMenu();
      e.stopPropagation();
    }
  }

  render() {
    const {
      toggleDropdownMenu,
      isOpened,
      toggleModal,
      authId,
      selectedDevice
    } = this.props;

    return (
      <div
        id="settings-dropdown-menu"
        className={
          "dropdown-menu " + (isOpened ? "dropdown-menu-active shadow-z-2" : "")
        }>
        <div>
          <form>
            <div>
              <CredentialDropdownOptions
                selectedItemRef={this.selectedItemRef}
                toggleDropdownMenu={toggleDropdownMenu}
                toggleModal={toggleModal}
                authId={authId}
                selectedDevice={selectedDevice}
              />
            </div>
            <Field
              name="selectedCredentialOption"
              component="select"
              ref={item => {
                this.selectedItemRef = item;
              }}
              withRef
            />
          </form>
        </div>
      </div>
    );
  }
}
// Decorate the Dropdown Menu with enhanceWithClickOutside, reduxForm and connect it to the Redux store
CredentialAccordionTabDropdownMenu = reduxForm({
  form: "credentialOptionsForm"
})(enhanceWithClickOutside(CredentialAccordionTabDropdownMenu));
const selector = formValueSelector("credentialOptionsForm");
CredentialAccordionTabDropdownMenu = connect(
  state => {
    const selectedSettingsItem = selector(state, "selectedCredentialOption");
    return { selectedSettingsItem };
  },
  dispatch => {
    return {
      updateSetting: setting => dispatch(updateSetting(setting))
    };
  }
)(CredentialAccordionTabDropdownMenu);

export default CredentialAccordionTabDropdownMenu;

CredentialAccordionTabDropdownMenu.propTypes = {
  selectedSettingsItem: PropTypes.string,
  selectedDevice: PropTypes.string.isRequired,
  isOpened: PropTypes.bool,
  toggleDropdownMenu: PropTypes.func,
  updateSetting: PropTypes.func,
  authId: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired
};
