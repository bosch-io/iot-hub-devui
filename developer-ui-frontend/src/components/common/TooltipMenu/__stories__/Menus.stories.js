/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import "styles/app.scss";
import "styles/stories.scss";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import DeviceIcon from "images/deviceIcon.svg";
import MoreIcon from "images/moreIcon.svg";
// Use MemoryRouter as a Router Mock to be able to use the <Link/>s inside TooltipMenuOption
import { MemoryRouter } from "react-router";
import TooltipMenu, { TooltipMenuOption } from "components/common/TooltipMenu";

class MenuDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
  }
  render() {
    const { menuOpen } = this.state;
    return (
      <div className="styleguide-card">
        <h1>Menus</h1>
        <div className="styleguide-card-row">
          <TooltipMenu
            open={menuOpen}
            toggleOpen={() =>
              this.setState(state => ({ menuOpen: !state.menuOpen }))
            }
            menuIcon={<MoreIcon />}>
            <TooltipMenuOption
              value="Option 1"
              route="/foo"
              icon={<DeviceIcon />}
            />
            <TooltipMenuOption
              value="Disabled Option"
              route="/foo"
              disabled
              icon={<DeviceIcon />}
            />
          </TooltipMenu>
        </div>
      </div>
    );
  }
}
storiesOf("Styleguide", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add(
    "Menus",
    withInfo({ propTables: [TooltipMenu, TooltipMenuOption] })(() => (
      <MenuDemo />
    ))
  );
