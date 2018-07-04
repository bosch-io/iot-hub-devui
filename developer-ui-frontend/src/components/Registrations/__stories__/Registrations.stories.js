/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import Provider from "components/helpers/Provider";
import "styles/stories.scss";

import { exampleStateNotConnected } from "__mocks__/storeMocks/stateMocks";
import { BrowserRouter as Router } from "react-router-dom";
import Registrations from "../Registrations";
// Components (Only for Prop Tables)
import SideContent from "../SideContent/SideContent";
import RegistrationsTable from "../SideContent/container/RegistrationsTable";
import RegistrationsTableEntry from "../SideContent/presentation/RegistrationsTableEntry";
import MainContent from "../MainContent/MainContent";
import MainContentHeadline from "../MainContent/MainContentHeadline";
import RegistrationInfoContent from "../MainContent/RegInfoEditor/RegistrationInfoContent";
import CredentialInfoContent from "../MainContent/CredentialsEditor/CredentialsInfoContent";

const allPropTablesDevicesListing = [
  Registrations,
  RegistrationsTable,
  SideContent,
  RegistrationsTableEntry
];
const allPropTablesMainPanel = [
  Registrations,
  MainContent,
  MainContentHeadline,
  RegistrationInfoContent,
  CredentialInfoContent
];

const docText = `The view to manage registrations (create, read, update, delete registrations and credentials for registrations)`;

storiesOf("Registrations/DevicesListing", module)
  .addDecorator(story => {
    return (
      <Provider initialStoreState={exampleStateNotConnected} story={story()} />
    );
  })
  .add(
    "Initial View, Main Panel Collapsed",
    withInfo({
      text: docText,
      propTables: allPropTablesDevicesListing
    })(() => (
      <Router>
        <div className="cardStory">
          <Registrations />
        </div>
      </Router>
    ))
  );

storiesOf("Registrations/MainPanel", module)
  .addDecorator(story => {
    return (
      <Provider initialStoreState={exampleStateNotConnected} story={story()} />
    );
  })
  .add(
    "Registration Info Tab",
    withInfo({
      text: docText,
      propTables: allPropTablesMainPanel
    })(() => (
      <Router>
        <div className="cardStory">
          <Registrations initialState={{ mainPanelExpanded: true }} />
        </div>
      </Router>
    ))
  );
