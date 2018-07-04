/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { fromJS } from "immutable";
import { calculateLogId } from "utils";
import devicesReducer, { initialState } from "../DevicesReducer"; // initialState is already an Immutable Map
import {
  exampleNewLogAction,
  exampleRemoveOldestLogAction,
  exampleDeleteSubAction,
  exampleAddSubAction,
  exampleDeletingSubAction,
  exampleAddingSubAction
} from "__mocks__/actionMocks";
import {
  exampleShortMessageInStore,
  exampleLongMessageInStore
} from "__mocks__/storeMocks/messageMocks";
import {
  hubDevPresetRegistrations as exampleInitialState,
  createExampleSubWOLogs,
  createExampleReg
} from "__mocks__/storeMocks/deviceMocks";

describe("DevicesReducer", () => {
  it("should have initial state on empty call", () => {
    expect(devicesReducer()).toEqual(initialState);
  });

  it("should not change state on unknown action types", () => {
    expect(devicesReducer(undefined, { type: "NOT_EXISTING" })).toEqual(
      initialState
    );
  });

  test("> NEW_LOG should push a new logId to the logs array of the corresponding device", () => {
    const initialStateWithSub = exampleInitialState.setIn(
      ["byId", "4746", "isSubscribed"],
      true
    );
    const expectedLogsReturn = fromJS([
      calculateLogId(exampleNewLogAction.message)
    ]);
    const result = devicesReducer(initialStateWithSub, exampleNewLogAction);
    expect(result.getIn(["byId", "4746", "logs"])).toEqual(expectedLogsReturn);
  });

  test("> NEW_LOG should make the corresponding subscribed device currentlyActive", () => {
    const result = devicesReducer(exampleInitialState, exampleNewLogAction);
    expect(result.getIn(["byId", "4746", "currentlyActive"])).toBeTruthy();
  });

  test("> REMOVE_OLDEST_LOG should delete the the corresponding logId from the logs array of the corresponding device", () => {
    const initialStateWithSubsAndLogs = exampleInitialState
      .setIn(["byId", "4746", "isSubscribed"], true)
      .setIn(["byId", "HubTester", "isSubscribed"], true)
      .setIn(["byId", "4746", "logs"], fromJS([exampleShortMessageInStore.id]))
      .setIn(
        ["byId", "HubTester", "logs"],
        fromJS([exampleLongMessageInStore.id])
      );

    const result = devicesReducer(
      initialStateWithSubsAndLogs,
      exampleRemoveOldestLogAction // Should remove the log from 4746 (deviceId of exampleShortMessage)
    );
    expect(result.getIn(["byId", "4746", "logs"]).size).toEqual(0);
  });

  const initialStateWithSubs = fromJS({
    byId: {
      0: createExampleReg("0"),
      1: createExampleSubWOLogs("1"),
      2: createExampleSubWOLogs("2")
    },
    allIds: ["0", "1", "2"]
  });

  test("> DELETING_SUB should set configuredSubscribed in the device with the corresponding id to false", () => {
    const result = devicesReducer(
      initialStateWithSubs,
      exampleDeletingSubAction
    );
    expect(result.getIn(["byId", "1", "configuredSubscribed"])).toBeFalsy();
  });

  test("> SUB_DELETED should set isSubscribed in the device with the corresponding id to false", () => {
    const result = devicesReducer(
      initialStateWithSubs,
      exampleDeleteSubAction // Should delete sub with deviceId '1'
    );
    expect(result.getIn(["byId", "1", "isSubscribed"])).toBeFalsy();
  });

  test("> ADDING_SUB should set configuredSubscribed in the device with the corresponding id to true", () => {
    const result = devicesReducer(initialStateWithSubs, exampleAddingSubAction);
    expect(result.getIn(["byId", "0", "configuredSubscribed"])).toBeTruthy();
  });

  test("> NEW_SUB should set isSubscribed in the device with the corresponding id to true", () => {
    const result = devicesReducer(initialStateWithSubs, exampleAddSubAction); // Should add sub with deviceId '0'
    expect(result.getIn(["byId", "0", "isSubscribed"])).toBeTruthy();
  });
});
