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

const ListContext = React.createContext();

export const withListContext = WrappedComponent => props => (
  <ListContext.Consumer>
    {({ asField, name }) => (
      <WrappedComponent {...props} asField={asField} name={name} />
    )}
  </ListContext.Consumer>
);

const ListSelectStyled = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
`;

export default class ListSelect extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { asField, children, name } = this.props;
    return (
      <ListContext.Provider
        value={{
          asField,
          name
        }}
      >
        <ListSelectStyled {...this.props}>{children}</ListSelectStyled>
      </ListContext.Provider>
    );
  }
}

ListSelect.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  asField: PropTypes.bool,
  name: PropTypes.string
};
