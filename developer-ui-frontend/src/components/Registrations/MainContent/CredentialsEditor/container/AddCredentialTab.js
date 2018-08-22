/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { AccordionFixedFooter } from "components/common/Accordion";
import { TextField } from "components/common/textInputs";
import { autogenerateAuthId } from "utils";
// Redux
import { reduxForm, change } from "redux-form/immutable";
import { connect } from "react-redux";
// SVG Imports
import AddIcon from "images/addPwCredentialIcon.svg";
import SaveIcon from "images/saveIcon.svg";
import ArrowIcon from "images/arrow-right.svg"; // rotated 180deg = Arrow left

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
    this.setState({ inAddingMode: false });
    return initializeEmptyCredential(
      newAuthId,
      "hashed-password",
      selectedDevice
    );
  }

  autogenAuthId() {
    const { selectedDevice, modCurrentAuthId } = this.props;
    const newAuthId = autogenerateAuthId(selectedDevice);
    modCurrentAuthId(newAuthId);
  }

  render() {
    const { inAddingMode } = this.state;
    const { pristine, handleSubmit, reset, submitting } = this.props; // eslint-disable-line

    return (
      <div>
        <AccordionFixedFooter
          className={`accordion-tab-header add-tab ${
            inAddingMode ? "adding-mode" : ""
          }`}>
          <form
            onSubmit={handleSubmit(this.submit)}
            style={{ width: "100%" }}
            onClick={!inAddingMode ? this.expandForm : null}>
            <span
              id="add-form-content"
              style={
                inAddingMode
                  ? { width: "auto", transform: "scaleX(1)", opacity: 1 }
                  : { width: 0, transform: "scaleX(0)", opacity: 0 }
              }>
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
            <button
              className={
                inAddingMode
                  ? "credential-icon add-icon adding-mode"
                  : "credential-icon add-icon"
              }
              type="submit"
              disabled={inAddingMode && (pristine || submitting)}>
              {inAddingMode ? <SaveIcon /> : <AddIcon />}
            </button>
          </form>
        </AccordionFixedFooter>
      </div>
    );
  }
}

let AddCredentialTabContainer = reduxForm({
  form: "addCredentials"
})(AddCredentialTabWrapped);

AddCredentialTabContainer = connect(
  null,
  dispatch => ({
    modCurrentAuthId: value =>
      dispatch(change("addCredentials", "authId", value))
  })
)(AddCredentialTabContainer);

const AddCredentialTab = AddCredentialTabContainer;

AddCredentialTabWrapped.propTypes = {
  initializeEmptyCredential: PropTypes.func.isRequired,
  selectedDevice: PropTypes.string,
  modCurrentAuthId: PropTypes.func.isRequired
};

export default AddCredentialTab;
