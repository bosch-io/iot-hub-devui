/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import filterReducer, { initialState } from '../FilterReducer';
import {
  exampleNewFilterActionType,
  exampleNewFilterActionDevice,
  exampleNewFilterActionContent,
  exampleRemoveFilterActionDevice,
  exampleRemoveFilterActionContent
} from '__mocks__/actionMocks';
import {
  exampleTypeFilterInStore,
  exampleDeviceFilterInStore,
  exampleContentFilterInStore
} from '__mocks__/storeMocks/filterMocks';
import { fromJS } from 'immutable';

describe('FilterReducer', () => {
  const exampleContentFilterId = exampleContentFilterInStore.get('id');
  const exampleDeviceFilterId = exampleDeviceFilterInStore.get('id');
  const initialStateWithContentFilter = initialState
    .set(
      'byId',
      fromJS({ [exampleContentFilterId]: exampleContentFilterInStore })
    )
    .set('allIds', fromJS([exampleContentFilterId]));
  const initialStateWithDeviceFilter = initialState
    .set(
      'byId',
      fromJS({ [exampleDeviceFilterId]: exampleDeviceFilterInStore })
    )
    .set('allIds', fromJS([exampleDeviceFilterId]));

  it('should have initial state on empty call', () => {
    expect(filterReducer()).toEqual(initialState);
  });

  it('should not change state on unknown action types', () => {
    expect(filterReducer(undefined, { type: 'NOT_EXISTING' })).toEqual(
      initialState
    );
  });

  test('> NEW_FILTER should add a filter object with type and value properties to filters in byId', () => {
    expect(
      filterReducer(initialState, exampleNewFilterActionType).get('byId')
    ).toEqual(
      fromJS({ [exampleTypeFilterInStore.get('id')]: exampleTypeFilterInStore })
    );
  });

  test('> NEW_FILTER should add a filterId to filters in allIds', () => {
    expect(
      filterReducer(initialState, exampleNewFilterActionType).get('allIds')
    ).toEqual(fromJS([exampleTypeFilterInStore.get('id')]));
  });

  test('> NEW_FILTER should not add an already existing filter', () => {
    expect(
      filterReducer(
        initialStateWithContentFilter,
        exampleNewFilterActionContent
      )
    ).toEqual(initialStateWithContentFilter);
  });

  test('> REMOVE_FILTER should remove the given filterId entry from allIds', () => {
    const expectedReturn = fromJS([]); // Last filter gets removed
    console.log('before: ', initialStateWithContentFilter.toJS());
    console.log(
      'after: ',
      filterReducer(
        initialStateWithContentFilter,
        exampleRemoveFilterActionContent
      )
    );
    expect(
      filterReducer(
        initialStateWithContentFilter,
        exampleRemoveFilterActionContent
      ).get('allIds')
    ).toEqual(expectedReturn);
  });

  test('> REMOVE_FILTER should remove the corresponding filter entry from byId', () => {
    const expectedReturn = fromJS({}); // Last filter gets removed
    expect(
      filterReducer(
        initialStateWithDeviceFilter,
        exampleRemoveFilterActionDevice
      ).get('byId')
    ).toEqual(expectedReturn);
  });
});
