/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import "styles/app.scss";
import "styles/stories.scss";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import Provider from "components/helpers/Provider";
import { BrowserRouter as Router } from "react-router-dom";
import { exampleState } from "__mocks__/storeMocks/stateMocks";

import MessagingLiveFeed, {
  MessagingLiveFeedWrapped
} from "../MessagingLiveFeed";
import Header from "components/Navigation/Header";

const docText = `
Provides a way to connect live to the Bosch IoT Hub/ Eclipse Hono AMQP 1.0 Messaging Network using a Vert.X Eventbus Bridge (Based on a SockJS).
Consists of 5 Main Parts:
+ An initial form to select the devices to listen to by entering the desired Device IDs
+ A Logging Feed that prints the traffic produced by the subscribed devices to a console-like <textarea>
+ A table that provides a formatted representation of the Logs and filtering capabilities
+ A side panel to reconfigure the subscribed devices after the initial configuration
+ A settings menu to configure things like the amount of displayed logs in the Logging Feed and in the JavaScript cache in general

#### _Component diagram_
---
![Component Diagram](${require("images/documentation/componentOverview.jpg")} "Component Diagram")
`;

const allPropTables = [MessagingLiveFeedWrapped];

storiesOf("MessagingLiveFeed/all", module)
  .addDecorator(story => {
    return <Provider initialStoreState={exampleState} story={story()} />;
  })
  .addDecorator(story => {
    return <Router>{story()}</Router>;
  })
  .add(
    "DevicePanel expanded",
    withInfo({
      text: docText,
      propTables: allPropTables
    })(() => (
      <div className="allStory">
        <Header />
        <MessagingLiveFeed
          initialState={{
            devicesPanelExpanded: true
          }}
        />
      </div>
    ))
  )
  .add(
    "DevicePanel closed",
    withInfo({
      text: docText,
      propTables: allPropTables
    })(() => (
      <div className="allStory">
        <Header />
        <MessagingLiveFeed
          initialState={{
            devicesPanelExpanded: false
          }}
        />
      </div>
    ))
  );
