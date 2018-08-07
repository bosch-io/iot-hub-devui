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
import AddRegistrationModal from "./AddRegistrationModal";
import { CREDENTIAL_TYPES } from "_APP_CONSTANTS";
import PropTypes from "prop-types";
import HoverTooltip from "components/common/HoverTooltip";
import { Link, Route } from "react-router-dom";
// SVG Imports
import AddIcon from "images/addIcon.svg";

const MAIN_BUTTON_DIAM = 50;
const M_X = 25;
const M_Y = 25;

class AddRegistrationButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addRegistrationModalIsOpen: false,
      addRegistrationModalType: CREDENTIAL_TYPES.PASSWORD
    };
    this.changeAddRegistrationModalIsOpen = this.changeAddRegistrationModalIsOpen.bind(
      this
    );
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  changeAddRegistrationModalIsOpen(isOpen, type) {
    this.setState({
      addRegistrationModalType: type,
      addRegistrationModalIsOpen: isOpen
    });
  }

  handleButtonClick() {
    this.changeAddRegistrationModalIsOpen(true, CREDENTIAL_TYPES.PASSWORD);
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
    const { addRegistrationModalIsOpen, addRegistrationModalType } = this.state;
    const { hasCallout, setMainPanel } = this.props;
    const tooltipIdFirstReg = "first-reg";
    return (
      <Fragment>
        <Link
          to="/registrations/additionalRegs"
          id="flyout-btn-fixed-container"
          data-tip
          data-for={tooltipIdFirstReg}>
          <div
            id="flyout-btn-wrapper"
            className={hasCallout ? "callout" : null}
            onClick={() => this.handleButtonClick()}>
            <div
              className="flyout-btn-main-button"
              style={{ ...this.mainButtonStyles() }}>
              <AddIcon />
            </div>
          </div>
        </Link>
        <Route
          path={`/registrations/additionalRegs/:deviceId?`}
          render={({ match, history }) => {
            // If the route matches but the addRegistrationModalIsOpen state isn't true
            // the route is changed from outside the component by a Link. Never the less
            // We want the modal to open. -> Call setState and set it to true.
            !addRegistrationModalIsOpen &&
              this.setState({ addRegistrationModalIsOpen: true });
            return (
              <AddRegistrationModal
                redirectToRegistrations={() => history.push("/registrations")}
                type={addRegistrationModalType}
                isOpen={addRegistrationModalIsOpen}
                initialValues={{
                  deviceId: match.params.deviceId,
                  password: ""
                }}
                changeIsOpen={this.changeAddRegistrationModalIsOpen}
                setMainPanel={setMainPanel}
              />
            );
          }}
        />
        {hasCallout ? (
          <HoverTooltip
            text="Register your first Device"
            id={tooltipIdFirstReg}
          />
        ) : null}
      </Fragment>
    );
  }
}

AddRegistrationButton.propTypes = {
  hasCallout: PropTypes.bool.isRequired,
  setMainPanel: PropTypes.func.isRequired
};

export default AddRegistrationButton;
