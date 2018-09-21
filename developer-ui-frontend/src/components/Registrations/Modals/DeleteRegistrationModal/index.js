/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
import ConfirmationModal, {
  ConfirmationModalHeader,
  ConfirmationModalBody,
  ConfirmationModalFooter
} from "components/common/dialogModals/ConfirmationModal";
// Redux
import { connect } from "react-redux";
import { deleteRegistration } from "actions/RegistrationActions";
import { deleteAllCredentialsOfDevice } from "actions/CredentialActions";
// Redux Form
import { reset } from "redux-form/immutable";

class DeleteRegistrationModalWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footerOptionChecked: true,
      footerOptionCheckedSecond: true,
      isOpen: true
    };
    this.changeIsOpen = this.changeIsOpen.bind(this);
    this.onCheckboxClick = this.onCheckboxClick.bind(this);
    this.onCheckboxClickSecond = this.onCheckboxClickSecond.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  onCheckboxClick() {
    this.setState(state => ({
      footerOptionChecked: !state.footerOptionChecked
    }));
  }

  onCheckboxClickSecond() {
    this.setState(state => ({
      footerOptionCheckedSecond: !state.footerOptionCheckedSecond
    }));
  }

  changeIsOpen(opened) {
    this.setState({ isOpen: opened });
  }

  confirm() {
    const { resetSelectedDevice, deleteReg, deviceId } = this.props;
    this.changeIsOpen(false);
    const rememberedSelection = deviceId;
    resetSelectedDevice(); // Clear selection
    if (this.state.footerOptionChecked) {
      this.props
        .deleteAllCredentialsOfDevice(rememberedSelection)
        .then(() => deleteReg(rememberedSelection));
    } else {
      deleteReg(rememberedSelection);
    }
    if (this.state.footerOptionCheckedSecond) {
      this.props
        .deleteAllCredentialsOfDevice(rememberedSelection)
        .then(() => deleteReg(rememberedSelection));
    } else {
      deleteReg(rememberedSelection);
    }
  }

  render() {
    const {
      deviceId,
      match: {
        params: { registrationsSubMenu, selectedDeviceId, authId }
      }
    } = this.props;
    const { isOpen } = this.state;
    return isOpen ? (
      <ConfirmationModal modalShown={isOpen} toggleModal={this.changeIsOpen}>
        <ConfirmationModalHeader subject={"Delete device " + deviceId} />
        <ConfirmationModalBody>
          {"Are you sure, you want to delete this registration?"}
        </ConfirmationModalBody>
        <ConfirmationModalFooter
          confirm={this.confirm}
          submitType="delete"
          toggleModal={this.changeIsOpen}
          checkboxOption={{
            checkboxLabel: "Also delete all credentials for that device",
            checked: this.state.footerOptionChecked,
            onCheckboxClick: this.onCheckboxClick
          }}
        />
      </ConfirmationModal>
    ) : (
      <Redirect
        to={`/registrations/${selectedDeviceId}${
          registrationsSubMenu ? "/" + registrationsSubMenu : ""
        }${authId ? "/" + authId : ""}`}
      />
    );
  }
}

const DeleteRegistrationModal = withRouter(
  connect(
    null,
    dispatch => ({
      deleteReg: deviceId => dispatch(deleteRegistration(deviceId)),
      deleteAllCredentialsOfDevice: deviceId =>
        dispatch(deleteAllCredentialsOfDevice(deviceId)),
      resetSelectedDevice: () => dispatch(reset("registrationsTabListing"))
    })
  )(DeleteRegistrationModalWrapped)
);

DeleteRegistrationModalWrapped.propTypes = {
  deviceId: PropTypes.string.isRequired,
  deleteReg: PropTypes.func.isRequired,
  deleteAllCredentialsOfDevice: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  resetSelectedDevice: PropTypes.func.isRequired
};

export default DeleteRegistrationModal;
