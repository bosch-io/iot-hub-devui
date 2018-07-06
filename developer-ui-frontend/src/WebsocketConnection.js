/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
/*
   Exposes functions to configure the eventBus Object (which is held inside the redux store and
   maintained by the ConnectionReducer)
*/
import * as wsActions from "actions/WebsocketActions";
import { newSubCreated, subDeleted } from "actions/SubscriptionActions";
import EventBus from "vertx3-eventbus-client";
import { WSSERVER_URL } from "_APP_CONSTANTS";
import {
  selectPendingDevices,
  selectNumberOfPendingDevices,
  selectNumberOfPendingUnsubscribes,
  selectPendingUnsubscribes
} from "reducers/selectors";

// accessed by both registerHandler and unregisterHandler -> declared globally
let incomingMessageHandler;

/*
  Called inside a thunk (handleNewSub). When the handler is registered succesfully,
  the callback is executed and as a result the NEW_SUB is dispatched.

  @param eventBus  the current state of the eventBus
  @param device  the device that is added as subscription
*/
export const registerNewDeviceHandler = (eventBus, channel, dispatch) => {
  if (
    !eventBus.handlers ||
    eventBus.handlers["device." + channel] === undefined
  ) {
    incomingMessageHandler = (error, message) => {
      if (message) {
        message.timestamp = new Date().getTime();
        dispatch(wsActions.handleNewLog(message));
      } else {
        error.timestamp = new Date().getTime();
        dispatch(wsActions.newError(error));
      }
    };

    eventBus.registerHandler("device." + channel, incomingMessageHandler);
    dispatch(newSubCreated(eventBus, channel));
    console.log(`device.${channel} registered as handler`);
  } else {
    console.log(
      `device.${channel} already registered as handler. Will not register again`
    );
  }
};

export const registerNewStatusHandler = (eventBus, channel, dispatch) => {
  eventBus.registerHandler("status." + channel, (error, message) => {
    if (message) {
      message.body === "connected"
        ? dispatch(wsActions.hubConnected(new Date().getTime()))
        : dispatch(wsActions.hubDisconnected(new Date().getTime()));
    }
  });
  console.log("new status channel: " + channel);
  console.log(`status.${channel} registered as handler`);
};

export const unregisterHandler = (eventBus, channel, dispatch) => {
  eventBus.unregisterHandler("device." + channel, incomingMessageHandler);
  dispatch(subDeleted(eventBus, channel));
  console.log(`device.${channel} deregistered as handler"`);
};
// Create the Websocket connection (the eventBus object)
export const useWebsockets = (dispatch, getState) => {
  dispatch(wsActions.connecting());
  const eventBus = new EventBus(WSSERVER_URL);
  dispatch(wsActions.initializedEventBus(eventBus));
  eventBus.onopen = () => {
    dispatch(wsActions.connected(eventBus));
    registerNewStatusHandler(eventBus, "hubConnection", dispatch);
    // there could be more pending devices if the connection wasn't open from start
    if (selectNumberOfPendingDevices(getState()) > 0) {
      selectPendingDevices(getState()).forEach(device =>
        registerNewDeviceHandler(eventBus, device.get("deviceId"), dispatch)
      );
    }
    if (selectNumberOfPendingUnsubscribes(getState()) > 0) {
      selectPendingUnsubscribes(getState()).forEach(device =>
        unregisterHandler(eventBus, device.get("deviceId"), dispatch)
      );
    }
  };
  eventBus.onclose = () => {
    getState().getIn(["connection", "eventBusConnected"])
      ? dispatch(wsActions.disconnected(eventBus))
      : dispatch(wsActions.connectingFailed(eventBus));
  };

  eventBus.enableReconnect(true);
};
