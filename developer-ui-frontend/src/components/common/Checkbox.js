/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ checked, onCheckboxClick, label, ...others }) => (
  <div
    className={`pretty p-svg p-curve p-jelly ${
      others && others.className ? others.className : ""
    }`}
    {...others}>
    <input type="checkbox" onChange={onCheckboxClick} checked={checked} />
    <div className="state p-info">
      <svg className="svg svg-icon" viewBox="0 0 20 20">
        <path
          d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
          style={{ stroke: "white", fill: "white" }}
        />
      </svg>
      <label>{label}</label>
    </div>
  </div>
);

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onCheckboxClick: PropTypes.func.isRequired,
  label: PropTypes.string
};

export default Checkbox;
