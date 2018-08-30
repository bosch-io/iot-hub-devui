/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Route, Switch } from "react-router-dom";
// Child Components
import MainContentHeadline from "./MainContentHeadline";
import RegistrationInfoContent from "./RegInfoEditor/RegistrationInfoContent";
import CredentialsInfoContent from "./CredentialsEditor/CredentialsInfoContent";
import MainContentTabs from "./MainContentTabs";
// Redux
import { connect } from "react-redux";
import { formValueSelector } from "redux-form/immutable";
import { selectHubConnected, selectTenant } from "reducers/selectors";
import { fetchCredentialsByDeviceId } from "actions/DataFetchActions";

class MainContentWrapped extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    // Fetch the credentials...
    // ...If the device selection has changed
    // ...If the tenant information got fetched
    // ...If the connection is (re-)established
    if (
      (nextProps.selectedDevice &&
        this.props.selectedDevice !== nextProps.selectedDevice &&
        nextProps.isConnected) ||
      (nextProps.tenantFetched && !this.props.tenantFetched) ||
      (nextProps.isConnected &&
        nextProps.tenantFetched &&
        !this.props.isConnected &&
        nextProps.selectedDevice)
    ) {
      this.props.fetchCredentialsByDeviceId(nextProps.selectedDevice);
    }
  }

  render() {
    const {
      mainPanelExpanded,
      setMainPanel,
      style,
      selectedDevice,
      tenantFetched,
      isConnected
    } = this.props;
    return (
      <Route
        path="/registrations/:selectedDeviceId?/:registrationsSubMenu?/:authId?"
        render={({ match }) => (
          <div
            id="registrations-main-content"
            className={this.props.mainPanelExpanded ? "expanded" : null}
            style={style}>
            <div id="main-panel-headline-wrapper">
              <MainContentHeadline
                mainPanelExpanded={mainPanelExpanded}
                setMainPanel={setMainPanel}
              />
              <MainContentTabs
                credentialsTabLocked={Boolean(
                  selectedDevice && isConnected && tenantFetched
                )}
                fetchCredential={this.props.fetchCredentialsByDeviceId}
              />
            </div>
            <div id="accordion-wrapper">
              <Switch>
                <Route
                  path="/registrations/:selectedDeviceId/:registrationsSubMenu"
                  render={regProps => {
                    let renderedRoute = null;
                    if (
                      regProps.match.params.registrationsSubMenu ===
                      "credentials"
                    ) {
                      renderedRoute = (
                        <CredentialsInfoContent
                          selectedDevice={
                            regProps.match.params.selectedDeviceId
                          }
                        />
                      );
                    } else {
                      renderedRoute = (
                        <RegistrationInfoContent
                          selectedDevice={
                            regProps.match.params.selectedDeviceId
                          }
                        />
                      );
                    }
                    return <div id="tab-content-wrapper">{renderedRoute}</div>;
                  }}
                />
                {/* fallback: a no-content div */}
                <Route
                  render={() => (
                    <div className="no-content">No Device selected</div>
                  )}
                />
              </Switch>
            </div>
          </div>
        )}
      />
    );
  }
}

const MainContent = withRouter(
  connect(
    state => ({
      selectedDevice: formValueSelector("registrationsTabListing")(
        state,
        "selectedDevice"
      ),
      isConnected: selectHubConnected(state),
      tenantFetched: Boolean(selectTenant(state))
    }),
    { fetchCredentialsByDeviceId }
  )(MainContentWrapped)
);

MainContentWrapped.propTypes = {
  mainPanelExpanded: PropTypes.bool.isRequired,
  selectedDevice: PropTypes.string,
  fetchCredentialsByDeviceId: PropTypes.func.isRequired,
  setMainPanel: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
  tenantFetched: PropTypes.bool.isRequired,
  style: PropTypes.bool
};

export default MainContent;
