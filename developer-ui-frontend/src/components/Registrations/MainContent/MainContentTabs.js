/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const MainContentTabs = ({ selectedDevice, fetchCredential }) => (
  <ul id="tabs">
    <NavLink
      activeClassName="active"
      to={`/registrations/${selectedDevice}/registration`}
      onClick={selectedDevice ? () => {} : e => e.preventDefault()}>
      Registration Info
    </NavLink>
    <NavLink
      activeClassName="active"
      to={`/registrations/${selectedDevice}/credentials`}
      onClick={selectedDevice ? fetchCredential : null}>
      Credentials
    </NavLink>
  </ul>
);

MainContentTabs.propTypes = {
  selectedDevice: PropTypes.string,
  fetchCredential: PropTypes.func.isRequired
};

export default MainContentTabs;
