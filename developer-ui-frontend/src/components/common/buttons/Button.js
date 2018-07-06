/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import styled from "styled-components";

// This is the base styled component for a Button which has to be extended
// by the implementation
const Button = styled.button`
  cursor: pointer;
  font-size: 1.6rem;
  border-radius: 0.2rem;
  padding: 0.5rem 2rem;
  svg {
    display: inline-block;
    width: auto;
  }
  &:disabled {
    cursor: not-allowed;
    color: ${props => props.theme.disabledFontColor};
  }
`;

export default Button;
