/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import configureStore from 'redux-mock-store';
import * as userSettingsActions from '../UserSettingsActions';
import * as actionTypes from '../actionTypes';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('UserSettingsActions Thunk Action Creators', () => {
  const exampleSetting = {
    setting: 'bufferSize',
    value: 300 // MB
  };

  test('updateSetting of type "bufferSize" should dispatch only one action (SUBMIT_SETTINGS) with the settings argument if the limit is not exceeded yet', () => {
    // Initialize mockstore with state
    const store = mockStore(
      fromJS({
        logs: {
          byId: {
            /* ... */
          },
          allIds: ['1-123456', '2-123456', '3-123456']
        },
        logMemoryCalculation: { maximumAmountOfLogs: 3 }
      })
    );
    const expectedPayload = {
      type: actionTypes.SUBMIT_SETTINGS,
      setting: exampleSetting
    };
    store.dispatch(userSettingsActions.updateSetting(exampleSetting));
    expect(store.getActions()).toEqual([expectedPayload]);
  });

  test('updateSetting of type "bufferSize" should dispatch only one action (SUBMIT_SETTINGS) with the settings argument if the limit is not exceeded yet pt2', () => {
    // Initialize mockstore with state
    const store = mockStore(
      fromJS({
        logs: {
          byId: {
            /* ... */
          },
          allIds: ['1-123456', '2-123456', '3-123456']
        },
        logMemoryCalculation: { maximumAmountOfLogs: 3 }
      })
    );
    // limit is reached but not yet exceeded
    const expectedPayload = {
      type: actionTypes.SUBMIT_SETTINGS,
      setting: exampleSetting
    };
    store.dispatch(userSettingsActions.updateSetting(exampleSetting));
    expect(store.getActions()).toEqual([expectedPayload]);
  });

  test('updateSetting should cause as many REMOVE_OLDEST_LOG actions as the difference between logsCount and maximumAmountOfLogs', () => {
    const store = mockStore(
      fromJS({
        logs: {
          byId: {
            /* ... */
          },
          allIds: ['1-123456', '2-123456', '3-123456']
        },
        logMemoryCalculation: { maximumAmountOfLogs: 1 }
      })
    );
    store.dispatch(userSettingsActions.updateSetting(exampleSetting));
    // Limit of 1 logs is exceeded by 2 -> expect 1 SUBMIT_SETTINGS and 2 REMOVE_OLDEST_LOG dispatches -> 3 actions
    expect(store.getActions().length).toEqual(3);
  });

  test('changeSorting should dispatch an action with the category argument in the payload', () => {
    const store = mockStore({});
    const passedCategory = 'Device Id';
    store.dispatch(userSettingsActions.changeSorting(passedCategory));
    const expectedPayload = {
      type: actionTypes.CHANGE_SORTING,
      category: passedCategory
    };
    expect(store.getActions()).toEqual([expectedPayload]);
  });
});
