/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { combineReducers } from "redux-immutable";
import connectionReducer from "./ConnectionReducer";
import devicesReducer from "./DevicesReducer";
import filterReducer from "./FilterReducer";
import settingsReducer from "./SettingsReducer";
import logsReducer from "./LogsReducer";
import logMemoryCalculation from "./LogMemoryCalculationReducer";
import notificationReducer from "./NotificationReducer";
import credentialsReducer from "./CredentialsReducer";
import formReducer from "./formReducer";
import { LOAD_STORE_PRESET } from "actions/actionTypes";

/**
 *  The main reducer for the application.
 *  The formReducer is managed by the ReduxForm library, the .plugin configures the filterSearchbar to clear the entered
 *  text after succesful submissions (Which lead to actions of type NEW_FILTER).
 **/
const appReducer = combineReducers({
  devices: devicesReducer,
  logs: logsReducer,
  connection: connectionReducer,
  settings: settingsReducer,
  filters: filterReducer,
  logMemoryCalculation: logMemoryCalculation,
  notification: notificationReducer,
  credentials: credentialsReducer,
  form: formReducer
});

let developerUi;
// Provide the possiblity to load entire store presets in development (e.g. with Storybook stories)
if (process.env.NODE_ENV === "development") {
  developerUi = (state, action) => {
    if (action.type === LOAD_STORE_PRESET) {
      /* eslint-disable no-param-reassign */
      state = action.preset;
      /* eslint-enable */
    }

    return appReducer(state, action);
  };
} else {
  developerUi = appReducer;
}

export default developerUi;
