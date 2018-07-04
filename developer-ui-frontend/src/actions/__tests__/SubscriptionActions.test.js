/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import configureStore from "redux-mock-store";
import * as subscriptionActions from "../SubscriptionActions";
import * as actionTypes from "../actionTypes";
import { createExampleSubWOLogs } from "__mocks__/storeMocks/deviceMocks";
import { exampleEventBus } from "__mocks__/storeMocks/stateMocks";

const middlewares = [];
const mockStore = configureStore(middlewares);

describe("SubscriptionActions Action Creators", () => {
  test("newSubCreated should dispatch an action with the deviceId argument and the eventBus in the payload", () => {
    // The updated instance of the eventBus object is needed as a subscription change also leads to a new websocket channel
    // Initialize mockstore with empty state
    const store = mockStore({});
    const newSubId = "TestDevice1";
    // Dispatch the action
    store.dispatch(
      subscriptionActions.newSubCreated(exampleEventBus, newSubId)
    );
    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.NEW_SUB,
      eventBus: exampleEventBus,
      deviceId: newSubId
    };
    expect(actions).toEqual([expectedPayload]);
  });

  test("subDeleted should dispatch an action with the deviceId argument and the eventBus in the payload", () => {
    const store = mockStore({});
    const deletedSubId = "TestDevice1";
    store.dispatch(
      subscriptionActions.subDeleted(exampleEventBus, deletedSubId)
    );
    const expectedPayload = {
      type: actionTypes.SUB_DELETED,
      eventBus: exampleEventBus,
      deviceId: deletedSubId
    };
    expect(store.getActions()).toEqual([expectedPayload]);
  });
});
