/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import Provider from "components/helpers/Provider";
import { BrowserRouter as Router } from "react-router-dom";
import {
  exampleState,
  exampleStateNotConnected
} from "__mocks__/storeMocks/stateMocks";
import StoryWrapper from "components/helpers/StoryWrapper";

import DevicesPanel, { DevicesPanelWrapped } from "../DevicesPanel";
import DevicesSearchbar from "../presentation/DevicesSearchbar";
import { RegisteredDevicesListingWrapped } from "../container/RegisteredDevicesListing";
import DeviceEntityItem from "../presentation/DeviceEntityItem";
import DevicesListing from "../presentation/DevicesListing";

const allPropTables = [
  DevicesPanelWrapped,
  DevicesSearchbar,
  RegisteredDevicesListingWrapped,
  DeviceEntityItem,
  DevicesListing
];

const docText = `A side panel to reconfigure the subscribed devices after the initial configuration and to get an overview
of the current subscriptions.
This component can have two different appearances with different functionality:
* In the default state, the subscribed devices are shown in a list with their device id and the date of their last activity.
The color of the device circle indicates whether traffic has taken place since the application started (red = inactive, green = active).
A subscription can be removed by clicking on the circle.
* In the device adding mode which is reached by clicking on the + button, all registered devices are shown and the
searchbar gives the possiblity to filter for specific registered devices. The subscriptions are marked as checked and
can be selected and deselected. Another click commits the changes and updates the default view.

#### _Component diagram_
---
![Component Diagram](${require("images/documentation/DevicesPanel.jpg")} "Component Diagram")`;

storiesOf("MessagingLiveFeed/DevicesPanel", module)
  .addDecorator(story => {
    return (
      <Router>
        <Provider initialStoreState={exampleState} story={story()} />
      </Router>
    );
  })
  .addDecorator(story => {
    return (
      <div style={{ height: "45vh", width: "18vw" }} className="shadow-z-1">
        {story()}
      </div>
    );
  })
  .add(
    "Regular View",
    withInfo({
      text: docText,
      propTables: allPropTables
    })(() => (
      <DevicesPanel
        expanded
        toggleDevicesPanel={() => {}}
        initialState={{ deviceAddingModeActive: false }}
      />
    ))
  )
  .add(
    "Device Adding Mode View",
    withInfo({
      text: docText,
      propTables: allPropTables
    })(() => (
      <DevicesPanel
        expanded
        toggleDevicesPanel={() => {}}
        initialState={{ deviceAddingModeActive: true }}
      />
    ))
  )
  .add("Device Adding Mode View (disconnected)", story => (
    <StoryWrapper storePreset={exampleStateNotConnected} docText={docText}>
      {withInfo({
        text: docText,
        propTables: allPropTables
      })(() => (
        <DevicesPanel
          expanded
          toggleDevicesPanel={() => {}}
          initialState={{ deviceAddingModeActive: true }}
        />
      ))(story)}
    </StoryWrapper>
  ));
