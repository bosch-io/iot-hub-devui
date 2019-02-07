/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Child Components
import { DatePicker } from "components/common/textInputs";
import "styles/credentialModal.scss";

class SecretAdvancedSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    };
  }

  toggleSection() {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  render() {
    const {
      notBefore,
      notAfter,
      salt,
      inEditingMode,
      secretId,
      secretType
    } = this.props;
    const { expanded } = this.state;
    const saltText = salt || "";
    return (
      <div className="secrets-advanced-options">
        <p className="advanced-headline">Advanced</p>
        {expanded && (
          <div className="advanced-option-inputs">
            {secretType === "hashed-password" && (
              <div className="salt-input-wrapper">
                <div className="standard-field">
                  <label className="credentialLabels">Salt: </label>
                  {saltText}
                </div>
              </div>
            )}
            <div className="validity-period-wrapper">
              {inEditingMode ? (
                <Fragment>
                  <label>Validity Period:</label>
                  <div className="standard-field">
                    <DatePicker
                      asField
                      name={secretId + "notBefore"}
                      placeholder={notBefore}
                      secretId={secretId}
                    />
                  </div>
                  <div className="standard-field">
                    <DatePicker
                      asField
                      name={secretId + "notAfter"}
                      placeholder={notAfter}
                      secretId={secretId}
                    />
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="standard-field">
                    <label>Valid starting: </label>
                    {notBefore}
                  </div>
                  <div className="standard-field">
                    <label>Valid until: </label>
                    {notAfter}
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

SecretAdvancedSection.propTypes = {
  authId: PropTypes.string,
  secretId: PropTypes.string,
  notBefore: PropTypes.string,
  notAfter: PropTypes.string,
  salt: PropTypes.string,
  inEditingMode: PropTypes.bool,
  secretType: PropTypes.string
};

export default SecretAdvancedSection;
