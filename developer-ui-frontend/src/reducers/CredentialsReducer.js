/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { fromJS } from "immutable";
import {
  NEW_CREDENTIAL,
  NEW_SECRET,
  INIT_EMPTY_CREDENTIAL,
  SECRET_DELETED,
  UPDATED_CRED_INFO,
  UPDATED_CRED_SECRETS,
  CREDENTIAL_DELETED,
  CREDENTIALS_FETCHED,
  ENABLED_CRED_CHANGED
} from "actions/actionTypes";

export const initialState = fromJS({
  byId: {},
  allIds: [],
  secrets: { byId: {}, allIds: [] }
});

const handleNewSecret = (state, action) => {
  const newSecretId = action.secret.secretId;
  return state.withMutations(reducedState =>
    reducedState
      .updateIn(["byId", action.authId, "secrets"], ids =>
        ids.push(newSecretId)
      )
      .updateIn(["secrets", "allIds"], ids => ids.push(newSecretId))
      .setIn(["secrets", "byId", newSecretId], fromJS(action.secret))
  );
};

const credentialsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // CREDENTIALS_FETCHED means Credentials for a specific device-id are fetched
    case CREDENTIALS_FETCHED: {
      if (
        action.data.entities &&
        action.data.entities.credentials &&
        action.data.entities.secrets &&
        action.data.result &&
        action.data.result.credentials
      ) {
        const newCredentials = fromJS({
          byId: action.data.entities.credentials,
          allIds: action.data.result.credentials,
          secrets: {
            byId: action.data.entities.secrets,
            allIds: Object.keys(action.data.entities.secrets)
          }
        });
        return newCredentials;
      }
      return state;
    }
    case NEW_CREDENTIAL: {
      const newAuthId = action.credential["auth-id"];
      // secrets are handled by handleNewSecret -> Reset secrets to [] for
      // credential specific handling
      /* eslint-disable no-unused-vars */
      const { secrets, ...credentialWithoutSecrets } = action.credential;
      /* eslint-enable */
      credentialWithoutSecrets.secrets = [];
      return state.withMutations(reducedState => {
        const newState = reducedState
          .update("allIds", ids =>
            reducedState.getIn(["byId", newAuthId]) ? ids : ids.push(newAuthId)
          )
          .setIn(
            ["byId", newAuthId],
            fromJS({
              enabled: true,
              ...credentialWithoutSecrets
            })
          )
          .updateIn(["byId", newAuthId], cred =>
            cred.get("firstInitTime") ? cred.delete("firstInitTime") : cred
          )
          .update(stateWithNewCreds => {
            /* eslint-disable no-param-reassign */
            Object.keys(action.secrets).forEach(secret => {
              stateWithNewCreds = handleNewSecret(stateWithNewCreds, {
                authId: action.authId,
                secret: { ...action.secrets[secret] }
              });
            });
            /* eslint-enable */
          });
        return newState;
      });
    }
    case INIT_EMPTY_CREDENTIAL: {
      const newAuthId = action.credential["auth-id"];
      return state.withMutations(reducedState =>
        reducedState
          .update("allIds", ids => ids.push(newAuthId))
          .setIn(
            ["byId", newAuthId],
            fromJS({
              ...action.credential,
              firstInitTime: new Date().getTime()
            })
          )
      );
    }

    case UPDATED_CRED_INFO:
      return state.withMutations(reducedState =>
        reducedState
          .setIn(["byId", action.authId, "enabled"], action.enabled)
          .setIn(["byId", action.authId, "credentialInfo"], fromJS(action.data))
      );
    case UPDATED_CRED_SECRETS:
      return state.setIn(["secrets", "allIds"], fromJS(action.newSecrets));
    case NEW_SECRET:
      return handleNewSecret(state, action);
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
    case ENABLED_CRED_CHANGED:
      return state.setIn(["byId", action.authId, "enabled"], action.enabled);
    case CREDENTIAL_DELETED:
      // A Credential may not be loaded in the UI at the time it is deleted
      // e.g. through "cascading delete" on its registration. This means, changes
      // to the local app state are only needed if the credential is loaded
      if (state.getIn(["byId", action.authId])) {
        const deletedSecretIds = state.getIn([
          "byId",
          action.authId,
          "secrets"
        ]);
        return state.withMutations(reducedState =>
          reducedState
            .deleteIn(["byId", action.authId])
            .update("allIds", authIds =>
              authIds.filter(id => id !== action.authId)
            )
            .updateIn(["secrets", "byId"], secrets => {
              let reducedSecrets = secrets;
              deletedSecretIds.forEach(id => {
                reducedSecrets = reducedSecrets.delete(id);
              });
              return reducedSecrets;
            })
            .updateIn(["secrets", "allIds"], secretIds => {
              const reducedIds = secretIds.filter(
                id => deletedSecretIds.indexOf(id) === -1
              );
              return reducedIds;
            })
        );
      }
      return state;
    default:
      return state;
  }
};

export default credentialsReducer;
