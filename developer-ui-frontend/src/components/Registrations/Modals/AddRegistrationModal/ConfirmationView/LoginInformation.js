/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Fragment } from "react";
import { StaggeredMotion, spring } from "react-motion";
import PropTypes from "prop-types";
import { TextCopyField } from "components/common/textInputs";

const httpEndpoint = "https://http.bosch-iot-hub.com/telemetry";

const LoginInformation = ({
  authId,
  tenant,
  pw,
  shiftingAnimationFinished
}) => (
  <Fragment>
    <h5>Device Credentials</h5>
    <StaggeredMotion
      defaultStyles={[{ opacity: 0 }, { opacity: 0 }]}
      styles={prevInterpolatedStyles =>
        prevInterpolatedStyles.map((_, i) => {
          return i === 0
            ? {
                opacity: shiftingAnimationFinished ? spring(1) : 0
              }
            : {
                opacity: shiftingAnimationFinished
                  ? spring(prevInterpolatedStyles[i - 1].opacity)
                  : 0
              };
        })
      }
    >
      {interpolatingStyles => (
        <div className="new-device-info">
          {[
            <TextCopyField
              copyText={`${authId}@${tenant}`}
              name="username"
              label="Username:"
              key={0}
              style={{ opacity: interpolatingStyles[0].opacity }}
            />,
            <TextCopyField
              copyText={pw}
              type="password"
              name="password"
              label="Password:"
              key={1}
              style={{ opacity: interpolatingStyles[1].opacity }}
            />
          ]}
          <h5>Send Data</h5>
          <p>
            For a full list of adapters, please consult the{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.bosch-iot-hub.com/protocoladapters.html"
            >
              Bosch IoT Hub documentation
            </a>
          </p>
          <p>e.g. to send HTTP telemetry, POST some data to this endpoint:</p>
          <TextCopyField name="httpEndpoint" copyText={httpEndpoint} />
        </div>
      )}
    </StaggeredMotion>
  </Fragment>
);

LoginInformation.propTypes = {
  authId: PropTypes.string.isRequired,
  tenant: PropTypes.string.isRequired,
  pw: PropTypes.string.isRequired,
  shiftingAnimationFinished: PropTypes.bool.isRequired
};

export default LoginInformation;
