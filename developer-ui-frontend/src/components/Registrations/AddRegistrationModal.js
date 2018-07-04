/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/additionalRegistrationModal.scss";
import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form/immutable";
import SubmitCaret from "images/submitCaret.svg";
import AddDeviceLogo from "images/addPwDevice.svg";
import { connect } from "react-redux";
import { CREDENTIAL_TYPES } from "_APP_CONSTANTS";
import { createStandardPasswordRegistration } from "actions/RegistrationActions";
import TextInput from "components/common/TextInput";
import { autogenerateAuthId } from "utils";
// TODO: Enable Certificates Option
// No Props checking (Redux Form works!)
/* eslint-disable react/prop-types */

const validate = values => {
  const errors = {};
  if (!values.get("password")) {
    errors.password = "Required";
  }
  return errors;
};

const warn = values => {
  const warnings = {};
  if (values.get("password") && values.get("password").length < 8) {
    warnings.password =
      "Passwords shorter than 8 characters are not recommended";
  }
  return warnings;
};

class AddRegistrationModalWrapped extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.changeIsOpen = this.changeIsOpen.bind(this);
  }

  submit(values) {
    const newDeviceId = values.get("deviceId");
    const newAuthId = autogenerateAuthId(newDeviceId);
    const secretData = {
      password: values.get("password"),
      hashMethod: "SHA-512"
    }; // SHA-512 is hard coded (preset)
    this.props.createStandardPasswordRegistration(
      newDeviceId,
      newAuthId,
      secretData
    );
    this.changeIsOpen(false);
  }

  changeIsOpen(opened) {
    this.props.redirectToRegistrations();
    this.props.changeIsOpen(opened);
  }

  render() {
    const {
      isOpen,
      type,
      handleSubmit,
      pristine,
      submitting,
      invalid
    } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={() => this.changeIsOpen(false)}
        overlayClassName="confirmation-modal"
        className="confirmation-modal-inner shadow-z-2"
        contentLabel="Confirmation Modal"
        ariaHideApp={false}>
        <form onSubmit={handleSubmit(this.submit)} id="new-reg-modal">
          <div id="new-reg-header">
            <h2>
              <AddDeviceLogo id="add-device-logo" />
              {`New Device with ${
                type === CREDENTIAL_TYPES.PASSWORD
                  ? "Standard Password "
                  : "Certificate "
              } Credential`}
            </h2>
          </div>
          {/* TODO: Add Implementation for Certificate Based Auth HERE */}
          {type === CREDENTIAL_TYPES.PASSWORD ? (
            <div id="new-reg-content">
              <Field
                name="deviceId"
                component={TextInput}
                type="text"
                placeholder="Enter an id for your new Device ..."
                label="Device Id"
              />
              <Field
                name="password"
                component={TextInput}
                type="password"
                label="Password"
              />
            </div>
          ) : (
            <div id="new-reg-content">
              <p>Comming Soon</p>
            </div>
          )}
          <div className="confirmation-btns">
            <button
              type="button"
              onClick={() => this.changeIsOpen(false)}
              id="cancel-btn">
              Cancel
            </button>
            <button
              type="submit"
              id="submit-btn"
              disabled={invalid || pristine || submitting}>
              Submit <SubmitCaret />
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

let AddRegistrationModal = reduxForm({
  form: "newRegistration",
  validate,
  warn
})(AddRegistrationModalWrapped);
AddRegistrationModal = connect(
  null,
  {
    createStandardPasswordRegistration
  }
)(AddRegistrationModal);

AddRegistrationModalWrapped.propTypes = {
  type: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  changeIsOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  createStandardPasswordRegistration: PropTypes.func.isRequired,
  redirectToRegistrations: PropTypes.func.isRequired
};

export default AddRegistrationModal;
