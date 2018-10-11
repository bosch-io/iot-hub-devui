/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TransitionMotion } from "react-motion";
import ListOptionEntry from "./ListOptionEntry";
import { withListContext } from "./ListSelect";
import { Field } from "redux-form/immutable";
import * as transition from "animations/checklistSelectTransitions";

const ListEntries = styled.ul`
  padding: 0;
  overflow-y: auto;
  margin: 0;
  height: 100%;

  select,
  option {
    display: none;
  }

  .reg-item:nth-child(even) li {
    background: rgba(0, 0, 0, 0.04);
  }
`;

class ListOptionEntries extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: null
    };
  }
  getStyles() {
    const { data, filterText } = this.props;
    return data
      .filter(el => !filterText || el.text.includes(filterText))
      .map(el => ({
        key: el.text,
        data: {
          text: el.text,
          selected: el.selected
        },
        style: transition.startingStyleConfig
      }));
  }

  changeSelect(entry) {
    const selectRef = this.selectRef.getRenderedComponent();
    selectRef.value = entry;
    const clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: false
    });
    const changeEvent = new Event("change", {
      bubbles: true
    });
    this.setState({ selectedIndex: selectRef.value });
    selectRef.options[selectRef.selectedIndex].dispatchEvent(clickEvent);
    selectRef.dispatchEvent(changeEvent);
  }

  render() {
    const { data, onClick, name, asField, className } = this.props;
    return (
      <ListEntries className={className}>
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
                {interpStyles.map(
                  ({ data: { text, selected }, style, key }) => (
                    <ListOptionEntry
                      text={text}
                      selected={text === this.state.selectedIndex}
                      key={key}
                      style={style}
                      onClick={() => {
                        onClick && onClick(text);
                        asField && this.changeSelect(text);
                      }}
                    />
                  )
                )}
              </div>
            );
          }}
        </TransitionMotion>
      </ListEntries>
    );
  }
}

ListOptionEntries = withListContext(ListOptionEntries);

ListOptionEntries.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ text: PropTypes.string, selected: PropTypes.bool })
  ),
  filterText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  asField: PropTypes.bool,
  name: PropTypes.string,
  selectedOption: PropTypes.string,
  changeSelectedOption: PropTypes.func,
  className: PropTypes.string
};

export default ListOptionEntries;
