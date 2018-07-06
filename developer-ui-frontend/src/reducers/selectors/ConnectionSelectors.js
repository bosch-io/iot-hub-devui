/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
export const selectIsFetchingAny = state =>
  state.getIn(["fetchInProgress", "tenant"]) ||
  state.getIn(["fetchInProgress", "registrations", "global"]) ||
  state.getIn(["fetchInProgress", "registrations", "byId"]).size > 0 ||
  state.getIn(["fetchInProgress", "credentials", "global"]) ||
  state.getIn(["fetchInProgress", "credentials", "byId"]).size > 0;

export const selectIsFetchingByDeviceId = (state, deviceId) =>
  state
    .getIn(["fetchInProgress", "registrations", "byId"])
    .some(id => id === deviceId);

export const selectFetchingDevices = state =>
  state.getIn(["fetchInProgress", "registrations", "byId"]);

export const selectIsFetchingByAuthId = (state, authId) =>
  state
    .getIn(["fetchInProgress", "credentials", "byId"])
    .some(id => id === authId);
