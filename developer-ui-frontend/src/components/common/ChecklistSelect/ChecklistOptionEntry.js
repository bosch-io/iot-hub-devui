/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const OptionEntry = styled.li`
  cursor: pointer;
  list-style: none;
  height: 3.5rem;
  display: flex;
  align-items: center;
  padding: 0.7rem 1.4rem;
  justify-content: ${props =>
    props.leadingCheckbox ? `flex-start` : `space-between`};

  ${props =>
    props.leadingCheckbox &&
    `
    .pretty {
      order: -1;
    }
    `} span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:hover {
    background: rgba(57, 98, 132, 0.1) !important;
    ${props =>
      !props.checked &&
      `
      .pretty label {
        &:before, &:after {
          border-color: ${props.theme.accentBlue};
        }
      }
    `};
  }
`;

const ChecklistOptionEntry = ({
  text,
  checked,
  onClick,
  onCheckboxClick,
  style,
  leadingCheckbox,
  ...others
}) => (
  <div style={style} className="reg-item" onClick={onClick} {...others}>
    <OptionEntry leadingCheckbox={leadingCheckbox} checked={checked}>
      <span>{text}</span>
      <div className="pretty p-svg p-curve p-jelly">
        <input
          type="checkbox"
          id={text}
          onChange={onCheckboxClick}
          checked={checked}
        />
        <div className="state p-info">
          <svg className="svg svg-icon" viewBox="0 0 20 20">
            <path
              d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
              style={{ stroke: "white", fill: "white" }}
            />
          </svg>
          <label />
        </div>
      </div>
    </OptionEntry>
  </div>
);

ChecklistOptionEntry.propTypes = {
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onCheckboxClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  leadingCheckbox: PropTypes.bool
};

export default ChecklistOptionEntry;
