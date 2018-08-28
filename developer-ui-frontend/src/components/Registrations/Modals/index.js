/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { CREDENTIAL_TYPES } from "_APP_CONSTANTS";
import { Route } from "react-router-dom";
import queryString from "query-string";
// Child Components
import AddRegistrationModal from "./AddRegistrationModal";
import AddSecretModal from "./AddSecretModal";
import DeleteRegistrationModal from "./DeleteRegistrationModal";
import DeleteCredentialModal from "./DeleteCredentialModal";
import DeleteSecretModal from "./DeleteSecretModal";
/* eslint-disable react/no-multi-comp */
const Modals = ({ setMainPanel }) => (
  <Fragment>
    <Route
      path={`/registrations/:selectedDeviceId?/:registrationsSubMenu?/:authId?`}
      render={({ location }) => {
        const queryParams = queryString.parse(location.search);
        let renderedModal = null;
        if (queryParams.action) {
          switch (queryParams.action) {
            case "additionalRegs":
              renderedModal = (
                <AddRegistrationModal
                  type={CREDENTIAL_TYPES.PASSWORD}
                  initialValues={{
                    deviceId: queryParams.deviceId,
                    password: ""
                  }}
                  setMainPanel={setMainPanel}
                />
              );
              break;
            default:
              console.error("Unknown Query Parameter Value for action");
          }
        }
        return renderedModal;
      }}
    />
    <Route
      path={`/registrations/:selectedDeviceId/credentials/:selectedAuthId/additionalSecrets`}
      render={({ match }) => (
        <AddSecretModal
          authId={match.params.selectedAuthId}
          deviceId={match.params.selectedDeviceId}
        />
      )}
    />
    <Route
      path={`/registrations/:selectedDeviceId/credentials/:selectedAuthId/deleteSecrets`}
      render={({ match }) => (
        <DeleteSecretModal
          authId={match.params.selectedAuthId}
          deviceId={match.params.selectedDeviceId}
        />
      )}
    />
    <Route
      path={`/registrations/:selectedDeviceId/credentials/:selectedAuthId/deleteCredential`}
      render={({ match }) => (
        <DeleteCredentialModal
          authId={match.params.selectedAuthId}
          deviceId={match.params.selectedDeviceId}
        />
      )}
    />
    <Route
      path={`/registrations/:selectedDeviceId/:registrationsSubMenu?/:authId?`}
      render={({ location, match }) => {
        const queryParams = queryString.parse(location.search);
        let renderedModal = null;
        if (queryParams.action) {
          switch (queryParams.action) {
            case "deleteReg":
              renderedModal = (
                <DeleteRegistrationModal
                  deviceId={match.params.selectedDeviceId}
                />
              );
              break;
            default:
              console.error("Unknown Query Parameter Value for action");
          }
        }
        return renderedModal;
      }}
    />
  </Fragment>
);

Modals.propTypes = {
  setMainPanel: PropTypes.func.isRequired
};

export default Modals;
