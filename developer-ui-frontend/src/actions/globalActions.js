/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { LOAD_STORE_PRESET, ADD_CUSTOM_NOTIFICATION } from "./actionTypes";

export const loadStorePreset = preset => {
  return {
    type: LOAD_STORE_PRESET,
    preset
  };
};

export const addCustomNotification = (message, level) => {
  return {
    type: ADD_CUSTOM_NOTIFICATION,
    message,
    level
  };
};
