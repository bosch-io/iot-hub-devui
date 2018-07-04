/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { NEW_SUB, SUB_DELETED, ADDING_SUB, DELETING_SUB } from "./actionTypes";

export function newSubCreated(eventBus, deviceId) {
  return {
    type: NEW_SUB,
    deviceId,
    eventBus
  };
}

export function subDeleted(eventBus, deviceId) {
  return {
    type: SUB_DELETED,
    deviceId,
    eventBus
  };
}

export function addingNewSub(deviceId) {
  return {
    type: ADDING_SUB,
    deviceId
  };
}

export function deletingSub(deviceId) {
  return {
    type: DELETING_SUB,
    deviceId
  };
}
