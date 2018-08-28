/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";

const MainContentTabs = withRouter(
  ({
    fetchCredential,
    credentialsTabLocked,
    match: {
      params: { selectedDeviceId }
    }
  }) => (
    <ul id="tabs">
      <NavLink
        activeClassName="active"
        to={`/registrations/${selectedDeviceId}/registration`}
        onClick={selectedDeviceId ? () => {} : e => e.preventDefault()}>
        Registration Info
      </NavLink>
      <NavLink
        activeClassName="active"
        to={`/registrations/${selectedDeviceId}/credentials`}
        onClick={
          !credentialsTabLocked ? () => fetchCredential(selectedDeviceId) : null
        }>
        Credentials
      </NavLink>
    </ul>
  )
);

MainContentTabs.propTypes = {
  match: PropTypes.object,
  fetchCredential: PropTypes.func.isRequired,
  credentialsTabLocked: PropTypes.bool.isRequired
};

export default MainContentTabs;
