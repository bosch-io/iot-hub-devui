/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  DialogModalBase as DialogModal,
  DialogModalHeaderBase as DialogHeader,
  DialogModalFooter as DialogFooter
} from "./DialogModal";
import Checkbox from "../Checkbox";
/**
 * ConfirmationModals can either be imported as a whole and then used with one component
 * (<ConfirmationModal />) or with the four named exports <ConfirmationModal />,
 * <ConfirmationModalHeader />, <ConfirmationModalBody /> and <ConfirmationModalFooter />
 */
const DialogModalBody = styled.p`
  padding: 2.1rem 2.4rem;
  margin: 0;
  font-size: 1.6rem;
  color: rgba(0, 0, 0, 0.54);
  font-weight: 400;
  i {
    color: ${props => props.theme.accentRed};
  }
`;
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
export const ConfirmationModalBody = ({ children }) => (
  <DialogModalBody>{children}</DialogModalBody>
);
/* eslint-enable react/prop-types */

export const ConfirmationModalHeader = ({ subject, subTitle }) => (
  <DialogHeader>
    <h2>
      {subject} {subTitle && <span>{subTitle}</span>}
    </h2>
  </DialogHeader>
);

ConfirmationModalHeader.propTypes = {
  subject: PropTypes.string.isRequired,
  subTitle: PropTypes.string
};

export const ConfirmationModalFooter = ({
  confirm,
  submitType,
  toggleModal,
  checkboxOption
}) => {
  let CheckboxJsx = null;
  if (checkboxOption) {
    const { checkboxLabel, checked, onCheckboxClick } = checkboxOption;
    CheckboxJsx = (
      <Checkbox
        checked={checked}
        onCheckboxClick={onCheckboxClick}
        label={checkboxLabel}
      />
    );
  }
  return (
    <DialogFooter
      confirm={confirm}
      submitType={submitType}
      toggleModal={toggleModal}
      checkboxOption={CheckboxJsx}
    />
  );
};

ConfirmationModalFooter.propTypes = {
  submitType: PropTypes.oneOf(["delete", "submit"]).isRequired,
  toggleModal: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  checkboxOption: PropTypes.shape({
    checkboxLabel: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onCheckboxClick: PropTypes.func.isRequired
  })
};

export default class ConfirmationModal extends Component {
  constructor(props) {
    super(props);
    this.confirm = this.confirm.bind(this);
  }

  confirm() {
    this.props.toggleModal(null, false);
    this.props.confirm();
  }
  render() {
    const {
      modalShown,
      subject,
      children,
      toggleModal,
      subTitle,
      submitType,
      checkboxOption
    } = this.props;
    /*
      Check if the structrue for children is
        <ConfirmationModalHeader />
        <ConfirmationModalBody />
        <ConfirmationModalFooter />
      if not, fall back to the preset
    */
    let isPresetVersion = false;
    if (React.Children.count(children) !== 3) {
      isPresetVersion = true;
    } else {
      React.Children.forEach(children, (child, i) => {
        if (
          (i === 0 && child.type !== ConfirmationModalHeader) ||
          (i === 1 && child.type !== ConfirmationModalBody) ||
          (i === 2 && child.type !== ConfirmationModalFooter)
        ) {
          isPresetVersion = true;
        }
      });
    }

    return (
      <DialogModal
        overlayClassName="confirmation-modal"
        isOpen={modalShown}
        closeTimeoutMS={150}
        contentLabel="Confirmation Modal"
        ariaHideApp={false}>
        {isPresetVersion ? (
          <Fragment>
            <ConfirmationModalHeader subject={subject} subTitle={subTitle} />
            <ConfirmationModalBody>{children}</ConfirmationModalBody>
            <ConfirmationModalFooter
              confirm={this.confirm}
              submitType={submitType}
              toggleModal={toggleModal}
              checkboxOption={checkboxOption}
            />
          </Fragment>
        ) : (
          React.Children.map(children, child => child)
        )}
      </DialogModal>
    );
  }
}

ConfirmationModal.propTypes = {
  modalShown: PropTypes.bool.isRequired,
  subject: PropTypes.string,
  subTitle: PropTypes.string,
  submitType: PropTypes.oneOf(["delete", "submit"]),
  toggleModal: PropTypes.func,
  children: PropTypes.any,
  confirm: PropTypes.func,
  checkboxOption: PropTypes.shape({
    checkboxLabel: PropTypes.string,
    checked: PropTypes.bool,
    onCheckboxClick: PropTypes.func
  })
};
