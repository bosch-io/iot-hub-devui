/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import configureStore from "redux-mock-store";
import * as websocketActions from "../WebsocketActions";
import * as logActions from "../LogActions";
import * as actionTypes from "../actionTypes";
import thunk from "redux-thunk";
import { exampleEventBus } from "__mocks__/storeMocks/stateMocks";
import {
  exampleShortMessageInStore,
  exampleLongMessageInStore,
  exampleShortMessage
} from "__mocks__/storeMocks/messageMocks";
import { createExampleSubWOLogs } from "__mocks__/storeMocks/deviceMocks";
import { AVERAGE_MEMCALC_INTERVAL } from "_APP_CONSTANTS";
import { fromJS } from "immutable";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("WebsocketActions Thunks and Action Creators", () => {
  test("connecting should dispatch an action with no payload", () => {
    // Initialize mockstore with empty state
    const store = mockStore({});
    // Dispatch the action
    store.dispatch(websocketActions.connecting());
    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.CONNECT_TO_EVENTBUS
    };
    expect(actions).toEqual([expectedPayload]);
  });

  test("connected should dispatch an action with the eventBus in the payload", () => {
    const store = mockStore({});
    store.dispatch(websocketActions.connected(exampleEventBus));
    const expectedPayload = {
      type: actionTypes.EVENTBUS_CONNECTED,
      eventBus: exampleEventBus
    };
    expect(store.getActions()).toEqual([expectedPayload]);
  });

  test("calculateLogMemory should dispatch an action with allLogs in the payload", () => {
    const store = mockStore({});
    const exampleAllLogs = [
      exampleShortMessageInStore,
      exampleLongMessageInStore
    ];
    store.dispatch(websocketActions.calculateLogMemory(exampleAllLogs));
    const expectedPayload = {
      type: actionTypes.CALCULATE_LOG_MEMORY,
      allLogs: exampleAllLogs
    };
    expect(store.getActions()).toEqual([expectedPayload]);
  });

  test("newLog should dispatch an action with the message in the payload", () => {
    const store = mockStore({});
    store.dispatch(logActions.newLog(exampleShortMessage));
    const expectedPayload = {
      type: actionTypes.NEW_LOG,
      message: exampleShortMessage
    };
    expect(store.getActions()).toEqual([expectedPayload]);
  });

  test("removeOldestLog should dispatch an action with no payload", () => {
    const store = mockStore({});
    store.dispatch(logActions.removeOldestLog());
    const expectedPayload = {
      type: actionTypes.REMOVE_OLDEST_LOG
    };
    expect(store.getActions()).toEqual([expectedPayload]);
  });

  test("newError should dispatch an action with the error in the payload", () => {
    const store = mockStore({});
    store.dispatch(websocketActions.newError("something went wrong"));
    const expectedPayload = {
      type: actionTypes.NEW_ERROR,
      error: "something went wrong"
    };
    expect(store.getActions()).toEqual([expectedPayload]);
  });

  // THUNKS
  const deviceIdShortMessages = exampleShortMessageInStore.message.deviceId;
  const deviceIdLongMessages = exampleLongMessageInStore.message.deviceId;
  const store = mockStore(
    fromJS({
      devices: {
        byId: {
          deviceIdShortMessages: createExampleSubWOLogs(
            deviceIdShortMessages
          ).set("logs", fromJS([exampleShortMessageInStore.id])),
          deviceIdLongMessages: createExampleSubWOLogs(
            deviceIdLongMessages
          ).set("logs", fromJS([exampleLongMessageInStore.id]))
        },
        allIds: [deviceIdShortMessages, deviceIdLongMessages]
      },
      logs: {
        byId: {
          [exampleShortMessageInStore.id]: exampleShortMessageInStore,
          [exampleLongMessageInStore.id]: exampleLongMessageInStore
        },
        allIds: [exampleShortMessageInStore.id, exampleLongMessageInStore.id]
      },
      logMemoryCalculation: {
        totalThroughput: AVERAGE_MEMCALC_INTERVAL - 1
      }
    })
  );
  test("handleNewLog should always dispatch a NEW_LOG action first", () => {
    store.dispatch(websocketActions.handleNewLog(exampleShortMessage));
    const expectedPayload = {
      type: actionTypes.NEW_LOG,
      message: exampleShortMessage
    };
    expect(store.getActions()[0]).toEqual(expectedPayload);
  });
});
