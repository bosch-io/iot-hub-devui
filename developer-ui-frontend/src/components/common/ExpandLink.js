/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Link = styled.a`
  cursor: pointer;
  margin-top: 1rem;
  user-select: none;
  color: ${props => props.theme.accentBlue};
  display: inline-flex;
  align-items: center;
`;

const Caret = styled.span`
  transition: transform 0.3s;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: ${props =>
    props.openToTop ? `0 0.4em 0.4em 0.4em` : `0.4em 0.4em 0 0.4em`};
  border-color: ${props =>
    props.openToTop
      ? `transparent transparent ${props.theme.accentBlue}
    transparent`
      : `${props.theme.accentBlue} transparent transparent
    transparent`};
  margin-right: 0.5em;

  ${props =>
    props.expanded &&
    `
    transform: rotateZ(180deg);
  `};
`;

const ExpandLink = ({ expanded, toggle, children, openToTop, ...other }) => {
  return (
    <Link openToTop={openToTop} expanded={expanded} onClick={toggle} {...other}>
      <Caret openToTop={openToTop} expanded={expanded} /> {children}
    </Link>
  );
};

ExpandLink.propTypes = {
  expanded: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  openToTop: PropTypes.bool
};

export default ExpandLink;
