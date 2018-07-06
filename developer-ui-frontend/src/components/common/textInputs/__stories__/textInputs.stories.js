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
  TextCopyField
} from "../index";

const invertedColorsContainer = {
  backgroundColor: "rgba(72, 85, 99, 0.75)",
  padding: "2rem"
};

storiesOf("Styleguide", module).add(
  "TextInputs",
  withInfo({
    propTables: [TextField, SearchbarS, SearchbarM, SearchbarL, TextCopyField]
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
      <div className="styleguide-card-row" style={invertedColorsContainer}>
        <SearchbarS placeholder="Small Searchbar" />
      </div>
      <div className="styleguide-card-row">
        <SearchbarM placeholder="Medium Sized Searchbar" />
      </div>
      <div className="styleguide-card-row">
        <SearchbarL placeholder="Large Searchbar" />
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
    </div>
  ))
);
