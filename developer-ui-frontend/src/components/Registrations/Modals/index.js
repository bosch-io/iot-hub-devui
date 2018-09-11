/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { CREDENTIAL_TYPES } from "_APP_CONSTANTS";
import { Route } from "react-router-dom";
// Child Components
import AddRegistrationModal from "./AddRegistrationModal";
import AddSecretModal from "./AddSecretModal";
import DeleteRegistrationModal from "./DeleteRegistrationModal";
import DeleteCredentialModal from "./DeleteCredentialModal";
import DeleteSecretModal from "./DeleteSecretModal";
import AddGatewayModal from "./AddGatewayModal";

const Modals = ({ setMainPanel }) => (
  <Fragment>
    <Route
      path={`/registrations/:selectedDeviceId/additionalRegs/:deviceId?`}
      render={({ match }) => (
        <AddRegistrationModal
          type={CREDENTIAL_TYPES.PASSWORD}
          initialValues={{
            deviceId: match.params.deviceId,
            password: ""
          }}
          setMainPanel={setMainPanel}
        />
      )}
    />
    <Route
      path={`/registrations/:selectedDeviceId/addGateway`}
      render={({ match }) => (
        <AddGatewayModal deviceId={match.params.selectedDeviceId} />
      )}
    />
    <Route
      path={`/registrations/:selectedDeviceId/:selectedAuthId/additionalSecrets`}
      render={({ match }) => (
        <AddSecretModal
          authId={match.params.selectedAuthId}
          deviceId={match.params.selectedDeviceId}
        />
      )}
    />
    <Route
      path={`/registrations/:selectedDeviceId/:selectedAuthId/deleteSecrets`}
      render={({ match }) => (
        <DeleteSecretModal
          authId={match.params.selectedAuthId}
          deviceId={match.params.selectedDeviceId}
        />
      )}
    />
    <Route
      path={`/registrations/:selectedDeviceId/:selectedAuthId/deleteCredential`}
      render={({ match }) => (
        <DeleteCredentialModal
          authId={match.params.selectedAuthId}
          deviceId={match.params.selectedDeviceId}
        />
      )}
    />
    <Route
      path={`/registrations/:selectedDeviceId/deleteRegistration`}
      render={({ match }) => (
        <DeleteRegistrationModal deviceId={match.params.selectedDeviceId} />
      )}
    />
  </Fragment>
);

Modals.propTypes = {
  setMainPanel: PropTypes.func.isRequired
};

export default Modals;
