/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "./Button";
import { getThemeColor } from "utils";

export const OutlineBtn = Button.extend`
  border: 0.0625em solid ${props => getThemeColor(props)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.25s ease-out;
  position: relative;
  background: none;
  letter-spacing: -0.01em;
  font-weight: 600;
  font-size: 1.4rem;
  min-width: 12rem;
  border-width: 0.125em;
  padding: 0.65em 1.1em;
  outline: none;
  text-transform: uppercase;
  overflow: hidden;
  will-change: transform;

  span {
    color: ${props => getThemeColor(props)};
    position: relative;
    top: 0;
    transition: 0.15s ease-in;
    transition-delay: 0.05s;
    display: inline-flex;
    align-items: center;
  }

  &:before {
    content: "";
    display: block;
    background: ${props => getThemeColor(props)};
    position: absolute;
    width: 200%;
    height: 500%;
    border-radius: 100%;
    transition: 0.2s cubic-bezier(0.4, 0, 1, 1);
    transform: translate(55%, -50%) translateZ(0);
  }

  &:not(:disabled) {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }

  &:hover:not(:disabled) {
    /* background-color: ${props => getThemeColor(props)}; */
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18),
      0 4px 15px 0 rgba(0, 0, 0, 0.15);
    span {
      color: #fff;
    }
    svg path {
      fill: #fff;
    }

    &:before {
      transform: translate(0%, 0%) translateZ(0);
    }
  }

  &:disabled {
    border-color: ${props => props.theme.disabledFontColor};
    span {
      color: ${props => props.theme.disabledFontColor};
    }
  }
`;

export const Icon = styled(({ icon, ...props }) =>
  React.cloneElement(icon, props)
)`
  width: auto;
  height: 1em;
  width: auto;
  margin-left: 0.75em;

  path {
    transition: fill 0.15s ease-in;
    transition-delay: 0.05s;
    fill: ${props => getThemeColor(props)};
  }
`;

const OutlineButton = props => {
  const { children, icon, ...other } = props;
  return (
    <OutlineBtn {...props}>
      <span>
        {children} {icon ? <Icon {...props} /> : null}
      </span>
    </OutlineBtn>
  );
};

OutlineButton.propTypes = {
  children: PropTypes.string,
  primary: PropTypes.bool,
  cancel: PropTypes.bool,
  secondary: PropTypes.bool,
  danger: PropTypes.bool,
  icon: PropTypes.element
};

export default OutlineButton;
