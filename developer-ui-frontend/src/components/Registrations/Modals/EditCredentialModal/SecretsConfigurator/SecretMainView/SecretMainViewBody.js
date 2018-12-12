/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
// Child Components
import SecretAdvancedSection from "./SecretAdvancedSection";

const SecretMainViewBody = ({ secret, inEditingMode }) => (
  <Fragment>
    <div className="secrets-standard-fields">
      <div className="standard-field">
        <label className="credentialLabels">Hash Algorithm: </label>{" "}
        {secret["hash-function"]}
      </div>
      <div className="standard-field">
        <label className="credentialLabels">Password Hash: </label>{" "}
        {secret["pwd-hash"]}
      </div>
    </div>
    <SecretAdvancedSection
      secretId={secret.secretId}
      notBefore={secret["not-before"]}
      notAfter={secret["not-after"]}
      salt={secret.salt}
      inEditingMode={inEditingMode}
    />
  </Fragment>
);

SecretMainViewBody.propTypes = {
  secret: PropTypes.shape({
    secretId: PropTypes.string.isRequired,
    pwdHash: PropTypes.string,
    "not-before": PropTypes.string,
    "not-after": PropTypes.string,
    salt: PropTypes.string
  }),
  inEditingMode: PropTypes.bool
};

export default SecretMainViewBody;
