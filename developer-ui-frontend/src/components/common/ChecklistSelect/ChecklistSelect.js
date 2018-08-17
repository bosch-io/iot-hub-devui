/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
/* eslint-disable react/no-multi-comp */
export const ListEntry = styled.li`
  list-style: none;
  height: 3.5rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
`;
// Create a context to expose state that is global to the whole componenent (asField, name, leadingCheckbox)
// to all children
const ChecklistContext = React.createContext();
// Also create a HOC as simple API to wrap the children
export const withChecklistContext = WrappedComponent => props => (
  <ChecklistContext.Consumer>
    {({ asField, name, leadingCheckbox, useLeadingCheckbox, useSwitches }) => (
      <WrappedComponent
        {...props}
        asField={asField}
        name={name}
        leadingCheckbox={leadingCheckbox}
        useLeadingCheckbox={useLeadingCheckbox}
        useSwitches={useSwitches}
      />
    )}
  </ChecklistContext.Consumer>
);

const ChecklistSelectStyled = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
`;

export default class ChecklistSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leadingCheckbox: Boolean(props.leadingCheckbox),
      useSwitches: Boolean(props.useSwitches)
    };
  }
  render() {
    const { asField, children, name } = this.props;
    const { leadingCheckbox, useSwitches } = this.state;
    return (
      <ChecklistContext.Provider
        value={{
          asField,
          name,
          leadingCheckbox,
          useLeadingCheckbox: () => this.setState({ leadingCheckbox: true }),
          useSwitches
        }}>
        <ChecklistSelectStyled {...this.props}>
          {children}
        </ChecklistSelectStyled>
      </ChecklistContext.Provider>
    );
  }
}

ChecklistSelect.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  asField: PropTypes.bool,
  name: PropTypes.string,
  leadingCheckbox: PropTypes.bool,
  useSwitches: PropTypes.bool
};
