/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import "styles/prism-duotone.scss";
import PropTypes from "prop-types";
import { formatDateString } from "utils";
import {
  DetailsModal,
  DetailsModalHeader,
  DetailsModalBody
} from "components/common/dialogModals";
import PayloadContent from "./PayloadContent";
import ApplicationHeaderTable from "./ApplicationHeaderTable";
// SVG Imports
import MessageLogo from "images/messageIcon.svg";

const MessageDetailsModal = ({ showModal, modalMessage, handleCloseModal }) => (
  <DetailsModal
    className="payload-modal-container"
    modalShown={showModal}
    changeIsOpen={handleCloseModal}>
    <DetailsModalHeader
      subject={`${modalMessage ? modalMessage.message.type : ""} message from`}
      subTitle={modalMessage ? formatDateString(modalMessage.time) : ""}
      icon={<MessageLogo />}
    />
    <DetailsModalBody toggleModal={handleCloseModal}>
      <ApplicationHeaderTable modalMessage={modalMessage} />
      <PayloadContent modalMessage={modalMessage} />
    </DetailsModalBody>
  </DetailsModal>
);

MessageDetailsModal.propTypes = {
  /**
   * Whether or not the modal is shown
   */
  showModal: PropTypes.bool.isRequired,
  /**
   * The log entry object that get displayed
   */
  modalMessage: PropTypes.object,
  /**
   * Function to open the modal/ set the state in the LogTable component
   */
  handleOpenModal: PropTypes.func.isRequired,
  /**
   * Function to close the modal/ set the state in the LogTable component
   */
  handleCloseModal: PropTypes.func.isRequired
};

export default MessageDetailsModal;
