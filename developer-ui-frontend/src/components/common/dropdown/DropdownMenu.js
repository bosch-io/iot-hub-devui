/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";

const MenuWrapper = styled.div`
  position: relative;
  background: white;
  border: 1px solid #ddd;
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
  display: inline-flex;
  flex-direction: column;
  z-index: 2;
  ${props =>
    props.show
      ? `
    opacity: 1;
    transform: translateY(0);`
      : `
    opacity: 0;
    transform: translateY(-1rem);
    pointer-events: none;
    `};
`;

const MenuItem = styled.input`
  flex: 1;
  display: inline-flex;
  align-items: center;
  height: 3rem;
  font: unset;
  background: white;
  padding: 0 3rem 0 1.2rem;
  border: 1px solid transparent;
  cursor: pointer;
  &:hover:enabled {
    background-color: rgba(57, 98, 132, 0.1) !important;
    box-shadow: 0 -1px 0 0 ${props => props.theme.accentBlue},
      1px 0 0 0 ${props => props.theme.accentBlue},
      -1px 0 0 0 ${props => props.theme.accentBlue};
    border-bottom: 1px solid ${props => props.theme.accentBlue};
  }
  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }

  &:disabled {
    cursor: not-allowed !important;
    color: #dddd;
  }
`;

const DropdownMenu = ({ show, items, input, selectItem }) => (
  <MenuWrapper show={show}>
    {items.map(item => (
      <MenuItem
        {...input}
        disabled={item.disabled ? 1 : 0}
        key={item.id}
        onClick={() => selectItem(item)}
        value={item.value}
        readOnly
      />
    ))}
  </MenuWrapper>
);

DropdownMenu.propTypes = {
  show: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, value: PropTypes.string })
  ),
  input: PropTypes.object,
  selectItem: PropTypes.func.isRequired
};

export default DropdownMenu;
