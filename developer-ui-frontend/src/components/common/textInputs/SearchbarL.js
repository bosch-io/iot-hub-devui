/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Field } from "redux-form/immutable";
import SearchIcon from "!file-loader!images/searchicon.svg";
import FocusBar from "./FocusBar";

const Searchbar = styled.input`
  font-size: 3.5rem;
  position: relative;
  box-sizing: border-box;
  right: 0;
  top: 0;
  color: #212121;
  padding-right: 3rem;
  font-weight: 100;
  font-family: Roboto;
  background: transparent;
  border-width: 0;
  width: 0%;
  transform: scale(2);
  outline: none;
  background-image: url(${SearchIcon});
  background-size: 3rem 3rem;
  background-position: 100% 50%;
  background-repeat: no-repeat;
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1),
    border-width 0s linear 0.5s, width 0.4s cubic-bezier(0, 0.795, 0, 1) 0.5s;
  caret-color: ${props => props.theme.accentBlue};

  &.active {
    width: 100%;
    transform: scale(1);
    border-width: 0px 0px 1px 0px;
  }

  &:focus {
    outline: none;
    ~ .bar {
      &:before,
      &:after {
        background: #bbb;
        width: 50%;
        height: 1px !important;
      }
    }
  }

  & ~ .__react_component_tooltip {
    position: absolute !important;
    left: 0 !important;
    top: 6rem !important;

    &:after {
      left: 25px !important;
    }
  }
`;

/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
class SearchbarStyledConnected extends Component {
  render() {
    const {
      input: { ...inputStuff },
      inputRef,
      ...other
    } = this.props;
    return <Searchbar innerRef={inputRef} {...inputStuff} {...other} />;
  }
}

class SearchbarL extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ active: true });
    }, 600);
  }

  render() {
    const {
      autoComplete,
      type,
      id,
      error,
      warning,
      asField,
      inputRef,
      ...other
    } = this.props;
    return (
      <div id={id}>
        {asField ? (
          <Field
            component={SearchbarStyledConnected}
            className={this.state.active ? "active" : null}
            type={type || "text"}
            inputRef={inputRef}
            {...other}
          />
        ) : (
          <Searchbar
            type={type || "text"}
            className={this.state.active ? "active" : null}
            autocomplete={autoComplete}
            innerRef={inputRef}
            {...other}
          />
        )}
        <FocusBar className="bar" warning={warning} error={error} />
      </div>
    );
  }
}

SearchbarL.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  asField: PropTypes.bool,
  id: PropTypes.string,
  error: PropTypes.bool,
  warning: PropTypes.bool,
  autoComplete: PropTypes.oneOf(["on", "off"]),
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

export default SearchbarL;
