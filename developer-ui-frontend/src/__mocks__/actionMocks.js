/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import * as actionTypes from "actions/actionTypes";
import {
  exampleShortMessage,
  exampleShortMessageInStore
} from "__mocks__/storeMocks/messageMocks";
import {
  exampleFilterType,
  exampleFilterDeviceId,
  exampleFilterDeviceId2,
  exampleFilterContentType
} from "__mocks__/storeMocks/filterMocks";
import { exampleEventBus } from "__mocks__/storeMocks/stateMocks";
import { exampleGetAuthIds } from "__mocks__/apiResponses";
import { fromJS } from "immutable";
import {
  formatDateString,
  randomDate,
  calculateLogId,
  calculateFilterId,
  mapCredentialParams
} from "utils";

export const exampleNewLogAction = {
  type: actionTypes.NEW_LOG,
  message: { ...exampleShortMessage }
};

export const exampleSubmitSettingsAction = {
  type: actionTypes.SUBMIT_SETTINGS,
  setting: {
    setting: "bufferSize",
    value: 300 // MB
  }
};

export const exampleChangeSortingAction = {
  type: actionTypes.CHANGE_SORTING,
  category: "Device Id"
};

export const exampleRemoveOldestLogAction = {
  type: actionTypes.REMOVE_OLDEST_LOG,
  id: calculateLogId(exampleShortMessage)
};

export const exampleDeletingSubAction = {
  type: actionTypes.DELETING_SUB,
  deviceId: "1"
};

export const exampleDeleteSubAction = {
  type: actionTypes.SUB_DELETED,
  deviceId: "1"
};

export const exampleAddingSubAction = {
  type: actionTypes.ADDING_SUB,
  deviceId: "0"
};

export const exampleAddSubAction = {
  type: actionTypes.NEW_SUB,
  deviceId: "0"
};

export const exampleConnectedAction = {
  type: actionTypes.EVENTBUS_CONNECTED,
  eventBus: exampleEventBus
};

export const exampleDisconnectedAction = {
  type: actionTypes.EVENTBUS_DISCONNECTED,
  eventBus: exampleEventBus
};

export const exampleNewFilterActionType = {
  type: actionTypes.NEW_FILTER,
  filter: exampleFilterType
};

export const exampleNewFilterActionDevice = {
  type: actionTypes.NEW_FILTER,
  filter: exampleFilterDeviceId
};

export const exampleNewFilterActionContent = {
  type: actionTypes.NEW_FILTER,
  filter: exampleFilterContentType
};

export const exampleRemoveFilterActionContent = {
  type: actionTypes.REMOVE_FILTER,
  filterId: calculateFilterId(
    exampleFilterContentType.get("type"),
    exampleFilterContentType.get("value")
  )
};

export const exampleRemoveFilterActionDevice = {
  type: actionTypes.REMOVE_FILTER,
  filterId: calculateFilterId(
    exampleFilterDeviceId2.get("type"),
    exampleFilterDeviceId2.get("value")
  )
};

export const exampleCalculateLogMemoryAction = {
  type: actionTypes.CALCULATE_LOG_MEMORY,
  allLogs: fromJS([exampleShortMessageInStore]),
  bufferSize: 300 // MB
};

// Initial fetch
export const exampleCredentialsFetchedAction = {
  type: actionTypes.CREDENTIALS_FETCHED,
  data: exampleGetAuthIds,
  prevAuthIds: fromJS([])
};

// After fetches were made
export const exampleCredentialsFetchedAction2 = {
  type: actionTypes.CREDENTIALS_FETCHED,
  data: exampleGetAuthIds,
  prevAuthIds: fromJS([
    "newDevice-97fff113f84b4d91a208889d13236fa8",
    "newDevice-f6ca6710e78043568ddf86b70bb4f010"
  ])
};
// First credential got deleted in the meantime
export const exampleCredentialsFetchedAction3 = {
  type: actionTypes.CREDENTIALS_FETCHED,
  data: { total: 1, credentials: [exampleGetAuthIds.credentials[1]] },
  prevAuthIds: fromJS([
    "newDevice-97fff113f84b4d91a208889d13236fa8",
    "newDevice-f6ca6710e78043568ddf86b70bb4f010"
  ])
};

export const exampleNewCredentialAction = {
  type: actionTypes.NEW_CREDENTIAL,
  authId: "newDevice-f6ca6710e78043568ddf86b70bb4f010",
  deviceId: "newDevice",
  newCredential: mapCredentialParams(
    "newDevice-f6ca6710e78043568ddf86b70bb4f010",
    "hashed-password",
    null
  )
};
