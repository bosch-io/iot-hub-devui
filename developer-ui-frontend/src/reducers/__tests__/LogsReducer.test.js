/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import logsReducer, { initialState } from "../LogsReducer"; // initialState is already an Immutable Map
import {
  exampleNewLogAction,
  exampleRemoveOldestLogAction
} from "__mocks__/actionMocks";
import { exampleState } from "__mocks__/storeMocks/stateMocks";
import { calculateLogId } from "utils";

describe("LogsReducer", () => {
  test("> NEW_LOG should parse the message to a format with id, time and message properties", () => {
    const result = logsReducer(initialState, exampleNewLogAction);
    const expectedLogId = calculateLogId(exampleNewLogAction.message);
    const generatedLogObject = result.getIn(["byId", expectedLogId]).toJS();
    expect(generatedLogObject).toHaveProperty("id", expectedLogId);
    expect(generatedLogObject).toHaveProperty("time");
    expect(generatedLogObject).toHaveProperty("message");
  });
  test("> NEW_LOG should parse the message itself to a format with type, deviceId, contentType, content and applicationProperties properties", () => {
    const result = logsReducer(initialState, exampleNewLogAction);
    const expectedLogId = calculateLogId(exampleNewLogAction.message);
    const parsedMessage = result
      .getIn(["byId", expectedLogId, "message"])
      .toJS();
    expect(parsedMessage).toHaveProperty("type");
    expect(parsedMessage).toHaveProperty("deviceId");
    expect(parsedMessage).toHaveProperty("contentType");
    expect(parsedMessage).toHaveProperty("content");
    expect(parsedMessage).toHaveProperty("applicationProperties");
  });
  test("> NEW_LOG should add the parsed and formatted message to byId and the log's id to allIds", () => {
    const result = logsReducer(initialState, exampleNewLogAction);
    const expectedLogId = calculateLogId(exampleNewLogAction.message);
    expect(result.getIn(["allIds", 0])).toEqual(expectedLogId);
  });
  const initialStateWithLogs = exampleState.get("logs");
  test("> REMOVE_OLDEST_LOG should delete an id in allIds", () => {
    const initialAllLogsLength = initialStateWithLogs.get("allIds").size;
    const result = logsReducer(
      initialStateWithLogs,
      exampleRemoveOldestLogAction
    );
    expect(result.get("allIds").size).toEqual(initialAllLogsLength - 1);
  });
  test("> REMOVE_OLDEST_LOG should delete the first id in allIds", () => {
    const initiallySecondLogId = initialStateWithLogs.getIn(["allIds", 1]);
    // Second log id should get first log id
    const result = logsReducer(
      initialStateWithLogs,
      exampleRemoveOldestLogAction
    );
    expect(result.getIn(["allIds", 0])).toEqual(initiallySecondLogId);
  });
  test("> REMOVE_OLDEST_LOG should delete the corresponding log object in byId", () => {
    const result = logsReducer(
      initialStateWithLogs,
      exampleRemoveOldestLogAction
    );
    expect(
      result.getIn(["byId", exampleRemoveOldestLogAction.id])
    ).toBeUndefined();
  });
  test("> REMOVE_OLDEST_LOG should use the log with the lowest timestamp i.e. this should always be first in allIds", () => {
    const oldestId = initialStateWithLogs
      .get("byId")
      // Take the value of each key and push to an array
      .toArray()
      // find log with minimum timestamp
      .reduce((curr, acc) => (curr.get("time") < acc.get("time") ? curr : acc))
      // get the logs id
      .get("id");
    expect(initialStateWithLogs.getIn(["allIds", 0])).toEqual(oldestId);
  });
});
