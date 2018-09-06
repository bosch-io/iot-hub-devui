/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// Child Components
import Spinner from "components/common/Spinner";
// Code Syntax Highlighting for the modal view (Prism.js)
import Prism from "prismjs";
import Parser from "html-react-parser";

const CodeContainer = styled.div`
  tab-size: 4;
  position: relative;
  width: 100%;
  font-size: 1.3rem;
  border: 0.2rem solid #2a2a2a;
  background-color: ${props => props.theme.codeBackground};
  color: #c0c0c0;
  box-sizing: border-box;
  padding: 1rem;
  outline: none;
  border-radius: 2px;
  resize: none;
  transition: color 0.5s;

  pre {
    font-family: "Roboto Mono", monospace !important;
  }
`;

const LoaderOverlay = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.19);
`;

const JsonReadOnlyView = ({ value, isFetching }) => (
  <CodeContainer className="info-console" className="reg-mode">
    {isFetching && (
      <LoaderOverlay className="fetching-overlay">
        <Spinner type="bubbles" />
      </LoaderOverlay>
    )}
    <pre>
      {Parser(
        Prism.highlight(JSON.stringify(value, null, 2), Prism.languages.json)
      )}
    </pre>
  </CodeContainer>
);

JsonReadOnlyView.propTypes = {
  value: PropTypes.object,
  isFetching: PropTypes.bool
};

export default JsonReadOnlyView;
