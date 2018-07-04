/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { NEW_FILTER, REMOVE_FILTER } from "./actionTypes";

export function newFilter(filter) {
  return {
    type: NEW_FILTER,
    filter
  };
}

export function removeFilter(filterId) {
  return {
    type: REMOVE_FILTER,
    filterId
  };
}
