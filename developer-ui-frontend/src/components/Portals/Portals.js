/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";

const portalStyles = {
  pointerEvents: "none",
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
  bottom: 0
};

export default () => <div id="menu-portal" style={portalStyles} />;
