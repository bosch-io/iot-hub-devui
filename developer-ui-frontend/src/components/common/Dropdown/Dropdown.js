/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import { Field } from "redux-form/immutable";
import PropTypes from "prop-types";
import styled from "styled-components";
import enhanceWithClickOutside from "react-click-outside";
import DropdownMenu from "./DropdownMenu";
import DropdownCurrentSelection from "./DropdownSelection";

const DropdownOuter = styled.div`
  position: relative;
  height: 3rem;
`;

const DropdownWrapper = styled.div`
  position: relative;
  transition: box-shadow 0.3s ease-out;
  display: inline-flex;
  flex-direction: column;
  cursor: pointer;
  user-select: none;

  ${props =>
    props.showItems &&
    `
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08),
      0 1px 1px 0 rgba(0, 0, 0, 0.16);
    z-index: 4;`};
`;

/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      items: this.props.items || [],
      selectedItem: this.props.items[0] || this.props.selectedItem,
      showItems: false
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  toggleDropdown() {
    this.setState(prevState => ({
      showItems: !prevState.showItems
    }));
  }

  selectItem(item) {
    const { onChange } = this.props;
    this.setState({
      selectedItem: item,
      showItems: false
    });
    /* If the component is a Redux Form Field,
    the onChange is provided as prop and needs to be called
    with the selection */
    onChange && onChange(item.value);
  }

  handleClickOutside() {
    this.setState({ showItems: false });
  }

  render() {
    const { items, ...other } = this.props;
    const { selectedItem, showItems } = this.state;
    return (
      <DropdownOuter {...other}>
        <DropdownWrapper showItems={showItems}>
          <DropdownCurrentSelection
            toggle={this.toggleDropdown}
            selected={selectedItem}
            isOpen={showItems}
          />
          <DropdownMenu
            show={showItems}
            items={items}
            selectItem={this.selectItem}
            onClickOutside={showItems ? this.handleClickOutside : null}
          />
        </DropdownWrapper>
      </DropdownOuter>
    );
  }
}

Dropdown.propTypes = {
  disabled: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      value: PropTypes.string
    })
  ),
  selectedItem: PropTypes.object,
  input: PropTypes.object,
  name: PropTypes.string,
  className: PropTypes.string
};

const EnhancedDropdown = enhanceWithClickOutside(Dropdown);

const DropdownStyledConnected = ({ input, ...others }) => (
  <EnhancedDropdown {...input} {...others} />
);

export default props =>
  props.asField ? (
    <Field {...props} component={DropdownStyledConnected} />
  ) : (
    <EnhancedDropdown {...props} />
  );
