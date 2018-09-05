/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import { JsonEditor as Editor } from "jsoneditor-react";
import styled from "styled-components";
import { FlatButton } from "components/common/buttons";
import PropTypes from "prop-types";
import ace from "brace";
import "styles/jsonEditor.scss";
import "brace/mode/json";
// import "brace/theme/tomorrow_night_blue";
import "./customAceTheme";

const FixedBtnsContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 1rem;
`;

const EditorBtn = styled(FlatButton)`
  font-weight: 600;
  font-size: 1.3rem;
  padding: 0.5rem;
  ${props => props.cancel && `color: #848d9e`};
`;

class JsonEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentJson: props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ currentJson: e });
  }

  render() {
    const { editorConfig, onSubmit, onCancel, style, className } = this.props;
    const { currentJson } = this.state;
    return (
      <div
        className={`jsoneditor-container ${className ? className : ""}`}
        style={style}>
        <Editor
          {...editorConfig}
          value={currentJson}
          onChange={this.handleChange}
          search={false}
          navigationBar={false}
          ace={ace}
          mode="code"
          theme="ace/theme/prism_duo_tone"
        />
        <FixedBtnsContainer>
          <EditorBtn cancel onClick={onCancel}>
            CANCEL
          </EditorBtn>
          <EditorBtn secondary onClick={() => onSubmit(this.state.currentJson)}>
            SAVE
          </EditorBtn>
        </FixedBtnsContainer>
      </div>
    );
  }
}

JsonEditor.propTypes = {
  value: PropTypes.object.isRequired,
  editorConfig: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default JsonEditor;
