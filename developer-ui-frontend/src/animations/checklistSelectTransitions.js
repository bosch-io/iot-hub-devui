/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { spring } from "react-motion";

export const defaultStyleConfig = { height: 0, opacity: 0 };

export const mapDataToTransitionStyle = (styleConfig, data) =>
  data.map(entry => ({
    key: entry.text,
    data,
    style: styleConfig
  }));

export const startingStyleConfig = {
  height: spring(49, { stiffness: 210, damping: 17 }),
  opacity: spring(1, { stiffness: 210, damping: 17 })
};

export const getDefaultStyles = data =>
  mapDataToTransitionStyle(defaultStyleConfig, data);

export const willEnter = () => ({
  height: 0,
  opacity: 1
});

export const willLeave = () => ({
  height: spring(0),
  opacity: spring(0)
});
