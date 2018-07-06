/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import styled from "styled-components";

const FocusBar = styled.i`
  position: relative;
  display: block;
  &:before,
  &:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 0;
    position: absolute;
    background: ${props => props.theme.accentBlue};
    transition: all 0.15s ease;
    z-index: 2;
  }
  &:before {
    left: 50%;
  }
  &:after {
    right: 50%;
  }

  ${props =>
    props.error &&
    `
  &:before,
  &:after {
    background: ${props.theme.accentRed}!important;
  }
  & ~ span {
    color: ${props.theme.accentRed} !important;

    #hint {
      border-color: ${props.theme.accentRed} !important;
    }
  }
`}} ${props =>
    props.warning &&
    `
  &:before,
  &:after {
    background: ${props.theme.accentYellow} !important;
  }
  & ~ span {
    color: ${props.theme.accentYellow} !important;

    #hint {
      border-color: ${props.theme.accentYellow} !important;
    }
  }
`};
`;

export default FocusBar;
