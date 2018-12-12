/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import ConfirmationModal, {
  ConfirmationModalHeader,
  ConfirmationModalBody,
  ConfirmationModalFooter
} from "components/common/dialogModals/ConfirmationModal";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteCredential } from "actions/CredentialActions";

class DeleteCredentialModalWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
    this.confirm = this.confirm.bind(this);
    this.changeIsOpen = this.changeIsOpen.bind(this);
  }

  changeIsOpen(opened) {
    this.setState({ isOpen: opened });
  }

  confirm() {
    this.changeIsOpen(false);
    this.props.deleteCredential(this.props.deviceId, this.props.authId);
  }

  render() {
    const { authId, match } = this.props;
    const { isOpen } = this.state;
    return isOpen ? (
      <ConfirmationModal modalShown={isOpen} toggleModal={this.changeIsOpen}>
        <ConfirmationModalHeader subject={"Delete credential " + authId} />
        <ConfirmationModalBody>
          {"Are you sure, you want to delete this credential?"}
        </ConfirmationModalBody>
        <ConfirmationModalFooter
          confirm={this.confirm}
          submitType="delete"
          toggleModal={this.changeIsOpen}
        />
      </ConfirmationModal>
    ) : (
      <Redirect
        to={`/registrations/${match.params.selectedDeviceId}/credentials/${
          match.params.selectedAuthId
        }`}
      />
    );
  }
}

const DeleteCredentialModal = withRouter(
  connect(
    null,
    { deleteCredential }
  )(DeleteCredentialModalWrapped)
);

DeleteCredentialModalWrapped.propTypes = {
  authId: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
  deleteCredential: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default DeleteCredentialModal;
