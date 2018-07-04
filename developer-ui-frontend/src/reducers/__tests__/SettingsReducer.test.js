/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import settingsReducer, { initialState } from '../SettingsReducer'; // initialState is already an Immutable Map
import { exampleChangeSortingAction } from '__mocks__/actionMocks';

describe('SettingsReducer', () => {
  test('> CHANGE_SORTING should change to ascending if category is same as action.category', () => {
    const initialStateSorted = initialState.setIn(
      ['logsSorting', 'category'],
      'Device Id'
    );
    // exampleChangeSortingAction has category 'Device Id'
    const result = settingsReducer(
      initialStateSorted,
      exampleChangeSortingAction
    );
    expect(result.getIn(['logsSorting', 'ascending'])).toBeTruthy();
  });
  test('> CHANGE_SORTING should keep descending order if category is not same as action.category', () => {
    const initialStateSorted = initialState.setIn(
      ['logsSorting', 'category'],
      'Type'
    );
    // exampleChangeSortingAction has category 'Device Id'
    const result = settingsReducer(
      initialStateSorted,
      exampleChangeSortingAction
    );
    expect(result.getIn(['logsSorting', 'ascending'])).toBeFalsy();
  });
  test("> CHANGE_SORTING should change to 'unsorted' if category is same as action.category and order is already ascending", () => {
    const initialStateSortedAscending = initialState.withMutations(state =>
      state
        .setIn(['logsSorting', 'category'], 'Device Id')
        .setIn(['logsSorting', 'ascending'], true)
    );
    // exampleChangeSortingAction has category 'Device Id'
    const result = settingsReducer(
      initialStateSortedAscending,
      exampleChangeSortingAction
    );
    expect(result.getIn(['logsSorting', 'category'])).toEqual('unsorted');
  });
});
