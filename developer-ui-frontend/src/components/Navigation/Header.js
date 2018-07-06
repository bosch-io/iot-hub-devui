/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import "styles/header.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { NavLink } from "react-router-dom";
import Spinner from "components/common/Spinner";
import AccountIcon from "images/accountIcon.svg";
import CopyIcon from "images/copyClipboardIcon.svg";
import HoverTooltip from "components/common/HoverTooltip";
import ReactTooltip from "react-tooltip";
/**
 * The header of the application.
 *
 * @author Tim Weise
 * @version 0.1.0
 */

const DELAY_HIDE = 2000;

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copyBtnClicked: false
    };
    this.onCopyBtnClick = this.onCopyBtnClick.bind(this);
  }

  onCopyBtnClick() {
    this.setState({ copyBtnClicked: true }, () => {
      setTimeout(() => {
        this.setState({ copyBtnClicked: false });
      }, DELAY_HIDE);
    });
  }

  render() {
    const { tenant } = this.props;
    const { copyBtnClicked } = this.state;
    const tooltipIdTenantInfo = "reg-info";
    const tooltipIdCopy = "copy-to-cb";
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
        <span className="tenant-info-wrapper">
          <a
            className={`tenant-info ${!tenant ? "fetching" : ""}`}
            target="_blank"
            href="https://accounts.bosch-iot-suite.com/subscriptions"
            data-tip
            data-for={tooltipIdTenantInfo}>
            {tenant ? tenant : <Spinner type="bubbles" />}
          </a>
          {/* styled with direct sibling selector -> last in HTML but shifted with order: -1 */}
          <CopyToClipboard
            text={tenant}
            onCopy={tenant ? this.onCopyBtnClick : null}>
            <span
              style={{ order: -1 }}
              className="icon-window"
              ref={cp => {
                this.copyBtnRef = cp;
              }}
              data-tip
              data-for={tooltipIdCopy}>
              <span className={`icons-wrapper ${!tenant ? "loading" : ""}`}>
                <AccountIcon />
                <CopyIcon />
              </span>
            </span>
          </CopyToClipboard>
        </span>
      </header>,
      tenant && (
        <HoverTooltip
          key="headerFrag2"
          id={tooltipIdTenantInfo}
          text="View Subscription on Bosch IoT Suite Portal"
        />
      ),
      tenant && (
        <ReactTooltip
          key="headerFrag3"
          id={tooltipIdCopy}
          place="bottom"
          type="dark"
          effect="solid"
          getContent={[() => (copyBtnClicked ? "Copied!" : "Copy")]}
          delayHide={copyBtnClicked ? DELAY_HIDE : 0}
        />
      )
    ];
  }
}

Header.propTypes = {
  tenant: PropTypes.string
};
