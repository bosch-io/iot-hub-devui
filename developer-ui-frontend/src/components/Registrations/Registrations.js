/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/subscriptionsConfigForm.scss"; // TODO: Move shared scss to registryListing.scss
import "styles/registrations.scss";
import { CREDENTIAL_TYPES } from "_APP_CONSTANTS";
// React
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { selectNumberOfAllDevices } from "reducers/selectors";
// Child Components
import BigCard from "components/common/BigCard";
import MainContent from "./MainContent/MainContent";
import SideContent from "./SideContent/SideContent";
import AddRegistrationButton from "./AddRegistrationButton";
// Modals (Child Components)
import AddRegistrationModal from "./Modals/AddRegistrationModal";
import AddSecretModal from "./Modals/AddSecretModal";
import DeleteRegistrationModal from "./Modals/DeleteRegistrationModal";
import DeleteSecretModal from "./Modals/DeleteSecretModal";

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
      <Fragment>
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
            <AddRegistrationButton
              hasCallout={numberOfDevices === 0}
              setMainPanel={this.setMainPanel}
            />
          </div>
        </BigCard>
        <Route
          path={`/registrations/additionalRegs/:deviceId?`}
          render={({ match }) => (
            <AddRegistrationModal
              type={CREDENTIAL_TYPES.PASSWORD}
              initialValues={{
                deviceId: match.params.deviceId,
                password: ""
              }}
              setMainPanel={this.setMainPanel}
            />
          )}
        />
        <Route
          path={`/registrations/:selectedDeviceId/:selectedAuthId/additionalSecrets`}
          render={({ match }) => (
            <AddSecretModal
              expandNewTab={this.expandNewTab}
              authId={match.params.selectedAuthId}
              deviceId={match.params.selectedDeviceId}
            />
          )}
        />
        <Route
          path={`/registrations/:selectedDeviceId/:selectedAuthId/deleteSecrets`}
          render={({ match }) => (
            <DeleteSecretModal
              authId={match.params.selectedAuthId}
              deviceId={match.params.selectedDeviceId}
            />
          )}
        />
      </Fragment>
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
