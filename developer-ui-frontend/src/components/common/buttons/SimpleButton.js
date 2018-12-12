/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { getThemeColor } from "utils";

const SimpleBtn = Button.extend`
  -webkit-backface-visibility: hidden;
  border: 0;
  outline: none;
  background: none;
  opacity: 0.65;
  transition: opacity 0.18s ease-out;
  color: ${props => getThemeColor(props)};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  a {
    text-decoration: none;
    color: inherit;
  }
  svg {
    path {
      ${props =>
        props.submitAnimation
          ? `fill: ${props.theme.disabledFontColorHiContrast};`
          : `fill: ${getThemeColor(props)};`};
    }
  }

  &:hover {
    opacity: 1;
    ${props =>
      props.submitAnimation &&
      `
    svg {
      transform: translateX(0.5em);
      path {
        fill: ${getThemeColor(props)};
      }
    }`};
  }
  &:disabled {
    color: ${props => props.theme.disabledFontColorHiContrast};
    &:hover {
      svg {
        transform: translateX(0);
        path {
          transform: translateX(0);
          fill: ${props => props.theme.disabledFontColorHiContrast};
        }
      }
    }
  }
`;

const SimpleButton = props => {
  const {
    children,
    submitAnimation,
    primary,
    secondary,
    danger,
    ...other
  } = props;
  return (
    <SimpleBtn
      primary={primary ? 1 : 0}
      secondary={secondary ? 1 : 0}
      danger={danger ? 1 : 0}
      submitAnimation={submitAnimation}
      {...other}
    >
      {submitAnimation}
      {children}
    </SimpleBtn>
  );
};

SimpleButton.propTypes = {
  type: PropTypes.string,
  children: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  danger: PropTypes.bool,
  submitAnimation: PropTypes.bool
};

export default SimpleButton;
