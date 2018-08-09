/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import ExpandLink from "components/common/ExpandLink";
import { TextField } from "components/common/textInputs";
import { DatePicker } from "components/common/textInputs";

export default class AdvancedSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.toggleSection = this.toggleSection.bind(this);
  }

  toggleSection() {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  render() {
    const { expanded } = this.state;
    return (
      <div className="advanced-options">
        <ExpandLink
          expanded={expanded}
          toggle={this.toggleSection}
          className="expand-link"
          openToTop>
          Advanced
        </ExpandLink>

        {expanded && (
          <div className="advanced-option-inputs">
            <TextField asField name="salt" type="text" label="Salt" />
            <div className="validity-period-wrapper">
              <label>Validity Period</label>
              <DatePicker placeholder="Select a Starting Point..." />
              <DatePicker placeholder="Select an Ending Point..." />
            </div>
          </div>
        )}
      </div>
    );
  }
}
