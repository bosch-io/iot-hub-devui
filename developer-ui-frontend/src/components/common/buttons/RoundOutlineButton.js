/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { OutlineBtn, Icon } from "./OutlineButton";
import { getThemeColor } from "utils";
// SVG Imports
import SubmitIcon from "images/submitCaret.svg";

const RoundOutlineBtn = OutlineBtn.extend`
  border-radius: 2.034rem;

  svg.submit-icon {
    path {
      fill: ${props => getThemeColor(props)};
    }
  }

  &:disabled {
    svg.submit-icon path {
      fill: ${props => props.theme.disabledFontColor};
    }
  }

  &:hover {
    border-style: unset;
    &:not(:disabled) {
      padding: calc(0.65em + 0.125em) calc(1.1em + 0.125em)
        calc(0.65em + 0.125em) calc(1.1em + 0.125em);
    }
    svg.submit-icon {
      transform: translateX(0.5em);
      path {
        fill: #fff;
      }
    }
  }
  &:disabled {
    &:hover {
      border-style: solid;
      svg.submit-icon {
        transform: translateX(0);
        path {
          transform: translateX(0);
          fill: ${props => props.theme.disabledFontColor};
        }
      }
    }
  }
`;

const SubmitSvg = styled(SubmitIcon)`
  transition: transform 0.3s ease-out;
  padding-left: 0.75em;
  height: 0.6em;
  path {
    transition: fill 0.5s ease-out;
  }
`;

const RoundOutlineButton = props => {
  const { children, icon, submitAnimation, primary, ...other } = props;
  return (
    <RoundOutlineBtn primary={primary ? 1 : 0} {...props}>
      <span>
        {children} {icon ? <Icon {...props} /> : null}{" "}
        {submitAnimation && <SubmitSvg className="submit-icon" {...other} />}
      </span>
    </RoundOutlineBtn>
  );
};

RoundOutlineButton.propTypes = {
  children: PropTypes.string,
  primary: PropTypes.bool,
  cancel: PropTypes.bool,
  secondary: PropTypes.bool,
  danger: PropTypes.bool,
  icon: PropTypes.element,
  submitAnimation: PropTypes.bool
};

export default RoundOutlineButton;
