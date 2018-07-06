/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component, Fragment } from "react";
import ReactTooltip from "react-tooltip";
import { SearchbarS } from "components/common/textInputs";

export default class DevicesSearchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationText: ""
    };
    this.showTooltipForSomeTime = this.showTooltipForSomeTime.bind(this);
  }

  showTooltipForSomeTime(time) {
    ReactTooltip.show(this.searchRef);
    setTimeout(() => {
      this.setState({ validationText: "" });
      ReactTooltip.hide(this.searchRef);
    }, time);
  }

  render() {
    return (
      <Fragment>
        <SearchbarS
          asField
          data-tip
          data-for="additional-sub-search-tooltip"
          name="additionalSubsRegistrySearch"
          autoComplete="off"
          type="text"
          placeholder="Search for Devices..."
          inputRef={ref => {
            this.searchRef = ref;
          }}
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
      </Fragment>
    );
  }
}
