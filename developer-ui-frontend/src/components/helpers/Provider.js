/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from 'react';
import store from 'store';
import { Provider as ReduxProvider } from 'react-redux';
import { loadStorePreset } from 'actions/globalActions';

// Decorator HOC for Redux aware Storybook stories ( to be imported and used inside .addDecorator() )
export default function Provider({
  /* eslint-disable react/prop-types */ story,
  initialStoreState /* eslint-enable */
}) {
  store.dispatch(loadStorePreset(initialStoreState));
  return <ReduxProvider store={store}>{story}</ReduxProvider>;
}
