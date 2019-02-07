/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { AccordionFixedFooter } from "components/common/Accordion";
import { TextField } from "components/common/textInputs";
import { autogenerateAuthId } from "utils";
import Dropdown from "components/common/Dropdown";
// Redux
import { reduxForm, change } from "redux-form/immutable";
import { connect } from "react-redux";
import { reset } from "redux-form/immutable";
// SVG Imports
import AddIcon from "images/addPwCredentialIcon.svg";
import SaveIcon from "images/saveIcon.svg";
import ArrowIcon from "images/arrow-right.svg"; // rotated 180deg = Arrow left

const validate = values => {
  const errors = {};
  if (!values.get("authId")) {
    errors.credentialType = "Required";
  }
  if (!values.get("credentialType")) {
    errors.credentialType = "Required";
  }
  return errors;
};

class AddCredentialTabWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inAddingMode: false
    };
    this.submit = this.submit.bind(this);
    this.autogenAuthId = this.autogenAuthId.bind(this);
    this.expandForm = this.expandForm.bind(this);
  }

  expandForm() {
    this.setState({ inAddingMode: true });
    // Wait until the expand animation has finished, then focus
    setTimeout(() => this.textInputRef.focus(), 300);
  }

  submit(values) {
    const { initializeEmptyCredential, selectedDevice } = this.props;
    const newAuthId = values.get("authId");
    const type = values.get("credentialType");
    this.setState({ inAddingMode: false });
    this.props.resetSelectedValues();
    return initializeEmptyCredential({
      "auth-id": newAuthId,
      type: type,
      "device-id": selectedDevice,
      secrets: []
    });
  }

  autogenAuthId() {
    const { selectedDevice, modCurrentAuthId } = this.props;
    const newAuthId = autogenerateAuthId(selectedDevice);
    modCurrentAuthId(newAuthId);
  }

  render() {
    const { inAddingMode } = this.state;
    const { pristine, invalid, handleSubmit, submitting } = this.props; // eslint-disable-line
    return (
      <div>
        <AccordionFixedFooter
          className={`accordion-tab-header add-tab ${
            inAddingMode ? "adding-mode" : ""
          }`}
        >
          <form
            name="addCredentials"
            onSubmit={handleSubmit(this.submit)}
            style={{ width: "100%" }}
            onClick={!inAddingMode ? this.expandForm : null}
          >
            <span
              id="add-form-content"
              style={
                inAddingMode
                  ? { width: "auto", transform: "scaleX(1)", opacity: 1 }
                  : { width: 0, transform: "scaleX(0)", opacity: 0 }
              }
            >
              <ArrowIcon
                className="credential-icon close-arrow-btn"
                style={{ transform: "rotate(180deg)" }}
                onClick={() => this.setState({ inAddingMode: false })}
              />
              <div id="authId-searchbar">
                <TextField
                  asField
                  type="text"
                  name="authId"
                  placeholder="Enter an auth-Id..."
                  inputRef={ref => {
                    this.textInputRef = ref;
                  }}
                />
              </div>
              <a onClick={this.autogenAuthId}>Generate that for me</a>
            </span>
            <Dropdown
              asField
              header="Choose a credential type"
              style={{
                display: inAddingMode ? "unset" : "none"
              }}
              name="credentialType"
              items={[
                { value: "psk", id: 1 },
                { value: "hashed-password", id: 2 }
              ]}
              onChange={this.onTypeSelectionClick}
            />
            <button
              className={
                inAddingMode
                  ? "credential-icon add-icon adding-mode"
                  : "credential-icon add-icon"
              }
              ref={addBtn => {
                this.addBtn = addBtn;
              }}
              type="submit"
              disabled={inAddingMode && (invalid || pristine || submitting)}
            >
              {inAddingMode ? <SaveIcon /> : <AddIcon />}
            </button>
          </form>
        </AccordionFixedFooter>
      </div>
    );
  }
}

let AddCredentialTabContainer = reduxForm({
  form: "addCredentials",
  validate
})(AddCredentialTabWrapped);

AddCredentialTabContainer = withRouter(
  connect(
    null,
    dispatch => ({
      resetSelectedValues: () => dispatch(reset("addCredentials")),
      modCurrentAuthId: value =>
        dispatch(change("addCredentials", "authId", value))
    })
  )(AddCredentialTabContainer)
);

AddCredentialTabWrapped.propTypes = {
  initializeEmptyCredential: PropTypes.func.isRequired,
  selectedDevice: PropTypes.string,
  modCurrentAuthId: PropTypes.func.isRequired,
  resetSelectedValues: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

const AddCredentialTab = AddCredentialTabContainer;
export default AddCredentialTab;
