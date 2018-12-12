/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm } from "redux-form/immutable";
import { withRouter } from "react-router-dom";
import { toJS } from "components/helpers/to-js";
import { hashSecret } from "api/schemas";
import { createNewSecret } from "actions/CredentialActions";
// Child Components
import AddSecretAdvancedSection from "./AddSecretAdvancedSection";
import { TextField } from "components/common/textInputs";
import { FlatButton } from "components/common/buttons";
import Dropdown from "components/common/Dropdown";
import AddPwSecretIcon from "images/addPwSecretIcon.svg";
import CancelIcon from "images/cancelIcon.svg";
import "styles/credentialModal.scss";

class AddSecretViewWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    const secretData = {
      password: values.get("password")
    };
    if (values.get("notBefore")) {
      secretData["not-before"] = values.get("notBefore").format();
    }
    if (values.get("notAfter")) {
      secretData["not-after"] = values.get("notAfter").format();
    }
    if (values.get("salt")) {
      secretData.salt = values.get("salt");
    }
    const hashAlgorithm = values.get("hashAlgorithm");
    if (hashAlgorithm) {
      secretData.hashMethod = hashAlgorithm;
    }
    this.props.createNewSecret(
      this.props.deviceId,
      this.props.authId,
      hashSecret(secretData)
    );
    this.props.toggleAddingMode();
  }

  render() {
    const { authId, toggleAddingMode, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit)} name="addNewSecret">
        <div className="secrets-config-inner">
          <div className="secret">
            <div className="secrets-nav-header">
              <span className="secrets-label">
                <AddPwSecretIcon className="add-pw-icon" />
                <label>
                  <b>Add a Secret for</b> {authId}
                </label>
              </span>
              <button className="cancel-button" onClick={toggleAddingMode}>
                +
              </button>
            </div>
            <div className="secrets-standard-fields">
              <div className="standard-field">
                <label htmlFor="hashAlgorithm">Hash Algorithm</label>
                <Dropdown
                  asField
                  name="hashAlgorithm"
                  className="field-dropdown"
                  items={[
                    { value: "sha-512", id: 1 },
                    { value: "sha-256", id: 2 }
                  ]}
                />
              </div>
              <div className="standard-field">
                <TextField
                  asField
                  name="password"
                  type="password"
                  label="Password"
                />
              </div>
            </div>
            <AddSecretAdvancedSection />
            <div className="fixed-footer">
              <FlatButton
                primary
                submitAnimation
                onClick={handleSubmit(this.submit)}
                type="submit"
              >
                Save
              </FlatButton>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

let AddSecretView = reduxForm({
  form: "addNewSecret",
  enableReinitialize: true
})(AddSecretViewWrapped);

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: {
      secretType: ownProps.secretType,
      hashAlgorithm: "sha-512"
    }
  };
};

AddSecretView = withRouter(
  connect(
    mapStateToProps,
    {
      createNewSecret
    }
  )(toJS(AddSecretView))
);

AddSecretViewWrapped.propTypes = {
  deviceId: PropTypes.string,
  authId: PropTypes.string,
  toggleAddingMode: PropTypes.func,
  secretType: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  createNewSecret: PropTypes.func.isRequired
};

export default AddSecretView;
