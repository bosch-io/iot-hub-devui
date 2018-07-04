/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import MainContentHeadline from "./MainContentHeadline";
import RegistrationInfoContent from "./RegInfoEditor/RegistrationInfoContent";
import CredentialsInfoContent from "./CredentialsEditor/CredentialsInfoContent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchCredentialsByDeviceId } from "actions/DataFetchActions";
const tabNames = {
  REG_INFO: {
    id: "REG_INFO",
    name: "Registration Info"
  },
  CREDENTIALS: {
    id: "CREDENTIALS",
    name: "Credentials"
  }
};

class MainContentWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlySelectedTab: tabNames.REG_INFO
    };
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedDevice &&
      this.props.selectedDevice !== nextProps.selectedDevice
    ) {
      this.props.fetchCredentialsByDeviceId(nextProps.selectedDevice);
    }
  }

  handleTabClick(newSelection) {
    if (this.props.selectedDevice && newSelection === tabNames.CREDENTIALS) {
      this.props.fetchCredentialsByDeviceId(this.props.selectedDevice);
    }
    this.setState({ currentlySelectedTab: newSelection });
  }

  render() {
    const {
      mainPanelExpanded,
      selectedDevice,
      setSelectedDevice,
      setMainPanel,
      style
    } = this.props;
    const tabsDisabledClass = !selectedDevice ? "disabled " : "";
    let renderedTabs = null;
    if (
      selectedDevice &&
      this.state.currentlySelectedTab.id === tabNames.REG_INFO.id
    ) {
      renderedTabs = (
        <RegistrationInfoContent selectedDevice={selectedDevice} />
      );
    } else if (
      selectedDevice &&
      this.state.currentlySelectedTab.id === tabNames.CREDENTIALS.id
    ) {
      renderedTabs = <CredentialsInfoContent selectedDevice={selectedDevice} />;
    } else if (!selectedDevice) {
      renderedTabs = <div className="no-content">No Device selected</div>;
    }

    return (
      <div
        id="registrations-main-content"
        className={this.props.mainPanelExpanded ? "expanded" : null}
        style={style}>
        <div id="main-panel-headline-wrapper">
          <MainContentHeadline
            selectedDevice={selectedDevice}
            setSelectedDevice={setSelectedDevice}
            mainPanelExpanded={mainPanelExpanded}
            setMainPanel={setMainPanel}
          />
          <ul id="tabs">
            <li
              onClick={() => this.handleTabClick(tabNames.REG_INFO)}
              className={
                this.state.currentlySelectedTab.id === tabNames.REG_INFO.id
                  ? tabsDisabledClass + "active"
                  : tabsDisabledClass
              }>
              Registration Info
            </li>
            <li
              onClick={() => this.handleTabClick(tabNames.CREDENTIALS)}
              className={
                this.state.currentlySelectedTab.id === tabNames.CREDENTIALS.id
                  ? tabsDisabledClass + "active"
                  : tabsDisabledClass
              }>
              Credentials
            </li>
          </ul>
        </div>
        <div id="accordion-wrapper">
          <div
            id="tab-content-wrapper"
            className={
              this.state.currentlySelectedTab.id === tabNames.REG_INFO.id
                ? "reg-mode"
                : null
            }>
            {renderedTabs}
          </div>
        </div>
      </div>
    );
  }
}

const MainContent = withRouter(
  connect(
    null,
    { fetchCredentialsByDeviceId }
  )(MainContentWrapped)
);

MainContentWrapped.propTypes = {
  mainPanelExpanded: PropTypes.bool.isRequired,
  selectedDevice: PropTypes.string,
  setSelectedDevice: PropTypes.func.isRequired,
  fetchCredentialsByDeviceId: PropTypes.func.isRequired,
  setMainPanel: PropTypes.func.isRequired,
  style: PropTypes.bool
};

export default MainContent;
