/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { toJS } from "components/helpers/to-js";
import {
  selectCredentialById,
  selectSecretsByCredentialId
} from "reducers/selectors";
import { changeEnabled } from "actions/CredentialActions";
// Child Components
import {
  ConfigurationModal,
  ConfigurationModalHeader,
  ConfigurationModalFooter,
  ConfigurationModalBody
} from "components/common/dialogModals";
import SecretsConfigurator from "./SecretsConfigurator/SecretsConfigurator";
import SwitchCheckbox from "components/common/SwitchCheckbox";
import SecretLogo from "images/pwCredentialIcon.svg";
import "styles/credentialModal.scss";

class EditCredentialModalWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
    this.changeIsOpen = this.changeIsOpen.bind(this);
    this.toggleEnabled = this.toggleEnabled.bind(this);
  }

  changeIsOpen(opened) {
    this.setState({ isOpen: opened });
  }

  toggleEnabled() {
    this.props.changeEnabled(
      this.props.deviceId,
      this.props.authId,
      !this.props.enabled
    );
  }

  render() {
    const { authId, deviceId, secretType, enabled } = this.props;
    const { isOpen } = this.state;
    return isOpen ? (
      <ConfigurationModal
        className="edit-credential-modal"
        modalShown={isOpen}
        toggleModal={this.changeIsOpen}
        changeIsOpen={this.changeIsOpen}>
        <ConfigurationModalHeader
          subject={"Edit Credential " + authId}
          icon={
            <SecretLogo
              className={`${enabled === true ? "" : "secrets-headerIcon"}`}
            />
          }>
          <div className="enabled-switch">
            <SwitchCheckbox
              checked={enabled}
              onCheckboxClick={this.toggleEnabled}
            />
          </div>
        </ConfigurationModalHeader>
        <ConfigurationModalBody className="edit-credential-modal-body">
          <div className="general-info">
            <div className="standard-field">
              <label className="credentialLabels">Auth-ID: </label>{" "}
              {" " + authId}
            </div>
            <div className="standard-field">
              <label className="credentialLabels">Device-ID: </label>{" "}
              {" " + deviceId}
            </div>
            <div className="standard-field">
              <label className="credentialLabels">Type: </label>{" "}
              {" " + secretType}
            </div>
          </div>
          <div className="secrets-config">
            <SecretsConfigurator
              deviceId={deviceId}
              authId={authId}
              secretType={secretType}
            />
          </div>
        </ConfigurationModalBody>
        <ConfigurationModalFooter
          submitType="none"
          toggleModal={this.changeIsOpen}
        />
      </ConfigurationModal>
    ) : (
      <Redirect to={`/registrations/${deviceId}/credentials/${authId}`} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    enabled: Boolean(
      selectCredentialById(state, ownProps.authId) &&
        selectCredentialById(state, ownProps.authId).get("enabled")
    ),
    secretType:
      selectCredentialById(state, ownProps.authId) &&
      selectCredentialById(state, ownProps.authId).get("type"),
    secrets:
      selectSecretsByCredentialId(state, ownProps.authId) &&
      selectSecretsByCredentialId(state, ownProps.authId)
  };
};

const EditCredentialModal = connect(
  mapStateToProps,
  { changeEnabled }
)(toJS(EditCredentialModalWrapped));

EditCredentialModalWrapped.propTypes = {
  authId: PropTypes.string,
  deviceId: PropTypes.string,
  secretType: PropTypes.string,
  enabled: PropTypes.bool,
  secrets: PropTypes.arrayOf(
    PropTypes.shape({
      secretId: PropTypes.string.isRequired,
      pwdHash: PropTypes.string,
      "not-before": PropTypes.string,
      "not-after": PropTypes.string,
      salt: PropTypes.string
    })
  ),
  changeIsOpen: PropTypes.func,
  changeEnabled: PropTypes.func.isRequired
};

export default EditCredentialModal;
