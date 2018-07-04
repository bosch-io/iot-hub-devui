/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable */
import { connect } from "react-redux";
import * as actions from "actions/UserSettingsActions";
import { SETTINGS_CATEGORIES } from "_APP_CONSTANTS";
import Setting from "../presentation/Setting";
import { selectScrollAnimationActive } from "reducers/selectors";

const mapStateToProps = (state, ownProps) => {
  return {
    scrollAnimationActive: selectScrollAnimationActive(state),
    categoryName: ownProps.categoryName,
    type: ownProps.type
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCheckboxChange: value => {
      dispatch(
        actions.updateSetting({
          setting: "scrollAnimationActive",
          value: value
        })
      );
    },
    onClick: newCategory => {
      if (
        SETTINGS_CATEGORIES.find(category => category.name === newCategory)
          .type === "formConfig"
      ) {
        ownProps.changeSelectedDropdown(newCategory);
        ownProps.toggleEditingView();
      }
    }
  };
};

const SettingsDropdownEntry = connect(mapStateToProps, mapDispatchToProps)(
  Setting
);

export default SettingsDropdownEntry;
