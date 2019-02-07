/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
// Child Components
import SecretAdvancedSection from "./SecretAdvancedSection";

const SecretMainViewBody = ({ secret, inEditingMode, secretType }) => (
  <Fragment>
    {secretType === "hashed-password" ? (
      <div className="secrets-standard-fields">
        <div className="standard-field">
          <label>Hash Algorithm: </label> {secret["hash-function"]}
        </div>
        <div className="standard-field">
          <label className="credentialLabels">Password Hash: </label>{" "}
          {secret["pwd-hash"]}
        </div>
      </div>
    ) : (
      <div className="secrets-standard-fields">
        <div className="standard-field">
          <label className="credentialLabels">Key: </label> {secret.key}
        </div>
      </div>
    )}

    <SecretAdvancedSection
      secretType={secretType}
      secretId={secret.secretId}
      notBefore={secret["not-before"]}
      notAfter={secret["not-after"]}
      salt={secret.salt}
      inEditingMode={inEditingMode}
    />
  </Fragment>
);

SecretMainViewBody.propTypes = {
  secretType: PropTypes.string,
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
