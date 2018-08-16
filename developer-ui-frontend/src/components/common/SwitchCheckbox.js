/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";

const SwitchCheckbox = ({ checked, onCheckboxClick, label }) => (
  <div className="pretty p-switch p-fill">
    <input onChange={onCheckboxClick} checked={checked} type="checkbox" />
    <div className="state">
      <label>{label}</label>
    </div>
  </div>
);

SwitchCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onCheckboxClick: PropTypes.func.isRequired,
  label: PropTypes.string
};

export default SwitchCheckbox;
