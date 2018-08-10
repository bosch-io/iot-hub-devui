/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { connect } from "react-redux";
import {
  selectAllCredentialsApiFormat,
  selectUninitializedCredentials
} from "reducers/selectors";
import { initializeEmptyCredential } from "actions/CredentialActions";
import { addCustomNotification } from "actions/globalActions";
import CredentialEditor from "./container/CredentialEditor";
import AddCredentialTab from "./container/AddCredentialTab";

class CredentialsInfoContentWrapped extends Component {
  constructor(props) {
    super(props);
    let initialOpenedId = null;
    if (props.uninitializedCreds.size > 0) {
      initialOpenedId = props.uninitializedCreds.getIn([-1, "auth-id"]);
    } else if (props.credentials.size > 0) {
      initialOpenedId = props.credentials.getIn([0, "auth-id"]);
    }
    this.state = {
      idIsOpened: initialOpenedId
    };
    this.triggerErrorMessage = this.triggerErrorMessage.bind(this);
    this.toggleIsOpened = this.toggleIsOpened.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Open the first credential if:
    // - the selectedDevice has changed or
    // - the uninitialized credential got initialized or
    // - credentials got loaded the first time
    if (
      (this.props.selectedDevice !== nextProps.selectedDevice ||
        this.props.uninitializedCreds.size > 0 ||
        (this.props.credentials.size === 0 &&
          nextProps.credentials.size > 0)) &&
      nextProps.uninitializedCreds.size === 0
    ) {
      this.setState({
        idIsOpened: nextProps.credentials.getIn([0, "auth-id"])
      });
    }
    // If there is a new uninitialized credential, open it
    else if (
      nextProps.uninitializedCreds.size > 0 &&
      nextProps.uninitializedCreds.size !== this.props.uninitializedCreds.size
    ) {
      // Open the last uninitialized credential
      this.setState({
        idIsOpened: nextProps.uninitializedCreds.getIn([-1, "auth-id"])
      });
    }
  }

  toggleIsOpened(authId) {
    if (this.state.idIsOpened === authId) {
      this.setState({ idIsOpened: null });
    } else {
      this.setState({
        idIsOpened: authId
      });
    }
  }
  triggerErrorMessage(message) {
    this.props.addCustomNotification(message, "error");
  }

  render() {
    const { credentials, selectedDevice } = this.props;
    const { idIsOpened } = this.state;
    return (
      <div id="credential-accordion">
        <span>
          {credentials.map((credential, index) => {
            const currentAuthId = credential.get("auth-id");
            return (
              <CredentialEditor
                credential={credential}
                key={currentAuthId}
                isOpened={credential.get("auth-id") === idIsOpened}
                triggerErrorMessage={this.triggerErrorMessage}
                selectedDevice={selectedDevice}
                toggleIsOpened={this.toggleIsOpened}
              />
            );
          })}
          <AddCredentialTab
            initializeEmptyCredential={this.props.initializeEmptyCredential}
            selectedDevice={selectedDevice}
            focusTab={this.focusTab}
          />
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  credentials: ownProps.selectedDevice
    ? selectAllCredentialsApiFormat(state, ownProps.selectedDevice)
    : null,
  uninitializedCreds: selectUninitializedCredentials(state)
});

const CredentialsInfoContent = connect(
  mapStateToProps,
  {
    initializeEmptyCredential,
    addCustomNotification
  }
)(CredentialsInfoContentWrapped);

CredentialsInfoContentWrapped.propTypes = {
  credentials: ImmutablePropTypes.list,
  uninitializedCreds: ImmutablePropTypes.list,
  initializeEmptyCredential: PropTypes.func.isRequired,
  addCustomNotification: PropTypes.func.isRequired,
  selectedDevice: PropTypes.string
};
export default CredentialsInfoContent;
