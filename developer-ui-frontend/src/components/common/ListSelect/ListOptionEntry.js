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

  ${props =>
    props.selected &&
    `
    box-shadow:  0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.15);
    margin: 0 0.05%;
  `} span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:hover {
    background: rgba(57, 98, 132, 0.1) !important;
  }
`;

const ListOptionEntry = ({ text, selected, onClick, style, ...others }) => (
  <div style={style} className="reg-item" onClick={onClick} {...others}>
    <OptionEntry selected={selected}>
      <span>{text}</span>
    </OptionEntry>
  </div>
);

ListOptionEntry.propTypes = {
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object
};

export default ListOptionEntry;
