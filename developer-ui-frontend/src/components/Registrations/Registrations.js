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
import BigCard from "components/common/BigCard";
import MainContent from "./MainContent/MainContent";
import SideContent from "./SideContent/SideContent";
import AddRegistrationButton from "./AddRegistrationButton";

export class Registrations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPanelExpanded: false,
      ...props.initialState
    };
    this.setMainPanel = this.setMainPanel.bind(this);
  }

  componentDidMount() {
    setTimeout(() => document.body.classList.add("withBgPattern"), 500); // wait some time to prevent laggy background transition
  }

  setMainPanel(newState) {
    this.setState({ mainPanelExpanded: newState });
  }

  render() {
    const { mainPanelExpanded } = this.state;
    const { numberOfDevices } = this.props;
    return (
      <BigCard
        title="Manage Device Registrations"
        id="registrations-form-container"
        className={mainPanelExpanded ? "expanded" : null}>
        <div id="form-content">
          <SideContent
            mainPanelExpanded={mainPanelExpanded}
            setMainPanel={this.setMainPanel}
          />
          <MainContent
            mainPanelExpanded={mainPanelExpanded}
            setMainPanel={this.setMainPanel}
          />
          <AddRegistrationButton hasCallout={numberOfDevices === 0} />
        </div>
      </BigCard>
    );
  }
}

Registrations.propTypes = {
  initialState: PropTypes.object,
  numberOfDevices: PropTypes.number.isRequired
};

Registrations = connect(state => ({
  numberOfDevices: selectNumberOfAllDevices(state)
}))(Registrations);

export default Registrations;
