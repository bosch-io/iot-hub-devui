/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import Provider from "components/helpers/Provider";
import StoryWrapper from "components/helpers/StoryWrapper";
import {
  exampleState,
  exampleStateNotConnected
} from "__mocks__/storeMocks/stateMocks";

import LoggingFeed from "../container/LoggingFeed";
import TextAreaWithLed from "../presentation/TextAreaWithLed";

const docText = `Prints the traffic produced by the subscribed devices to a console-like textarea. A status LED on the top right indicates
that a new message was received. The amount of messages displayed can be configured in the SettingsDropdown as well as
whether the scrolling to the last message should be animated or not.

#### _Component diagram_
---
![Component Diagram](${require("images/documentation/LoggingFeed.jpg")} "Component Diagram")`;

storiesOf("MessagingLiveFeed/LoggingFeed", module)
  .addDecorator(story => {
    return (
      <Provider initialStoreState={exampleStateNotConnected} story={story()} />
    );
  })
  .addDecorator(story => {
    return (
      <div style={{ height: "30vh", width: "82vw" }} className="shadow-z-1">
        {story()}
      </div>
    );
  })
  .add("First Connecting without logs", story => (
    <StoryWrapper storePreset={exampleStateNotConnected} docText={docText}>
      {withInfo({
        text: docText,
        propTables: [TextAreaWithLed]
      })(() => <LoggingFeed />)(story)}
    </StoryWrapper>
  ))
  .add("Connecting with logs (e.g. connection lost)", story => (
    <StoryWrapper
      storePreset={exampleState.setIn(["connection", "connected"], false)}
      docText={docText}>
      {withInfo({
        text: docText,
        propTables: [TextAreaWithLed]
      })(() => <LoggingFeed />)(story)}
    </StoryWrapper>
  ))
  .add("With Logs", story => (
    <StoryWrapper storePreset={exampleState} docText={docText}>
      {withInfo({
        text: docText,
        propTables: [TextAreaWithLed]
      })(() => <LoggingFeed />)(story)}
    </StoryWrapper>
  ));
