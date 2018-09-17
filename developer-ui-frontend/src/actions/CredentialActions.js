/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import {
  CREATING_CREDENTIAL,
  NEW_CREDENTIAL,
  CREATING_CREDENTIAL_FAILED,
  CREATING_SECRET,
  NEW_SECRET,
  CREATING_SECRET_FAILED,
  INIT_EMPTY_CREDENTIAL,
  DELETING_SECRET,
  SECRET_DELETED,
  DELETING_SECRET_FAILED,
  DELETING_CREDENTIAL,
  CREDENTIAL_DELETED,
  DELETING_CREDENTIAL_FAILED,
  UPDATING_CRED_INFO,
  UPDATED_CRED_INFO,
  UPDATING_CRED_INFO_FAILED
} from "./actionTypes";
import {
  selectCredentialById,
  selectSecretById,
  selectCredentialApiFormat,
  selectCredentialIdsByDeviceId
} from "reducers/selectors";
import { RESTSERVER_URL } from "_APP_CONSTANTS";
import { mapCredentialParams, mapSecretParams } from "utils";
import axios from "axios";
import _ from "lodash";

export function creatingSecret(authId, secret) {
  return {
    type: CREATING_SECRET,
    authId,
    secret
  };
}

export function newSecretCreated(authId, secret) {
  return {
    type: NEW_SECRET,
    authId,
    secret
  };
}

export function creatingSecretFailed(authId, secret) {
  return {
    type: CREATING_SECRET_FAILED,
    authId,
    secret
  };
}

export function createNewSecret(deviceId, authId, secretType, secretId, data) {
  return (dispatch, getState) => {
    // 1. Create a new Secret Object as it's stored in the Redux Store
    const newSecret = mapSecretParams(secretId, authId, secretType, data);
    // 2. Flatten the normalized form and add the secret to the secrets array of the credential
    const modifiedCredential = selectCredentialById(getState(), authId).toJS();
    modifiedCredential.secrets = modifiedCredential.secrets.map(id =>
      selectSecretById(getState(), id)
        .delete("secretId")
        .toJS()
    );
    modifiedCredential.secrets.push(_.omit(newSecret, "secretId"));
    // 3. Add the required fields to match the API schema
    const requestBody = { ...modifiedCredential, "device-id": deviceId };
    // 4. Start the regular XHR handling with the updated credential as PUT request
    const tenant = getState().getIn(["settings", "tenant"]);
    dispatch(creatingSecret(authId, newSecret));
    return axios
      .put(`${RESTSERVER_URL}/credentials/${tenant}`, requestBody)
      .then(() => dispatch(newSecretCreated(authId, newSecret)))
      .catch(err => {
        dispatch(creatingSecretFailed(authId, newSecret));
        console.error(err);
      });
  };
}

export function updatingCredentialInfo(authId, enabled, data) {
  return {
    type: UPDATING_CRED_INFO,
    authId,
    enabled,
    data
  };
}

export function updatedCredentialInfo(authId, enabled, data) {
  return {
    type: UPDATED_CRED_INFO,
    authId,
    enabled,
    data
  };
}

export function updatingCredentialInfoFailed(authId, enabled, data) {
  return {
    type: UPDATING_CRED_INFO_FAILED,
    authId,
    enabled,
    data
  };
}

export function updateCredentialInfo(data) {
  return (dispatch, getState) => {
    // Destructure the received data and extract the optional fields from the required fields
    const {
      "device-id": deviceId,
      type,
      "auth-id": authId,
      enabled,
      secrets,
      ...optional
    } = data;
    // Flatten the normalized form and delete the current credential info
    const modifiedCredential = selectCredentialById(getState(), authId).toJS();
    modifiedCredential.secrets = modifiedCredential.secrets.map(id =>
      selectSecretById(getState(), id)
        .delete("secretId")
        .toJS()
    );
    delete modifiedCredential.credentialInfo;
    // edit the mutable credential Informations (enabled and the optional data)
    if (enabled !== undefined) modifiedCredential.enabled = enabled;
    // Add the required fields to match the API schema
    const requestBody = {
      "device-id": deviceId,
      ...modifiedCredential,
      ...optional
    };
    // Start the regular XHR handling with the updated credential as PUT request
    const tenant = getState().getIn(["settings", "tenant"]);
    dispatch(updatingCredentialInfo(authId, enabled, optional));
    return axios
      .put(`${RESTSERVER_URL}/credentials/${tenant}`, requestBody)
      .then(() => dispatch(updatedCredentialInfo(authId, enabled, optional)))
      .catch(err => {
        dispatch(updatingCredentialInfoFailed(authId, enabled, optional));
        console.error(err);
      });
  };
}

export function newCredentialCreated(authId, deviceId, newCredential) {
  return {
    type: NEW_CREDENTIAL,
    authId,
    deviceId,
    newCredential
  };
}

// An empty credential is not yet created and needs a secret before it's sent to the backend
export function initializeEmptyCredential(authId, credType, deviceId, data) {
  const newCredential = mapCredentialParams(authId, credType, data);
  return {
    type: INIT_EMPTY_CREDENTIAL,
    authId,
    deviceId,
    newCredential
  };
}

export function creatingNewCredential(authId, deviceId, newCredential) {
  return {
    type: CREATING_CREDENTIAL,
    authId,
    deviceId,
    newCredential
  };
}

export function creatingNewCredentialFailed(authId, deviceId, newCredential) {
  return {
    type: CREATING_CREDENTIAL_FAILED,
    authId,
    deviceId,
    newCredential
  };
}

// This function creates a new Credential with a new Secret on the backend (The API does not distinguish between
// credentials and secrets)
// It could be called after an empty credential was initialized and a firstInitialization
// has been done (the first secret was added to the empty credential) or after a quickstart like
// from the action createStandardPasswordRegistration
// (in this case, the credential and the secret get created in one step)
// The secretId Argument is optional (if not defined it's generated by mapSecretParams)
// TODO: Refactoring - Too many parameters + make it possible to create new credentials with many secrets
export function createNewCredential(
  authId,
  credType,
  deviceId,
  data,
  secretId,
  secretType,
  secretData
) {
  return (dispatch, getState) => {
    const tenant = getState().getIn(["settings", "tenant"]);
    // 1. Create new Credential Object as it's stored in the Redux store
    const newCredential = mapCredentialParams(authId, credType, data);
    // 2. Create new secret for the new credential
    const newSecret = mapSecretParams(secretId, authId, secretType, secretData);
    // 3. Add the required fields to match the API schema
    const requestBody = Object.assign(
      {
        "device-id": deviceId
      },
      { ...newCredential, secrets: [_.omit(newSecret, "secretId")] }
    );
    // 4. Start the regular XHR handling with the new credential as POST request
    dispatch(creatingNewCredential(authId, deviceId, newCredential));
    return axios
      .post(`${RESTSERVER_URL}/credentials/${tenant}`, requestBody)
      .then(() => {
        dispatch(newCredentialCreated(authId, deviceId, newCredential));
        // This also adds the new secret
        dispatch(newSecretCreated(authId, newSecret));
      })
      .catch(err => {
        dispatch(creatingNewCredentialFailed(authId, deviceId, newCredential));
        console.error(err);
      });
  };
}

export function deletingSecret(deviceId, authId, secretId) {
  return {
    type: DELETING_SECRET,
    deviceId,
    authId,
    secretId
  };
}

export function secretDeleted(deviceId, authId, secretId) {
  return {
    type: SECRET_DELETED,
    deviceId,
    authId,
    secretId
  };
}

export function deletingSecretFailed(deviceId, authId, secretId) {
  return {
    type: DELETING_SECRET_FAILED,
    deviceId,
    authId,
    secretId
  };
}

export function deleteSecret(deviceId, authId, secretId) {
  return (dispatch, getState) => {
    const deletedSecret = selectSecretById(getState(), secretId).delete(
      "secretId"
    );
    const currentCredential = selectCredentialApiFormat(
      getState(),
      deviceId,
      authId
    );
    const modifiedCredential = currentCredential
      .update(
        "secrets",
        secrets => secrets.filter(secret => !secret.equals(deletedSecret)) // Uses efficient deep Object Comparison (Immutable.js Maps)
      )
      .toJS();
    const tenant = getState().getIn(["settings", "tenant"]);
    dispatch(deletingSecret(deviceId, authId, secretId));
    return axios
      .put(`${RESTSERVER_URL}/credentials/${tenant}`, modifiedCredential)
      .then(() => dispatch(secretDeleted(deviceId, authId, secretId)))
      .catch(err => {
        dispatch(deletingSecretFailed(deviceId, authId, secretId));
        console.error(err);
      });
  };
}

export function deletingCredential(deviceId, authId) {
  return {
    type: DELETING_CREDENTIAL,
    deviceId,
    authId
  };
}

export function credentialDeleted(deviceId, authId) {
  return {
    type: CREDENTIAL_DELETED,
    deviceId,
    authId
  };
}

export function deletingCredentialFailed(deviceId, authId) {
  return {
    type: DELETING_CREDENTIAL_FAILED,
    deviceId,
    authId
  };
}

export function deleteCredential(deviceId, authId) {
  return (dispatch, getState) => {
    const deletedCredentialType = selectCredentialById(getState(), authId).get(
      "type"
    );
    const isUninitializedCred = getState().getIn([
      "credentials",
      "byId",
      authId,
      "firstInitTime"
    ]);
    if (isUninitializedCred) {
      return dispatch(credentialDeleted(deviceId, authId));
    }
    const tenant = getState().getIn(["settings", "tenant"]);
    const reqUrl = `${RESTSERVER_URL}/credentials/${tenant}?device-id=${deviceId}&auth-id=${authId}&type=${deletedCredentialType}`;
    dispatch(deletingCredential(deviceId, authId));
    return axios
      .delete(reqUrl)
      .then(() => dispatch(credentialDeleted(deviceId, authId)))
      .catch(err => {
        dispatch(deletingCredentialFailed(deviceId, authId));
        console.error(err);
      });
  };
}

export function deleteAllCredentialsOfDevice(deviceId) {
  return (dispatch, getState) => {
    const credentials = selectCredentialIdsByDeviceId(getState(), deviceId);
    return Promise.all(
      credentials.map(id => dispatch(deleteCredential(deviceId, id)))
    );
  };
}
