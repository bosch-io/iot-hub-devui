/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
export const selectAllLogs = state =>
  state.get("allIds").map(id => state.getIn(["byId", id]));
export const selectNumberOfAllLogs = state => state.get("allIds").size;
export const selectOldestLog = state => state.getIn(["allIds", 0]);
export const selectNewestLog = state =>
  state.getIn(["allIds", selectNumberOfAllLogs(state) - 1]);
