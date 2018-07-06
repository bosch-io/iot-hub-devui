/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import SettingsDropdownList from "./SettingsDropdownList";
import { SETTINGS_CATEGORIES } from "_APP_CONSTANTS";
import { camelCase } from "utils";
import SettingsDropdownEditingPanelContainer from "../container/SettingsDropdownEditingPanelContainer";
import { updateSetting } from "actions/UserSettingsActions";
import { connect } from "react-redux";
const enhanceWithClickOutside = require("react-click-outside");
import { Field, reduxForm, formValueSelector } from "redux-form/immutable";
import {
  unitNormalization,
  valueRequired,
  noNegativeValues,
  notOver1000,
  notOver700,
  notOver100
} from "validation/settingsFormValidation";
import { applyValidations } from "validation/generalValidation";
import { log } from "util";

class SettingsDropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validationText: "",
      errorIndicator: 0
    };
    this.submit = this.submit.bind(this);
  }

  handleClickOutside(e) {
    if (this.props.isOpened) {
      if (this.props.inEditingView) {
        setTimeout(() => this.props.toggleEditingView(), 300);
      }
      this.props.toggleDropdownMenu();
      e.stopPropagation();
    }
  }

  // Gets called inside the handleSubmit function of the decorated form, which passes it the current Field values
  submit(values) {
    // Both errors and warnings must hold the values under the property of the specific <Field/> name
    let errors = {};
    let warnings = {};
    // Apply validation functions of the settingsForm
    if (values.get("selectedSettingsItem") === "Buffer Size") {
      // the return value of unitNormalization is either an error string or the number in Megabytes
      const normalized = unitNormalization(values.toJS());
      if (!isNaN(normalized)) {
        // if it's a number normalization was succesful
        values = values.set("settingsTextInput", normalized);
        // valueRequired is already checked in unitNormalization
        errors = applyValidations(
          values.toJS(),
          "settingsTextInput",
          [noNegativeValues, notOver1000],
          false
        );
        warnings = applyValidations(
          values.toJS(),
          "settingsTextInput",
          [notOver700],
          false
        );
      } else {
        errors.settingsTextInput = [];
        errors.settingsTextInput.push(normalized);
      }
    } else if (values.get("selectedSettingsItem") === "Number of Feed Lines") {
      errors = applyValidations(
        values.toJS(),
        "settingsTextInput",
        [valueRequired, noNegativeValues],
        false
      );
      warnings = applyValidations(
        values.toJS(),
        "settingsTextInput",
        [notOver100],
        false
      );
    }
    // No Errors found -> submit new setting
    if (errors.settingsTextInput && errors.settingsTextInput.length === 0) {
      // Create a new settings Object
      const newSetting = {
        setting: camelCase(values.get("selectedSettingsItem")),
        value:
          values.get("selectedSettingsItem") === "Number of Feed Lines"
            ? parseInt(values.get("settingsTextInput"), 10)
            : values.get("settingsTextInput")
      };
      // Dispatch the updateSetting action
      this.props.updateSetting(newSetting);
      // eventually show a warning and close the dropdown
      if (
        warnings.settingsTextInput &&
        warnings.settingsTextInput.length !== 0
      ) {
        let warningText = "";
        Object.keys(warnings).forEach(
          key => (warningText = warningText + errors[key].join("\n"))
        );
        this.setState({ validationText: warningText }, () =>
          this.setState({ errorIndicator: 1 }, () =>
            setTimeout(() => {
              this.setState({ errorIndicator: 0 });
              this.props.toggleDropdownMenu();
              setTimeout(() => this.props.toggleEditingView, 300);
            }, 3000)
          )
        );
      } else {
        this.props.toggleDropdownMenu();
        setTimeout(() => this.props.toggleEditingView, 300);
      }
    } else {
      let errorText = "";
      Object.keys(errors).forEach(
        key => (errorText = errorText + errors[key].join("\n"))
      );
      this.setState({ validationText: errorText }, () =>
        this.setState({ errorIndicator: 2 }, () =>
          setTimeout(() => this.setState({ errorIndicator: 0 }), 3000)
        )
      );
    }
  }

  render() {
    const {
      handleSubmit,
      selectedSettingsItem,
      toggleDropdownMenu,
      toggleEditingView,
      isOpened,
      inEditingView
    } = this.props;

    return (
      <div
        id="settings-dropdown-menu"
        className={
          "dropdown-menu " +
          (isOpened ? "dropdown-menu-active shadow-z-2" : "") +
          (inEditingView ? " inEditingMode" : "")
        }>
        <div>
          <form onSubmit={handleSubmit(this.submit)} noValidate>
            <div>
              <SettingsDropdownList
                selectedItemRef={this.selectedItemRef}
                toggleDropdownMenu={toggleDropdownMenu}
                toggleEditingView={toggleEditingView}
              />
              <SettingsDropdownEditingPanelContainer
                editedCategory={selectedSettingsItem}
                toggleDropdownMenu={toggleDropdownMenu}
                toggleEditingView={toggleEditingView}
                validationText={this.state.validationText}
                errorIndicator={this.state.errorIndicator}
              />
            </div>
            <Field
              name="selectedSettingsItem"
              component="select"
              ref={item => {
                this.selectedItemRef = item;
              }}
              withRef>
              {SETTINGS_CATEGORIES.filter(
                category => category.type === "formConfig"
              ).map((category, index) => (
                <option key={"SettingsItem" + index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Field>
          </form>
        </div>
      </div>
    );
  }
}
// Decorate the Dropdown Menu with enhanceWithClickOutside, reduxForm and connect it to the Redux store
SettingsDropdownMenu = reduxForm({ form: "settingsForm" })(
  enhanceWithClickOutside(SettingsDropdownMenu)
);
const selector = formValueSelector("settingsForm");
SettingsDropdownMenu = connect(
  state => {
    const selectedSettingsItem = selector(state, "selectedSettingsItem");
    return { selectedSettingsItem };
  },
  dispatch => {
    return {
      updateSetting: setting => dispatch(updateSetting(setting))
    };
  }
)(SettingsDropdownMenu);

export default SettingsDropdownMenu;

SettingsDropdownMenu.propTypes = {
  selectedSettingsItem: PropTypes.string,
  isOpened: PropTypes.bool,
  inEditingView: PropTypes.bool,
  toggleDropdownMenu: PropTypes.func,
  toggleEditingView: PropTypes.func,
  handleSubmit: PropTypes.func,
  updateSetting: PropTypes.func
};
