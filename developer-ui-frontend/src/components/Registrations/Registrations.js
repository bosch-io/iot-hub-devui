/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/subscriptionsConfigForm.scss"; // TODO: Move shared scss to registryListing.scss
import "styles/registrations.scss";
// React
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectNumberOfAllDevices } from "reducers/selectors";
import MainContent from "./MainContent/MainContent";
import SideContent from "./SideContent/SideContent";
import AddRegistrationButton from "./AddRegistrationButton";

export class Registrations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPanelExpanded: false,
      selectedDevice: null,
      ...props.initialState
    };
    this.setMainPanel = this.setMainPanel.bind(this);
    this.setSelectedDevice = this.setSelectedDevice.bind(this);
  }

  componentDidMount() {
    setTimeout(() => document.body.classList.add("withBgPattern"), 500); // wait some time to prevent laggy background transition
  }

  setMainPanel(newState) {
    this.setState({ mainPanelExpanded: newState });
  }

  setSelectedDevice(id) {
    this.setState({ selectedDevice: id });
  }

  render() {
    const { mainPanelExpanded, selectedDevice } = this.state;
    const { numberOfDevices } = this.props;
    return (
      <div
        id="registrations-form-container"
        className={mainPanelExpanded ? "expanded" : null}>
        <h1 className="live-feed-headline">Manage Device Registrations</h1>
        <div id="form-content">
          <SideContent
            mainPanelExpanded={mainPanelExpanded}
            setMainPanel={this.setMainPanel}
            setSelectedDevice={this.setSelectedDevice}
          />
          <MainContent
            selectedDevice={selectedDevice}
            mainPanelExpanded={mainPanelExpanded}
            setSelectedDevice={this.setSelectedDevice}
            setMainPanel={this.setMainPanel}
          />
          <AddRegistrationButton hasCallout={numberOfDevices === 0} />
        </div>
      </div>
    );
  }
}

Registrations = connect(state => ({
  numberOfDevices: selectNumberOfAllDevices(state)
}))(Registrations);

Registrations.propTypes = {
  initialState: PropTypes.object,
  numberOfDevices: PropTypes.number.isRequired
};

export default Registrations;
