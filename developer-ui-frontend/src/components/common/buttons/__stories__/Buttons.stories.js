/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import "styles/app.scss";
import "styles/stories.scss";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import DeviceIcon from "images/deviceIcon.svg";

import { FlatButton, OutlineButton, RoundOutlineButton } from "../index";

storiesOf("Styleguide", module).add(
  "Buttons",
  withInfo({ propTables: [FlatButton, OutlineButton, RoundOutlineButton] })(
    () => (
      <div className="styleguide-card">
        <h1>Buttons</h1>
        <div className="styleguide-card-row">
          <FlatButton primary>Primary</FlatButton>
          <FlatButton secondary>Secondary</FlatButton>
          <FlatButton danger>Danger</FlatButton>
          <FlatButton disabled>Disabled</FlatButton>
          <FlatButton primary submitAnimation>
            Submit
          </FlatButton>
        </div>
        <div className="styleguide-card-row">
          <OutlineButton primary>Primary</OutlineButton>
          <OutlineButton secondary>Secondary</OutlineButton>
          <OutlineButton danger>Danger</OutlineButton>
          <OutlineButton disabled>Disabled</OutlineButton>
          <OutlineButton primary icon={<DeviceIcon />}>
            With Icon
          </OutlineButton>
        </div>
        <div className="styleguide-card-row">
          <RoundOutlineButton primary>Primary</RoundOutlineButton>
          <RoundOutlineButton secondary>Secondary</RoundOutlineButton>
          <RoundOutlineButton danger>Danger</RoundOutlineButton>
          <RoundOutlineButton disabled>Disabled</RoundOutlineButton>
          <RoundOutlineButton primary icon={<DeviceIcon />}>
            With Icon
          </RoundOutlineButton>
          <RoundOutlineButton primary submitAnimation>
            Submit
          </RoundOutlineButton>
        </div>
      </div>
    )
  )
);
