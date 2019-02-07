/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import { SearchbarL } from "components/common/textInputs";

export default class RegistrySearchbar extends Component {
  constructor(props) {
    super(props);
    this.showTooltipForSomeTime = this.showTooltipForSomeTime.bind(this);
    this.searchRef = null;
  }

  componentDidMount() {
    setTimeout(() => {
      this.searchRef && this.searchRef.focus();
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
    return (
      <Fragment>
        <SearchbarL
          asField
          data-tip
          data-for="registry-search-tooltip"
          name="registrySearch"
          autoComplete="off"
          error={tooltipShown}
          type="text"
          placeholder="What devices do you want to listen for?"
          inputRef={ref => {
            this.searchRef = ref;
          }}
        />
        <ReactTooltip
          id="registry-search-tooltip"
          place="bottom"
          type="dark"
          effect="solid"
          event="none">
          <span style={{ whiteSpace: "pre-line" }}>{validationText}</span>
        </ReactTooltip>
      </Fragment>
    );
  }
}

RegistrySearchbar.propTypes = {
  validationText: PropTypes.string,
  tooltipShown: PropTypes.bool,
  clearValidationText: PropTypes.func,
  setValidationText: PropTypes.func
};
