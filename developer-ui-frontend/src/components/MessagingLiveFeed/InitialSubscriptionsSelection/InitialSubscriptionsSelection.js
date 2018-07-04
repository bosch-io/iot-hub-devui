/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/subscriptionsConfigForm.scss";
// React
import React from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { reduxForm } from "redux-form/immutable";
import { addingNewSub } from "actions/SubscriptionActions";
import { withRouter } from "react-router-dom";
// Child Components
import RegistrySearchbar from "./presentation/RegistrySearchbar";
import DeviceSelectionListContainer from "./container/DeviceSelectionListContainer";
// SVG Imports
import SubmitIcon from "images/submitCaret.svg";

/**
 * This Component takes a different approach than the RegisteredDevicesListing (DevicesPanel).
 * The checkbox list is managed inside the React Component state and not using a Redux Form FieldArray.
 */
export class InitialSubscriptionsSelectionWrapped extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDevices: [],
      validationText: "",
      tooltipShown: false,
      done: false,
      ...props.initialState
    };
    this.addSelectedDevice = this.addSelectedDevice.bind(this);
    this.removeDeviceFromSelection = this.removeDeviceFromSelection.bind(this);
    this.submit = this.submit.bind(this);
    this.clearValidationText = this.clearValidationText.bind(this);
    this.setValidationText = this.setValidationText.bind(this);
  }

  componentDidMount() {
    setTimeout(() => document.body.classList.add("withBgPattern"), 500); // wait some time to prevent laggy background transition
  }

  addSelectedDevice(device) {
    this.setState(prevState => ({
      selectedDevices: [...prevState.selectedDevices, device].sort(
        (a, b) => a.deviceId - b.deviceId
      )
    }));
  }

  removeDeviceFromSelection(deviceId) {
    this.setState({
      selectedDevices: this.state.selectedDevices.filter(
        device => device.deviceId !== deviceId
      )
    });
  }

  clearValidationText() {
    this.setState({ validationText: "", tooltipShown: false });
  }

  setValidationText(text) {
    this.setState({ validationText: text }, () =>
      this.setState({ tooltipShown: true })
    );
  }

  // Gets called inside the handleSubmit function of the decorated form, which passes it the current Field values
  submit(values) {
    // Both errors and warnings must hold the values under the property of the specific <Field/> name
    const errors = {};
    if (this.state.selectedDevices.length === 0) {
      errors.registrySearch = "You have to subscribe to at least one device.";
      this.setState({
        validationText: "You have to subscribe to at least one device.",
        tooltipShown: true
      });
    } else {
      // Setting done to true will trigger the done animation -> Wait until it's done and dispatch the addingNewSub
      // Action. This will cause the conditional in the <Route> render to switch to a <Redirect> to the
      // <MessagingLiveFeed /> (main view).
      this.setState({ done: true }, () =>
        setTimeout(
          () =>
            this.state.selectedDevices.forEach(device =>
              this.props.addConfiguredSubscribed(device.deviceId)
            ),
          1900
        )
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div
        id="subConfigForm-container"
        className={this.state.done ? "done" : ""}>
        <h1 className="live-feed-headline">
          Hub Messaging <span>Live</span>
          <span>Feed</span>
        </h1>
        <form className="subConfigForm" onSubmit={handleSubmit(this.submit)}>
          <div id="registry-search-wrapper">
            <RegistrySearchbar
              clearValidationText={this.clearValidationText}
              validationText={this.state.validationText}
              tooltipShown={this.state.tooltipShown}
              setValidationText={this.setValidationText}
            />
            <DeviceSelectionListContainer
              selectedDevices={this.state.selectedDevices}
              addSelectedDevice={this.addSelectedDevice}
              removeDeviceFromSelection={this.removeDeviceFromSelection}
            />
          </div>
          <button
            type="submit"
            disabled={this.state.selectedDevices.length === 0}>
            <SubmitIcon /> Start
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addConfiguredSubscribed: device => dispatch(addingNewSub(device))
});

let InitialSubscriptionsSelectionContainer = reduxForm({
  form: "initialSubscriptionsForm"
})(InitialSubscriptionsSelectionWrapped);
InitialSubscriptionsSelectionContainer = withRouter(
  connect(null, mapDispatchToProps)(InitialSubscriptionsSelectionContainer)
);

InitialSubscriptionsSelectionWrapped.propTypes = {
  handleSubmit: PropTypes.func,
  registrySearch: PropTypes.string,
  addConfiguredSubscribed: PropTypes.func,
  history: PropTypes.object.isRequired,
  initialState: PropTypes.object
};
const InitialSubscriptionsSelection = InitialSubscriptionsSelectionContainer;
export default InitialSubscriptionsSelection;
