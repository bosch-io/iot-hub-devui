/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { reducer as formReducer } from "redux-form/immutable";
import {
  NEW_FILTER,
  SUBMIT_SETTINGS,
  NEW_SECRET,
  SECRET_DELETED,
  INIT_EMPTY_CREDENTIAL
} from "actions/actionTypes";

export default formReducer.plugin({
  filterSearchbar: (state, action) => {
    switch (action.type) {
      case NEW_FILTER:
        return state.deleteIn(["values", "filterSearch"]); // <--- blow away input form data
      default:
        return state;
    }
  },
  settingsForm: (state, action) => {
    switch (action.type) {
      case SUBMIT_SETTINGS:
        return state.deleteIn(["values", "settingsTextInput"]);
      default:
        return state;
    }
  },
  addCredentials: (state, action) => {
    switch (action.type) {
      case INIT_EMPTY_CREDENTIAL:
        return state ? state.deleteIn(["values", "authId"]) : state;
      default:
        return state;
    }
  },
  newSecret: (state, action) => {
    switch (action.type) {
      case NEW_SECRET:
        return state ? state.deleteIn(["values", "password"]) : state;
      default:
        return state;
    }
  },
  deleteSecret: (state, action) => {
    switch (action.type) {
      case SECRET_DELETED:
        return state ? state.deleteIn(["values", "secretSelect"]) : state;
      default:
        return state;
    }
  }
});
