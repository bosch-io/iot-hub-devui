/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form/immutable";
import ReactTooltip from "react-tooltip";

export default class DevicesSearchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validationText: ""
    };
    this.showTooltipForSomeTime = this.showTooltipForSomeTime.bind(this);
  }

  showTooltipForSomeTime(time) {
    ReactTooltip.show(this.searchRef.getRenderedComponent());
    setTimeout(() => {
      this.setState({ validationText: "" });
      ReactTooltip.hide(this.searchRef.getRenderedComponent());
    }, time);
  }

  render() {
    return (
      <div>
        <Field
          data-tip
          data-for="additional-sub-search-tooltip"
          name="additionalSubsRegistrySearch"
          type="text"
          component="input"
          autoComplete="off"
          placeholder="Search for Devices..."
          ref={ref => {
            this.searchRef = ref;
          }}
          withRef
        />
        <ReactTooltip
          id="additional-sub-search-tooltip"
          place="top"
          type="dark"
          effect="solid"
          event="none">
          <span style={{ whiteSpace: "pre-line" }}>
            {this.state.validationText}
          </span>
        </ReactTooltip>
      </div>
    );
  }
}
