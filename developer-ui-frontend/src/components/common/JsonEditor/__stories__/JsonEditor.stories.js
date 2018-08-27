/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import "styles/app.scss";
import "styles/stories.scss";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import JsonEditor from "../index";

storiesOf("Styleguide", module).add(
  "JsonEditor",
  withInfo({ propTables: [JsonEditor] })(() => (
    <div className="styleguide-card">
      <h1>Json Editor</h1>
      <div className="json-editor-container">
        <JsonEditor />
      </div>
    </div>
  ))
);
