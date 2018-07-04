/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import { toJS } from "components/helpers/to-js";
// Velocity Animations
require("velocity-animate");
require("velocity-animate/velocity.ui");
import { VelocityTransitionGroup } from "velocity-react";
import { connect } from "react-redux";
import { selectAllFilters } from "reducers/selectors";
import FilterIndicator from "../presentation/FilterIndicator";
import { removeFilter } from "actions/FilterActions";

/* As FilterIndicators is a stateless component it can be implemented as a functional component. The usage of the
connect decorator requires the variable declaration to be let instead of const. */
let FilterIndicators = props => {
  const filterIndicators = [];
  props.activeFilters.forEach(filter => {
    filterIndicators.push(
      <FilterIndicator
        key={filter.id}
        category={filter.type}
        value={filter.value}
        deleteFilter={props.handleXClick}
      />
    );
  });

  return (
    <div id="activeFilters">
      <VelocityTransitionGroup
        component="div"
        enter={{ animation: "transition.slideLeftIn", duration: 300 }}
        leave={{ animation: "transition.slideLeftOut", duration: 300 }}>
        {filterIndicators}
      </VelocityTransitionGroup>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    activeFilters: selectAllFilters(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleXClick: filter => dispatch(removeFilter(filter))
  };
};
/* Decorate the FilterIndicators container component with the redux aware props and use the props proxy HOC toJS to convert
the immutable props (activeFilters is of type List) to plain JS props. (-> activeFilters: PropTypes.array ✔) */
FilterIndicators = connect(mapStateToProps, mapDispatchToProps)(
  toJS(FilterIndicators)
);

FilterIndicators.propTypes = {
  activeFilters: PropTypes.array,
  handleXClick: PropTypes.func
};

export default FilterIndicators;
