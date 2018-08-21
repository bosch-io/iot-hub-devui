/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import styled from "styled-components";

const AccordionFixedFooter = styled.div`
  &:not(.adding-mode) {
    cursor: pointer;
  }
  position: relative;
  z-index: 1;
  display: flex;
  height: 4rem;
  align-content: center;
  background: #fff;
  border: 1px solid #ccc;
  font-weight: 500;
  padding: 0 1rem;
  color: #757575;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

export default AccordionFixedFooter;
