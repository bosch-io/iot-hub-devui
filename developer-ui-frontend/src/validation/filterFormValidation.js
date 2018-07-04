/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import store from "store";
import { selectAllFilters } from "reducers/selectors";

export const valueRequired = value =>
  !value || value === "" ? "No empty Filters allowed" : undefined;

export const categoryRequired = type =>
  !type || type === "" ? "Choose a filter category first" : undefined;

export const noFilterDuplication = (value, type) => {
  const activeFilters = selectAllFilters(store.getState());
  const filterAlreadyExisting = activeFilters.some(
    filter => filter.get("type") === type && filter.get("value") === value
  );

  return filterAlreadyExisting
    ? "This filter has already been added"
    : undefined;
};
