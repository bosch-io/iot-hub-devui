/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import { toJS } from "components/helpers/to-js";
// Velocity Animations
import { TransitionMotion, spring } from "react-motion";
import { connect } from "react-redux";
import { selectAllFilters } from "reducers/selectors";
import FilterIndicator from "../presentation/FilterIndicator";
import { removeFilter } from "actions/FilterActions";

/* As FilterIndicators is a stateless component it can be implemented as a functional component. The usage of the
connect decorator requires the variable declaration to be let instead of const. */
let FilterIndicators = ({ handleXClick, activeFilters }) => (
  <TransitionMotion
    willLeave={() => ({ size: spring(0), opacity: spring(0) })}
    willEnter={() => ({ size: 0, opacity: 0 })}
    defaultStyles={activeFilters.map(filter => ({
      key: filter.id,
      style: { size: 0, opacity: 0 },
      data: { category: filter.type, value: filter.value }
    }))}
    styles={activeFilters.map(filter => ({
      key: filter.id,
      style: { size: spring(1), opacity: spring(1) },
      data: { category: filter.type, value: filter.value }
    }))}>
    {interpolStyles => (
      <div className="filter-tags">
        {interpolStyles.map(config => (
          <FilterIndicator
            key={config.key}
            category={config.data.category}
            value={config.data.value}
            deleteFilter={handleXClick}
            style={{
              opacity: config.style.opacity,
              transform: `scale(${config.style.size}) translateX(-${(1 -
                config.style.size) *
                100}%)`
            }}
          />
        ))}
      </div>
    )}
  </TransitionMotion>
);

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
FilterIndicators = connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(FilterIndicators));

FilterIndicators.propTypes = {
  activeFilters: PropTypes.array,
  handleXClick: PropTypes.func
};

export default FilterIndicators;
