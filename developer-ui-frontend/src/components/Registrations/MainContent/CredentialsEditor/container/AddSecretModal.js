/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import { reduxForm, Field, formValueSelector } from "redux-form/immutable";
import AddSecretLogo from "images/addPwSecretIcon.svg";
import { connect } from "react-redux";
import {
  createNewSecret,
  createNewCredential
} from "actions/CredentialActions";
import {
  ConfigurationModal,
  ConfigurationModalHeader,
  ConfigurationModalFooter,
  ConfigurationModalBody
} from "components/common/dialogModals";
import { TextField } from "components/common/textInputs";
import { selectCredentialById } from "reducers/selectors";
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

class AddSecretModalWrapped extends React.Component {
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

    const subjectTitle = "Add a Secret for ";
    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <ConfigurationModal modalShown={isOpen} changeIsOpen={changeIsOpen}>
          <ConfigurationModalHeader
            subject={subjectTitle}
            subTitle={authId}
            icon={<AddSecretLogo />}
          />
          <ConfigurationModalBody className="configuration-modal-content">
            <div className="dropdown-input">
              <label htmlFor="secretType">Type</label>
              <Field name="secretType" component="select">
                <option value="Hashed Password">Hashed Password</option>
                <option value="Certificate" disabled>
                  Certificate
                </option>
              </Field>
            </div>
            {selectedType === "Hashed Password" && (
              <div className="dropdown-input">
                <label htmlFor="hashAlgorithm">{"Hash Algorithm"}</label>
                <Field name="hashAlgorithm" component="select">
                  <option>SHA-512</option>
                  <option>SHA-256</option>
                  <option>SHA-1</option>
                </Field>
              </div>
            )}
            <TextField
              asField
              name="password"
              type="password"
              label="Password"
            />
          </ConfigurationModalBody>
          <ConfigurationModalFooter
            submitType="submit"
            toggleModal={() => changeIsOpen(!isOpen)}
            submitBlocked={invalid || pristine || submitting}
            confirm={handleSubmit(this.submit.bind(this))}
          />
        </ConfigurationModal>
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
