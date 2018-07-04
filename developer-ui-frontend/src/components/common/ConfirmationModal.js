/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/confirmModal.scss";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import DeleteIcon from "images/deleteIcon.svg";

export default class ConfirmationModal extends Component {
  confirm() {
    this.props.confirm();
    this.props.toggleModal(null, false);
  }
  render() {
    const { modalShown, subject, children, toggleModal } = this.props;
    return (
      <Modal
        overlayClassName="confirmation-modal"
        className="confirmation-modal-inner shadow-z-2"
        isOpen={modalShown}
        closeTimeoutMS={150}
        contentLabel="Confirmation Modal"
        ariaHideApp={false}>
        <div id="modal-header">
          <h2>{subject}</h2>
        </div>
        {children}
        <div className="confirmation-btns">
          <button onClick={() => toggleModal(null, false)} id="cancel-btn">
            Cancel
          </button>
          <button onClick={this.confirm.bind(this)} id="delete-btn">
            Delete <DeleteIcon />
          </button>
        </div>
      </Modal>
    );
  }
}

ConfirmationModal.propTypes = {
  modalShown: PropTypes.bool.isRequired,
  subject: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  confirm: PropTypes.func.isRequired
};
