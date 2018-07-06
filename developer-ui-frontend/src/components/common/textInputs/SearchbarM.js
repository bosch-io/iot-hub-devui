/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field } from "redux-form/immutable";
import FocusBar from "./FocusBar";
// SVG Imports - somehow react-svg-loader doesn't kick in here -> use it as inline loader
import SearchIcon from "!babel-loader!react-svg-loader!images/searchicon.svg";

const SearchbarContainer = styled.div`
  position: relative;
  height: 6rem;
  .__react_component_tooltip {
    position: absolute !important;
    left: 0 !important;
    top: 6rem !important;
    &:after {
      left: 25px !important;
    }
  }
`;

const SearchSvg = styled(SearchIcon)`
  position: absolute;
  width: 2rem;
  top: 2rem;
  left: 1rem;
  user-select: none;
  opacity: 1;
  transition: left 0.2s ease-out, opacity 0.2s ease-out;
  z-index: 1;
`;

const Searchbar = styled.input`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-color: #ccc;
  border-width: 0 0 1px 0;
  font-size: 1.4rem;
  position: relative;
  padding: 1.2rem 2rem 1.2rem 4rem;
  background-color: #fff;
  transition: box-shadow 0.2s, padding 0.2s ease-out;

  &:hover:not(:focus) {
    box-shadow: inset 0px 0px 0px 1px rgba(45, 62, 80, 0.16);
    color: #2d3e50;
  }
  &:focus {
    z-index: 1;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.15);
    padding-left: 2rem;
    outline: none;
    ~ .bar {
      &:before,
      &:after {
        width: 50%;
      }
    }

    ~ .searchIcon {
      left: 0;
      opacity: 0;
      path {
        fill: ${props => props.theme.accentBlue};
      }
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

const SearchbarM = ({
  autoComplete,
  type,
  id,
  error,
  warning,
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
    <FocusBar className="bar" warning={warning} error={error} />
    <SearchSvg className="searchIcon" />
    {/* To support submit on enter, provide a hidden submit button element */}
    <button type="submit" style={{ display: "none" }} />
  </SearchbarContainer>
);

SearchbarM.propTypes = {
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

export default SearchbarM;
