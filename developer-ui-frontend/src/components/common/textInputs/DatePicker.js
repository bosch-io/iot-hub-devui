/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { default as ReactDatePicker } from "react-datepicker";
import FocusBar from "./FocusBar";
import { Field } from "redux-form/immutable";
import "styles/datePicker.scss";
import moment from "moment";
import CalendarIcon from "images/calendarIcon.svg";

/* eslint-disable react/no-multi-comp */
class DatePickerWrapped extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.component = React.createRef();
  }

  componentDidMount() {
    this.component.onInputClick = this.handleInputClick;
  }

  handleInputClick() {
    this.props.input.onFocus();
  }

  handleChange(date) {
    this.props.input.onChange(moment(date));
    this.props.input.onFocus();
  }

  toggle() {
    const {
      meta: { active },
      input: { onFocus, onBlur }
    } = this.props;
    this.component.setOpen(!active);
    active ? onBlur() : onFocus();
  }

  render() {
    const {
      placeholder,
      input: { value, onBlur },
      meta: { pristine, active }
    } = this.props;

    return (
      <div className={`date-picker-wrapper ${active ? "active" : ""}`}>
        <ReactDatePicker
          ref={r => {
            this.component = r;
          }}
          selected={pristine ? null : moment(value, "MM/DD/YYYY")}
          onChange={this.handleChange}
          onBlur={onBlur}
          onClickOutside={onBlur}
          onSelect={onBlur}
          placeholderText={placeholder}
        />
        <CalendarIcon onClick={this.toggle} />
        <FocusBar className={`bar ${active ? "active" : ""}`} />
      </div>
    );
  }
}

DatePickerWrapped.propTypes = {
  onClickOutside: PropTypes.func,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired
  }).isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    active: PropTypes.bool,
    pristine: PropTypes.bool
  })
};
/* Version without Redux Form (not wrapped inside a Field component -> Create own wrapper) */
class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment(),
      pristine: true,
      active: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleFocus() {
    this.setState({ active: true });
  }

  handleBlur() {
    this.setState({ active: false });
  }

  handleChange(date) {
    this.setState({ value: date, pristine: false });
  }

  toggle() {
    this.setState(state => ({ active: !state.active }));
  }

  render() {
    const { active, pristine, value } = this.state;
    const { placeholder } = this.props;
    return (
      <DatePickerWrapped
        placeholder={placeholder}
        input={{
          onChange: this.handleChange,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          value
        }}
        meta={{ active, pristine }}
      />
    );
  }
}

DatePicker.propTypes = {
  placeholder: PropTypes.string,
  asField: PropTypes.bool
};
/* eslint-disable react/prop-types */
export default ({ asField, name, ...props }) =>
  asField ? (
    <Field component={DatePickerWrapped} name={name} {...props} />
  ) : (
    <DatePicker {...props} />
  );
