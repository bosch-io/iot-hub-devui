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
  z-index: 1;
`;

const EditorBtn = styled(FlatButton)`
  font-weight: 600;
  font-size: 1.3rem;
  padding: 0.5rem;
  ${props => props.cancel && `color: #848d9e`};
`;

const LINE_HEIGHT = 20; // px
const BOTTOM_MARGIN = 10; // px

class JsonEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentJson: props.value,
      initialHeight: props.dynamicHeight
        ? JSON.stringify(props.value, null, 2).split(/\r\n|\r|\n/).length *
            LINE_HEIGHT +
          BOTTOM_MARGIN +
          "px"
        : null
    };
    this.handleChange = this.handleChange.bind(this);
    this.editorRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.dynamicHeight) {
      this.editorRef.current.htmlElementRef.getElementsByClassName(
        "ace_editor"
      )[0].style.height = this.state.initialHeight;
    }
  }

  handleChange(e) {
    this.setState({ currentJson: e });
  }

  render() {
    const {
      editorConfig,
      onSubmit,
      onCancel,
      style,
      className,
      dynamicHeight
    } = this.props;
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
          ref={dynamicHeight ? this.editorRef : null}
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
  value: PropTypes.object,
  editorConfig: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  dynamicHeight: PropTypes.bool
};

export default JsonEditor;
