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

const portalStyles = {
  pointerEvents: "none",
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
  bottom: 0
};

class MenuDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(state => ({ menuOpen: !state.menuOpen }));
  }

  render() {
    const { menuOpen } = this.state;
    const menuBtnId = "registrations-menu-btn";
    return (
      <div className="styleguide-card">
        <h1>Menus</h1>
        <div className="styleguide-card-row">
          <MoreIcon
            id={menuBtnId}
            onClick={this.toggleMenu}
            style={{ cursor: "pointer", margin: 0 }}
          />
          <TooltipMenu
            open={menuOpen}
            toggleOpen={this.toggleMenu}
            ancorId={menuBtnId}>
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
        {/* Portals are normally rendered last in the DOM Hierarchy
        (see <Portals/> after the <App/> Component in index.js) */}
        <div id="menu-portal" style={portalStyles} />
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
