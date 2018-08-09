/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { default as ReactDatePicker } from "react-datepicker";
import FocusBar from "./FocusBar";
import "styles/datePicker.scss";
import moment from "moment";
import CalendarIcon from "images/calendarIcon.svg";

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      hasFocus: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.toggle = this.toggle.bind(this);
    this.component = React.createRef();
  }

  componentDidMount() {
    this.component.onInputClick = this.handleInputClick;
  }

  handleInputClick() {
    this.setState({ hasFocus: true });
  }

  handleBlur() {
    this.setState({ hasFocus: false });
  }

  handleChange(date) {
    this.setState({ startDate: date });
  }

  toggle() {
    this.component.setOpen(!this.state.hasFocus);
    this.setState(state => ({ hasFocus: !state.hasFocus }));
  }

  render() {
    return (
      <div
        className={`date-picker-wrapper ${
          this.state.hasFocus ? "active" : ""
        }`}>
        <ReactDatePicker
          ref={r => {
            this.component = r;
          }}
          selected={this.state.startDate}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onClickOutside={this.handleBlur}
          onSelect={this.handleBlur}
          placeholderText={this.props.placeholder}
        />
        <CalendarIcon onClick={() => this.toggle()} />
        <FocusBar className={`bar ${this.state.hasFocus ? "active" : ""}`} />
      </div>
    );
  }
}

DatePicker.propTypes = {
  placeholder: PropTypes.string
};
