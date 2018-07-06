/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { applyMiddleware, createStore, compose } from "redux";
import developerUi from "./reducers/index";
import thunkMiddleware from "redux-thunk";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash.throttle";
import { fromJS } from "immutable";

const persistedState = loadState();
// For Redux dev tools browser extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  developerUi,
  persistedState, // Initialize from persisted state in localStorage
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

// Store listener for persisting the state (localStorage)
// Everything that is ui state or session related is set to undefined
// and therefore initialized inside the reducers with their initialState configuration
store.subscribe(
  throttle(() => {
    saveState(
      store.getState().withMutations(state => {
        // Save just the subscriptions and the registrations
        const partialState = state
          .set("connection", undefined) // Don't persist connection state
          .set("logs", undefined) // Don't persist the logs
          .set("logMemoryCalculation", undefined) // Don't persist calculations for dynamic log buffer
          .set("filters", undefined) // Don't persist ui state
          .set("form", undefined)
          .set("credentials", undefined) // Don't persist the credentials
          .setIn(["settings", "tenant"], undefined); // Don't persist the tenant information
        partialState.getIn(["devices", "allIds"]).forEach((
          deviceId // isSubsribed is also connection specific - don't persist!
        ) => {
          partialState.setIn(
            ["devices", "byId", deviceId, "isSubscribed"],
            false
          );
          partialState.setIn(
            ["devices", "byId", deviceId, "currentlyActive"],
            false
          );
          partialState.setIn(["devices", "byId", deviceId, "logs"], fromJS([]));
          partialState.setIn(
            ["devices", "byId", deviceId, "credentials"],
            fromJS([])
          );
        });
        return partialState;
      })
    );
  }, 1000) // persist state at most once a second (JSON.stringify is expensive)
);

export default store;
