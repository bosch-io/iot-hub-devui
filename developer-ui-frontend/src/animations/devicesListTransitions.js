/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { spring } from "react-motion";

export const startingStyleConfig = {
  height: spring(60, { stiffness: 210, damping: 17 }),
  opacity: spring(1, { stiffness: 210, damping: 17 })
};

export const startingStyleConfigRegistrySearch = {
  height: spring(49, { stiffness: 210, damping: 17 }),
  opacity: spring(1, { stiffness: 210, damping: 17 })
};

export const defaultStyleConfig = { height: 0, opacity: 0 };

export const mapDevicesToTransitionStyle = (styleConfig, devices) =>
  devices.map(device => ({
    key: device.deviceId,
    data: {
      deviceId: device.deviceId,
      lastActive: device.lastActive,
      currentlyActive: device.currentlyActive,
      isSubscribed: device.isSubscribed
    },
    style: styleConfig
  }));

export const willEnter = () => ({
  height: 0,
  opacity: 1
});

export const willLeave = () => ({
  height: spring(0),
  opacity: spring(0)
});

export const getDefaultStyles = devices =>
  mapDevicesToTransitionStyle(defaultStyleConfig, devices);
