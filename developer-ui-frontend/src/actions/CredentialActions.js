/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import * as actionTypes from "./actionTypes";
import {
  selectCredentialById,
  selectSecretById,
  selectDenormalizedCredential,
  selectCredentialIdsByDeviceId,
  selectSecretsByCredentialId
} from "reducers/selectors";
import { fetchCredentialsByDeviceId } from "actions/DataFetchActions";
import { RESTSERVER_URL } from "_APP_CONSTANTS";
import { Credential, Secret } from "api/schemas";
import axios from "axios";
import { normalize } from "normalizr";

export function creatingSecret(authId, secret) {
  return {
    type: actionTypes.CREATING_SECRET,
    authId,
    secret
  };
}

export function newSecretCreated(authId, secret) {
  return {
    type: actionTypes.NEW_SECRET,
    authId,
    secret
  };
}

export function creatingSecretFailed(authId, secret) {
  return {
    type: actionTypes.CREATING_SECRET_FAILED,
    authId,
    secret
  };
}

export function notAllowedCreatingSecret(authId, secret) {
  return {
    type: actionTypes.NOT_ALLOWED_CREATING_SECRET,
    authId,
    secret
  };
}

export function createNewSecret(deviceId, authId, secret) {
  return (dispatch, getState) => {
    const denormalizedSecret = Object.assign({}, secret);
    const numberOfSecrets = selectSecretsByCredentialId(getState(), deviceId)
      .size;
    // 1. Create a new Secret Object as it's stored in the Redux Store
    const newSecret = Object.values(
      normalize(
        { "auth-id": authId, secret: denormalizedSecret },
        { secret: Secret }
      ).entities.secrets
    )[0];
    // 2. Flatten the normalized form and add the secret to the secrets array of the credential
    const modifiedCredential = selectDenormalizedCredential(
      getState(),
      deviceId,
      authId
    ).toJS();
    modifiedCredential.secrets.push(denormalizedSecret); // Use the denormalized secret (Without the secretId)
    // 3. Add the required fields to match the API schema
    const requestBody = { ...modifiedCredential, "device-id": deviceId };
    // 4. Start the regular XHR handling with the updated credential as PUT request
    const tenant = getState().getIn(["settings", "tenant"]);
    if (numberOfSecrets > 9) {
      dispatch(notAllowedCreatingSecret(authId, newSecret));
    } else {
      dispatch(creatingSecret(authId, newSecret));
      return axios
        .put(`${RESTSERVER_URL}/credentials/${tenant}`, requestBody)
        .then(() => dispatch(newSecretCreated(authId, newSecret)))
        .catch(err => {
          dispatch(creatingSecretFailed(authId, newSecret));
          console.error(err);
        });
    }
    return 1;
  };
}

export function changedEnabled(authId, enabled) {
  return {
    type: actionTypes.ENABLED_CRED_CHANGED,
    authId,
    enabled
  };
}

export function changingEnabled(authId, enabled) {
  return {
    type: actionTypes.UPDATED_CRED_INFO,
    authId,
    enabled
  };
}

export function changingEnabledFailed(authId, enabled) {
  return {
    type: actionTypes.UPDATING_CRED_INFO_FAILED,
    authId,
    enabled
  };
}

export function changeEnabled(deviceId, authId, enabled) {
  return (dispatch, getState) => {
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
      ...modifiedCredential
    };
    // Start the regular XHR handling with the updated credential as PUT request
    const tenant = getState().getIn(["settings", "tenant"]);
    const info = selectDenormalizedCredential(getState(), deviceId, authId)
      .set("enabled", enabled)
      .toJS();
    return axios
      .put(`${RESTSERVER_URL}/credentials/${tenant}`, requestBody)
      .then(() => dispatch(fetchCredentialsByDeviceId(deviceId)))
      .catch(err => {
        dispatch(changingEnabledFailed(authId, info));
        console.error(err);
      });
  };
}

export function newCredentialCreated(authId, deviceId, credential, secrets) {
  return {
    type: actionTypes.NEW_CREDENTIAL,
    authId,
    deviceId,
    credential,
    secrets
  };
}

// An empty credential is not yet created and needs a secret before it's sent to the backend
export function initializeEmptyCredential(credential) {
  const newAuthId = credential["auth-id"];
  return {
    type: actionTypes.INIT_EMPTY_CREDENTIAL,
    credential: normalize(credential, Credential).entities.credentials[
      newAuthId
    ],
    deviceId: credential["device-id"]
  };
}

export function creatingNewCredential(authId, deviceId, credential, secrets) {
  return {
    type: actionTypes.CREATING_CREDENTIAL,
    authId,
    deviceId,
    credential,
    secrets
  };
}

export function creatingNewCredentialFailed(
  authId,
  deviceId,
  credential,
  secrets
) {
  return {
    type: actionTypes.CREATING_CREDENTIAL_FAILED,
    authId,
    deviceId,
    credential,
    secrets
  };
}

// This function creates a new Credential with a new Secret in the IoT Hub Device Registry
// It could be called after an empty credential was initialized and a firstInitialization
// has been done (the first secret was added to the empty credential) or after a quickstart like
// from the action createStandardPasswordRegistration
// (in this case, the credential and the secret get created in one step)
export function createNewCredential(credential) {
  const denormalizedCredential = { ...credential };
  const { "auth-id": authId, "device-id": deviceId } = credential;
  return (dispatch, getState) => {
    const tenant = getState().getIn(["settings", "tenant"]);
    // Normalize the credential with Credential and Secret to store in the Redux store
    const normalized = normalize(credential, Credential);
    const newCredential = normalized.entities.credentials[authId];
    const newSecrets = normalized.entities.secrets;
    dispatch(
      creatingNewCredential(authId, deviceId, newCredential, newSecrets)
    );
    return axios
      .post(`${RESTSERVER_URL}/credentials/${tenant}`, denormalizedCredential)
      .then(() => {
        dispatch(
          newCredentialCreated(authId, deviceId, newCredential, newSecrets)
        );
      })
      .catch(err => {
        dispatch(
          creatingNewCredentialFailed(
            authId,
            deviceId,
            newCredential,
            newSecrets
          )
        );
        console.error(err);
      });
  };
}

export function deletingSecret(deviceId, authId, secretId) {
  return {
    type: actionTypes.DELETING_SECRET,
    deviceId,
    authId,
    secretId
  };
}

export function secretDeleted(deviceId, authId, secretId) {
  return {
    type: actionTypes.SECRET_DELETED,
    deviceId,
    authId,
    secretId
  };
}

export function deletingSecretFailed(deviceId, authId, secretId) {
  return {
    type: actionTypes.DELETING_SECRET_FAILED,
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
    const currentCredential = selectDenormalizedCredential(
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
    type: actionTypes.DELETING_CREDENTIAL,
    deviceId,
    authId
  };
}

export function credentialDeleted(deviceId, authId) {
  return {
    type: actionTypes.CREDENTIAL_DELETED,
    deviceId,
    authId
  };
}

export function deletingCredentialFailed(deviceId, authId) {
  return {
    type: actionTypes.DELETING_CREDENTIAL_FAILED,
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
    console.log("credentials", credentials);
    return Promise.all(
      credentials.map(id => dispatch(deleteCredential(deviceId, id)))
    );
  };
}

export function updatingCredentialSecrets(authId, info) {
  return {
    type: actionTypes.UPDATING_CRED_SECRETS,
    authId,
    info
  };
}

export function updatedCredentialSecrets(authId, newSecrets) {
  return {
    type: actionTypes.UPDATED_CRED_SECRETS,
    authId,
    newSecrets
  };
}

export function updatingCredentialSecretsFailed(authId, info) {
  return {
    type: actionTypes.UPDATING_CRED_SECRETS_FAILED,
    authId,
    info
  };
}

export function changingSecretsInfo(authId, info) {
  return {
    type: actionTypes.CHANGING_CRED_SECRETS,
    authId,
    info
  };
}

export function updatingCredentialInfoFailed(authId, enabled, data) {
  return {
    type: actionTypes.UPDATING_CRED_INFO_FAILED,
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
    if (secrets !== undefined) modifiedCredential.secrets = secrets;
    if (optional !== undefined) modifiedCredential.optional = secrets;
    // Add the required fields to match the API schema
    const requestBody = {
      "device-id": deviceId,
      ...modifiedCredential,
      ...optional
    };
    // Start the regular XHR handling with the updated credential as PUT request
    const tenant = getState().getIn(["settings", "tenant"]);
    dispatch(changingSecretsInfo(authId, enabled, optional));
    return axios
      .put(`${RESTSERVER_URL}/credentials/${tenant}`, requestBody)
      .then(() => dispatch(updatedCredentialSecrets(authId, enabled, optional)))
      .then(() => dispatch(fetchCredentialsByDeviceId(deviceId)))
      .catch(err => {
        dispatch(updatingCredentialInfoFailed(authId, enabled, optional));
        console.error(err);
      });
  };
}

export function updateCredentialInfoSecrets(deviceId, authId, info) {
  return (dispatch, getState) => {
    const tenant = getState().getIn(["settings", "tenant"]);
    dispatch(updatingCredentialSecrets(authId, info));
    return axios
      .put(`${RESTSERVER_URL}/credentials/${tenant}`, info)
      .then(() => {
        dispatch(updatedCredentialSecrets(authId, info.secrets));
        dispatch(fetchCredentialsByDeviceId(deviceId));
      })
      .catch(err => {
        dispatch(updatingCredentialSecretsFailed(authId, info));
        console.error(err);
      });
  };
}

export function changeSecretsInfo(deviceId, authId, newSecrets) {
  return (dispatch, getState) => {
    dispatch(changingSecretsInfo(authId, newSecrets));
    const info = selectDenormalizedCredential(getState(), deviceId, authId)
      .set("secrets", newSecrets)
      .toJS();
    return dispatch(updateCredentialInfoSecrets(deviceId, authId, info));
  };
}
