/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import StoryWrapper from "components/helpers/StoryWrapper";
import Provider from "components/helpers/Provider";
import "styles/stories.scss";

import {
  exampleStateNotConnected,
  exampleStateNoRegistrations
} from "__mocks__/storeMocks/stateMocks";
import { BrowserRouter as Router } from "react-router-dom";
import InitialSubscriptionsSelection, {
  InitialSubscriptionsSelectionWrapped
} from "../InitialSubscriptionsSelection";
import DeviceSelectionList from "../presentation/DeviceSelectionList";
import RegistrySearchbar from "../presentation/RegistrySearchbar";

const allPropTables = [
  InitialSubscriptionsSelectionWrapped,
  DeviceSelectionList,
  RegistrySearchbar
];

const docText = `The initial dialog to configure the subscribed devices based on the available registrations.`;

storiesOf("MessagingLiveFeed/InitialSubscriptionsSelection", module)
  .addDecorator(story => {
    return (
      <Provider initialStoreState={exampleStateNotConnected} story={story()} />
    );
  })
  .add("Regular View", story => (
    <StoryWrapper storePreset={exampleStateNotConnected} docText={docText}>
      {withInfo({
        text: docText,
        propTables: allPropTables
      })(() => (
        <Router>
          <div className="cardStory">
            <InitialSubscriptionsSelection />
          </div>
        </Router>
      ))(story)}
    </StoryWrapper>
  ))
  .add("No Registrations", story => (
    <StoryWrapper storePreset={exampleStateNoRegistrations} docText={docText}>
      {withInfo({
        text: docText,
        propTables: allPropTables
      })(() => (
        <Router>
          <div className="cardStory">
            <InitialSubscriptionsSelection />
          </div>
        </Router>
      ))(story)}
    </StoryWrapper>
  ));
