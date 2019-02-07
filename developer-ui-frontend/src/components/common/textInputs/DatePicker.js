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
import CancelIcon from "images/cancelIcon.svg";

/* eslint-disable react/no-multi-comp */
class DatePickerWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderText: this.props.placeholder
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.toggle = this.toggle.bind(this);
    this.clearText = this.clearText.bind(this);
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
    this.props.input.onBlur();
  }

  handleBlur() {
    this.props.input.onBlur();
  }

  toggle() {
    const {
      meta: { active }
    } = this.props;
    this.component.setOpen(!active);
    active ? this.props.input.onBlur() : this.props.input.onFocus();
  }

  clearText() {
    this.props.input.onChange(null);
    this.setState({ placeholderText: null });
  }

  render() {
    const {
      input,
      meta: { active }
    } = this.props;
    const { placeholderText } = this.state;
    return (
      <div className={`date-picker-wrapper ${active ? "active" : ""}`}>
        <ReactDatePicker
          ref={r => {
            this.component = r;
          }}
          dateFormat="YYYY-MM-DDTHH:mm:ss"
          selected={input.value ? moment(input.value) : null}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onClickOutside={this.handleBlur}
          placeholderText={placeholderText}
        />
        <CancelIcon onClick={this.clearText} className="iconSpace" />
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
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired
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
      active: false,
      placeholder: ""
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
