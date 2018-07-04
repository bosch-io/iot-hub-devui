/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { fromJS } from "immutable";

export const loadState = () => {
  try {
    // Getting the state from localStorage can fail due to user privacy settings
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined; // Leave it over to the reducers to initialize the state.
    }
    return fromJS(JSON.parse(serializedState)).toOrderedMap();
  } catch (error) {
    console.error(
      "localStorage getItem failed. Using default initializations. Check your User Privacy Settings."
    );
    return undefined; // Leave it over to the reducers to initialize the state.
  }
};

export const saveState = state => {
  // Could fail if state is not serializable (Should not be possible in Redux apps unless you're doing sth. wrong)
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.error(
      "localStorage setItem failed. Check your User Privacy Settings."
    );
  }
};
