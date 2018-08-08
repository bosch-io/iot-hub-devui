/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Checkbox from "../Checkbox";

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
      <Checkbox checked={checked} onCheckboxClick={onCheckboxClick} />
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
