/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Spinner from "components/common/Spinner";
import AccountIcon from "images/accountIcon.svg";
import HoverTooltip from "components/common/HoverTooltip";

/**
 * The header of the application.
 *
 * @author Tim Weise
 * @version 0.1.0
 */
export default class Header extends React.Component {
  render() {
    const { tenant } = this.props;
    const tooltipIdTenantInfo = "reg-info";
    return [
      <header key="headerFrag1">
        <span>
          <p>
            <object
              data="https://s3.eu-central-1.amazonaws.com/developer-ui.bosch-iot-hub.com/assets/Hub_64-reverse-white.svg"
              type="image/svg+xml"
            />{" "}
            Bosch IoT Hub <span>Developer UI</span>
          </p>
          <nav>
            <NavLink to="/feed" activeClassName="active">
              Feed
            </NavLink>
            <NavLink to="/registrations" activeClassName="active">
              Registrations
            </NavLink>
          </nav>
        </span>
        <span
          className="tenant-info-wrapper"
          data-tip
          data-for={tooltipIdTenantInfo}>
          <AccountIcon />
          <a
            className={`tenant-info ${!tenant ? "fetching" : ""}`}
            target="_blank"
            href="https://accounts.bosch-iot-suite.com/subscriptions">
            {tenant ? tenant : <Spinner type="bubbles" />}
          </a>
        </span>
      </header>,
      <HoverTooltip
        key="headerFrag2"
        id={tooltipIdTenantInfo}
        text="View Subscription on Bosch IoT Suite Portal"
      />
    ];
  }
}

Header.propTypes = {
  tenant: PropTypes.string
};
