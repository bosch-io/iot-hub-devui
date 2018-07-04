/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable */
import { connect } from "react-redux";
import SettingsDropdownEditingPanel from "../presentation/SettingsDropdownEditingPanel";
import { selectBufferSize, selectNumberOfFeedLines } from "reducers/selectors";

const mapStateToProps = (state, ownProps) => {
  return {
    currentBufferSize: selectBufferSize(state),
    currentNumberOfFeedLines: selectNumberOfFeedLines(state),
    validationText: ownProps.validationText,
    errorIndicator: ownProps.errorIndicator,
    editedCategory: ownProps.editedCategory
  };
};

const SettingsDropdownEditingPanelContainer = connect(mapStateToProps)(
  SettingsDropdownEditingPanel
);

export default SettingsDropdownEditingPanelContainer;
