/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { fromJS } from "immutable";
import { calculateFilterId } from "utils";

// Filters in the format that is sent in the action payload under the filter property

export const exampleFilterType = fromJS({
  type: "Type",
  value: "event"
});

export const exampleFilterDeviceId = fromJS({
  type: "Device Id",
  value: "4731"
});

export const exampleFilterDeviceId2 = fromJS({
  type: "Device Id",
  value: "TestDevice1"
});

export const exampleFilterContentType = fromJS({
  type: "Content-Type",
  value: "json"
});

// Filters in the format that is stored in the store under activeFilters property

export const exampleTypeFilterInStore = fromJS({
  type: "Type",
  value: "event",
  id: calculateFilterId("Type", "event")
});

export const exampleDeviceFilterInStore = fromJS({
  type: "Device Id",
  value: "TestDevice1",
  id: calculateFilterId("Device Id", "TestDevice1")
});

export const exampleContentFilterInStore = fromJS({
  type: "Content-Type",
  value: "json",
  id: calculateFilterId("Content-Type", "json")
});
