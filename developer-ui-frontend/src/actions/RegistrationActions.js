/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import * as actionTypes from "actions/actionTypes";
import { selectRegistrationInfo } from "reducers/selectors";
import { createNewCredential } from "./CredentialActions";
import { hashSecret } from "api/schemas";
import { RESTSERVER_URL } from "_APP_CONSTANTS";
import axios from "axios";

export function configuringNewGateway(deviceId, info) {
  return {
    type: actionTypes.CONFIGURING_GATEWAY,
    deviceId,
    info
  };
}

export function newGatewayConfigured(deviceId, info) {
  return {
    type: actionTypes.CONFIGURED_GATEWAY,
    deviceId,
    info
  };
}

export function configuringNewGatewayFailed(deviceId, info) {
  return {
    type: actionTypes.CONFIGURING_GATEWAY_FAILED,
    deviceId,
    info
  };
}

export function settingViaProperty(deviceId, gatewayId) {
  return {
    type: actionTypes.SETTING_VIA_PROPERTY,
    deviceId,
    gatewayId
  };
}

export function settedViaProperty(deviceId, gatewayId) {
  return {
    type: actionTypes.VIA_PROPERTY_SET,
    deviceId,
    gatewayId
  };
}

export function newGatewayConfiguration(deviceId, info, gatewayId) {
  return (dispatch, getState) => {
    const tenant = getState().getIn(["settings", "tenant"]);
    dispatch(configuringNewGateway(deviceId, info));
    return axios
      .put(`${RESTSERVER_URL}/registration/${tenant}/${deviceId}`, info)
      .then(() => {
        dispatch(newGatewayConfigured(deviceId, info));
        gatewayId && dispatch(settedViaProperty(deviceId, info.get("via")));
      })
      .catch(err => {
        dispatch(configuringNewGatewayFailed(deviceId, info));
        console.error(err);
      });
  };
}

export function setViaProperty(deviceId, gatewayId) {
  return (dispatch, getState) => {
    dispatch(settingViaProperty(deviceId, gatewayId));
    let info = null;
    if (gatewayId !== null) {
      info = selectRegistrationInfo(getState(), deviceId).set(
        "via",
        gatewayId.get("via")
      );
    } else {
      info = selectRegistrationInfo(getState(), deviceId).set("via", undefined);
    }
    return dispatch(newGatewayConfiguration(deviceId, info, gatewayId));
  };
}

export function createdNewRegistration(deviceId, configuredSubscribed) {
  return {
    type: actionTypes.NEW_REG,
    deviceId,
    configuredSubscribed
  };
}

export function creatingNewRegistration(deviceId) {
  return {
    type: actionTypes.CREATING_REG,
    deviceId
  };
}

export function creatingRegistrationFailed(deviceId) {
  return {
    type: actionTypes.CREATING_REG_FAILED,
    deviceId
  };
}

export function createNewRegistration(deviceId, configuredSubscribed) {
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
        dispatch(createdNewRegistration(deviceId, configuredSubscribed))
      )
      .catch(err => {
        dispatch(creatingRegistrationFailed(deviceId));
        console.error(err);
      });
  };
}

export function deletingRegistration(deviceId) {
  return {
    type: actionTypes.DELETING_REG,
    deviceId
  };
}

export function deletedRegistration(deviceId) {
  return {
    type: actionTypes.REG_DELETED,
    deviceId
  };
}

export function deletingRegistrationFailed(deviceId) {
  return {
    type: actionTypes.DELETING_REG_FAILED,
    deviceId
  };
}

export function deleteRegistration(deviceId) {
  console.trace();
  return (dispatch, getState) => {
    const tenant = getState().getIn(["settings", "tenant"]);
    dispatch(deletingRegistration(deviceId));
    return axios
      .delete(`${RESTSERVER_URL}/registration/${tenant}/${deviceId}`)
      .then(() => dispatch(deletedRegistration(deviceId)))
      .catch(err => {
        dispatch(deletingRegistrationFailed(deviceId));
        console.error(err);
      });
  };
}

export function updatingRegistrationInfo(deviceId, info) {
  return {
    type: actionTypes.UPDATING_REG_INFO,
    deviceId,
    info
  };
}

export function updatedRegistrationInfo(deviceId, info) {
  return {
    type: actionTypes.UPDATED_REG_INFO,
    deviceId,
    info
  };
}

export function updatingRegistrationInfoFailed(deviceId, info) {
  return {
    type: actionTypes.UPDATING_REG_INFO_FAILED,
    deviceId,
    info
  };
}

export function changedEnabled(deviceId) {
  return {
    type: actionTypes.ENABLED_CHANGED,
    deviceId
  };
}

export function changingEnabled(deviceId, enabled) {
  return {
    type: actionTypes.CHANGING_ENABLED,
    deviceId,
    enabled
  };
}

export function updateRegistrationInfo(deviceId, info, enableChange) {
  return (dispatch, getState) => {
    console.log(info);
    const tenant = getState().getIn(["settings", "tenant"]);
    dispatch(updatingRegistrationInfo(deviceId, info));
    return axios
      .put(`${RESTSERVER_URL}/registration/${tenant}/${deviceId}`, info)
      .then(() => {
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
        createNewCredential({
          "auth-id": authId,
          type: "hashed-password",
          "device-id": deviceId,
          secrets: [hashSecret(secretData)]
        })
      )
    );
  };
}
