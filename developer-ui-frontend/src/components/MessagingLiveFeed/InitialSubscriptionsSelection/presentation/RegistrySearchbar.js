/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import { Field } from "redux-form/immutable";

export default class RegistrySearchbar extends React.Component {
  constructor(props) {
    super(props);
    this.showTooltipForSomeTime = this.showTooltipForSomeTime.bind(this);
    this.searchRef = null;
  }

  componentDidMount() {
    setTimeout(() => {
      this.searchRef &&
        this.searchRef.getRenderedComponent().classList.add("active");
    }, 600);
    setTimeout(() => {
      this.searchRef && this.searchRef.getRenderedComponent().focus();
    }, 1800);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.tooltipShown !== this.props.tooltipShown &&
      nextProps.tooltipShown
    ) {
      this.showTooltipForSomeTime(1500);
    }
  }

  showTooltipForSomeTime(time) {
    ReactTooltip.show(this.searchRef.getRenderedComponent());
    setTimeout(() => {
      this.props.clearValidationText();
      ReactTooltip.hide(this.searchRef.getRenderedComponent());
    }, time);
  }

  render() {
    const { tooltipShown, validationText } = this.props;
    const errorIndicatorClass = tooltipShown ? "bar error" : "bar";
    return (
      <div>
        <Field
          data-tip
          data-for="registry-search-tooltip"
          name="registrySearch"
          type="text"
          component="input"
          autoComplete="off"
          placeholder="What devices do you want to listen for?"
          ref={ref => {
            this.searchRef = ref;
          }}
          withRef
        />
        <i className={errorIndicatorClass} />
        <ReactTooltip
          id="registry-search-tooltip"
          place="bottom"
          type="dark"
          effect="solid"
          event="none">
          <span style={{ whiteSpace: "pre-line" }}>{validationText}</span>
        </ReactTooltip>
      </div>
    );
  }
}

RegistrySearchbar.propTypes = {
  validationText: PropTypes.string,
  tooltipShown: PropTypes.bool,
  clearValidationText: PropTypes.func,
  setValidationText: PropTypes.func
};
