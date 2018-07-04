/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import {
  FETCHING_TENANT,
  TENANT_FETCHED,
  FETCHING_TENANT_FAILED,
  FETCHING_REGISTRATIONS,
  REGISTRATIONS_FETCHED,
  FETCHING_REGISTRATIONS_FAILED,
  FETCHING_CREDENTIALS,
  CREDENTIALS_FETCHED,
  FETCHING_CREDENTIALS_FAILED
} from "actions/actionTypes";
import { RESTSERVER_URL } from "_APP_CONSTANTS";
import { arrayToObject } from "utils";
import axios from "axios";

export function tenantFetched(tenant) {
  return {
    type: TENANT_FETCHED,
    tenant
  };
}

export function fetchingTenant() {
  return { type: FETCHING_TENANT };
}

export function fetchingTenantFailed() {
  return { type: FETCHING_TENANT_FAILED };
}

export function fetchingRegistrations() {
  return { type: FETCHING_REGISTRATIONS };
}

export function fetchingRegistrationsFailed() {
  return {
    type: FETCHING_REGISTRATIONS_FAILED
  };
}

export function registrationsFetched(registrations) {
  const mappedFormatArray = registrations.devices.map(device => {
    const deviceCopy = Object.assign({}, device);
    delete deviceCopy["device-id"];
    deviceCopy.deviceId = device["device-id"];
    const { deviceId, ...other } = deviceCopy;
    return {
      deviceId,
      lastActive: null,
      currentlyActive: false,
      configuredSubscribed: false,
      isSubscribed: false,
      logs: [],
      credentials: [],
      registrationInfo: { ...other }
    };
  });
  const mappedFormat = arrayToObject(mappedFormatArray, "deviceId");
  return {
    type: REGISTRATIONS_FETCHED,
    registrations: mappedFormat
  };
}

export function fetchingCredentials(deviceId) {
  return {
    type: FETCHING_CREDENTIALS,
    deviceId
  };
}

export function credentialsFetched(data, deviceId, prevAuthIds) {
  return {
    type: CREDENTIALS_FETCHED,
    data,
    deviceId,
    prevAuthIds
  };
}

export function fetchingCredentialsFailed(deviceId) {
  return {
    type: FETCHING_CREDENTIALS_FAILED,
    deviceId
  };
}

export function fetchTenant() {
  return dispatch => {
    dispatch(fetchingTenant());
    return axios
      .get(RESTSERVER_URL + "/tenant")
      .then(({ data }) => dispatch(tenantFetched(data)))
      .catch(err => {
        dispatch(fetchingTenantFailed());
        console.error(err);
      });
  };
}

export function fetchAllRegistrations() {
  return (dispatch, getState) => {
    dispatch(fetchingRegistrations());
    const tenant = getState().getIn(["settings", "tenant"]);
    return axios
      .get(`${RESTSERVER_URL}/registration/${tenant}`)
      .then(({ data }) => dispatch(registrationsFetched(data)))
      .catch(err => {
        dispatch(fetchingRegistrationsFailed());
        console.error(err);
      });
  };
}

export function fetchInitialData() {
  return dispatch =>
    dispatch(fetchTenant()).then(() => dispatch(fetchAllRegistrations()));
}

export function fetchCredentialsByDeviceId(deviceId) {
  return (dispatch, getState) => {
    dispatch(fetchingCredentials(deviceId));
    const tenant = getState().getIn(["settings", "tenant"]);
    const prevAuthIds = getState().getIn([
      "devices",
      "byId",
      deviceId,
      "credentials"
    ]);
    return axios
      .get(`${RESTSERVER_URL}/credentials/${tenant}?device-id=${deviceId}`)
      .then(({ data }) =>
        dispatch(credentialsFetched(data, deviceId, prevAuthIds))
      )
      .catch(err => {
        dispatch(fetchingCredentialsFailed(deviceId));
        console.error(err);
      });
  };
}
