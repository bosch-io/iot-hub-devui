/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { default as AddSecretModalInner } from "./AddSecretModal";
import PropTypes from "prop-types";
import { hashSecret } from "api/schemas";
import { reduxForm } from "redux-form/immutable";
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
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
    this.changeIsOpen = this.changeIsOpen.bind(this);
  }

  changeIsOpen(opened) {
    this.setState({ isOpen: opened });
  }

  submit(values) {
    const {
      authId,
      deviceId,
      firstInitialization,
      credentialType,
      secretType
    } = this.props;
    let secretData;

    if (values.get("key")) {
      secretData = {
        key: values.get("key")
      };
    }
    if (values.get("password")) {
      secretData = {
        password: values.get("password")
      };
    }
    if (secretType === "hashed-password") {
      if (values.get("hashAlgorithm")) {
        const hashAlgorithm = values.get("hashAlgorithm");
        if (hashAlgorithm) {
          secretData.hashMethod = hashAlgorithm;
        }
      }
    }
    // Optional ("advanced") Field values
    if (values.get("notBefore")) {
      secretData["not-before"] = values.get("notBefore").format();
    }
    if (values.get("notAfter")) {
      secretData["not-after"] = values.get("notAfter").format();
    }
    if (values.get("salt")) {
      secretData.salt = btoa(values.get("salt"));
    }
    if (secretType === "hashed-password") {
      secretData = hashSecret(secretData);
    }
    if (firstInitialization) {
      this.props.createNewCredential({
        "auth-id": authId,
        type: credentialType,
        "device-id": deviceId,
        secrets: [secretData]
      });
    } else {
      this.props.createNewSecret(deviceId, authId, secretData);
    }
    this.changeIsOpen(false);
  }

  render() {
    const {
      authId,
      handleSubmit,
      secretType,
      pristine,
      submitting,
      invalid,
      deviceId,
      match
    } = this.props;
    const { isOpen } = this.state;
    return isOpen ? (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <AddSecretModalInner
          isOpen={isOpen}
          authId={authId}
          changeIsOpen={this.changeIsOpen}
          handleSubmit={handleSubmit(this.submit.bind(this))}
          secretType={secretType}
          pristine={pristine}
          submitting={submitting}
          invalid={invalid}
        />
      </form>
    ) : (
      <Redirect
        to={`/registrations/${deviceId}/credentials/${
          match.params.selectedAuthId
        }`}
      />
    );
  }
}

let AddSecretModal = reduxForm({
  form: "newSecret",
  enableReinitialize: true,
  validate,
  warn
})(AddSecretModalWrapped);
const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: {
      hashAlgorithm: "sha-512"
    },
    secretType:
      selectCredentialById(state, ownProps.authId) &&
      selectCredentialById(state, ownProps.authId).get("type"),
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
AddSecretModal = withRouter(
  connect(
    mapStateToProps,
    {
      createNewSecret,
      createNewCredential
    }
  )(AddSecretModal)
);

AddSecretModalWrapped.propTypes = {
  authId: PropTypes.string,
  firstInitialization: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  createNewSecret: PropTypes.func.isRequired,
  createNewCredential: PropTypes.func.isRequired,
  secretType: PropTypes.string,
  credentialType: PropTypes.string,
  deviceId: PropTypes.string,
  match: PropTypes.object
};

export default AddSecretModal;
