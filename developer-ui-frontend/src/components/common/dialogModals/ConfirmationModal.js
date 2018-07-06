/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */

import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  DialogModalBase as DialogModal,
  DialogModalHeaderBase as DialogHeader,
  DialogModalFooter as DialogFooter
} from "./DialogModal";

const DialogBody = styled.p`
  padding: 2.1rem 2.4rem;
  margin: 0;
  font-size: 1.6rem;
  color: rgba(0, 0, 0, 0.54);
  font-weight: 400;
  i {
    color: ${props => props.theme.accentRed};
  }
`;

export default class ConfirmationModal extends Component {
  constructor(props) {
    super(props);
    this.confirm = this.confirm.bind(this);
  }

  confirm() {
    this.props.confirm();
    this.props.toggleModal(null, false);
  }
  render() {
    const {
      modalShown,
      subject,
      children,
      toggleModal,
      subTitle,
      submitType
    } = this.props;

    return (
      <DialogModal
        overlayClassName="confirmation-modal"
        isOpen={modalShown}
        closeTimeoutMS={150}
        contentLabel="Confirmation Modal"
        ariaHideApp={false}>
        <DialogHeader>
          <h2>
            {subject} {subTitle && <span>{subTitle}</span>}
          </h2>
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogFooter
          confirm={this.confirm}
          submitType={submitType}
          toggleModal={toggleModal}
        />
      </DialogModal>
    );
  }
}

ConfirmationModal.propTypes = {
  modalShown: PropTypes.bool.isRequired,
  subject: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  submitType: PropTypes.oneOf(["delete", "submit"]).isRequired,
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  confirm: PropTypes.func.isRequired
};
