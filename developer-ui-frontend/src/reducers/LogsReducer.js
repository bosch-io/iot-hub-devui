/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { fromJS } from "immutable";
import {
  NEW_LOG,
  REMOVE_OLDEST_LOG,
  REMOVE_ALL_LOGS
} from "actions/actionTypes";
import { calculateLogId } from "utils";

export const initialState = fromJS({
  byId: {},
  allIds: [] // Sorted chronologically - Computations/ Different sortings calculated in selectors
});

const logsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case NEW_LOG:
      const logId = calculateLogId(action.message);
      const log = fromJS({
        id: logId,
        time: action.message.timestamp,
        message: JSON.parse(action.message.body)
      });
      return state.withMutations(reducedState =>
        reducedState
          .update("allIds", ids => ids.push(logId))
          .setIn(["byId", logId], log)
      );
    case REMOVE_OLDEST_LOG:
      return state.withMutations(reducedState =>
        reducedState
          .update("allIds", ids => ids.delete(0))
          .deleteIn(["byId", action.id])
      );
    case REMOVE_ALL_LOGS:
      return initialState; // Reinitialize the logs
    default:
      return state;
  }
};

export default logsReducer;
