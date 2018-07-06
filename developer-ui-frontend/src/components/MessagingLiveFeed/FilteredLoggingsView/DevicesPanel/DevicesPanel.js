/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/devicesPanel.scss";
// React
import React, { Fragment } from "react";
import PropTypes from "prop-types";
// Immutable.js
import { fromJS } from "immutable";
import { toJS } from "components/helpers/to-js";
// Components
import SubscribedDevicesListing from "./container/SubscribedDevicesListing";
import RegisteredDevicesListing from "./container/RegisteredDevicesListing";
import HoverTooltip from "components/common/HoverTooltip";
import DevicesPanelHeader from "./presentation/DevicesPanelHeader";
// Redux
import { handleNewSub, handleDeleteSub } from "actions/WebsocketActions";
import { reduxForm } from "redux-form/immutable";
import { connect } from "react-redux";
import {
  selectAllDevices,
  selectSubscribedDevices,
  selectEventbusConnected
} from "reducers/selectors";
// Velocity Animations
import { ExpandAnimations } from "animations/collapsableDevicesPanel";
import { VelocityComponent } from "velocity-react";

export class DevicesPanelWrapped extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceAddingModeActive: false,
      ...props.initialState
    };
    this.submit = this.submit.bind(this);
    this.switchToAddingMode = this.switchToAddingMode.bind(this);
  }

  submit(values) {
    /* compare subscribedDevices with configuredSubscribed=true in values -> registrations and for each new sub, dispatch
    a newSub action, as well as for each removed sub a deleteSub action.
    */
    // if the find predicate returns undefined (not yet configuredSubscribed), filter should return true
    const addedSubs = values
      .get("registrations")
      .filter(
        reg =>
          !this.props.commitedSubs.find(
            sub => sub.deviceId === reg.get("deviceId")
          ) && reg.get("configuredSubscribed")
      )
      .map(sub => sub.get("deviceId"));
    const removedSubs = this.props.commitedSubs
      .filter(sub => {
        const alreadyCommittedValue = values
          .get("registrations")
          .find(reg => sub.deviceId === reg.get("deviceId"));
        // return the sub if it is marked as not subscribed (unchecked in the FieldArray)
        return !alreadyCommittedValue.get("configuredSubscribed");
      })
      .map(device => device.deviceId);
    addedSubs.forEach(sub => this.props.addDeviceToSubs(sub));
    removedSubs.forEach(device => this.props.removeDeviceFromSubs(device));
    this.setState(prevState => ({
      deviceAddingModeActive: !prevState.deviceAddingModeActive
    }));
  }

  switchToAddingMode(e) {
    this.setState({
      deviceAddingModeActive: true
    });
    e.preventDefault();
  }

  render() {
    const {
      expanded,
      toggleDevicesPanel,
      handleSubmit,
      isConnected
    } = this.props;
    let animationProps;
    if (!expanded) {
      animationProps = ExpandAnimations.collapse;
    } else {
      animationProps = ExpandAnimations.expand;
    }

    const tooltipIdEditSubs = "edit-btn";
    const tooltipIdCollapsePanel = "collapse-panel";
    return (
      <Fragment>
        <VelocityComponent key="devicePanelFrag1" animation={animationProps}>
          <div id="devices-panel-container">
            <form
              id="additional-subs-form"
              onSubmit={handleSubmit(this.submit)}>
              <DevicesPanelHeader
                deviceAddingModeActive={this.state.deviceAddingModeActive}
                switchToAddingMode={this.switchToAddingMode}
                expanded={expanded}
                isConnected={isConnected}
                toggleDevicesPanel={toggleDevicesPanel}
                tooltipIdEditSubs={tooltipIdEditSubs}
                tooltipIdCollapsePanel={tooltipIdCollapsePanel}
              />
              <div
                id="devices-panel-body"
                className={
                  this.state.deviceAddingModeActive
                    ? "registryView custom-scrollbar-1"
                    : "custom-scrollbar-1"
                }>
                {this.state.deviceAddingModeActive ? (
                  [
                    <RegisteredDevicesListing
                      key="deviceBodyFrag1"
                      expanded={expanded}
                    />,
                    <button
                      id="subscription-confirm-btn"
                      className="shadow-z-1"
                      key="deviceBodyFrag2"
                      type="submit">
                      Confirm
                    </button>
                  ]
                ) : (
                  <SubscribedDevicesListing expanded={expanded} />
                )}
              </div>
            </form>
          </div>
        </VelocityComponent>
        {!this.state.deviceAddingModeActive && (
          <HoverTooltip
            key="devicePanelFrag2"
            id={tooltipIdEditSubs}
            text="Edit current Subscriptions"
          />
        )}
        <HoverTooltip
          key="devicePanelFrag3"
          id={tooltipIdCollapsePanel}
          text="Collapse Panel"
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addDeviceToSubs: deviceId => dispatch(handleNewSub(deviceId)),
    removeDeviceFromSubs: deviceId => dispatch(handleDeleteSub(deviceId))
  };
};

const mapStateToProps = state => {
  return {
    initialValues: {
      additionalSubsRegistrySearch: "",
      registrations: selectAllDevices(state).map(device =>
        fromJS({
          deviceId: device.get("deviceId"),
          configuredSubscribed: device.get("configuredSubscribed")
        })
      )
      // .sort((a, b) => a.get('deviceId') - b.get('deviceId')) TODO: Remove that
    },
    commitedSubs: selectSubscribedDevices(state),
    isConnected: selectEventbusConnected(state)
  };
};

// Apply the reduxForm decorator and the connect decorator
let DevicesPanelContainer = reduxForm({
  form: "additionalSubscriptionsForm",
  enableReinitialize: true,
  destroyOnUnmount: false // TODO: Not ideal - currently necessary due to delayed DESTROY actions after fast page transitions
})(DevicesPanelWrapped);

DevicesPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(DevicesPanelContainer));

DevicesPanelWrapped.propTypes = {
  /**
   *  Whether or not the panel is expanded visible/ rendered.
   **/
  expanded: PropTypes.bool.isRequired,
  /**
   *  Toggles the expanded state, can be triggered from inside the component with the close arrow.
   **/
  toggleDevicesPanel: PropTypes.func.isRequired,
  /**
   *  Is provided by the reduxForm decorator HOC. Calls the submit function in which the selection input gets validated.
   **/
  handleSubmit: PropTypes.func.isRequired,
  /**
   *  Sets the initial values of the registry devices view to be identical to the state in the redux store.
   **/
  initialValues: PropTypes.object,
  /**
   *  All subscribed devices (not the temporarily selected ones in the registry view).
   **/
  commitedSubs: PropTypes.array,
  /**
   *  Whether or not the app is connected with the websocket eventbus (if not connected, a disconncted
   *  icon is shown in device adding mode).
   */
  isConnected: PropTypes.bool.isRequired,
  /**
   *  Gets called on hitting the plus button a second time for each additional subsciption being selected.
   **/
  addDeviceToSubs: PropTypes.func.isRequired,
  /**
   *  Gets called on hitting the plus button a second time for each removed subsciption selection or on clicking the
   *  minus button/ device icon in the default view.
   **/
  removeDeviceFromSubs: PropTypes.func.isRequired,
  initialState: PropTypes.object
};

const DevicesPanel = DevicesPanelContainer;
export default DevicesPanel;
