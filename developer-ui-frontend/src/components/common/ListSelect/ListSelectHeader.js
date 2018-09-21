/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ListEntry, withListContext } from "./ListSelect";

const Header = styled.ul`
   display: flex;
   margin: 0;
   height: 3.5rem;
   justify-content: space-between;
   align-items: center;
   padding: 0.5em 1em 0.5em 3em : 0.5em 1em;
   vertical-align: middle;
   border-bottom: 1px solid #e0e0e0;

   li:first-child {
    padding: 0;
   }
 `;

const HeaderElement = ListEntry.extend`
  color: ${props => props.theme.tableHeaderFontColor};
`;

class ListSelectHeader extends Component {
  componentDidMount() {}
  render() {
    const { textTitle, selectedTitle } = this.props;
    return (
      <Header>
        <HeaderElement>{textTitle}</HeaderElement>
        {selectedTitle && <HeaderElement>{selectedTitle}</HeaderElement>}
      </Header>
    );
  }
}

ListSelectHeader = withListContext(ListSelectHeader);

ListSelectHeader.propTypes = {
  textTitle: PropTypes.string.isRequired,
  selectedTitle: PropTypes.string
};

export default ListSelectHeader;
