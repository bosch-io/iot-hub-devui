/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyIcon from "images/copyClipboardIcon.svg";
import EyeIcon from "images/unmaskPwIcon.svg";
import ReactTooltip from "react-tooltip";

const InputWrapper = styled.div`
  width: 100%;
`;

const InputLabel = styled.label`
  width: unset !important;
  color: rgba(255, 255, 255, 0.54);
  font-weight: 600;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  flex: 1;
  border-radius: 2px;
  background-color: #2a2a2a;
  margin: 0.75rem 0;
`;

const Input = styled.input`
  background-color: #343434;
  border: 0.2rem solid #2a2a2a;
  border-radius: 2px;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
  color: rgba(192, 192, 192, 0.7);
  font-family: monospace;
  padding: 0.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  &::selection,
  *::selection {
    background: ${props => props.theme.accentGreen};
    color: #fff;
  }
`;

const CopyButton = styled.button`
  cursor: pointer;
  background-color: #2a2a2a;
  border: none;
  width: 3rem;
  display: flex;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  svg path {
    fill: #fff;
  }
`;

const ShowPwButton = styled.button`
  cursor: pointer;
  position: absolute;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  right: 3rem;
  border: none;
  background: transparent;
  svg {
    width: 2rem;
    path {
      fill: rgba(255, 255, 255, 0.8);
    }
  }
`;

const DELAY_HIDE = 2000;

class TextCopyField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyBtnClicked: false,
      passwordShown: false // Only used if props.type === "password"
    };
    this.copiedTextTimeout = null;
    this.onCopyBtnClick = this.onCopyBtnClick.bind(this);
    this.onPwBtnClick = this.onPwBtnClick.bind(this);
  }

  onCopyBtnClick() {
    this.setState({ copyBtnClicked: true }, () => {
      this.copiedTextTimeout = setTimeout(() => {
        this.setState({ copyBtnClicked: false });
      }, DELAY_HIDE);
    });
  }

  onPwBtnClick() {
    this.setState(state => ({ passwordShown: !state.passwordShown }));
  }

  render() {
    const { copyText, label, name, type, ...other } = this.props;
    const tooltipId = `tt-copy-btn-${name}`;

    let inputType = null;
    if (!type) {
      inputType = "text";
    } else if (type === "password") {
      if (this.state.passwordShown) {
        inputType = "text";
      } else {
        inputType = "password";
      }
    } else {
      inputType = type;
    }

    return (
      <Fragment>
        <InputWrapper {...other}>
          {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
          <InputGroup>
            <Input type={inputType} name={name} readOnly value={copyText} />
            {type === "password" && (
              <ShowPwButton type="button" onClick={this.onPwBtnClick}>
                <EyeIcon />
              </ShowPwButton>
            )}
            <CopyToClipboard
              text={copyText}
              onCopy={() => this.onCopyBtnClick()}>
              <CopyButton type="button" data-tip data-for={tooltipId}>
                <CopyIcon />
              </CopyButton>
            </CopyToClipboard>
          </InputGroup>
        </InputWrapper>
        <ReactTooltip
          id={tooltipId}
          place="bottom"
          type="dark"
          effect="solid"
          getContent={[() => (this.state.copyBtnClicked ? "Copied!" : "Copy")]}
          delayHide={this.state.copyBtnClicked ? DELAY_HIDE : 0}
        />
      </Fragment>
    );
  }
}

TextCopyField.propTypes = {
  copyText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "password"])
};

export default TextCopyField;
