/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import connectionReducer, { initialState } from "../ConnectionReducer";
import { fromJS } from "immutable";
import { CONNECT_TO_EVENTBUS } from "actions/actionTypes";
import {
  exampleConnectedAction,
  exampleDisconnectedAction
} from "__mocks__/actionMocks";
import { exampleEventBus } from "__mocks__/storeMocks/stateMocks";

describe("ConnectionReducer", () => {
  it("should have initial state on empty call", () => {
    expect(connectionReducer()).toEqual(initialState);
  });

  it("should not change state on unknown action types", () => {
    expect(connectionReducer(undefined, { type: "NOT_EXISTING" })).toEqual(
      initialState
    );
  });

  test("> CONNECT_TO_EVENTBUS switches eventBusConnected to false", () => {
    expect(
      connectionReducer(initialState.set("eventBusConnected", true), {
        type: CONNECT_TO_EVENTBUS
      })
    ).toEqual(initialState);
  });

  test("> CONNECT_TO_EVENTBUS does not change eventBus when eventBus is already false (initial)", () => {
    expect(
      connectionReducer(initialState, { type: CONNECT_TO_EVENTBUS })
    ).toEqual(initialState);
  });

  const expectedConnectionReturn = fromJS({
    eventBus: exampleEventBus,
    eventBusConnected: true,
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

  test("> EVENTBUS_CONNECTED switches eventBusConnected to true", () => {
    expect(connectionReducer(initialState, exampleConnectedAction)).toEqual(
      expectedConnectionReturn
    );
  });

  test("> EVENTBUS_CONNECTED does not change eventBusConnected when connected is already true", () => {
    expect(
      connectionReducer(expectedConnectionReturn, exampleConnectedAction)
    ).toEqual(expectedConnectionReturn);
  });

  const expectedDisconnectReturn = fromJS({
    eventBus: exampleEventBus,
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

  test("> EVENTBUS_DISCONNECTED switches eventBusConnected to false", () => {
    expect(
      connectionReducer(
        initialState.set("eventBusConnected", true),
        exampleDisconnectedAction
      )
    ).toEqual(expectedDisconnectReturn);
  });

  test("> EVENTBUS_DISCONNECTED does not change eventBusConnected when connected is already false", () => {
    expect(
      connectionReducer(expectedDisconnectReturn, exampleDisconnectedAction)
    ).toEqual(expectedDisconnectReturn);
  });
});
