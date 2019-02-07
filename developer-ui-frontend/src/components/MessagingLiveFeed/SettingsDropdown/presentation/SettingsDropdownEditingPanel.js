/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import throttle from "lodash.throttle";
import { onlyNumbers } from "validation/settingsFormValidation";
import { Field } from "redux-form/immutable";
// SVG Imports
import HintIcon from "images/hintIcon.svg";
import ErrorIndicator from "images/errorIndicator.svg";

export default class SettingsDropdownEditingPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hintShown: false
    };
    this.showHint = throttle(this.showHint, 750, { leading: true }).bind(this);
  }

  showHint() {
    this.setState({ hintShown: true });
  }

  render() {
    const {
      editedCategory,
      currentBufferSize,
      currentNumberOfFeedLines,
      errorIndicator,
      validationText
    } = this.props;
    let currentVal;
    if (editedCategory === "Buffer Size") {
      currentVal = currentBufferSize + " MB";
    } else if (editedCategory === "Number of Feed Lines") {
      currentVal = currentNumberOfFeedLines;
    }

    let hintMessage;
    if (editedCategory === "Number of Feed Lines" && errorIndicator === 0) {
      hintMessage = "Number of lines displayed in the live feed console.";
    } else if (editedCategory === "Buffer Size" && errorIndicator === 0) {
      hintMessage = "Storage space for loggings. Max is ~700MB.";
    } else if (errorIndicator !== 0) {
      hintMessage = validationText;
    }

    let errorIndicatorClass;
    switch (errorIndicator) {
      case 1:
        errorIndicatorClass = "bar warning";
        break;
      case 2:
        errorIndicatorClass = "bar error";
        break;
      default:
        errorIndicatorClass = "bar";
    }

    return (
      <div className="settings-text-form">
        <div id="settings-form-label">
          {editedCategory}
          {errorIndicator === 0 ? (
            <HintIcon
              onMouseEnter={() => this.showHint()}
              onMouseLeave={() => this.setState({ hintShown: false })}
            />
          ) : (
            <ErrorIndicator />
          )}
        </div>
        <Field
          name="settingsTextInput"
          component="input"
          autoComplete="off"
          normalize={
            editedCategory === "Number of Feed Lines" ? onlyNumbers : null
          }
          type="text"
          placeholder={currentVal}
        />
        <i className={errorIndicatorClass} />
        <button type="submit">OK</button>
        {(this.state.hintShown || errorIndicator !== 0) && (
          <div id="hint">
            <span>{hintMessage}</span>
          </div>
        )}
      </div>
    );
  }
}

SettingsDropdownEditingPanel.propTypes = {
  editedCategory: PropTypes.string,
  settingsTextInputVal: PropTypes.string,
  currentBufferSize: PropTypes.number,
  currentNumberOfFeedLines: PropTypes.number,
  onSubmit: PropTypes.func,
  onTextInputChange: PropTypes.func,
  errorIndicator: PropTypes.number,
  validationText: PropTypes.string
};
