/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { fromJS } from "immutable";
import * as actionTypes from "actions/actionTypes"; // Too many types for destructuring -> Create a namespace

export const initialState = fromJS({
  message: "",
  level: null
});

const notificationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.ADD_CUSTOM_NOTIFICATION:
      return state.withMutations(reducedState =>
        reducedState.set("message", action.message).set("level", action.level)
      );
    case actionTypes.NEW_SUB:
      return state.withMutations(reducedState =>
        reducedState
          .set(
            "message",
            `${action.deviceId} successfully added to subscriptions.`
          )
          .set("level", "success")
      );
    case actionTypes.SUB_DELETED:
      return state.withMutations(reducedState =>
        reducedState
          .set(
            "message",
            `${action.deviceId} successfully deleted from subscriptions.`
          )
          .set("level", "success")
      );
    case actionTypes.HUB_CONNECTED:
      return state.withMutations(reducedState =>
        reducedState
          .set("message", "Connected to Hono Messaging")
          .set("level", "success")
      );
    case actionTypes.EVENTBUS_DISCONNECTED:
    case actionTypes.HUB_DISCONNECTED:
      return state.withMutations(reducedState =>
        reducedState.set("message", "Connection lost").set("level", "error")
      );
    case actionTypes.CONNECTING_FAILED:
      return state.withMutations(reducedState =>
        reducedState.set("message", "Connection failed").set("level", "error")
      );
    case actionTypes.NEW_REG:
      return state.withMutations(reducedState =>
        reducedState
          .set("message", `${action.deviceId} successfully registered`)
          .set("level", "success")
      );
    case actionTypes.CREATING_REG_FAILED:
      return state.withMutations(reducedState =>
        reducedState
          .set("message", `${action.deviceId} registration failed`)
          .set("level", "error")
      );
    case actionTypes.REG_DELETED:
      return state.withMutations(reducedState =>
        reducedState
          .set("message", `${action.deviceId} successfully deleted`)
          .set("level", "success")
      );
    case actionTypes.DELETING_REG_FAILED:
      return state.withMutations(reducedState =>
        reducedState
          .set("message", `${action.deviceId} could not be deleted`)
          .set("level", "error")
      );
    case actionTypes.UPDATING_REG_INFO_FAILED:
      return state.withMutations(reducedState =>
        reducedState
          .set("message", `${action.deviceId} could not be updated`)
          .set("level", "error")
      );
    case actionTypes.CREDENTIAL_DELETED: {
      // Create a block to scope the variable to the case block.
      const authIdShort = action.authId.substring(-5) + "...";
      return state.withMutations(reducedState =>
        reducedState
          .set("message", `${authIdShort} successfully deleted`)
          .set("level", "success")
      );
    }
    case actionTypes.DELETING_CREDENTIAL_FAILED: {
      const authIdShort = action.authId.substring(-5) + "...";
      return state.withMutations(reducedState =>
        reducedState
          .set("message", `${authIdShort} could not be deleted`)
          .set("level", "error")
      );
    }
    case actionTypes.NEW_CREDENTIAL: {
      const authIdShort = action.authId.substring(-5) + "...";
      return state.withMutations(reducedState =>
        reducedState
          .set(
            "message",
            `${authIdShort} successfully added to ${action.deviceId}`
          )
          .set("level", "success")
      );
    }
    case actionTypes.CREATING_CREDENTIAL_FAILED: {
      // Create a block to scope the variable to the case block.
      const authIdShort = action.authId.substring(-5) + "...";
      return state.withMutations(reducedState =>
        reducedState
          .set("message", `${authIdShort} could not be created`)
          .set("level", "error")
      );
    }
    case actionTypes.NEW_SECRET: {
      const authIdShort = action.authId.substring(-5) + "...";
      return state.withMutations(reducedState =>
        reducedState
          .set("message", `New secret successfully added to ${authIdShort}`)
          .set("level", "success")
      );
    }
    case actionTypes.CREATING_SECRET_FAILED: {
      const authIdShort = action.authId.substring(-5) + "...";
      return state.withMutations(reducedState =>
        reducedState
          .set("message", `Could not add secret to ${authIdShort}`)
          .set("level", "error")
      );
    }
    case actionTypes.NOT_ALLOWED_CREATING_SECRET: {
      const authIdShort = action.authId.substring(-5) + "...";
      return state.withMutations(reducedState =>
        reducedState
          .set(
            "message",
            `Could not add secret to ${authIdShort}. You can only add 10 secres.`
          )
          .set("level", "error")
      );
    }
    case actionTypes.SECRET_DELETED:
      return state.withMutations(reducedState =>
        reducedState
          .set("message", `secret successfully deleted`)
          .set("level", "success")
      );
    case actionTypes.DELETING_SECRET_FAILED:
      return state.withMutations(reducedState =>
        reducedState
          .set("message", `secret could not be deleted`)
          .set("level", "error")
      );
    case actionTypes.FETCHING_TENANT_FAILED:
      return state.withMutations(reducedState =>
        reducedState
          .set("message", `tenant could not be fetched`)
          .set("level", "error")
      );
    case actionTypes.FETCHING_REGISTRATIONS_FAILED:
      return state.withMutations(reducedState =>
        reducedState
          .set("message", "error fetching registrations")
          .set("level", "error")
      );
    case actionTypes.FETCHING_CREDENTIALS_FAILED:
      return state.withMutations(reducedState =>
        reducedState
          .set("message", `error fetching credentials for ${action.deviceId}`)
          .set("level", "error")
      );
    default:
      return state;
  }
};

export default notificationReducer;
