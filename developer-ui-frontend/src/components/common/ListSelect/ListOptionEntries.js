/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TransitionMotion } from "react-motion";
import ListOptionEntry from "./ListOptionEntry";
import { withListContext, ListEntry } from "./ListSelect";
import { Field } from "redux-form/immutable";
import * as transition from "animations/checklistSelectTransitions";
import "styles/gateway.scss";

const SelectionList = styled.div``;

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

const Icon = styled(({ icon, ...props }) => React.cloneElement(icon, props))`
  right: 1rem;
  position: absolute;
  top: 1rem;
  user-select: none;
  cursor: pointer;
  z-index: 1;
  transition: opacity 0.2s;

  path {
    fill: ${props => props.theme.accentColor};
    opacity: 0.8;
  }
  &:hover {
    path {
      opacity: 1;
    }
  }
`;

const Selected = styled.ul`
  display: flex;
  padding: 0.7rem 1.4rem;
  margin: 0 0.5rem;
  height: 3.5rem;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
  border-bottom: 1px solid #e0e0e0;
`;

const SelectedEntry = ListEntry.extend`
  color: ${props => props.theme.accentBlack};
`;

class ListOptionEntries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
      selected: this.props.selectedItem
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

  resetSelect() {
    this.props.data.forEach(data => (data.selected = false));
    this.setState({ selectedIndex: null });
    this.setState({ selected: "" });
  }

  render() {
    const {
      data,
      onClick,
      name,
      asField,
      className,
      onIconClick,
      icon,
      tooltipFunc,
      selectedItem
    } = this.props;
    const { selected } = this.state;
    return (
      <SelectionList
        style={{
          height: selected !== "" ? "80%" : "100%"
        }}
      >
        {selected ? (
          <div>
            <Selected>
              <SelectedEntry>{selectedItem}</SelectedEntry>
            </Selected>
            <Icon
              icon={icon}
              onClick={() => {
                onIconClick && onIconClick();
                asField && this.resetSelect();
              }}
              data-tip
              data-for={tooltipFunc}
            />
          </div>
        ) : (
          ""
        )}
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
              withRef
            >
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
            willEnter={transition.willEnter}
          >
            {interpStyles => {
              return (
                <div>
                  {interpStyles.map(({ data: { text }, style, key }) => (
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
                  ))}
                </div>
              );
            }}
          </TransitionMotion>
        </ListEntries>
      </SelectionList>
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
  onIconClick: PropTypes.func,
  icon: PropTypes.element,
  tooltipFunc: PropTypes.string,
  asField: PropTypes.bool,
  name: PropTypes.string,
  selectedOption: PropTypes.string,
  changeSelectedOption: PropTypes.func,
  className: PropTypes.string,
  selectedItem: PropTypes.string
};

export default ListOptionEntries;
