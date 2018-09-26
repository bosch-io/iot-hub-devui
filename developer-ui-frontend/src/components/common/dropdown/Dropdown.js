/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

import "styles/dropdown.scss";
import ArrowDropdown from "images/arrow-dropdown.svg";
import { Field } from "redux-form/immutable";

class DropdownC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      items: this.props.items || [],
      selectedItem: this.props.items[0] || this.props.selectedItem,
      showItems: false,
      isOpened: false
    };
    this.dropDown = this.dropDown.bind(this);
    this.selectedItem = this.selectedItem.bind(this);
  }

  dropDown() {
    this.setState(prevState => ({
      showItems: !prevState.showItems
    }));
  }

  selectedItem(item) {
    this.setState({
      selectedItem: item,
      showItems: false
    });
  }

  render() {
    const { input } = this.props;
    return (
      <div className="select-box--wrapper">
        <div className="select-box--toggle" onClick={this.dropDown}>
          <div className="select-box--selected-item">
            {this.state.selectedItem && this.state.selectedItem.value}
          </div>
          <ArrowDropdown
            className={`${
              this.state.showItems
                ? "select-box--arrow-rotated"
                : "select-box--arrow"
            }`}
          />
        </div>
        <div className="select-box--main">
          <div
            {...input}
            className="select-box--items"
            style={{
              display: this.state.showItems ? "inline-block" : "none",
              background: "white",
              position: "relative",
              zIndex: "2"
            }}
          >
            {this.state.items.map(item => (
              <div key={item.id} onClick={() => this.selectedItem(item)}>
                {item.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
const Dropdown = ({ items, name }) => (
  <Field
    name={name}
    component={({ input: { ...inputStuff } }) => (
      <DropdownC {...inputStuff} items={items} />
    )}
  />
);

DropdownC.propTypes = {
  items: PropTypes.array,
  selectedItem: PropTypes.array,
  input: PropTypes.object
};

export default Dropdown;
