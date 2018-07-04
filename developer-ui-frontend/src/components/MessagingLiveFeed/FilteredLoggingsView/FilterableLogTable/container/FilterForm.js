/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import { FILTER_CATEGORIES } from "_APP_CONSTANTS";

import { Map } from "immutable";

import ReactTooltip from "react-tooltip";

import { newFilter } from "actions/FilterActions";
import { connect } from "react-redux";

import {
  valueRequired,
  noFilterDuplication,
  categoryRequired
} from "validation/filterFormValidation";

import FilterDropdown from "../presentation/FilterDropdown";

import { Field, reduxForm, formValueSelector } from "redux-form/immutable";

class FilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipText: "",
      errorIndicator: 0, // 0 = no error, 1 = warning is shown, 2 = error is shown
      selectDropdownRef: null // Has to be stored as state property because it is passed as prop to FilterDropdown
    };
    this.showTooltipForSomeTime = this.showTooltipForSomeTime.bind(this);
    this.submit = this.submit.bind(this);
  }

  showTooltipForSomeTime(time) {
    ReactTooltip.show(this.searchbarRef.getRenderedComponent());
    setTimeout(
      () =>
        this.setState(
          { tooltipText: "", errorIndicator: 0 },
          ReactTooltip.hide(this.searchbarRef.getRenderedComponent())
        ),
      time
    );
  }

  // Gets called inside the handleSubmit function of the decorated form, which passes it the current Field values
  submit(values) {
    const errors = {};
    let error = null;
    let hasError = false;
    // Apply error validation functions for the searchbar
    const filterSearchValidations = [valueRequired, noFilterDuplication];
    errors.filterSearch = [];
    filterSearchValidations.forEach(validFn => {
      error = validFn(
        values.get("filterSearch"),
        values.get("selectedDropdownItem")
      );
      if (error) {
        errors.filterSearch.push(error);
        hasError = true;
      }
    });
    // Apply error validation functions for the dropdown
    errors.selectedDropdownItem = [];
    error = null;
    error = categoryRequired(values.get("selectedDropdownItem"));
    if (error) {
      errors.selectedDropdownItem.push(error);
      hasError = true;
    }

    if (!hasError) {
      // Create a new activeFilter Object
      const newActiveFilter = Map({
        type: values.get("selectedDropdownItem"),
        value: values.get("filterSearch")
      });
      // Dispatch the newFilter action
      this.props.newFilter(newActiveFilter);
    } else {
      // If there is an error, report it with a tooltip message and don't commit the filter submission
      let errorText = errors.filterSearch.join("\n");
      if (errors.selectedDropdownItem && (errorText && errorText !== "")) {
        errorText += "\n";
      }
      errorText += errors.selectedDropdownItem;
      this.setState({ tooltipText: errorText, errorIndicator: 2 }, () =>
        this.showTooltipForSomeTime(2500)
      );
    }
  }

  render() {
    // handleSubmit is provided through the reduxForm decorator HOC, selectedDropdownItem through the formValueSelector API
    const { handleSubmit, selectedDropdownItem } = this.props;
    let errorIndicatorClass;
    switch (this.state.errorIndicator) {
      case 1:
        errorIndicatorClass = "bar warning";
        break;
      case 2:
        errorIndicatorClass = "bar error";
        break;
      default:
        errorIndicatorClass = "bar";
    }
    return (
      <form onSubmit={handleSubmit(this.submit)} noValidate>
        <div id="searchbar-form">
          <Field
            data-tip
            data-for="tooltip"
            name="filterSearch"
            component="input"
            autoComplete="off"
            type="text"
            placeholder={
              selectedDropdownItem
                ? "Search for " + selectedDropdownItem + "  ... "
                : "Search ..."
            }
            ref={input => {
              this.searchbarRef = input;
            }}
            withRef
          />
          <i className={errorIndicatorClass} />
          <ReactTooltip
            id="tooltip"
            place="bottom"
            type="dark"
            effect="solid"
            event="none">
            <span style={{ whiteSpace: "pre-line" }}>
              {this.state.tooltipText}
            </span>
          </ReactTooltip>
        </div>
        <FilterDropdown
          selectDropdownRef={this.state.selectDropdownRef}
          selectedDropdownItem={selectedDropdownItem}
        />
        <Field
          name="selectedDropdownItem"
          component="select"
          ref={sel => {
            !this.state.selectDropdownRef &&
              this.setState({ selectDropdownRef: sel });
          }}
          withRef>
          {FILTER_CATEGORIES.map((category, index) => (
            <option key={"DropdownEntry" + index} value={category}>
              {category}
            </option>
          ))}
        </Field>
      </form>
    );
  }
}

// Decorate with reduxForm HOC for redux action dispatching props like handleSubmit (handled by the formReducer)
FilterForm = reduxForm({ form: "filterSearchbar" })(FilterForm);
/* Get the selectedDropdownItem from redux store state and map it to a prop (to access it from anywhere not just its
Field implementation). Add the newFilters dispatch method to the props. */
const selector = formValueSelector("filterSearchbar");
FilterForm = connect(
  state => {
    const selectedDropdownItem = selector(state, "selectedDropdownItem");
    return { selectedDropdownItem };
  },
  dispatch => {
    return {
      newFilter: filter => dispatch(newFilter(filter))
    };
  }
)(FilterForm);

FilterForm.propTypes = {
  newFilter: PropTypes.func,
  /**
   * The currently selected filter category in the dropdown menu.
   */
  selectedDropdownItem: PropTypes.string,
  handleSubmit: PropTypes.func
};

export default FilterForm;
