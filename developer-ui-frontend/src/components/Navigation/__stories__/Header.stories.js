/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import "styles/stories.scss";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "components/Navigation/Header";

const docText = `The page header with a button to change the tenant`;
const allPropTables = [Header];

storiesOf("Navigation", module)
  .addDecorator(story => {
    return <Router>{story()}</Router>;
  })
  .add("Header", story =>
    withInfo({
      text: docText,
      propTables: allPropTables
    })(() => <Header />)(story)
  );
