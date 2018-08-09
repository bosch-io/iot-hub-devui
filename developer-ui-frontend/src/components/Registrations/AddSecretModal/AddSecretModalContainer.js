/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { default as AddSecretModalInner } from "./AddSecretModal";
import PropTypes from "prop-types";
import { reduxForm, formValueSelector } from "redux-form/immutable";
import {
  createNewSecret,
  createNewCredential
} from "actions/CredentialActions";
import { selectCredentialById } from "reducers/selectors";

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

class AddSecretModalWrapped extends Component {
  submit(values) {
    const {
      authId,
      deviceId,
      firstInitialization,
      credentialType
    } = this.props;
    const secretData = { password: values.get("password") };
    const hashAlgorithm = values.get("hashAlgorithm");
    if (hashAlgorithm) {
      secretData.hashMethod = hashAlgorithm;
    }
    if (firstInitialization) {
      this.props.createNewCredential(
        authId,
        credentialType,
        deviceId,
        null,
        null,
        values.get("secretType"),
        secretData
      );
    } else {
      this.props.createNewSecret(
        deviceId,
        authId,
        values.get("secretType"),
        null,
        secretData
      );
    }
    this.props.changeIsOpen(false);
  }

  render() {
    const {
      isOpen,
      authId,
      changeIsOpen,
      handleSubmit,
      selectedType,
      pristine,
      submitting,
      invalid
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <AddSecretModalInner
          isOpen={isOpen}
          authId={authId}
          changeIsOpen={changeIsOpen}
          handleSubmit={handleSubmit(this.submit.bind(this))}
          selectedType={selectedType}
          pristine={pristine}
          submitting={submitting}
          invalid={invalid}
        />
      </form>
    );
  }
}

let AddSecretModal = reduxForm({
  form: "newSecret",
  enableReinitialize: true,
  validate,
  warn
})(AddSecretModalWrapped);
const selector = formValueSelector("newSecret");
const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: { secretType: "Hashed Password", hashAlgorithm: "SHA-512" },
    selectedType: selector(state, "secretType"),
    firstInitialization:
      selectCredentialById(state, ownProps.authId) &&
      Boolean(
        selectCredentialById(state, ownProps.authId).get("firstInitTime")
      ),
    credentialType:
      selectCredentialById(state, ownProps.authId) &&
      selectCredentialById(state, ownProps.authId).get("type")
  };
};
AddSecretModal = connect(
  mapStateToProps,
  {
    createNewSecret,
    createNewCredential
  }
)(AddSecretModal);

AddSecretModalWrapped.propTypes = {
  authId: PropTypes.string,
  firstInitialization: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  changeIsOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  createNewSecret: PropTypes.func.isRequired,
  createNewCredential: PropTypes.func.isRequired,
  selectedType: PropTypes.string,
  credentialType: PropTypes.string,
  deviceId: PropTypes.string
};

export default AddSecretModal;
