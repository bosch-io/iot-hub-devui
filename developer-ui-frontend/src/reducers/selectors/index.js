/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import * as fromLogs from "./LogsSelectors";
import * as fromFilter from "./FilterSelectors";
import * as fromDevices from "./DevicesSelectors";
import * as fromConnection from "./ConnectionSelectors";
import * as fromCredentials from "./CredentialsSelectors";
import { createSelector } from "reselect";
import { checkLog } from "utils";
import { OrderedMap, fromJS } from "immutable";

// Selector Shortcuts
// Naming:
//  - SubscribedDevices = configuredSubscribed
//  - ConfirmedSubscriptions = isSubscribed
//  - UnobservedRegistrations = !isSubscribed (could be configuredSubscribed)
//  - PendingRegistrations = !isSubscribed && configuredSubscribed
//  - PendingUnsubscribes = isSubscribed && !configuredSubscribed
export const selectConfirmedSubscriptions = state =>
  fromDevices.selectConfirmedSubscriptions(state.get("devices"));
export const selectNumberOfConfirmedSubscriptions = state =>
  fromDevices.selectNumberOfConfirmedSubscriptions(state.get("devices"));
export const selectSubscribedDevices = state =>
  fromDevices.selectSubscribedDevices(state.get("devices"));
export const selectNumberOfSubscribedDevices = state =>
  fromDevices.selectNumberOfSubscribedDevices(state.get("devices"));
export const selectUnobservedRegistrations = state =>
  fromDevices.selectUnobservedRegistrations(state.get("devices"));
export const selectNumberOfUnobservedRegistrations = state =>
  fromDevices.selectNumberOfUnobservedRegistrations(state.get("devices"));
export const selectPendingDevices = state =>
  fromDevices.selectPendingDevices(state.get("devices"));
export const selectNumberOfPendingDevices = state =>
  fromDevices.selectNumberOfPendingDevices(state.get("devices"));
export const selectAllDevices = state =>
  fromDevices.selectAllDevices(state.get("devices"));
export const selectNumberOfAllDevices = state =>
  fromDevices.selectNumberOfAllDevices(state.get("devices"));
export const selectPendingUnsubscribes = state =>
  fromDevices.selectPendingUnsubscribes(state.get("devices"));
export const selectNumberOfPendingUnsubscribes = state =>
  fromDevices.selectNumberOfPendingUnsubscribes(state.get("devices"));
export const selectDeviceById = (state, id) =>
  fromDevices.selectDeviceById(state.get("devices"), id);
export const selectCredentialIdsByDeviceId = (state, id) =>
  fromDevices.selectCredentialIdsByDeviceId(state.get("devices"), id);
export const selectRegistrationInfo = (state, id) =>
  fromDevices.selectRegistrationInfo(state.get("devices"), id);

export const selectAllFilters = state =>
  fromFilter.selectAllFilters(state.get("filters"));
export const selectNumberOfAllFilters = state =>
  fromFilter.selectNumberOfAllFilters(state.get("filters"));
export const selectAllFiltersByCategory = (state, category) =>
  fromFilter.selectAllFiltersByCategory(state.get("filter"), category);

export const selectAllLogs = state => fromLogs.selectAllLogs(state.get("logs"));
export const selectNumberOfAllLogs = state =>
  fromLogs.selectNumberOfAllLogs(state.get("logs"));
export const selectOldestLog = state =>
  fromLogs.selectOldestLog(state.get("logs"));
export const selectNewestLog = state =>
  fromLogs.selectNewestLog(state.get("logs"));

export const selectAllCredentials = state =>
  fromCredentials.selectAllCredentials(state.get("credentials"));
export const selectCredentialById = (state, id) =>
  fromCredentials.selectCredentialById(state.get("credentials"), id);
export const selectAllSecrets = state =>
  fromCredentials.selectAllSecrets(state.get("credentials"));
export const selectSecretById = (state, id) =>
  fromCredentials.selectSecretById(state.get("credentials"), id);
export const selectSecretsByCredentialId = (state, id) =>
  fromCredentials.selectSecretsByCredentialId(state.get("credentials"), id);
export const selectNumberOfSecretsByCredentialId = (state, id) =>
  selectSecretsByCredentialId(state, id).size;

export const selectIsFetchingAny = state =>
  fromConnection.selectIsFetchingAny(state.get("connection"));
export const selectIsFetchingByDeviceId = (state, deviceId) =>
  fromConnection.selectIsFetchingByDeviceId(state.get("connection"), deviceId);
export const selectIsFetchingByAuthId = (state, authId) =>
  fromConnection.selectIsFetchingByAuthId(state.get("connection"), authId);

export const selectScrollAnimationActive = state =>
  state.getIn(["settings", "scrollAnimationActive"]);
export const selectNumberOfFeedLines = state =>
  state.getIn(["settings", "numberOfFeedLines"]);
export const selectLogsSorting = state =>
  state.getIn(["settings", "logsSorting"]);
export const selectTenant = state => state.getIn(["settings", "tenant"]);
export const selectEventbusConnected = state =>
  state.getIn(["connection", "eventBusConnected"]);
export const selectHubConnected = state =>
  state.getIn(["connection", "hubConnected"]);
export const selectBufferSize = state =>
  state.getIn(["logMemoryCalculation", "bufferSize"]);

// Memoized/ Composed Selectors
export const selectVisibleLogs = createSelector(
  [selectAllFilters, selectAllLogs],
  (filters, logs) => logs.filter(log => checkLog(log, filters))
);
// TODO: Reimplement as Reselect Memoized Selector
export const selectAllCredentialsApiFormat = (state, deviceId) => {
  const credentialIds = selectCredentialIdsByDeviceId(state, deviceId);
  const credentialsFromStore = credentialIds.map(credId =>
    selectCredentialById(state, credId)
  );
  // (1) Add the device-id property, (2) get the correct secrets format and (3) bring it in the correct order
  const allCreds = credentialsFromStore.map(credential => {
    const secretsFromStore = selectSecretsByCredentialId(
      state,
      credential.get("auth-id")
    );
    const unorderedMap = credential.withMutations(cred =>
      cred
        .set("device-id", deviceId) // (1)
        .set(
          "secrets",
          secretsFromStore.map(secret => {
            return secret.delete("secretId");
          }) // (2)
        )
    );
    // (3)
    return OrderedMap({
      "device-id": unorderedMap.get("device-id"),
      type: unorderedMap.get("type"),
      "auth-id": unorderedMap.get("auth-id")
    }).merge(unorderedMap);
  });
  return allCreds;
};

export const selectCredentialApiFormat = (state, deviceId, authId) => {
  return selectAllCredentialsApiFormat(state, deviceId).find(
    cred => cred.get("auth-id") === authId
  );
};
