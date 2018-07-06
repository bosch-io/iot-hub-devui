/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ListEntry, withChecklistContext } from "./ChecklistSelect";

const Header = styled.ul`
  display: flex;
  margin: 0;
  height: 3.5rem;
  justify-content: space-between;
  align-items: center;
  padding: ${props =>
    props.leadingCheckbox ? `0.5em 1em 0.5em 3em` : `0.5em 1em;`}
  vertical-align: middle;
  border-bottom: 1px solid #e0e0e0;
  
  li:first-child {
    ${props => props.leadingCheckbox && `padding: 0`};
  }
`;

const HeaderElement = ListEntry.extend`
  color: ${props => props.theme.tableHeaderFontColor};
`;

class ChecklistSelectHeader extends Component {
  componentDidMount() {
    if (!this.props.checkedTitle) {
      this.props.useLeadingCheckbox();
    }
  }
  render() {
    const { textTitle, checkedTitle, leadingCheckbox } = this.props;
    return (
      <Header leadingCheckbox={leadingCheckbox}>
        <HeaderElement>{textTitle}</HeaderElement>
        {checkedTitle && <HeaderElement>{checkedTitle}</HeaderElement>}
      </Header>
    );
  }
}

ChecklistSelectHeader = withChecklistContext(ChecklistSelectHeader);

ChecklistSelectHeader.propTypes = {
  textTitle: PropTypes.string.isRequired,
  /* If no checkedTitle prop is provided, the checkboxes are rendered first
  in every row and without a title */
  checkedTitle: PropTypes.string,
  /* Provided through the ChecklistContext */
  useLeadingCheckbox: PropTypes.func,
  /* Provided through the ChecklistContext */
  leadingCheckbox: PropTypes.bool
};

export default ChecklistSelectHeader;
