/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Route, withRouter } from "react-router-dom";
// Child Components
import Accordion from "components/common/Accordion";
import AccordionTab from "./container/AccordionTab";
import AddCredentialTab from "./container/AddCredentialTab";
// Redux
import { connect } from "react-redux";
import {
  selectDenormalizedCredentials,
  selectUninitializedCredentials,
  selectIsFetchingByDeviceId
} from "reducers/selectors";
import { initializeEmptyCredential } from "actions/CredentialActions";
import { addCustomNotification } from "actions/globalActions";

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
    if (initialOpenedId) {
      props.history.push(
        `/registrations/${props.selectedDevice}/credentials/${initialOpenedId}`
      );
    }
    this.triggerErrorMessage = this.triggerErrorMessage.bind(this);
    this.toggleIsOpened = this.toggleIsOpened.bind(this);
    this.useParamIdAsOpened = this.useParamIdAsOpened.bind(this);
  }

  componentDidMount() {
    this.useParamIdAsOpened();
  }

  componentWillReceiveProps(nextProps) {
    // Use the credential specified in the authId URL Parameter if the credentials
    // got loaded for the first time
    if (
      this.props.match.params &&
      this.props.match.params.authId &&
      nextProps.match.params &&
      nextProps.match.params.authId &&
      nextProps.match.params.authId === this.props.match.params.authId &&
      nextProps.uninitializedCreds.size === 0 &&
      this.props.credentials.size === 0 &&
      nextProps.credentials.size > 0
    ) {
      this.useParamIdAsOpened();
    }
    // Open the first credential if:
    // - the selectedDevice has changed or
    // - the uninitialized credential got initialized
    else if (
      (this.props.selectedDevice !== nextProps.selectedDevice ||
        this.props.uninitializedCreds.size > 0 ||
        (this.props.credentials.size === 0 &&
          nextProps.credentials.size > 0)) &&
      nextProps.uninitializedCreds.size === 0
    ) {
      const firstCredential = nextProps.credentials.getIn([0, "auth-id"]);
      this.setState({
        idIsOpened: firstCredential
      });
      nextProps.history.push(
        `/registrations/${
          nextProps.selectedDevice
        }/credentials/${firstCredential}`
      );
    }
    // If there is a new uninitialized credential, open it
    else if (
      nextProps.uninitializedCreds.size > 0 &&
      nextProps.uninitializedCreds.size !== this.props.uninitializedCreds.size
    ) {
      // Open the last uninitialized credential
      const lastUninitCredential = nextProps.uninitializedCreds.getIn([
        -1,
        "auth-id"
      ]);
      this.setState({
        idIsOpened: lastUninitCredential
      });
      nextProps.history.push(
        `/registrations/${
          nextProps.selectedDevice
        }/credentials/${lastUninitCredential}`
      );
    }
  }
  useParamIdAsOpened() {
    const {
      match: { params }
    } = this.props;
    const authIdParam = params.authId;
    if (authIdParam) {
      this.setState({ idIsOpened: authIdParam });
    }
  }

  toggleIsOpened(authId) {
    const { selectedDevice, history } = this.props;
    if (this.state.idIsOpened === authId) {
      this.setState({ idIsOpened: null });
      history.push(`/registrations/${selectedDevice}/credentials`);
    } else {
      this.setState({
        idIsOpened: authId
      });
      history.push(`/registrations/${selectedDevice}/credentials/${authId}`);
    }
  }
  triggerErrorMessage(message) {
    this.props.addCustomNotification(message, "error");
  }

  render() {
    const { credentials, selectedDevice } = this.props;
    const { idIsOpened } = this.state;
    return (
      <Accordion>
        {credentials.map(credential => (
          <Route
            key={credential.get("auth-id")}
            path={`/registrations/${selectedDevice}/credentials/:authId?/:credentialSubMenu?`}
            render={({ match }) => (
              <AccordionTab
                credential={credential}
                selectedDevice={selectedDevice}
                idIsOpened={idIsOpened}
                toggleIsOpened={this.toggleIsOpened}
                disabled={
                  match.params.credentialSubMenu === "raw" &&
                  credential.get("auth-id") !== idIsOpened
                }
              />
            )}
          />
        ))}
        <AddCredentialTab
          selectedDevice={selectedDevice}
          initializeEmptyCredential={this.props.initializeEmptyCredential}
        />
      </Accordion>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  credentials: ownProps.selectedDevice
    ? selectDenormalizedCredentials(state, ownProps.selectedDevice)
    : null,
  uninitializedCreds: selectUninitializedCredentials(state)
});

const CredentialsInfoContent = withRouter(
  connect(
    mapStateToProps,
    {
      initializeEmptyCredential,
      addCustomNotification
    }
  )(CredentialsInfoContentWrapped)
);

CredentialsInfoContentWrapped.propTypes = {
  credentials: ImmutablePropTypes.list,
  uninitializedCreds: ImmutablePropTypes.list,
  initializeEmptyCredential: PropTypes.func.isRequired,
  addCustomNotification: PropTypes.func.isRequired,
  selectedDevice: PropTypes.string,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
export default CredentialsInfoContent;
