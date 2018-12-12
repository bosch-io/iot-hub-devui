/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { fromJS } from "immutable";
import { calculateLogId, extractDeviceIdFromLog } from "utils";
import * as actionTypes from "actions/actionTypes"; // Too many types for destructuring -> Create a namespace

const createRegistration = issuer => {
  const emptyReg = {
    lastActive: null,
    currentlyActive: false,
    isSubscribed: false,
    logs: [],
    credentials: []
  };
  switch (issuer) {
    case "fromApi":
      return (deviceId, registrationInfo) =>
        fromJS(
          Object.assign(emptyReg, {
            deviceId,
            configuredSubscribed: false,
            registrationInfo
          })
        );
    case "fromUi":
      return (deviceId, configuredSubscribed) =>
        fromJS(
          Object.assign(emptyReg, {
            deviceId,
            configuredSubscribed,
            registrationInfo: { enabled: true }
          })
        );
    default:
      return new Error("Unknown issuer for createRegistration.");
  }
};

export const initialState = fromJS({ byId: {}, allIds: [] });

const devicesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.NEW_LOG:
      const logId = calculateLogId(action.message);
      const deviceId = JSON.parse(action.message.body).deviceId;
      const time = action.message.timestamp;
      return state.withMutations(reducedState => {
        reducedState
          .updateIn(["byId", deviceId, "logs"], loggings =>
            loggings.push(logId)
          )
          .setIn(["byId", deviceId, "lastActive"], time)
          .setIn(["byId", deviceId, "currentlyActive"], true);
      });
    case actionTypes.REMOVE_OLDEST_LOG:
      const oldestDeviceId = extractDeviceIdFromLog(action.id);
      return state.updateIn(["byId", oldestDeviceId, "logs"], loggings =>
        loggings.filter(currId => currId !== action.id)
      );
    case actionTypes.REMOVE_ALL_LOGS:
      return state.withMutations(reducedState => {
        let newState = reducedState;
        newState.get("allIds").forEach(id => {
          let currentDevice = reducedState.getIn(["byId", id]);
          currentDevice = currentDevice.set("logs", fromJS([])); // reset every devices logs array to []
          newState = reducedState.setIn(["byId", id], currentDevice);
        });
        return newState;
      });
    case actionTypes.DELETING_SUB:
      return state.setIn(
        ["byId", action.deviceId, "configuredSubscribed"],
        false
      );
    case actionTypes.SUB_DELETED:
      return state.setIn(["byId", action.deviceId, "isSubscribed"], false);
    case actionTypes.ADDING_SUB:
      return state.setIn(
        ["byId", action.deviceId, "configuredSubscribed"],
        true
      );
    case actionTypes.NEW_SUB:
      return state.setIn(["byId", action.deviceId, "isSubscribed"], true);
    case actionTypes.EVENTBUS_DISCONNECTED:
      return state.withMutations(reducedState => {
        let newState = reducedState;
        newState.get("allIds").forEach(id => {
          let currentDevice = reducedState.getIn(["byId", id]);
          if (currentDevice.get("isSubscribed")) {
            currentDevice = currentDevice.set("isSubscribed", false);
            newState = reducedState.setIn(["byId", id], currentDevice);
          }
        });
        return newState;
      });
    case actionTypes.REGISTRATIONS_FETCHED: {
      if (action.data && action.data.result && action.data.entities) {
        const fetched = fromJS(action.data);
        const merged = fetched
          .getIn(["entities", "devices"])
          .withMutations(fetchedDevices => {
            fetched.getIn(["result", "devices"]).forEach(fetchedId => {
              const oldReg = state.getIn(["byId", fetchedId]);
              if (oldReg) {
                // In Case of a conflict (e.g. always on the registrationInfo Prop), use the fetched version
                /* eslint-disable no-unused-vars */
                fetchedDevices.update(fetchedId, dev =>
                  dev.mergeWith((fetchedProp, oldProp) => fetchedProp, oldReg)
                );
                /* eslint-enable no-unused-vars */
              } else {
                fetchedDevices.update(fetchedId, dev =>
                  createRegistration("fromApi")(
                    fetchedId,
                    dev.get("registrationInfo").toJS()
                  )
                );
              }
            });
          });
        return state
          .set("byId", merged)
          .set("allIds", fromJS(action.data.result.devices));
      }
      return state;
    }
    case actionTypes.CREDENTIALS_FETCHED: {
      if (action.data.result && action.data.result.credentials) {
        return state.setIn(
          ["byId", action.deviceId, "credentials"],
          fromJS(action.data.result.credentials)
        );
      }
      return state;
    }
    case actionTypes.NEW_REG:
      const newReg = createRegistration("fromUi")(
        action.deviceId,
        action.configuredSubscribed
      );
      return state.withMutations(reducedState =>
        reducedState
          .setIn(["byId", action.deviceId], newReg)
          .update("allIds", ids => ids.push(newReg.get("deviceId")).sort())
      );
    case actionTypes.CONFIGURED_GATEWAY: {
      const gatewayProperty = action.info;
      return state.setIn(
        ["byId", action.deviceId, "registrationInfo", "via"],
        gatewayProperty.get("via")
      );
    }
    case actionTypes.REG_DELETED:
      return state.withMutations(reducedState =>
        reducedState
          .deleteIn(["byId", action.deviceId])
          .update("allIds", ids => ids.filter(id => id !== action.deviceId))
      );
    case actionTypes.UPDATED_REG_INFO:
      return state.setIn(
        ["byId", action.deviceId, "registrationInfo"],
        fromJS(action.info)
      );
    case actionTypes.NEW_CREDENTIAL:
    case actionTypes.INIT_EMPTY_CREDENTIAL:
      const newCredentialDeviceId = action.deviceId;
      const authId = action.credential["auth-id"];
      return state.updateIn(
        ["byId", newCredentialDeviceId, "credentials"],
        credentials =>
          credentials.find(cred => cred === authId)
            ? credentials
            : credentials.push(authId)
      );
    case actionTypes.CREDENTIAL_DELETED:
      return state.updateIn(["byId", action.deviceId, "credentials"], creds =>
        creds.filter(id => id !== action.authId)
      );
    default:
      return state;
  }
};

export default devicesReducer;
