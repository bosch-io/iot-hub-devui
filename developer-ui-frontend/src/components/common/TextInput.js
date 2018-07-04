/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import ErrorIndicator from "images/errorIndicator.svg";
import WarningIcon from "images/warningIcon.svg";

// No Props checking (Redux Form works!)
/* eslint-disable react/prop-types */
class TextInput extends Component {
  render() {
    const {
      input,
      label,
      type,
      meta: { touched, error, warning }
    } = this.props;

    let classNames = "";
    if (touched && error) {
      classNames += "error ";
    } else if (warning) {
      classNames += "warning";
    }
    const tooltipIdErrorHint = "error-hint";
    const tooltipIdWarnHint = "warn-hint";

    return (
      <div>
        <label htmlFor={input.name}>{label}</label>
        <div className="decorated-text-input">
          <input {...input} type={type} className={classNames} />
          {touched &&
            error && (
              <ErrorIndicator
                className="input-icon"
                data-tip
                data-for={tooltipIdErrorHint}
              />
            )}
          {warning && (
            <WarningIcon
              className="input-icon"
              data-tip
              data-for={tooltipIdWarnHint}
            />
          )}
          <i className="bar" />
          {touched && error && <div className="hint-text error">{error}</div>}
          {warning && <div className="hint-text warning">{warning}</div>}
        </div>
      </div>
    );
  }
}

export default TextInput;
