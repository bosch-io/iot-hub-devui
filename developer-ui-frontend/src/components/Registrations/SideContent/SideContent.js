/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import RegistrationsTable from "./RegistrationsTable";

const SideContent = ({ mainPanelExpanded, setMainPanel }) => (
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
    <RegistrationsTable setMainPanel={setMainPanel} />
  </div>
);

SideContent.propTypes = {
  mainPanelExpanded: PropTypes.bool.isRequired,
  setMainPanel: PropTypes.func.isRequired
};

export default SideContent;
