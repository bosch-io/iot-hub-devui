/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { fromJS } from "immutable";
import * as actionTypes from "actions/actionTypes";

export const initialState = fromJS({
  eventBus: null,
  eventBusConnected: false,
  hubConnected: false,
  fetchInProgress: {
    tenant: false,
    registrations: {
      global: false,
      byId: []
    },
    credentials: {
      global: false,
      byId: []
    }
  }
});

const connectionReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.CONNECT_TO_EVENTBUS:
      return state.set("eventBusConnected", false);
    case actionTypes.EVENTBUS_INIT:
      return state.set("eventBus", action.eventBus);
    case actionTypes.EVENTBUS_CONNECTED:
      return state.withMutations(reducedState =>
        reducedState
          .set("eventBusConnected", true)
          .set("eventBus", action.eventBus)
      );
    case actionTypes.EVENTBUS_DISCONNECTED:
      return state.withMutations(reducedState =>
        reducedState
          .set("eventBusConnected", false)
          .set("hubConnected", false)
          .set("eventBus", action.eventBus)
      );
    case actionTypes.HUB_CONNECTED:
      return state.set("hubConnected", true);
    case actionTypes.HUB_DISCONNECTED:
      return state.set("hubConnected", false);
    case actionTypes.NEW_SUB:
    case actionTypes.SUB_DELETED:
      return state.set("eventBus", action.eventBus);
    case actionTypes.FETCHING_REGISTRATIONS:
      return state.setIn(["fetchInProgress", "registrations", "global"], true);
    case actionTypes.REGISTRATIONS_FETCHED:
    case actionTypes.FETCHING_REGISTRATIONS_FAILED:
      return state.setIn(["fetchInProgress", "registrations", "global"], false);
    case actionTypes.FETCHING_CREDENTIALS:
      return state.setIn(["fetchInProgress", "credentials", "global"], true);
    case actionTypes.CREDENTIALS_FETCHED:
    case actionTypes.FETCHING_CREDENTIALS_FAILED:
      return state.setIn(["fetchInProgress", "credentials", "global"], false);
    case actionTypes.FETCHING_TENANT:
      return state.setIn(["fetchInProgress", "tenant"], true);
    case actionTypes.TENANT_FETCHED:
    case actionTypes.FETCHING_TENANT_FAILED:
      return state.setIn(["fetchInProgress", "tenant"], false);
    case actionTypes.CREATING_REG:
    case actionTypes.DELETING_REG:
    case actionTypes.UPDATING_REG_INFO:
    case actionTypes.CHANGING_ENABLED:
      return state.updateIn(
        ["fetchInProgress", "registrations", "byId"],
        ids => {
          const alreadyFetching = ids.some(id => id === action.deviceId);
          if (alreadyFetching) {
            return ids;
          }
          return ids.push(action.deviceId);
        }
      );
    case actionTypes.CREATING_REG_FAILED:
    case actionTypes.NEW_REG:
    case actionTypes.REG_DELETED:
    case actionTypes.DELETING_REG_FAILED:
    case actionTypes.UPDATED_REG_INFO:
    case actionTypes.UPDATING_REG_INFO_FAILED:
    case actionTypes.ENABLED_CHANGED:
      return state.updateIn(
        ["fetchInProgress", "registrations", "byId"],
        ids => {
          const regIndex = ids.findIndex(id => id === action.deviceId);
          if (regIndex === -1) {
            return ids;
          }
          return ids.delete(regIndex);
        }
      );
    case actionTypes.CREATING_SECRET:
    case actionTypes.CREATING_CREDENTIAL:
    case actionTypes.DELETING_SECRET:
    case actionTypes.DELETING_CREDENTIAL:
      return state.updateIn(["fetchInProgress", "credentials", "byId"], ids => {
        const alreadyFetching = ids.some(id => id === action.authId);
        if (alreadyFetching) {
          return ids;
        }
        return ids.push(action.authId);
      });
    case actionTypes.NEW_SECRET:
    case actionTypes.CREATING_SECRET_FAILED:
    case actionTypes.NEW_CREDENTIAL:
    case actionTypes.CREATING_CREDENTIAL_FAILED:
    case actionTypes.SECRET_DELETED:
    case actionTypes.DELETING_SECRET_FAILED:
    case actionTypes.CREDENTIAL_DELETED:
    case actionTypes.DELETING_CREDENTIAL_FAILED:
      return state.updateIn(["fetchInProgress", "credentials", "byId"], ids => {
        const credIndex = ids.findIndex(id => id === action.authId);
        if (credIndex === -1) {
          return ids;
        }
        return ids.delete(credIndex);
      });
    default:
      return state;
  }
};

export default connectionReducer;
