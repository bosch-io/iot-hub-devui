/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { AVERAGE_MEMCALC_INTERVAL } from "_APP_CONSTANTS";
import {
  CALCULATE_LOG_MEMORY,
  SUBMIT_SETTINGS,
  NEW_LOG
} from "actions/actionTypes";
import { fromJS } from "immutable";

export const initialSettings = fromJS({
  averageSizeOfLog: null,
  maximumAmountOfLogs: null,
  memCalcCounter: 0,
  totalThroughput: 0, // Total amount of logs that have went through the application
  bufferSize: 200
});

export const calculateAverageLogSize = (state, allLogs, calcFn) => {
  let sizeOfLog = 0;
  if (allLogs.size === 1) {
    sizeOfLog = calcFn(allLogs.get(0).toJS());
  } else {
    let sum = 0;
    const startIndex =
      (state.get("memCalcCounter") - 1) * AVERAGE_MEMCALC_INTERVAL;
    for (
      let i = startIndex;
      i < startIndex + AVERAGE_MEMCALC_INTERVAL;
      i += 2
    ) {
      sum += calcFn(allLogs.get(i).toJS());
    }
    const newAverage = sum / parseInt((AVERAGE_MEMCALC_INTERVAL + 1) / 2, 10);
    // return average of newAverage and current average (impact of newAverage on the returned overall average gets smaller over time)
    sizeOfLog =
      (state.get("averageSizeOfLog") * (state.get("memCalcCounter") - 1) +
        newAverage) /
      state.get("memCalcCounter");
  }
  return sizeOfLog;
};

const calculateMaxArraySize = state => {
  const bufferSize = state.get("bufferSize");
  const averageSizeOfLog = state.get("averageSizeOfLog");
  const newArraySize = parseInt((bufferSize * 1000000) / averageSizeOfLog, 10);
  console.log(
    "New Average Memory Consumption Report: ",
    state.get("averageSizeOfLog"),
    " Bytes/log"
  );
  console.log(
    "With set Buffer Size of: ",
    bufferSize,
    "MB -> Possible Log Entries in JS Heap: ",
    newArraySize
  );

  return newArraySize;
};

export const roughSizeOfObject = object => {
  const objectList = [];
  const stack = [object];
  let bytes = 0;

  while (stack.length) {
    const value = stack.pop();

    if (typeof value === "boolean") {
      bytes += 4;
    } else if (typeof value === "string") {
      bytes += value.length * 2;
    } else if (typeof value === "number") {
      bytes += 8;
    } else if (typeof value === "object" && objectList.indexOf(value) === -1) {
      objectList.push(value);
      /* eslint-disable guard-for-in */
      for (const i in value) {
        stack.push(value[i]);
      }
      /* eslint-enable */
    }
  }
  return bytes;
};

const logMemoryCalculation = (state = initialSettings, action) => {
  switch (action.type) {
    case CALCULATE_LOG_MEMORY:
      const newState = state.set(
        "averageSizeOfLog",
        calculateAverageLogSize(state, action.allLogs, roughSizeOfObject)
      );
      return newState.withMutations(reducedState => {
        reducedState
          .set("maximumAmountOfLogs", calculateMaxArraySize(newState, action))
          .update("memCalcCounter", val => val + 1);
      });
    case SUBMIT_SETTINGS:
      if (action.setting.setting === "bufferSize") {
        return state.withMutations(reducedState => {
          reducedState
            .set("bufferSize", action.setting.value)
            .set(
              "maximumAmountOfLogs",
              calculateMaxArraySize(state, action.setting.value)
            );
        });
      }
      return state;
    case NEW_LOG:
      return state.update("totalThroughput", value => value + 1);
    default:
      return state;
  }
};

export default logMemoryCalculation;
