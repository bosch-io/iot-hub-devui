/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
/* eslint-disable react/no-multi-comp */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  DialogModalBase,
  DialogModalHeaderBase,
  DialogModalFooter
} from "./DialogModal";

/* The complete Modal content is wrapped in a form with a fixed height */
const DialogModal = DialogModalBase.extend`
  height: 50vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const DialogModalHeader = DialogModalHeaderBase.extend`
  svg {
    display: inline-block;
    height: 2.5rem;
    margin-right: 1rem;

    .pwCircle {
      fill: ${props => props.theme.accentBlue};
    }

    path {
      fill: ${props => props.theme.accentColor};
    }
  }
`;

const DialogModalBody = styled.div`
  padding: 0 10rem;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  align-items: center;
  position: relative;
  flex: 1;
`;

export const ConfigurationModalHeader = ({
  icon,
  subject,
  subTitle,
  children,
  ...other
}) => (
  <DialogModalHeader {...other}>
    <h2>
      {icon && icon} {subject} {subTitle && <span>{subTitle}</span>}
    </h2>
    {children}
  </DialogModalHeader>
);
ConfigurationModalHeader.propTypes = {
  subject: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export const ConfigurationModalFooter = ({
  submitType,
  toggleModal,
  submitBlocked,
  confirm
}) => (
  <DialogModalFooter
    submitType={submitType}
    toggleModal={toggleModal}
    submitBlocked={submitBlocked}
    confirm={confirm}
  />
);
ConfigurationModalFooter.propTypes = {
  submitType: PropTypes.oneOf(["delete", "submit", "none"]).isRequired,
  toggleModal: PropTypes.func.isRequired,
  confirm: PropTypes.func,
  submitBlocked: PropTypes.bool
};

class ConfigurationModal extends Component {
  render() {
    const {
      modalShown,
      changeIsOpen,
      children,
      className,
      ...other
    } = this.props;
    return (
      <DialogModal
        className={className}
        overlayClassName="confirmation-modal"
        isOpen={modalShown}
        closeTimeoutMS={150}
        onRequestClose={() => changeIsOpen(false)}
        contentLabel="Confirmation Modal"
        ariaHideApp={false}
        {...other}>
        {children}
      </DialogModal>
    );
  }
}

ConfigurationModal.propTypes = {
  modalShown: PropTypes.bool.isRequired,
  changeIsOpen: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  className: PropTypes.string
};

export default ConfigurationModal;

export { DialogModalBody as ConfigurationModalBody };
