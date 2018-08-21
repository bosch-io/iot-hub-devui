/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// AccordionContainer constrains the dimensions if the maximum height gets exceeded
const AccordionContainer = styled.div`
  display: flex;
  max-height: 100%;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

// AccordionInner is the real dimension of the Accordion
const AccordionInner = styled.span`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
  background-color: #ccc;
  /* Prevent blurryness */
  -webkit-font-smoothing: subpixel-antialiased;
  backface-visibility: hidden;
  transform: translateZ(0);
`;

const Accordion = ({ children }) => (
  <AccordionContainer>
    <AccordionInner>{children}</AccordionInner>
  </AccordionContainer>
);

Accordion.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default Accordion;
