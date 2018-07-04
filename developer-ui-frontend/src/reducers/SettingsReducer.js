/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { fromJS } from "immutable";
import {
  SUBMIT_SETTINGS,
  CHANGE_SORTING,
  TENANT_FETCHED
} from "actions/actionTypes";

export const initialState = fromJS({
  scrollAnimationActive: true,
  numberOfFeedLines: 50,
  logsSorting: {
    category: "unsorted",
    ascending: false
  },
  tenant: null
});

const logsSorting = (state, action) => {
  switch (action.type) {
    case CHANGE_SORTING:
      // Second click on sorting button triggers switching from descending ▾ to ascending ▴ sorting order in that category.
      const isDescendingNew =
        state.get("category") === action.category && !state.get("ascending")
          ? false
          : true;
      // Third click on sorting button removes sorting order and sets category to 'unsorted' again
      const removeSortingCategory =
        state.get("category") === action.category && state.get("ascending")
          ? true
          : false;
      if (!isDescendingNew) {
        return state.set("ascending", true);
      } else if (removeSortingCategory) {
        // "No sorting" = Most recent last in table
        return state.set("category", "unsorted");
      }
      // A different category was selected -> First click (state.get('category') !== action.category)
      let newSortingConfig = state.set("category", action.category);
      // Always start at descending ▾ order
      newSortingConfig = newSortingConfig.set("ascending", false);
      // update sorting Configuration
      return newSortingConfig;
    default:
      return state; // Initialized one step higher by settingsReducer (no default argument syntax needed)
  }
};
const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_SETTINGS:
      if (action.setting.setting !== "bufferSize") {
        return state.set(action.setting["setting"], action.setting["value"]); // eslint-disable-line
      } // bufferSize is stored in logMemoryCalculation -> bufferSize and handled by LogMemoryCalculationReducer
      return state;
    case CHANGE_SORTING:
      return state.update("logsSorting", order => logsSorting(order, action));
    case TENANT_FETCHED:
      return state.set("tenant", action.tenant);
    default:
      return state;
  }
};

export default settingsReducer;
