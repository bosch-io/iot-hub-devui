/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import configureStore from "redux-mock-store";
import * as filterActions from "../FilterActions";
import * as actionTypes from "../actionTypes";
import { exampleFilterDeviceId } from "__mocks__/storeMocks/filterMocks";
import { calculateFilterId } from "utils";

const middlewares = [];
const mockStore = configureStore(middlewares);

describe("FilterActions Action Creators", () => {
  test("newFilter should dispatch an action with the filter argument in the payload", () => {
    // Initialize mockstore with empty state
    const store = mockStore({});
    // Dispatch the action
    store.dispatch(filterActions.newFilter(exampleFilterDeviceId));
    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.NEW_FILTER,
      filter: exampleFilterDeviceId
    };
    expect(actions).toEqual([expectedPayload]);
  });

  test("removeFilter should dispatch an action with the filterId argument in the payload", () => {
    const store = mockStore({});
    const filterId = calculateFilterId(
      exampleFilterDeviceId.get("type"),
      exampleFilterDeviceId.get("value")
    );
    store.dispatch(filterActions.removeFilter(filterId));
    const expectedPayload = {
      type: actionTypes.REMOVE_FILTER,
      filterId
    };
    expect(store.getActions()).toEqual([expectedPayload]);
  });
});
