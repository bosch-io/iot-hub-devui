/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Children, cloneElement } from "react";
import PropTypes from "prop-types";
import requiredIf from "react-required-if";

const AccordionSection = ({ children, className, ...other }) => (
  <div className={className ? className : null}>
    {/* Spread the props to all children */}
    {Children.map(children, child => cloneElement(child, { ...other }))}
  </div>
);

AccordionSection.propTypes = {
  expanded: requiredIf(PropTypes.bool, props => !props.sticky),
  toggleExpanded: requiredIf(PropTypes.func, props => !props.sticky),
  sticky: PropTypes.bool,
  className: PropTypes.string,
  children: props => {
    if (
      !Array.isArray(props.children) ||
      props.children.length !== 2 ||
      !props.children.every(React.isValidElement)
    ) {
      return new Error(
        "children needs to be an array of two Elements (AccordionSectionHeader and AccordionSectionBody)"
      );
    }
    return null;
  }
};

export default AccordionSection;
