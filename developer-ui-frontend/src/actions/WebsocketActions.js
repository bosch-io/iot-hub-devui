/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { AVERAGE_MEMCALC_INTERVAL } from "_APP_CONSTANTS";
import {
  registerNewDeviceHandler,
  useWebsockets,
  unregisterHandler
} from "WebsocketConnection";
import {
  CONNECT_TO_EVENTBUS,
  EVENTBUS_CONNECTED,
  CALCULATE_LOG_MEMORY,
  NEW_ERROR,
  EVENTBUS_INIT,
  EVENTBUS_DISCONNECTED,
  CONNECTING_FAILED,
  HUB_CONNECTED,
  HUB_DISCONNECTED
} from "./actionTypes";
import {
  selectOldestLog,
  selectAllLogs,
  selectNumberOfAllLogs
} from "reducers/selectors";
import { addingNewSub, deletingSub } from "./SubscriptionActions";
import { newLog, removeOldestLog } from "./LogActions";
import { fetchInitialData } from "./DataFetchActions";

// ACTION CREATORS

export function connecting() {
  return {
    type: CONNECT_TO_EVENTBUS
  };
}

export function initializedEventBus(eventBus) {
  return {
    type: EVENTBUS_INIT,
    eventBus
  };
}

export function connected(eventBus) {
  return {
    type: EVENTBUS_CONNECTED,
    eventBus
  };
}

export function disconnected(eventBus) {
  return {
    type: EVENTBUS_DISCONNECTED,
    eventBus
  };
}

export function connectingFailed(eventBus) {
  return {
    type: CONNECTING_FAILED,
    eventBus
  };
}

export function hubConnected(time) {
  return (dispatch, getState) => {
    dispatch({
      type: HUB_CONNECTED,
      time
    });
    dispatch(fetchInitialData()); // (re)initialize
  };
}

export function hubDisconnected(time) {
  return {
    type: HUB_DISCONNECTED,
    time
  };
}

// Only exported for unit tests
export function calculateLogMemory(allLogs) {
  return {
    type: CALCULATE_LOG_MEMORY,
    allLogs
  };
}

export function newError(error) {
  return {
    type: NEW_ERROR,
    error
  };
}

// THUNKS

/* handleNewLog can potentially cause 3 types of actions: NEW_LOG (always),
CALCULATE_LOG_MEMORY (every -AVERAGE_MEMCALC_INTERVAL-) and REMOVE_OLDEST_LOG (if the memory limit is reached) */
export function handleNewLog(message) {
  return (dispatch, getState) => {
    dispatch(newLog(message));
    // This dispatch causes a new log entry and an increment of logsCount and totalThroughput
    // Check if a new Memory calculation is needed
    if (
      getState().getIn(["logMemoryCalculation", "totalThroughput"]) %
        AVERAGE_MEMCALC_INTERVAL -
        1 ===
      0
    ) {
      // concat the logs Arrays/ Lists of all devices to one big Array/ List (allLogs)
      const allLogs = selectAllLogs(getState());
      dispatch(calculateLogMemory(allLogs));
    }
    const maxLogs = getState().getIn([
      "logMemoryCalculation",
      "maximumAmountOfLogs"
    ]);
    const currAmountOfLogs = selectNumberOfAllLogs(getState());
    const remainigLogs = maxLogs - currAmountOfLogs;
    // Check if the limit is reached (maximumAmountOfLogs >= currAmountOfLogs)
    if (remainigLogs <= 0) {
      // Remove oldest logs as often as the maxLogs limit is exceeded
      let oldestLogId = "";
      for (let i = 0; i < remainigLogs * -1; i++) {
        oldestLogId = selectOldestLog(getState());
        dispatch(removeOldestLog(oldestLogId));
      }
    }
  };
}

export function handleNewSub(deviceId) {
  return (dispatch, getState) => {
    dispatch(addingNewSub(deviceId)); // Display Loading Spinner until the handler is created.
    const eventBus = getState().getIn(["connection", "eventBus"]);
    const isConnected = getState().getIn(["connection", "eventBusConnected"]);
    if (isConnected) {
      // registerNewHandler dispatches a NEW_SUB action when the handler is created succesfully
      registerNewDeviceHandler(eventBus, deviceId, dispatch);
    }
    // Otherwise, the onOpen callback will call registerNewHandler for all pending devices.
  };
}

export function handleDeleteSub(deviceId) {
  return (dispatch, getState) => {
    dispatch(deletingSub(deviceId));
    const eventBus = getState().getIn(["connection", "eventBus"]);
    const isConnected = getState().getIn(["connection", "eventBusConnected"]);
    if (isConnected) {
      unregisterHandler(eventBus, deviceId, dispatch);
    }
  };
}

export function eventBusConnect() {
  return (dispatch, getState) => {
    useWebsockets(dispatch, getState);
  };
  // Otherwise, the onOpen callback will call unregisterHandler for all pending unsubscribes.
}
