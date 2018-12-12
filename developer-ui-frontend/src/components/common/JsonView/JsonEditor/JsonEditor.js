/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { JsonEditor as Editor } from "jsoneditor-react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Prompt from "components/helpers/Prompt";
import { FlatButton } from "components/common/buttons";
import PropTypes from "prop-types";
import ace from "brace";
import "styles/jsonEditor.scss";
import "brace/mode/json";
import "./customAceTheme";
import Ajv from "ajv";

const FixedBtnsContainer = styled.div`
  position: absolute;
  right: 0;
  ${props => (props.snapFooter ? `bottom: 100%` : `bottom: 0`)};
  ${props => (props.snapFooter ? `z-index: 0;` : `z-index: 5;`)};
  justify-content: flex-end;
  align-items: flex-end;
  padding: 0.6rem;
  background-color: #2d3e50;
  border-top-left-radius: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
`;

const EditorBtn = styled(FlatButton)`
  font-weight: 600;
  font-size: 1.3rem;
  padding: 0.5rem;
  ${props => props.cancel && `color: #848d9e`};
`;

const LINE_HEIGHT = 20; // px
const BOTTOM_MARGIN = 10; // px
const ajv = new Ajv({ allErrors: false, verbose: false });

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
      dynamicHeight,
      value,
      schema,
      snapFooter,
      isLeaving
    } = this.props;
    const { currentJson } = this.state;
    const renderedButtons = (
      <FixedBtnsContainer snapFooter={snapFooter}>
        <EditorBtn cancel onClick={onCancel}>
          CANCEL
        </EditorBtn>
        <EditorBtn secondary onClick={() => onSubmit(this.state.currentJson)}>
          SAVE
        </EditorBtn>
      </FixedBtnsContainer>
    );
    let fixedButtons;
    // If the Accordion footer is snapped, render the buttons relative to the footer with a Portal
    if (snapFooter) {
      const footerPortalNode = document.getElementById(
        "fixed-acc-footer-modal"
      );
      if (footerPortalNode) {
        fixedButtons = ReactDOM.createPortal(renderedButtons, footerPortalNode);
      }
    } else {
      fixedButtons = renderedButtons;
    }
    return (
      <div
        className={`jsoneditor-container ${className ? className : ""}`}
        style={style}>
        {!isLeaving && (
          <Prompt
            when={currentJson !== value}
            message={location =>
              location.state && location.state.withChangesSaved
                ? true
                : "Are you sure you want to quit the Editor? Changes will be discarded"
            }
          />
        )}
        <Editor
          {...editorConfig}
          value={currentJson}
          onChange={this.handleChange}
          search={false}
          navigationBar={false}
          ace={ace}
          ajv={ajv}
          schema={schema}
          mode="code"
          theme="ace/theme/prism_duo_tone"
          ref={dynamicHeight ? this.editorRef : null}
        />
        {!isLeaving && fixedButtons}
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
  dynamicHeight: PropTypes.bool,
  location: PropTypes.object.isRequired,
  schema: PropTypes.object,
  snapFooter: PropTypes.bool,
  isLeaving: PropTypes.bool
};

export default withRouter(JsonEditor);
