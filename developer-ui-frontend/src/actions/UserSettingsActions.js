/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { SUBMIT_SETTINGS, CHANGE_SORTING } from "./actionTypes";
import { removeOldestLog } from "./LogActions";
import { selectNumberOfAllLogs } from "reducers/selectors";

export function changeSorting(category) {
  return {
    type: CHANGE_SORTING,
    category
  };
}

export function updateSetting(setting) {
  // If the setting that was dispatched is not a new bufferSize, no further actions have to be dispatched
  if (setting.setting !== "bufferSize") {
    return {
      type: SUBMIT_SETTINGS,
      setting
    };
  }
  // In case of a new bufferSize, the SUBMIT_SETTINGS action causes
  // a recalculation of maximumAmountOfLogs in the LogMemoryCalculationReducer
  // and therefore, in case that the maximumAmountOfLogs is exceeded, a REMOVE_OLDEST_LOG
  // must be called until the current amount of logs equals the maximumAmountOfLogs
  return (dispatch, getState) => {
    dispatch({
      type: SUBMIT_SETTINGS,
      setting
    });
    const maxLogs = getState().getIn([
      "logMemoryCalculation",
      "maximumAmountOfLogs"
    ]);
    const currAmountOfLogs = selectNumberOfAllLogs(getState());
    const remainigLogs = maxLogs - currAmountOfLogs;
    // Check if the limit is reached (maximumAmountOfLogs >= logsCount)
    if (remainigLogs <= 0) {
      // Remove oldest logs as often as the maxLogs limit is exceeded
      for (let i = 0; i < remainigLogs * -1; i++) {
        dispatch(removeOldestLog());
      }
    }
  };
}
