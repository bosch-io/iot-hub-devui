/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadStorePreset } from 'actions/globalActions';

class StoryWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadPreset(this.props.storePreset);
  }
  render() {
    return this.props.children;
  }
}

export default (StoryWrapper = connect(null, dispatch => {
  return { loadPreset: preset => dispatch(loadStorePreset(preset)) };
})(StoryWrapper));

StoryWrapper.propTypes = {
  storePreset: PropTypes.object,
  children: PropTypes.object,
  loadPreset: PropTypes.func
};
