/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Provider from 'components/helpers/Provider';
import { exampleState } from '__mocks__/storeMocks/stateMocks';

import SettingsDropdown from '../SettingsDropdown';

const docText = `Currently provides 3 settings for the Messaging Live Feed:
+ Number of Feed Entries: The number of feed entries displayed inside the Live Feed Logger (LoggingFeed)
+ Buffer size: The maximum size of the JavaScript Heap (The size of all logs in the application is continously calculated
 and if the maximum size is exceeded, the oldest logs get deleted)
+ Scroll Animation Active: Enables/Disables the scrolling to the last message in the LoggingFeed on new messages

#### _Component diagram_
---
![Component Diagram](${require('images/documentation/SettingsDropdown.jpg')} "Component Diagram")`;

storiesOf('MessagingLiveFeed/SettingsDropdown', module)
  .addDecorator(story => {
    return <Provider initialStoreState={exampleState} story={story()} />;
  })
  .add('Closed', withInfo(docText)(() => <SettingsDropdown />))
  .add(
    'Opened',
    withInfo(docText)(() => (
      <SettingsDropdown initialState={{ isOpened: true }} />
    ))
  )
  .add(
    'Editing Mode',
    withInfo(docText)(() => (
      <SettingsDropdown
        initialState={{ isOpened: true, inEditingView: true }}
      />
    ))
  );
