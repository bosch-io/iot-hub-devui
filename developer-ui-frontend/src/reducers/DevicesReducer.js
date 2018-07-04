/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { fromJS } from "immutable";
import { calculateLogId, extractDeviceIdFromLog } from "utils";
import { hubDevPresetRegistrations } from "__mocks__/storeMocks/deviceMocks";
import {
  NEW_LOG,
  REMOVE_OLDEST_LOG,
  NEW_SUB,
  SUB_DELETED,
  DELETING_SUB,
  ADDING_SUB,
  EVENTBUS_DISCONNECTED,
  NEW_REG,
  REGISTRATIONS_FETCHED,
  REG_DELETED,
  NEW_CREDENTIAL,
  REMOVE_ALL_LOGS,
  UPDATE_REG_INFO,
  ENABLED_CHANGED,
  INIT_EMPTY_CREDENTIAL,
  CREDENTIAL_DELETED,
  CREDENTIALS_FETCHED
} from "actions/actionTypes";

export const initialState = fromJS({ byId: {}, allIds: [] });

const devicesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case NEW_LOG:
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
    case REMOVE_OLDEST_LOG:
      const oldestDeviceId = extractDeviceIdFromLog(action.id);
      return state.updateIn(["byId", oldestDeviceId, "logs"], loggings =>
        loggings.filter(currId => currId !== action.id)
      );
    case REMOVE_ALL_LOGS:
      return state.withMutations(reducedState => {
        let newState = reducedState;
        newState.get("allIds").forEach(id => {
          let currentDevice = reducedState.getIn(["byId", id]);
          currentDevice = currentDevice.set("logs", fromJS([])); // reset every devices logs array to []
          newState = reducedState.setIn(["byId", id], currentDevice);
        });
        return newState;
      });
    case DELETING_SUB:
      return state.setIn(
        ["byId", action.deviceId, "configuredSubscribed"],
        false
      );
    case SUB_DELETED:
      return state.setIn(["byId", action.deviceId, "isSubscribed"], false);
    case ADDING_SUB:
      return state.setIn(
        ["byId", action.deviceId, "configuredSubscribed"],
        true
      );
    case NEW_SUB:
      return state.setIn(["byId", action.deviceId, "isSubscribed"], true);
    case EVENTBUS_DISCONNECTED:
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
    case REGISTRATIONS_FETCHED: {
      let reduced = state;
      const fetchedRegistrations = fromJS(action.registrations);
      const newAllIds = fromJS(Object.keys(action.registrations));
      newAllIds.forEach(id => {
        // Check if the device is already in the store (e.g. because of localStorage persistence)
        if (state.getIn(["byId", id])) {
          // If so, update just the registrationInfo
          reduced = reduced.setIn(
            ["byId", id, "registrationInfo"],
            fetchedRegistrations.getIn([id, "registrationInfo"])
          );
        } else {
          reduced = reduced.setIn(["byId", id], fetchedRegistrations.get(id));
        }
      });
      // Delete all devices that are persisted but not fetched
      if (newAllIds.size < state.get("allIds").size) {
        const outdatedDevices = newAllIds
          .filter(id => !state.get("allIds").includes(id))
          .concat(state.get("allIds").filter(id => !newAllIds.includes(id)));
        outdatedDevices.forEach(id => {
          reduced = reduced.deleteIn(["byId", id]);
        });
      }
      reduced = reduced.set("allIds", newAllIds);

      return reduced;
    }
    case CREDENTIALS_FETCHED: {
      const fetchedCredentials = action.data.credentials;
      const newAllIds = fromJS(fetchedCredentials.map(cred => cred["auth-id"]));
      return state.setIn(["byId", action.deviceId, "credentials"], newAllIds);
    }
    case NEW_REG:
      const newReg = fromJS(action.device);
      return state.withMutations(reducedState =>
        reducedState
          .setIn(["byId", action.device.deviceId], newReg)
          .update("allIds", ids => ids.push(newReg.get("deviceId")).sort())
      );
    case REG_DELETED:
      return state.withMutations(reducedState =>
        reducedState
          .deleteIn(["byId", action.deviceId])
          .update("allIds", ids => ids.filter(id => id !== action.deviceId))
      );
    case UPDATE_REG_INFO:
      return state.setIn(
        ["byId", action.deviceId, "registrationInfo"],
        fromJS(action.info)
      );
    case ENABLED_CHANGED:
      return state.setIn(
        ["byId", action.deviceId, "registrationInfo", "enabled"],
        action.enabled
      );
    case NEW_CREDENTIAL:
    case INIT_EMPTY_CREDENTIAL:
      const newCredentialDeviceId = action.deviceId;
      const authId = action.authId;
      return state.updateIn(
        ["byId", newCredentialDeviceId, "credentials"],
        credentials =>
          credentials.find(cred => cred === authId)
            ? credentials
            : credentials.push(authId)
      );
    case CREDENTIAL_DELETED:
      return state.updateIn(["byId", action.deviceId, "credentials"], creds =>
        creds.filter(id => id !== action.authId)
      );
    default:
      return state;
  }
};

export default devicesReducer;
