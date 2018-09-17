/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Checkbox from "../Checkbox";
import SwitchCheckbox from "../SwitchCheckbox";

const OptionEntryContainer = styled.div`
  margin: 0 1%;
`;

const OptionEntry = styled.li`
  cursor: pointer;
  list-style: none;
  height: 3.5rem;
  display: flex;
  align-items: center;
  padding: 0.7rem 1.4rem;
  transition: box-shadow 0.15s ease-out, margin 0.15s ease-out;
  justify-content: ${props =>
    props.leadingCheckbox ? `flex-start` : `space-between`};

  ${props =>
    props.highlightSelected &&
    props.selected &&
    `
    box-shadow:  0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.15);
    margin: 0 0.05%;
  `} ${props =>
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
    ${props =>
      !props.checked &&
      props.useSwitches &&
      `
      .pretty {
        .state:before {
          border-color: ${props.theme.accentBlue};
        }
        label:after {
          background-color: transparent !important;
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
  useSwitches,
  selected,
  highlightSelected,
  ...others
}) => (
  <OptionEntryContainer
    style={style}
    className="item"
    onClick={onClick}
    {...others}>
    <OptionEntry
      leadingCheckbox={leadingCheckbox}
      highlightSelected={highlightSelected}
      selected={selected}
      checked={checked}
      useSwitches={useSwitches}>
      <span>{text}</span>
      {useSwitches ? (
        <SwitchCheckbox checked={checked} onCheckboxClick={onCheckboxClick} />
      ) : (
        <Checkbox checked={checked} onCheckboxClick={onCheckboxClick} />
      )}
    </OptionEntry>
  </OptionEntryContainer>
);

ChecklistOptionEntry.propTypes = {
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onCheckboxClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  leadingCheckbox: PropTypes.bool,
  useSwitches: PropTypes.bool,
  selected: PropTypes.bool,
  highlightSelected: PropTypes.bool
};

export default ChecklistOptionEntry;
