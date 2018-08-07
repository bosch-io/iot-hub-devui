/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import FocusBar from "./FocusBar";
import styled from "styled-components";
import { transparentize } from "polished";
import { Field } from "redux-form/immutable";
import ErrorIndicator from "images/errorIndicator.svg";
import WarningIcon from "images/warningIcon.svg";

const InputContainer = styled.div`
  &:not(.spinner) {
    width: 100%;
    margin: 1rem 0;
    display: flex;
  }
`;

const InputLabel = styled.label`
  &:not(.spinner) {
    display: inline-block;
    color: rgba(0, 0, 0, 0.54);
    width: 11rem;
    margin-right: 1rem;
    font-weight: 600;
    padding: 0.4rem 0;
    flex-shrink: 0;
  }
`;

const TextInputContainer = styled.div`
  width: 100%;
  position: relative;
  font-size: 1.6rem;
`;

const TextInputInnerContainer = styled.div`
  display: flex;
  position: relative;
`;

const TextInput = styled.input`
  width: 100%;
  height: 1.8rem;
  border-width: 0 0 1px 0;
  border-color: #ccc;
  color: #757575;
  padding: 0.4rem 0;
  transition: background-color 0.2s ease-out;

  &:focus {
    outline: none;
    ~ .bar {
      &:before,
      &:after {
        width: 50%;
      }
    }
  }

  ${props =>
    props.error &&
    `
    background-color: ${transparentize(0.98, props.theme.accentRed)};
  `} ${props =>
    props.warning &&
    `
    background-color: ${transparentize(0.98, props.theme.accentYellow)};
  `};
`;

const StyledTextInputIcon = styled(({ component, ...props }) =>
  React.cloneElement(component, props)
)`
  width: 2rem;
  height: 2rem;
  margin: 0.4rem 0 0.4rem 0.8rem;
  transition: transform 0.2s cubic-bezier(0.2, 0.6, 0.3, 1.1);

  ${props => {
    if (props.error) {
      return `
      path {
        fill: ${props.theme.accentRed};
        opacity: 0.75;
      }
      `;
    } else if (props.warning) {
      return `
      path {
        fill: ${props.theme.accentYellow};
        opacity: 0.75;
      }
      `;
    }
    return `transform: translate(-50%, -50%) scale(0) !important;`;
  }};
`;

const HintText = styled.div`
  font-size: smaller;
  margin-top: 0.3rem;

  ${props =>
    props.error && `color: ${props.theme.accentRed}; opacity: 0.7;`} ${props =>
    props.warning && `color: rgba(0, 0, 0, 0.7);`};
`;

// No Props checking (Redux Form works!)
/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
const TextInputIcon = ({ error, warning, touched, asField }) => {
  const tooltipIdErrorHint = "error-hint";
  const tooltipIdWarnHint = "warn-hint";
  let Icon = null;
  if ((touched || !asField) && error) {
    Icon = (
      <StyledTextInputIcon
        component={<ErrorIndicator />}
        error={error}
        data-tip
        data-for={tooltipIdErrorHint}
      />
    );
  } else if (warning) {
    Icon = (
      <StyledTextInputIcon
        component={<WarningIcon />}
        warning={warning}
        data-tip
        data-for={tooltipIdWarnHint}
      />
    );
  }
  return Icon;
};

const TextFieldStyledConnected = ({
  meta: { touched, error, warning, active },
  ...others
}) => (
  <TextField
    touched={touched}
    error={error}
    warning={warning}
    active={active}
    {...others}
  />
);

class TextField extends Component {
  render() {
    const {
      label,
      type,
      error,
      warning,
      touched,
      active,
      asField,
      inputRef
    } = this.props;
    let { input } = this.props;

    if (!input) {
      // The component is not rendered as Redux-Form Field Comp.
      // -> The name is provided directly through the name prop
      input = { name };
    }

    return (
      <InputContainer>
        <InputLabel htmlFor={input.name}>{label}</InputLabel>
        <TextInputContainer>
          <TextInputInnerContainer>
            <div style={{ flex: 1, position: "relative" }}>
              <TextInput
                {...input}
                type={type}
                error={((touched && !active) || !asField) && error}
                warning={((touched && !active) || !asField) && warning}
                innerRef={inputRef}
              />
              <FocusBar
                className="bar"
                warning={warning}
                error={(touched || !asField) && error}
              />
            </div>
            <TextInputIcon
              error={error}
              warning={warning}
              touched={touched}
              asField={asField}
            />
          </TextInputInnerContainer>
          {(touched || !asField) && error && <HintText error>{error}</HintText>}
          {warning && <HintText warning>{warning}</HintText>}
        </TextInputContainer>
      </InputContainer>
    );
  }
}

TextField.propTypes = {
  error: PropTypes.string,
  warning: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  touched: PropTypes.bool,
  asField: PropTypes.bool,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

export default props =>
  props.asField ? (
    <Field {...props} component={TextFieldStyledConnected} />
  ) : (
    <TextField {...props} />
  );
