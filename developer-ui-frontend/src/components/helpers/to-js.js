/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from 'react';
import { Iterable } from 'immutable';

/*
* Implementation of a Higher Order Component (HOC) that takes a Component (WrappedComponent)
* with its Immutable Props and converts/ wrapps it to a Component with plain JS props.
* To be used in smart components (Container Components) inside Redux' connect to render a
* Presentational Component with plain JS props
*/
export const toJS = WrappedComponent => wrappedComponentProps => {
  const KEY = 0;
  const VALUE = 1;
  // Object.entries polyfill for Enzyme/ Jest Tests
  if (!Object.entries) {
    Object.entries = obj => {
      const ownProps = Object.keys(obj);
      let i = ownProps.length;
      const resArray = new Array(i); // preallocate the Array
      while (i--) {
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
      }
      return resArray;
    };
  }
  // end of polyfill
  const propsJS = Object.entries(wrappedComponentProps).reduce(
    (newProps, wrappedComponentProp) => {
      newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(
        wrappedComponentProp[VALUE]
      )
        ? wrappedComponentProp[VALUE].toJS()
        : wrappedComponentProp[VALUE];
      return newProps;
    },
    {}
  );

  return <WrappedComponent {...propsJS} />;
};
