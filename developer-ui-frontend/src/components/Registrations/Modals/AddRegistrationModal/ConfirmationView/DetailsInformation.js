/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import { TextCopyField } from "components/common/textInputs";

const DetailsInformation = ({ deviceId, authId }) => (
  <div className="details">
    <h5>Device Information</h5>
    <TextCopyField name="deviceId" label="Device-ID:" copyText={deviceId} />
    <TextCopyField name="authId" label="Auth-ID:" copyText={authId} />
  </div>
);

DetailsInformation.propTypes = {
  deviceId: PropTypes.string.isRequired,
  authId: PropTypes.string.isRequired
};

export default DetailsInformation;
