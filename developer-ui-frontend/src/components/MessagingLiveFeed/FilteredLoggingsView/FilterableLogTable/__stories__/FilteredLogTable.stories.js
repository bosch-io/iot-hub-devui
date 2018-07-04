/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import "styles/stories.scss";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import Provider from "components/helpers/Provider";
import StoryWrapper from "components/helpers/StoryWrapper";
import {
  exampleState,
  exampleStateNotConnected
} from "__mocks__/storeMocks/stateMocks";
import { exampleLongMessageInStore } from "__mocks__/storeMocks/messageMocks";

import FilterableLogTable from "../FilterableLogTable";
import FilteringSection from "../presentation/FilteringSection";
import FilterForm from "../container/FilterForm";
import FilterDropdown from "../presentation/FilterDropdown";
import FilterDropdownEntry from "../presentation/FilterDropdownEntry";
import FilterIndicators from "../container/FilterIndicators";
import FilterIndicator from "../presentation/FilterIndicator";
import LogTable from "../container/LogTable";
import Table from "../presentation/Table";
import PayloadModal from "../presentation/PayloadModal";

const allPropTables = [
  FilterableLogTable,
  FilteringSection,
  FilterForm,
  FilterDropdown,
  FilterDropdownEntry,
  FilterIndicators,
  FilterIndicator,
  LogTable,
  Table,
  PayloadModal
];

const mockProps = {
  toggleDevicesPanel: () => {},
  devicesPanelExpanded: false
};

const docText = `
A table view of the loggings in the frontend. Provides the possiblity to filter the loggings by different categories
that can be selected in the dropdown menu and to sort by a different category. Long payloads are displayed with a link
and by clicking the link, the payload can be displayed inside a modal that adds syntax highlighting and a indented
structure.

#### _Component diagram_
---
![Component Diagram](${require("images/documentation/FilterableLogTable.jpg")} "Component Diagram")`;

storiesOf("MessagingLiveFeed/FilterableLogTable", module)
  .addDecorator(story => {
    return (
      <Provider initialStoreState={exampleStateNotConnected} story={story()} />
    );
  })
  .addDecorator(story => {
    return (
      <div
        style={{
          height: "45vh",
          width: "72vw",
          background: `linear-gradient(
            45deg,
            #2e3d4d 0%,
            rgba(57, 98, 132, 0.86) 75%,
            #2e3d4d 100%
          )`,
          display: "flex",
          borderRadius: "2px"
        }}
        className="shadow-z-1 storyStayFlex">
        {story()}
      </div>
    );
  })
  .add("Empty Table", story => (
    <StoryWrapper storePreset={exampleStateNotConnected} docText={docText}>
      {withInfo({
        text: docText,
        propTables: allPropTables
      })(() => <FilterableLogTable {...mockProps} />)(story)}
    </StoryWrapper>
  ))
  .add("Traffic and filtering", story => (
    <StoryWrapper storePreset={exampleState} docText={docText}>
      {withInfo({
        text: docText,
        propTables: allPropTables
      })(() => <FilterableLogTable {...mockProps} />)(story)}
    </StoryWrapper>
  ))
  .add("PayloadModal", story => (
    <StoryWrapper storePreset={exampleState} docText={docText}>
      {withInfo({
        text: docText,
        propTables: allPropTables
      })(() => (
        <FilterableLogTable
          {...mockProps}
          initialState={{
            showModal: true,
            modalMessage: exampleLongMessageInStore
          }}
        />
      ))(story)}
    </StoryWrapper>
  ));
