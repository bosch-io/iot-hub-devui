/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
// Selectors
// Naming:
//  - SubscribedDevices = configuredSubscribed
//  - ConfirmedSubscriptions = isSubscribed
//  - UnobservedRegistrations = !isSubscribed (could be configuredSubscribed)
//  - PendingRegistrations = !isSubscribed && configuredSubscribed
//  - PendingUnsubscribes = isSubscribed && !configuredSubscribed
export const selectConfirmedSubscriptions = state => {
  const aggregatedDevices = state
    .get("allIds")
    .filter(id => state.getIn(["byId", id, "isSubscribed"]))
    .map(filteredId => state.getIn(["byId", filteredId]));
  return aggregatedDevices;
};
export const selectNumberOfConfirmedSubscriptions = state =>
  selectConfirmedSubscriptions(state).size;
export const selectSubscribedDevices = state => {
  const aggregatedDevices = state
    .get("allIds")
    .filter(id => state.getIn(["byId", id, "configuredSubscribed"]))
    .map(filteredId => state.getIn(["byId", filteredId]));
  return aggregatedDevices;
};
export const selectNumberOfSubscribedDevices = state =>
  selectSubscribedDevices(state).size;
export const selectUnobservedRegistrations = state => {
  const aggregatedDevices = state
    .get("allIds")
    .filter(id => !state.getIn(["byId", id, "isSubscribed"]))
    .map(filteredId => state.getIn(["byId", filteredId]));
  return aggregatedDevices;
};
export const selectNumberOfUnobservedRegistrations = state =>
  selectUnobservedRegistrations(state).size;
export const selectPendingDevices = state => {
  const aggregatedDevices = state
    .get("allIds")
    .filter(
      id =>
        !state.getIn(["byId", id, "isSubscribed"]) &&
        state.getIn(["byId", id, "configuredSubscribed"])
    )
    .map(filteredId => state.getIn(["byId", filteredId]));
  return aggregatedDevices;
};
export const selectNumberOfPendingDevices = state =>
  selectPendingDevices(state).size;
export const selectPendingUnsubscribes = state => {
  const aggregatedDevices = state
    .get("allIds")
    .filter(
      id =>
        state.getIn(["byId", id, "isSubscribed"]) &&
        !state.getIn(["byId", id, "configuredSubscribed"])
    )
    .map(filteredId => state.getIn(["byId", filteredId]));
  return aggregatedDevices;
};
export const selectNumberOfPendingUnsubscribes = state =>
  selectPendingUnsubscribes(state).size;
export const selectAllDeviceIds = state => state.get("allIds");
export const selectAllDevices = state =>
  state.get("allIds").map(id => state.getIn(["byId", id]));
export const selectNumberOfAllDevices = state => state.get("allIds").size;
export const selectDeviceById = (state, id) => state.getIn(["byId", id]);
export const hasDevice = (state, id) => Boolean(state.getIn(["byId", id]));
export const selectCredentialIdsByDeviceId = (state, id) =>
  selectDeviceById(state, id).get("credentials");
export const selectRegistrationInfo = (state, deviceId) =>
  state.getIn(["byId", deviceId, "registrationInfo"]);
