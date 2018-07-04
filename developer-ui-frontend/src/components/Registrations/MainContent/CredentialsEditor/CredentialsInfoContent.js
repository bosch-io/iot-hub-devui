/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { connect } from "react-redux";
import { selectAllCredentialsApiFormat } from "reducers/selectors";
import { initializeEmptyCredential } from "actions/CredentialActions";
import { addCustomNotification } from "actions/globalActions";
import CredentialEditor from "./container/CredentialEditor";
import AddCredentialTab from "./container/AddCredentialTab";
import AddSecretModal from "./container/AddSecretModal";

class CredentialsInfoContentWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addSecretModalIsOpen: false,
      addSecretModalAuthId: null // Auth id of the Credential to which the secret is added
    };
    this.triggerErrorMessage = this.triggerErrorMessage.bind(this);
    this.changeAddSecretModalIsOpen = this.changeAddSecretModalIsOpen.bind(
      this
    );
  }

  changeAddSecretModalIsOpen(isOpen, authId) {
    if (isOpen && authId) {
      this.setState({ addSecretModalAuthId: authId });
    }
    this.setState({ addSecretModalIsOpen: isOpen });
  }

  changeTabIsOpened(authId, isOpened) {
    const accordionTabsOpened = { ...this.state.accordionTabsOpened };
    accordionTabsOpened[authId] = isOpened;
    this.setState({ accordionTabsOpened });
  }

  triggerErrorMessage(message) {
    this.props.addCustomNotification(message, "error");
  }

  render() {
    const { credentials, selectedDevice } = this.props;
    const { addSecretModalIsOpen, addSecretModalAuthId } = this.state;
    return (
      <div id="credential-accordion">
        <span>
          {credentials.map((credential, index) => {
            const currentAuthId = credential.get("auth-id");
            return (
              <CredentialEditor
                credential={credential}
                key={currentAuthId}
                isFirst={index === 0}
                triggerErrorMessage={this.triggerErrorMessage}
                selectedDevice={selectedDevice}
                changeAddSecretModalIsOpen={this.changeAddSecretModalIsOpen}
              />
            );
          })}
          <AddCredentialTab
            initializeEmptyCredential={this.props.initializeEmptyCredential}
            selectedDevice={selectedDevice}
            focusTab={this.focusTab}
          />
          {addSecretModalIsOpen && (
            <AddSecretModal
              deviceId={selectedDevice}
              isOpen={addSecretModalIsOpen}
              authId={addSecretModalAuthId}
              changeIsOpen={this.changeAddSecretModalIsOpen}
              expandNewTab={this.expandNewTab}
            />
          )}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    credentials: ownProps.selectedDevice
      ? selectAllCredentialsApiFormat(state, ownProps.selectedDevice)
      : null
  };
};

const CredentialsInfoContent = connect(
  mapStateToProps,
  {
    initializeEmptyCredential,
    addCustomNotification
  }
)(CredentialsInfoContentWrapped);

CredentialsInfoContentWrapped.propTypes = {
  credentials: ImmutablePropTypes.list,
  initializeEmptyCredential: PropTypes.func.isRequired,
  addCustomNotification: PropTypes.func.isRequired,
  selectedDevice: PropTypes.string
};
export default CredentialsInfoContent;
