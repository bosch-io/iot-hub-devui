/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import RegistrationsTable from "./container/RegistrationsTable";

export default class SideContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { mainPanelExpanded, setMainPanel, setSelectedDevice } = this.props;
    return (
      <div id="registrations-side-content">
        <div className="expandButtonWrapper right">
          <div
            className="expandButton right"
            onClick={() => setMainPanel(!mainPanelExpanded)}>
            <span className={mainPanelExpanded ? "" : "devices-panel-closed"}>
              &#8250;
            </span>
          </div>
        </div>
        <RegistrationsTable
          setMainPanel={setMainPanel}
          setSelectedDevice={setSelectedDevice}
        />
      </div>
    );
  }
}

SideContent.propTypes = {
  mainPanelExpanded: PropTypes.bool.isRequired,
  setMainPanel: PropTypes.func.isRequired,
  setSelectedDevice: PropTypes.func.isRequired
};
