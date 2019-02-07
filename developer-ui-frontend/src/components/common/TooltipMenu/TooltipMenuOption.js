/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MenuListItem = styled.li`
  cursor: pointer;
  position: relative;
  padding-left: 1.2em !important;
  transition: background 0.2s ease-out;
  font-weight: 500;
  color: rgb(117, 117, 117);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 4rem;
  ${props =>
    props.disabled &&
    `
    opacity: 0.4;
    cursor: not-allowed;
    & > a {
      cursor: not-allowed;
      pointer-events: none;
    }
  `} &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 10%;
    bottom: 0;
    right: 10%;
    width: 80%;
    height: 100%;
    border-bottom: 1px solid rgba(201, 201, 201, 0.3);
  }
  :last-child::after {
    border-bottom: none !important;
  }
  &:hover {
    background: #f5f5f5;
  }
`;

const StyledLink = styled(Link)`
  z-index: 1;
  outline: none;
  width: 100%;
  height: 100%;
  display: flex;
  text-decoration: inherit;
  align-items: center;
  color: inherit;
  margin-left: -1.3em;
  padding-left: 1.3em;
`;

const ListIcon = styled(({ icon, ...props }) =>
  React.cloneElement(icon, props)
)`
  height: 1.2em;
  width: 1.2em;
  padding-right: 1em;
  vertical-align: middle;
  opacity: 0.7;
`;

const TooltipMenuOption = ({
  value,
  toggleOpen,
  disabled,
  icon,
  disabledHoverTooltipId,
  route
}) => (
  <MenuListItem
    disabled={disabled}
    data-for={disabled ? disabledHoverTooltipId : null}
    data-tip={disabled}
  >
    <StyledLink to={route} onClick={toggleOpen}>
      <div>
        <ListIcon icon={icon} />
        {value}
      </div>
    </StyledLink>
  </MenuListItem>
);

TooltipMenuOption.propTypes = {
  toggleOpen: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.element,
  disabledHoverTooltipId: PropTypes.string,
  route: PropTypes.string
};

export default TooltipMenuOption;
