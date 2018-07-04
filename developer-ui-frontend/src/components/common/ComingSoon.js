/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import "styles/comingSoon.scss";

const ComingSoon = props => (
  <div id="info-card" className="shadow-z-2">
    <div id="info-card-content">
      <div id="hub-logo">
        <object
          data="https://s3.eu-central-1.amazonaws.com/developer-ui.bosch-iot-hub.com/assets/hub_logo_reverse.svg"
          type="image/svg+xml"
        />{" "}
        Bosch IoT Hub
      </div>
      <h1>Coming Soon...</h1>
      <p>
        Stick to the Live Feed until we're finished building this awesome new
        feature
      </p>
    </div>
  </div>
);

export default ComingSoon;
