/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import { TextCopyField } from "components/common/textInputs";

const httpEndpoint = "https://http.bosch-iot-hub.com/telemetry";

const DetailsInformation = ({ deviceId, authId }) => (
  <div className="details">
    <h5>Device Information</h5>
    <TextCopyField name="deviceId" label="Device-ID:" copyText={deviceId} />
    <TextCopyField name="authId" label="Auth-ID:" copyText={authId} />
    <h5>Send Data</h5>
    <p>
      For a full list of adapters, please consult the{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://docs.bosch-iot-hub.com/protocoladapters.html">
        Bosch IoT Hub documentation
      </a>
    </p>
    <p>e.g. to send HTTP telemetry, POST some data to this endpoint:</p>
    <TextCopyField name="httpEndpoint" copyText={httpEndpoint} />
  </div>
);

DetailsInformation.propTypes = {
  deviceId: PropTypes.string.isRequired,
  authId: PropTypes.string.isRequired
};

export default DetailsInformation;
