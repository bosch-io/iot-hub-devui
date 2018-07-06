/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import store from "store";
import { selectAllDevices } from "reducers/selectors";

export const noDuplicateDevices = deviceId => {
  const allDevices = selectAllDevices(store.getState());
  const deviceAlreadyExisting = allDevices.some(
    device => device.get("deviceId") === deviceId
  );

  return deviceAlreadyExisting
    ? "This device has already been added"
    : undefined;
};
