/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { NEW_LOG, REMOVE_OLDEST_LOG, REMOVE_ALL_LOGS } from "./actionTypes";

// Only exported for unit tests
export function newLog(message) {
  return {
    type: NEW_LOG,
    message
  };
}

export function removeOldestLog(logId) {
  return {
    type: REMOVE_OLDEST_LOG,
    id: logId
  };
}

export function removeAllLogs() {
  return {
    type: REMOVE_ALL_LOGS
  };
}
