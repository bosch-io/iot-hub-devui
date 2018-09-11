/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import { Prompt as RouterPrompt } from "react-router-dom";
import PropTypes from "prop-types";

/* Bug Fix/ Workaround for deprecated lifecycle issue in react-router-dom
https://github.com/ReactTraining/react-router/issues/5707 */
class Prompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      when: false
    };
  }
  componentDidMount() {
    this.setState({ when: true });
  }
  render() {
    return (
      this.props.when && (
        <RouterPrompt when={this.state.when} message={this.props.message} />
      )
    );
  }
}

Prompt.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  when: PropTypes.bool.isRequired
};

export default Prompt;
