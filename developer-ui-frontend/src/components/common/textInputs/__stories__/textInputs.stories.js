/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import "styles/app.scss";
import "styles/stories.scss";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import {
  TextField,
  SearchbarS,
  SearchbarM,
  SearchbarL,
  TextCopyField,
  DatePicker
} from "../index";

const invertedColorsContainer = {
  background:
    "linear-gradient(to right, rgba(72, 85, 99, 0) 0%, rgba(72, 85, 99, 0.75) 5%, rgba(72, 85, 99, 0.75) 95%, rgba(72, 85, 99, 0) 100%)",
  padding: "2rem"
};

storiesOf("Styleguide", module).add(
  "TextInputs",
  withInfo({
    propTables: [
      TextField,
      SearchbarS,
      SearchbarM,
      SearchbarL,
      TextCopyField,
      DatePicker
    ]
  })(() => (
    <div className="styleguide-card">
      <h1>Text Inputs</h1>
      <div className="styleguide-card-row">
        <TextField type="text" name="StoryTextField0" label="Regular Text" />
        <TextField
          type="text"
          name="StoryTextField1"
          error="Some Error Text"
          label="With Error"
        />
        <TextField
          type="text"
          name="StoryTextField2"
          warning="Some Warning Text"
          label="With Warning"
        />
      </div>
      <div className="styleguide-card-row" style={{ alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <SearchbarS placeholder="Small Searchbar" />
        </div>
        <div style={{ flex: 2 }}>
          <SearchbarM placeholder="Medium Sized Searchbar" />
        </div>
        <div style={{ flex: 3 }}>
          <SearchbarL placeholder="Large Searchbar" />
        </div>
      </div>
      <div className="styleguide-card-row" style={invertedColorsContainer}>
        <TextCopyField
          copyText="Copy Me!"
          name="demo1"
          label="Copy Box Normal Text:"
        />
        <TextCopyField
          copyText="FakePassword"
          name="demo1"
          type="password"
          label="Copy Box Password:"
        />
      </div>
      <div className="styleguide-card-row">
        <DatePicker />
      </div>
    </div>
  ))
);
