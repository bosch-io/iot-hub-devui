/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { fromJS } from "immutable";
// Credentials
export const selectAllCredentials = state =>
  state.get("allIds").map(id => state.getIn(["byId", id]));
export const selectCredentialById = (state, id) => state.getIn(["byId", id]);
// Secrets
export const selectAllSecrets = state =>
  state
    .getIn(["secrets", "allIds"])
    .map(id => state.getIn(["secrets", "byId", id]));
export const selectSecretById = (state, id) =>
  state.getIn(["secrets", "byId", id]);

export const selectSecretsByCredentialId = (state, credentialId) => {
  const secretIds = state.getIn(["byId", credentialId, "secrets"]);
  return secretIds
    ? secretIds.map(id => state.getIn(["secrets", "byId", id]))
    : fromJS([]);
};

export const selectUninitializedCredentials = state =>
  state
    .get("allIds")
    .map(credId => state.getIn(["byId", credId]))
    .filter(cred => cred.get("firstInitTime"))
    .sort((a, b) => a.get("firstInitTime") - b.get("firstInitTime"));
