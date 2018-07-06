/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
// Components
import FilterableLogTable from "./FilteredLoggingsView/FilterableLogTable/FilterableLogTable";
import DevicesPanel from "./FilteredLoggingsView/DevicesPanel/DevicesPanel";
import SettingsDropdown from "./SettingsDropdown/SettingsDropdown";
import LoggingFeed from "./LoggingFeed/container/LoggingFeed";
import Measure from "react-measure";
// Redux
import { handleNewSub } from "actions/WebsocketActions";
import { connect } from "react-redux";
import { selectSubscribedDevices } from "reducers/selectors";
import { toJS } from "components/helpers/to-js";
// Velocity Animations
import "velocity-animate";
import "velocity-animate/velocity.ui";

/**
 * The root component for the Messaging Live Feed menu.
 *
 * @author Tim Weise
 * @version 0.1.0
 */

const mediaQueryBreakpoint = 1465; // Collapse DevicesPanel at 1465px

export class MessagingLiveFeedWrapped extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domWidth: -1,
      devicesPanelExpanded: true,
      ...props.initialState
    };
    this.toggleDevicesPanel = this.toggleDevicesPanel.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    document.body.classList.remove("withBgPattern");
    this.props.configuredSubscriptions.forEach(device =>
      this.props.handleNewSub(device.deviceId)
    );
  }

  onResize(contentRect) {
    const newWidth = contentRect.client.width;
    if (newWidth) {
      this.setState({ domWidth: newWidth });
      if (newWidth < mediaQueryBreakpoint && this.state.devicesPanelExpanded) {
        this.setState({ devicesPanelExpanded: false }); // Collapse the devices panel
      } else if (
        newWidth > mediaQueryBreakpoint &&
        !this.state.devicesPanelExpanded
      ) {
        this.setState({ devicesPanelExpanded: true }); // Expand the devices panel
      }
    }
  }

  toggleDevicesPanel() {
    this.setState(prevState => ({
      devicesPanelExpanded: !prevState.devicesPanelExpanded
    }));
  }

  render() {
    return (
      <Measure client onResize={this.onResize}>
        {({ measureRef }) => (
          <div ref={measureRef}>
            <div className="main-view">
              <div id="main-view-headline">
                <h1 className="live-feed-headline">
                  Hub Messaging <span>Live</span>
                  <span>Feed</span>
                </h1>
                <SettingsDropdown />
              </div>
              <div>
                <LoggingFeed />
                <div id="filtering-section" className="shadow-z-1">
                  <DevicesPanel
                    expanded={this.state.devicesPanelExpanded}
                    toggleDevicesPanel={this.toggleDevicesPanel}
                  />
                  <FilterableLogTable
                    toggleDevicesPanel={this.toggleDevicesPanel}
                    devicesPanelExpanded={this.state.devicesPanelExpanded}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Measure>
    );
  }
}

const mapStateToProps = state => ({
  // selector for configuredSubscribed devices (not yet registered as eventbus handlers)
  configuredSubscriptions: selectSubscribedDevices(state)
});

const mapDispatchToProps = dispatch => ({
  handleNewSub: deviceId => dispatch(handleNewSub(deviceId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(MessagingLiveFeedWrapped));

MessagingLiveFeedWrapped.propTypes = {
  initialState: PropTypes.object,

  handleNewSub: PropTypes.func.isRequired,
  /**
   * Initial subscriptions to start the feed.
   */
  configuredSubscriptions: PropTypes.array.isRequired
};
