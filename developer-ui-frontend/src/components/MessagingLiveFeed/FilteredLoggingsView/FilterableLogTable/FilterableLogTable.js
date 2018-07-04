/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import 'styles/logTable.scss';
/* eslint-enable */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import LogTable from './container/LogTable';
import FilteringSection from './presentation/FilteringSection';

/**
 * Wrapper component for the filter form (FilteringSection) and the (filtered) table for the loggings (LogTable).
 *
 * @author Tim Weise
 * @version 0.1.0
 */
export default class FilterableLogTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalMessage: null,
      ...props.initialState
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal(message) {
    this.setState({
      showModal: true,
      modalMessage: message
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { toggleDevicesPanel } = this.props;
    return (
      <div id="filterable-table">
        <FilteringSection />
        <div className="expandButtonWrapper">
          <div className="expandButton" onClick={toggleDevicesPanel}>
            <span
              className={
                this.props.devicesPanelExpanded ? '' : 'devices-panel-closed'
              }>
              &#8249;
            </span>
          </div>
        </div>
        <LogTable
          showModal={this.state.showModal}
          modalMessage={this.state.modalMessage}
          handleOpenModal={this.handleOpenModal}
          handleCloseModal={this.handleCloseModal}
        />
      </div>
    );
  }
}

FilterableLogTable.propTypes = {
  initialState: PropTypes.object,
  /**
   *  Expands/ collapses the DevicePanel component, can be triggered from inside the component with the semi circle
   *  arrow button.
   */
  toggleDevicesPanel: PropTypes.func.isRequired,
  /**
   * Whether or not the DevicePanel component is expanded.
   */
  devicesPanelExpanded: PropTypes.bool.isRequired
};
