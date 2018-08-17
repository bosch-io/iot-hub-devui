/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
/* eslint-disable react/no-multi-comp */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DialogModalBase } from "./DialogModal";
import { RoundOutlineButton } from "components/common/buttons";

const Body = styled.div`
  padding: 0;
  button {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-bottom: 2rem;
    margin-right: 3rem;
    z-index: 1;
  }
`;

export const DetailsModalBody = ({ children, toggleModal }) => (
  <Body>
    {children}
    <RoundOutlineButton secondary onClick={toggleModal}>
      CLOSE
    </RoundOutlineButton>
  </Body>
);

DetailsModalBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  toggleModal: PropTypes.func.isRequired
};

class DetailsModal extends Component {
  render() {
    const { modalShown, changeIsOpen, children, ...other } = this.props;
    return (
      <DialogModalBase
        overlayClassName="confirmation-modal"
        isOpen={modalShown}
        closeTimeoutMS={150}
        onRequestClose={() => changeIsOpen(false)}
        contentLabel="Confirmation Modal"
        ariaHideApp={false}
        noBorders
        {...other}>
        {children}
      </DialogModalBase>
    );
  }
}

DetailsModal.propTypes = {
  modalShown: PropTypes.bool.isRequired,
  changeIsOpen: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
};

export default DetailsModal;
