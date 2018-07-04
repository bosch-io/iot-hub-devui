/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import logMemoryCalculation, {
  calculateAverageLogSize,
  roughSizeOfObject,
  initialSettings as initialState
} from "../LogMemoryCalculationReducer";
import { exampleCalculateLogMemoryAction } from "__mocks__/actionMocks";
import {
  exampleLongMessageInStore,
  exampleShortMessageInStore
} from "__mocks__/storeMocks/messageMocks";
import { AVERAGE_MEMCALC_INTERVAL } from "_APP_CONSTANTS";
import { fromJS } from "immutable";

const createExampleLogs = callCount => {
  let exampleAllLogs = [];
  if (callCount <= 0) {
    throw new Error("callCount argument must be at least 1");
  } else {
    for (let i = 0; i < (callCount - 1) * AVERAGE_MEMCALC_INTERVAL; i++) {
      const newLog =
        Math.random() < 0.5
          ? exampleLongMessageInStore
          : exampleShortMessageInStore;
      exampleAllLogs.push(newLog);
    }
    exampleAllLogs = fromJS(exampleAllLogs);
    return exampleAllLogs;
  }
};

describe("LogMemoryCalculationReducer", () => {
  // allLogs property gets passed through the thunk handleNewLog
  test("> CALCULATE_LOG_MEMORY should calculate the averageSizeOfLog by doing a rough average calculation: only one log", () => {
    // roughSizeOfObject(exampleShortMessageInStore) === 82 -> only log -> expect 82 (Byte)
    expect(
      logMemoryCalculation(initialState, exampleCalculateLogMemoryAction).get(
        "averageSizeOfLog"
      )
    ).toEqual(126);
  });

  test("> CALCULATE_LOG_MEMORY should cause rough calculations on every second log", () => {
    /* The CALCULATE_LOG_MEMORY action is fired on every AVERAGE_MEMCALC_INTERVAL log. To simulate the second calculation
       (first is on the first log), we need to pass a log list of AVERAGE_MEMCALC_INTERVAL length. */
    const exampleLogs = createExampleLogs(2);
    const mockFn = jest.fn();
    // The implementation is not so expensive, mock functionality is just used for counting the calls.
    mockFn.mockImplementation(roughSizeOfObject);
    calculateAverageLogSize(
      initialState.set("memCalcCounter", 1), // Simulate the second calculation
      exampleLogs,
      mockFn
    );
    // 5 Logs in the list -> Calculate on every second -> 3 calculation calls are expected (first, third and fifth log)
    expect(mockFn.mock.calls.length).toEqual(3);
  });

  test("> CALCULATE_LOG_MEMORY should continue from the last used index at the last calculation in all logs", () => {
    // Third call starts the new average calculation at AVERAGE_MEMCALC_INTERVAL and ends at 2*AVERAGE_MEMCALC_INTERVAL
    const exampleLogs = createExampleLogs(3);
    const mockFn = jest.fn();
    mockFn.mockImplementation(roughSizeOfObject);
    calculateAverageLogSize(
      initialState.set("memCalcCounter", 2), // Simulate the third calculation
      exampleLogs,
      mockFn
    );
    /* 10 Logs in the list -> Calculate on every second beginning at index 6 -> still 3 calculation calls are expected
       (sixth, eighth and tenth log) */
    expect(mockFn.mock.calls.length).toEqual(3);
  });
});
