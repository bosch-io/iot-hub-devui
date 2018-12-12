/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
/**
 * This Module is intended to be a multi select button (a main button with smaller child buttons)
 * that "fly out" by clicking on the main button.
 * This is just a temporary version for the MVP, in which only the Password Credential type is
 * supported.
 */

import "styles/flyOutButton.scss";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import HoverTooltip from "components/common/HoverTooltip";
import { Link } from "react-router-dom";
// SVG Imports
import AddBox from "images/addBox.svg";

const MAIN_BUTTON_DIAM = 50;
const M_X = 25;
const M_Y = 25;

class AddSecretButton extends React.Component {
  constructor(props) {
    super(props);
  }

  mainButtonStyles() {
    return {
      width: MAIN_BUTTON_DIAM,
      height: MAIN_BUTTON_DIAM,
      top: M_Y - MAIN_BUTTON_DIAM / 2,
      left: M_X - MAIN_BUTTON_DIAM / 2
    };
  }

  render() {
    const { authId, deviceId } = this.props;
    const tooltipIdFirstReg = "first-reg";
    return (
      <Fragment>
        <Link
          to={`/registrations/${deviceId}/${authId}/additionalSecrets`}
          id="flyout-btn-fixed-container"
          data-tip
          data-for={tooltipIdFirstReg}
        >
          <div
            className="flyout-btn-main-button"
            style={{ ...this.mainButtonStyles() }}
          >
            <AddBox />
          </div>
        </Link>
      </Fragment>
    );
  }
}

AddSecretButton.propTypes = {
  authId: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired
};

export default AddSecretButton;
