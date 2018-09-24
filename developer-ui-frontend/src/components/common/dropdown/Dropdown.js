/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";

import "styles/dropdown.scss";
import ArrowDropdown from "images/arrow-dropdown.svg";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.items);
    this.state = {
      ...this.props,
      items: this.props.items || [],
      selectedItem: this.props.items[0] || this.props.selectedItem,
      showItems: false,
      isOpened: false
    };
    this.dropDown = this.dropDown.bind(this);
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
    console.log(item);
  }

  render() {
    const { headerTitle } = this.state;
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
          <div className="dd-header-title">{headerTitle}</div>
          <div
            className="select-box--items"
            style={{
              display: this.state.showItems ? "inline-block" : "none",
              background: "white",
              position: "relative",
              zIndex: "2"
            }}
          >
            {this.state.items.map(item => (
              <div
                key={item.id}
                onClick={() => this.selectedItem(item)}
                className={this.state.selectedItem === item ? "selected" : ""}
              >
                {item.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  items: PropTypes.array,
  selectedItem: PropTypes.array
};

export default Dropdown;
