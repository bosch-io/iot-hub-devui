/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field } from "redux-form/immutable";
import SearchIcon from "!file-loader!images/searchicon.svg";

const SearchbarContainer = styled.div`
  height: 2.5rem;
  width: 100%;
`;

const Searchbar = styled.input`
  border-radius: 1.25rem;
  box-sizing: border-box;
  transition: all 0.2s ease-out;
  width: 100%;
  height: 100%;
  padding-left: 24px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0);
  color: #555;
  outline: none;
  background-image: url(${SearchIcon});
  background-size: 1rem 1rem;
  background-position: 8px 7px;
  background-repeat: no-repeat;
  &::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    background-color: rgba(245, 245, 245, 0.3);
    border-color: rgba(255, 255, 255, 0.4);
    color: #ccc;
    font-weight: 600;

    &::-webkit-input-placeholder {
      color: transparent;
      font-weight: 400;
    }
  }

  & ~ .__react_component_tooltip {
    position: absolute !important;
    left: 0 !important;
    background-color: #151e26;
    opacity: 1 !important;

    &:after {
      left: 25px !important;
      border-top-color: #151e26;
      color: rgba(255, 255, 255, 0.8);
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

const SearchbarS = ({
  autoComplete,
  type,
  id,
  asField,
  inputRef,
  ...other
}) => (
  <SearchbarContainer id={id}>
    {asField ? (
      <Field
        component={SearchbarStyledConnected}
        type={type || "text"}
        inputRef={inputRef}
        {...other}
      />
    ) : (
      <Searchbar type={type || "text"} autocomplete={autoComplete} {...other} />
    )}
    {/* To support submit on enter, provide a hidden submit button element */}
    <button type="submit" style={{ display: "none" }} />
  </SearchbarContainer>
);

SearchbarS.propTypes = {
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

export default SearchbarS;
