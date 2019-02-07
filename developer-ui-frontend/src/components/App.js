/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
// React Router
import { AnimatedSwitch } from "react-router-transition";
import {
  mapStyles,
  mapLocationToTransitionSettings
} from "animations/pageTransitions";
import { Route } from "react-router-dom";
import { withLastLocation } from "react-router-last-location";
import Redirect from "components/helpers/Redirect";
// Child Components
import MessagingLiveFeed from "./MessagingLiveFeed/MessagingLiveFeed";
import Header from "./Navigation/Header";
import InitialSubscriptionsSelection from "./MessagingLiveFeed/InitialSubscriptionsSelection/InitialSubscriptionsSelection";
import NotificationContainer from "./common/Notification";
// Redux
import { connect } from "react-redux";
import { fetchInitialData } from "actions/DataFetchActions";
import { eventBusConnect } from "actions/WebsocketActions";
import {
  selectNumberOfSubscribedDevices,
  selectTenant,
  selectIsFetchingAny,
  selectNumberOfAllDevices
} from "reducers/selectors";
import { withRouter } from "react-router-dom";
import Registrations from "./Registrations/Registrations";

class AppWrapped extends Component {
  componentDidMount() {
    this.props.useWebsockets();
  }

  render() {
    const {
      numberOfSubs,
      numberOfRegs,
      tenant,
      lastLocation,
      location
    } = this.props;

    const transitionSettings = mapLocationToTransitionSettings(
      location,
      lastLocation
    );
    const needsRedirectToInitial = !(numberOfSubs > 0);
    const needsRedirectToFeed = !(numberOfSubs === 0);
    const needsInitialRedirectToRegs = !lastLocation && numberOfRegs === 0;
    return (
      <div>
        <Header tenant={tenant} />
        <NotificationContainer />
        <div>
          {
            <AnimatedSwitch
              atEnter={transitionSettings.atEnter}
              atLeave={transitionSettings.atLeave}
              atActive={transitionSettings.atActive}
              mapStyles={mapStyles}
              className="route-wrapper"
            >
              <Route exact path="/" render={() => <Redirect to="/feed" />} />
              {/* Change the Redirect path back to /feed/initial */}
              <Route
                exact
                path="/feed"
                render={routerProps => {
                  /* eslint-disable no-else-return */
                  if (needsInitialRedirectToRegs) {
                    return <Redirect to="/registrations" />;
                  } else if (needsRedirectToInitial) {
                    return <Redirect to="/feed/initial" />;
                  } else {
                    return <MessagingLiveFeed {...routerProps} />;
                  }
                  /* eslint-enable */
                }}
              />
              <Route
                exact
                path="/feed/initial"
                render={routerProps => {
                  /* eslint-disable no-else-return */
                  if (needsInitialRedirectToRegs) {
                    return <Redirect to="/registrations" />;
                  } else if (needsRedirectToFeed) {
                    return <Redirect to="/feed" />;
                  } else {
                    return <InitialSubscriptionsSelection {...routerProps} />;
                  }
                  /* eslint-enable */
                }}
              />
              <Route path="/registrations" component={Registrations} />
            </AnimatedSwitch>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetching: selectIsFetchingAny(state),
  numberOfSubs: selectNumberOfSubscribedDevices(state),
  tenant: selectTenant(state),
  numberOfRegs: selectNumberOfAllDevices(state)
});

const mapDispatchToProps = dispatch => ({
  useWebsockets: () => dispatch(eventBusConnect()),
  fetchInitialData: () => dispatch(fetchInitialData())
});

const App = withRouter(
  withLastLocation(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(AppWrapped)
  )
);

AppWrapped.propTypes = {
  /**
   *  Starts and configures the EventBus Websocket bridge to listen for the devices that were selected on
   *  the InitialSubscriptionsSelection/ inside the RegisteredDevicesListing in the DevicesPanel.
   **/
  useWebsockets: PropTypes.func.isRequired,
  numberOfSubs: PropTypes.number,
  numberOfRegs: PropTypes.number.isRequired,
  fetching: PropTypes.bool.isRequired,
  fetchInitialData: PropTypes.func.isRequired,
  tenant: PropTypes.string,
  location: PropTypes.object.isRequired,
  lastLocation: PropTypes.object
};
export default App;
