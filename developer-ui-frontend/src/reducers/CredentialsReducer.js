/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { fromJS } from "immutable";
import {
  NEW_CREDENTIAL,
  NEW_SECRET,
  INIT_EMPTY_CREDENTIAL,
  SECRET_DELETED,
  CREDENTIAL_DELETED,
  CREDENTIALS_FETCHED
} from "actions/actionTypes";
import { selectCredentialIdsByDeviceId } from "reducers/selectors";
import { calculateSecretId } from "utils";

export const initialState = fromJS({
  byId: {},
  allIds: [],
  secrets: { byId: {}, allIds: [] }
});

const credentialsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // CREDENTIALS_FETCHED means Credentials for a specific device-id are fetched
    case CREDENTIALS_FETCHED: {
      // Loop over the payload and transfer each credential to the store format (defined in initialState)
      // Update every credential (even those with auth ids that already exist in the store (the payload could be different))
      const newCredentials = state.toJS();
      action.data.credentials.forEach(cred => {
        const { secrets, ...credWithoutSecrets } = cred;
        const authId = cred["auth-id"];
        const credInStore = {
          ...credWithoutSecrets,
          secrets: []
        };
        // (1) Delete every secret associated with that auth-id and (2) adopt the secrets from the API response
        if (newCredentials.byId[authId]) {
          newCredentials.byId[authId].secrets.forEach(secretId => {
            delete newCredentials.secrets.byId[secretId];
            newCredentials.secrets.allIds.splice(
              newCredentials.secrets.allIds.findIndex(id => id === secretId),
              1
            );
          });
        }
        secrets.forEach(secret => {
          // (2)
          const secretId = secret.secretId
            ? secret.secretId
            : calculateSecretId(secret, authId);
          const secretInStore = { secretId, ...secret };
          newCredentials.secrets.allIds.push(secretId);
          credInStore.secrets.push(secretId);
          newCredentials.secrets.byId[secretId] = secretInStore;
        });
        // Either updates the credential or saves a new credential
        newCredentials.byId[authId] = credInStore;
        if (!newCredentials.allIds.some(id => id === authId)) {
          newCredentials.allIds.push(authId);
        }
      });
      // Finally check if there are less credentials in the payload than stored for that device
      // Which would mean the credential got deleted by another application in the meantime
      action.prevAuthIds.forEach(credId => {
        const stillAvailable = action.data.credentials.some(
          cred => cred["auth-id"] === credId
        );
        if (!stillAvailable) {
          // Cleanup: Delete all associated secrets and the credential
          const associatedSecretIds = newCredentials.byId[credId].secrets;
          associatedSecretIds.forEach(secretId => {
            delete newCredentials.secrets.byId[secretId];
            newCredentials.secrets.allIds.splice(
              newCredentials.secrets.allIds.findIndex(id => id === secretId),
              1
            );
          });
          delete newCredentials.byId[credId];
          newCredentials.allIds.splice(
            newCredentials.allIds.findIndex(id => id === credId),
            1
          );
        }
      });
      return fromJS(newCredentials);
    }
    case NEW_CREDENTIAL:
      return state.withMutations(reducedState => {
        const newState = reducedState
          .update(
            "allIds",
            ids =>
              reducedState.getIn(["byId", action.authId])
                ? ids
                : ids.push(action.authId)
          )
          .setIn(
            ["byId", action.authId],
            fromJS({
              "device-id": action.deviceId,
              enabled: true,
              ...action.newCredential
            })
          )
          .updateIn(
            ["byId", action.authId],
            cred =>
              cred.get("firstInitTime") ? cred.delete("firstInitTime") : cred
          );
        return newState;
      });
    case INIT_EMPTY_CREDENTIAL:
      return state.withMutations(reducedState =>
        reducedState
          .update("allIds", ids => ids.push(action.authId))
          .setIn(
            ["byId", action.authId],
            fromJS({ ...action.newCredential, firstInitTime: new Date().getTime() })
          )
      );
    case NEW_SECRET:
      const newSecretId = action.secret.secretId;
      return state.withMutations(reducedState =>
        reducedState
          .updateIn(["secrets", "allIds"], ids => ids.push(newSecretId))
          .setIn(["secrets", "byId", newSecretId], fromJS(action.secret))
          .updateIn(["byId", action.authId, "secrets"], ids =>
            ids.push(newSecretId)
          )
      );
    case SECRET_DELETED:
      return state.withMutations(reducedState =>
        reducedState
          .updateIn(["secrets", "allIds"], ids =>
            ids.filter(id => id !== action.secretId)
          )
          .deleteIn(["secrets", "byId", action.secretId])
          .updateIn(["byId", action.authId, "secrets"], ids =>
            ids.filter(id => id !== action.secretId)
          )
      );
    case CREDENTIAL_DELETED:
      return state.withMutations(reducedState =>
        reducedState
          .deleteIn(["byId", action.authId])
          .update("allIds", authIds =>
            authIds.filter(id => id !== action.authId)
          )
      );
    default:
      return state;
  }
};

export default credentialsReducer;
