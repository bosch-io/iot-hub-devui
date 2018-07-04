/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
export const selectAllFilters = state =>
  state.get("allIds").map(id => state.getIn(["byId", id]));

export const selectNumberOfAllFilters = state => state.get("allIds").size;

export const selectAllFiltersByCategory = (state, category) => {
  const aggregatedFilters = state
    .get("allIds")
    .filter(id => state.getIn(["byId", id, "type"]) === category)
    .map(filteredId => state.getIn(["byId", filteredId]));
  return aggregatedFilters;
};
