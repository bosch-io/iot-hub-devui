/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { fromJS } from "immutable";
import { NEW_FILTER, REMOVE_FILTER } from "actions/actionTypes";
import { calculateFilterId } from "utils";

export const initialState = fromJS({
  byId: {},
  allIds: []
});

const filterReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case NEW_FILTER:
      const filterId = calculateFilterId(
        action.filter.get("type"),
        action.filter.get("value")
      );
      // No duplicate filters! (should have been validated anyway)
      if (!state.get("allIds").includes(filterId)) {
        const newFilter = action.filter.set("id", filterId);
        return state.withMutations(reducedState =>
          reducedState
            .update("allIds", ids => ids.push(filterId))
            .setIn(["byId", filterId], newFilter)
        );
      }
      return state;
    case REMOVE_FILTER:
      const allIdsIndex = state.get("allIds").indexOf(action.filterId);
      if (allIdsIndex !== -1) {
        return state.withMutations(reducedState =>
          reducedState
            .deleteIn(["byId", action.filterId])
            .update("allIds", ids => ids.splice(allIdsIndex, 1))
        );
      }
      return new Error("unknown FilterId");
    default:
      return state;
  }
};

export default filterReducer;
