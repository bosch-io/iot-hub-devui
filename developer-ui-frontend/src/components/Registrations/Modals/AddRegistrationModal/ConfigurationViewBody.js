/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { CREDENTIAL_TYPES } from "_APP_CONSTANTS";
import "styles/additionalRegistrationModal.scss";
// Components
import Spinner from "components/common/Spinner";
import ConfirmationView from "./ConfirmationView/ConfirmationView";
import { TextField } from "components/common/textInputs";
import { ConfigurationModalBody } from "components/common/dialogModals";

// No Props checking (Redux Form works!)
/* eslint-disable react/prop-types */
export default class ConfigurationViewBody extends Component {
  constructor(props) {
    super(props);
    this.textfieldRef;
  }
  componentDidMount() {
    if (this.textfieldRef) {
      this.textfieldRef.focus();
    }
  }

  render() {
    const {
      type,
      changeIsOpen,
      loading,
      inConfirmationMode,
      newDeviceId,
      newAuthId,
      newPw,
      tenant
    } = this.props;

    const ModalEntry = (
      <ConfigurationModalBody>
        {/* TODO: Add Implementation for Certificate Based Auth HERE */}
        {type === CREDENTIAL_TYPES.PASSWORD ? (
          <Fragment>
            <TextField
              asField
              name="deviceId"
              type="text"
              placeholder="Enter a unique name for your new Device ..."
              label="Device Id"
              inputRef={ref => {
                this.textfieldRef = ref;
              }}
            />
            <TextField
              asField
              name="password"
              type="password"
              label="Password"
            />
          </Fragment>
        ) : (
          <div id="new-reg-content">
            <p>Comming Soon</p>
          </div>
        )}
      </ConfigurationModalBody>
    );

    let renderedContent = null;
    if (loading) {
      renderedContent = (
        <div className="confirm-registration" id="new-reg-content">
          <Spinner type="bubbles" />
        </div>
      );
    } else if (inConfirmationMode) {
      renderedContent = (
        <ConfirmationView
          newDeviceId={newDeviceId}
          newAuthId={newAuthId}
          newPw={newPw}
          tenant={tenant}
          inConfirmationMode={inConfirmationMode}
          changeIsOpen={changeIsOpen}
        />
      );
    } else {
      renderedContent = ModalEntry;
    }

    return renderedContent;
  }
}

ConfigurationViewBody.propTypes = {
  type: PropTypes.string,
  changeIsOpen: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  inConfirmationMode: PropTypes.bool.isRequired,
  newDeviceId: PropTypes.string,
  newAuthId: PropTypes.string,
  newPw: PropTypes.string,
  tenant: PropTypes.string
};
