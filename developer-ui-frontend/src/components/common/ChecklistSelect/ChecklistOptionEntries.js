/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TransitionMotion } from "react-motion";
import ChecklistOptionEntry from "./ChecklistOptionEntry";
import { withChecklistContext } from "./ChecklistSelect";
import { Field } from "redux-form/immutable";
import * as transition from "animations/checklistSelectTransitions";

const ListEntries = styled.ul`
  height: calc(100% - 4.9rem);
  padding: 0;
  overflow-y: auto;
  margin: 0;

  select,
  option {
    display: none;
  }

  .item:nth-child(even) li {
    background: rgba(0, 0, 0, 0.04);
  }
`;

class ChecklistOptionEntries extends Component {
  getStyles() {
    const { data, filterText } = this.props;
    return data
      .filter(el => !filterText || el.text.includes(filterText))
      .map(el => ({
        key: el.text,
        data: {
          text: el.text,
          checked: el.checked
        },
        style: transition.startingStyleConfig
      }));
  }

  changeSelect(entry) {
    // <select> Ref gets available via the getRenderedComponent function provided through the withRef attribute on Field
    const selectRef = this.selectRef.getRenderedComponent();
    // Take the DOM value as selected <option> in <select>
    selectRef.value = entry;
    // Simulate an actual click on the selected <option> of the hidden <select>
    const clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: false
    });
    const changeEvent = new Event("change", {
      bubbles: true
    });
    selectRef.options[selectRef.selectedIndex].dispatchEvent(clickEvent);
    selectRef.dispatchEvent(changeEvent);
  }

  render() {
    const {
      data,
      onClick,
      onCheckboxClick,
      name,
      asField,
      useSwitches,
      leadingCheckbox,
      highlightSelected
    } = this.props;
    const currentSelection = this.selectRef
      ? this.selectRef.getRenderedComponent().value
      : null;
    return (
      <ListEntries className="content">
        {asField && (
          <Field
            name={name}
            component="select"
            ref={sel => {
              if (!this.selectRef) {
                this.selectRef = sel;
              }
            }}
            withRef>
            {data.map((entry, index) => (
              <option key={"DropdownEntry" + index} value={entry.text}>
                {entry.text}
              </option>
            ))}
          </Field>
        )}
        <TransitionMotion
          defaultStyles={transition.getDefaultStyles(data)}
          styles={this.getStyles.bind(this)()}
          willLeave={transition.willLeave}
          willEnter={transition.willEnter}>
          {interpStyles => {
            return (
              <div>
                {interpStyles.map(({ data: { text, checked }, style, key }) => (
                  <ChecklistOptionEntry
                    leadingCheckbox={leadingCheckbox}
                    highlightSelected={highlightSelected}
                    text={text}
                    checked={checked}
                    selected={text === currentSelection}
                    key={key}
                    style={style}
                    onClick={() => {
                      onClick && onClick(text);
                      asField && this.changeSelect(text);
                    }}
                    onCheckboxClick={() => onCheckboxClick(text, checked)}
                    useSwitches={useSwitches}
                  />
                ))}
              </div>
            );
          }}
        </TransitionMotion>
      </ListEntries>
    );
  }
}

ChecklistOptionEntries = withChecklistContext(ChecklistOptionEntries);

/*
If asField is not available as Prop, the select component is rendered as controlled input.
This means the current value (selectedOption) and a callback to change the current value
have to be provided.
If asField is set, Redux Form takes control over the form state through the Field component
and selectedOption and changeSelectedOption don't have to be provided.
*/
ChecklistOptionEntries.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ text: PropTypes.string, checked: PropTypes.bool })
  ),
  filterText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onCheckboxClick: PropTypes.func.isRequired,
  /* Provided through the ChecklistContext */
  asField: PropTypes.bool,
  /* Provided through the ChecklistContext */
  name: PropTypes.string,
  /* Provided through the ChecklistContext */
  leadingCheckbox: PropTypes.bool,
  /* Provided through the ChecklistContext */
  useSwitches: PropTypes.bool,
  changeSelectedOption: PropTypes.func,
  highlightSelected: PropTypes.bool
};

export default ChecklistOptionEntries;
