/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import styled from "styled-components";
import { RoundOutlineButton, FlatButton } from "components/common/buttons";

export const DialogModalBase = styled(Modal)`
  position: relative;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  border: ${props => (props.noBorders ? "none" : "1px solid #cccccc")};
  border-top: 0;
  width: 50%;
  max-height: 75vh;
  background-color: #fff;
  outline: none;
  border-radius: 4px;
  transition: width 1s, height 1s, background-color 0.75s ease-out;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;

  select,
  option {
    display: unset !important;
  }

  select {
    font-size: 1.6rem;
    padding: 0.7rem 0;
    flex: 1;
  }

  .dropdown-input {
    width: 100%;
    margin: 1rem 0;
    display: flex;
    align-items: center;
    label {
      display: inline-block;
      color: rgba(0, 0, 0, 0.54);
      width: 11rem;
      margin-right: 1rem;
      font-weight: 600;
      padding: 0.4rem 0;
    }
  }
`;

export const DialogModalHeaderBase = styled.div`
  display: inline-block;
  width: calc(100% - 2 * 2.4rem);
  white-space: nowrap;
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  padding: 2.4rem;

  h2 {
    color: rgba(0, 0, 0, 0.87);
    margin: 0;
    font-size: 2.2rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;

    span {
      opacity: 0.5;
      margin-left: 0.3em;
    }
  }
`;

const DialogModalFtr = styled.div`
  -webkit-backface-visibility: hidden;
  display: flex;
  flex-direction: row;
  justify-content: ${props =>
    props.hasCheckbox ? "space-between" : "flex-end"};
  align-items: center;
  padding: 1rem 2.4rem 2.4rem 2.4rem;
  text-decoration: none;
  border-top: 1px solid rgba(34, 36, 38, 0.15);
`;

export const DialogModalFooter = ({
  submitType,
  toggleModal,
  submitBlocked,
  confirm,
  checkboxOption
}) => {
  let ConfirmBtn = null;
  if (submitType === "delete") {
    ConfirmBtn = (
      <RoundOutlineButton
        primary
        disabled={Boolean(submitBlocked)}
        onClick={confirm}
      >
        Delete
      </RoundOutlineButton>
    );
  } else if (submitType === "submit") {
    ConfirmBtn = (
      <FlatButton
        primary
        disabled={Boolean(submitBlocked)}
        submitAnimation
        onClick={confirm}
        type="submit"
      >
        Submit
      </FlatButton>
    );
  }
  return (
    <DialogModalFtr hasCheckbox={Boolean(checkboxOption)}>
      {checkboxOption && checkboxOption}
      <span>
        <FlatButton cancel onClick={() => toggleModal(null, false)}>
          Cancel
        </FlatButton>
        {ConfirmBtn}
      </span>
    </DialogModalFtr>
  );
};

DialogModalFooter.propTypes = {
  submitType: PropTypes.oneOf(["delete", "submit"]).isRequired,
  toggleModal: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  submitBlocked: PropTypes.bool,
  /* If provided, this content gets added on the left hand side of
  the footer (usually a checkbox like "Don't show me again") */
  checkboxOption: PropTypes.element
};
