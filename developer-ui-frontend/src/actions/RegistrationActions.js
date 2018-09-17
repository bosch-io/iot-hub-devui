/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import {
  CREATING_REG,
  NEW_REG,
  CREATING_REG_FAILED,
  UPDATING_REG_INFO,
  UPDATED_REG_INFO,
  UPDATING_REG_INFO_FAILED,
  REG_DELETED,
  DELETING_REG,
  DELETING_REG_FAILED,
  CHANGING_ENABLED,
  ENABLED_CHANGED
} from "actions/actionTypes";
import { selectRegistrationInfo } from "reducers/selectors";
import { createNewCredential } from "./CredentialActions";
import { RESTSERVER_URL } from "_APP_CONSTANTS";
import axios from "axios";

export function createdNewRegistration(device, configuredSubscribed) {
  return {
    type: NEW_REG,
    deviceId: device.deviceId,
    device,
    configuredSubscribed
  };
}

export function creatingNewRegistration(deviceId) {
  return {
    type: CREATING_REG,
    deviceId
  };
}

export function creatingRegistrationFailed(deviceId) {
  return {
    type: CREATING_REG_FAILED,
    deviceId
  };
}

export function createNewRegistration(deviceId, configuredSubscribed) {
  const newReg = {
    deviceId,
    lastActive: null,
    currentlyActive: false,
    configuredSubscribed,
    isSubscribed: false,
    logs: [],
    credentials: [],
    registrationInfo: {
      enabled: true
    }
  };
  const requestBody = {
    "device-id": deviceId,
    enabled: true
  };
  return (dispatch, getState) => {
    const tenant = getState().getIn(["settings", "tenant"]);
    dispatch(creatingNewRegistration(deviceId));
    return axios
      .post(`${RESTSERVER_URL}/registration/${tenant}`, requestBody)
      .then(() =>
        dispatch(createdNewRegistration(newReg, configuredSubscribed))
      )
      .catch(err => {
        dispatch(creatingRegistrationFailed(deviceId));
        console.error(err);
      });
  };
}

export function deletingRegistration(deviceId) {
  return {
    type: DELETING_REG,
    deviceId
  };
}

export function deletedRegistration(deviceId) {
  return {
    type: REG_DELETED,
    deviceId
  };
}

export function deletingRegistrationFailed(deviceId) {
  return {
    type: DELETING_REG_FAILED,
    deviceId
  };
}

export function deleteRegistration(deviceId) {
  return (dispatch, getState) => {
    const tenant = getState().getIn(["settings", "tenant"]);
    dispatch(deletingRegistration(deviceId));
    return axios
      .delete(`${RESTSERVER_URL}/registration/${tenant}/${deviceId}`)
      .then(({ data }) => dispatch(deletedRegistration(deviceId)))
      .catch(err => {
        dispatch(deletingRegistrationFailed(deviceId));
        console.error(err);
      });
  };
}

export function updatingRegistrationInfo(deviceId, info) {
  return {
    type: UPDATING_REG_INFO,
    deviceId,
    info
  };
}

export function updatedRegistrationInfo(deviceId, info) {
  return {
    type: UPDATED_REG_INFO,
    deviceId,
    info
  };
}

export function updatingRegistrationInfoFailed(deviceId, info) {
  return {
    type: UPDATING_REG_INFO_FAILED,
    deviceId,
    info
  };
}

export function changedEnabled(deviceId) {
  return {
    type: ENABLED_CHANGED,
    deviceId
  };
}

export function changingEnabled(deviceId, enabled) {
  return {
    type: CHANGING_ENABLED,
    deviceId,
    enabled
  };
}

export function updateRegistrationInfo(deviceId, info, enableChange) {
  return (dispatch, getState) => {
    const tenant = getState().getIn(["settings", "tenant"]);
    dispatch(updatingRegistrationInfo(deviceId, info));
    return axios
      .put(`${RESTSERVER_URL}/registration/${tenant}/${deviceId}`, info)
      .then(({ data }) => {
        dispatch(updatedRegistrationInfo(deviceId, info));
        enableChange && dispatch(changedEnabled(deviceId));
      })
      .catch(err => {
        dispatch(updatingRegistrationInfoFailed(deviceId, info));
        console.error(err);
      });
  };
}
export function changeEnabled(deviceId, enabled) {
  return (dispatch, getState) => {
    dispatch(changingEnabled(deviceId, enabled));
    const info = selectRegistrationInfo(getState(), deviceId).set(
      "enabled",
      enabled
    );
    return dispatch(updateRegistrationInfo(deviceId, info, true));
  };
}

export function createStandardPasswordRegistration(
  deviceId,
  authId,
  secretData
) {
  return dispatch => {
    dispatch(createNewRegistration(deviceId, false)).then(() =>
      dispatch(
        createNewCredential(
          authId,
          "hashed-password",
          deviceId,
          null,
          null,
          "Hashed Password",
          secretData
        )
      )
    );
  };
}
