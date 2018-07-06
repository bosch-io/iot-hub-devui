/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";

const enhanceWithClickOutside = require("react-click-outside");
import FilterDropdownEntry from "../presentation/FilterDropdownEntry";
import { FILTER_CATEGORIES } from "_APP_CONSTANTS";

// SVG Imports
import FilterIcon from "images/filtericon.svg";

/**
 * The filter dropdown element, including any number of FilterDropdownEntry components, defined by the FILTER_CATEGORIES.
 * The select form (decorated and controlled by reduxForm HOC in FilterForm) keeps the values and syncs it with the
 * Redux store but is not displayed in the app. The user controlls it entirely through the custom dropdown div and the
 * <li>s in dropdown-menu (Wrapped in the FilterDropdownEntry component). The interaction between the user and the hidden
 * <select> (<Field> component) works through DOM functions and refs.
 *
 * @author Tim Weise
 * @version 0.1.0
 */
export class FilterDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.changeSelectedDropdown = this.changeSelectedDropdown.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({ isOpened: !prevState.isOpened }));
  }

  handleClickOutside() {
    this.setState({ isOpened: false });
  }

  changeSelectedDropdown(entry) {
    // <select> Ref gets available via the getRenderedComponent function provided through the withRef attribute on Field
    const selectDropdownRef = this.props.selectDropdownRef.getRenderedComponent();
    this.setState({ selectedDropdownItem: entry });
    // Take the DOM value as selected <option> in <select>
    selectDropdownRef.value = entry;
    // Simulate an actual click on the selected <option> of the hidden <select>
    const clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: false
    });
    const changeEvent = new Event("change", {
      bubbles: true
    });
    selectDropdownRef.options[selectDropdownRef.selectedIndex].dispatchEvent(
      clickEvent
    );
    selectDropdownRef.dispatchEvent(changeEvent);
  }

  render() {
    const { selectedDropdownItem } = this.props;
    return (
      <div className="dropdown-wrapper">
        <div className="dropdown-toggle" onClick={this.handleClick}>
          <span className="title">
            <FilterIcon />
            {selectedDropdownItem ? selectedDropdownItem : " Add a Filter ..."}
          </span>
          <span
            className={this.state.isOpened ? "caret caret-rotated" : "caret"}
          />
        </div>
        <div
          className={`dropdown-menu filter-dropdown ${
            this.state.isOpened ? "dropdown-menu-active shadow-z-1" : ""
          }`}>
          <ul>
            {FILTER_CATEGORIES.map((category, index) => (
              <FilterDropdownEntry
                categoryName={category}
                changeDropdownVisibility={this.handleClickOutside}
                changeSelectedDropdown={en => this.changeSelectedDropdown(en)}
                key={"FilterEntry" + index}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(FilterDropdown);

FilterDropdown.propTypes = {
  /**
   * Hidden select form ref to control the form  through DOM event functions triggered by the custom dropdown
   * div and the <li>s in dropdown-menu
   */
  selectDropdownRef: PropTypes.object, // Can be null at first -> do not mark as required!
  /**
   * The currently selected filter category in the dropdown menu.
   */
  selectedDropdownItem: PropTypes.string
};
