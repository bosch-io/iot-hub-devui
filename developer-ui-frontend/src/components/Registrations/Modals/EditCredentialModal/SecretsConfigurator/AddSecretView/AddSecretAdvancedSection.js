/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { change } from "redux-form/immutable";
import uuid from "uuid/v4";
// Child Components
import ExpandLink from "components/common/ExpandLink";
import { TextField } from "components/common/textInputs";
import { DatePicker } from "components/common/textInputs";

class AddSecretAdvancedSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.toggleSection = this.toggleSection.bind(this);
    this.autogenSalt = this.autogenSalt.bind(this);
  }

  toggleSection() {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  autogenSalt() {
    this.props.changeSaltVal(uuid().substring(0, 8));
  }

  render() {
    const { expanded } = this.state;
    const { secretType } = this.props;
    return (
      <div className="secrets-advanced-options">
        <ExpandLink
          expanded={expanded}
          toggle={this.toggleSection}
          className="expand-link"
          openToTop
        >
          Advanced
        </ExpandLink>
        {expanded && (
          <div className="advanced-option-inputs">
            {secretType === "hashed-password" && (
              <div className="salt-input-wrapper">
                <TextField asField name="salt" type="text" label="Salt" />
                <a onClick={this.autogenSalt}>Generate that for me</a>
              </div>
            )}
            <div className="validity-period-wrapper">
              <div className="standard-field">
                <label>Validity Period: </label>
                <DatePicker
                  asField
                  name="notBefore"
                  placeholder="Select a Starting Point..."
                />
                <DatePicker
                  asField
                  name="notAfter"
                  placeholder="Select an Ending Point..."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

AddSecretAdvancedSection.propTypes = {
  changeSaltVal: PropTypes.func.isRequired,
  secretType: PropTypes.string
};

AddSecretAdvancedSection = connect(
  null,
  dispatch => ({
    changeSaltVal: val => dispatch(change("addNewSecret", "salt", val))
  })
)(AddSecretAdvancedSection);

export default AddSecretAdvancedSection;
