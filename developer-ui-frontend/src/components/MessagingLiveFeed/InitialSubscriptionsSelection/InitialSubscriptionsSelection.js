/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/subscriptionsConfigForm.scss";
// React
import React, { Fragment } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { reduxForm, formValueSelector } from "redux-form/immutable";
import { selectAllDevices } from "reducers/selectors";
import { toJS } from "components/helpers/to-js";
import { addingNewSub } from "actions/SubscriptionActions";
import { withRouter } from "react-router-dom";
// Styled Components
import BigCard from "components/common/BigCard";
// Child Components
import RegistrySearchbar from "./presentation/RegistrySearchbar";
import DeviceSelectionList from "./presentation/DeviceSelectionList";
import { RoundOutlineButton } from "components/common/buttons";

/**
 * This Component takes a different approach than the RegisteredDevicesListing (DevicesPanel).
 * The checkbox list is managed inside the React Component state and not using a Redux Form FieldArray.
 */
export class InitialSubscriptionsSelectionWrapped extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceData: props.registeredDevices.map(device => ({
        deviceId: device,
        selected: false
      })),
      validationText: "",
      tooltipShown: false,
      done: false,
      ...props.initialState
    };
    this.submit = this.submit.bind(this);
    this.clearValidationText = this.clearValidationText.bind(this);
    this.setValidationText = this.setValidationText.bind(this);
    this.getSelectedEntries = this.getSelectedEntries.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
  }

  componentDidMount() {
    setTimeout(() => document.body.classList.add("withBgPattern"), 500); // wait some time to prevent laggy background transition
  }
  clearValidationText() {
    this.setState({ validationText: "", tooltipShown: false });
  }

  changeSelected(id) {
    const deviceIndex = this.state.deviceData.findIndex(
      device => device.deviceId === id
    );
    this.setState(state => {
      const changedEntry = Object.assign({}, state.deviceData[deviceIndex]);
      changedEntry.selected = !changedEntry.selected;
      return {
        deviceData: [
          ...state.deviceData.slice(0, deviceIndex),
          changedEntry,
          ...state.deviceData.slice(deviceIndex + 1, state.deviceData.length)
        ]
      };
    });
  }

  setValidationText(text) {
    this.setState({ validationText: text }, () =>
      this.setState({ tooltipShown: true })
    );
  }

  getSelectedEntries() {
    return this.state.deviceData
      .filter(device => device.selected)
      .map(device => device.deviceId);
  }

  // Gets called inside the handleSubmit function of the decorated form, which passes it the current Field values
  submit() {
    // Both errors and warnings must hold the values under the property of the specific <Field/> name
    const errors = {};
    const selectedDevices = this.getSelectedEntries();
    if (selectedDevices.length === 0) {
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
            selectedDevices.forEach(deviceId =>
              this.props.addConfiguredSubscribed(deviceId)
            ),
          1900
        )
      );
    }
  }

  render() {
    const { handleSubmit, registrySearch } = this.props;
    const { deviceData } = this.state;
    const numberOfSubscribedDevices = this.state.deviceData.filter(
      device => device.selected
    ).length;
    return (
      <BigCard
        title={
          <Fragment>
            Hub Messaging <span>Live</span>
            <span>Feed</span>
          </Fragment>
        }
        id="subConfigForm-container"
        className={this.state.done ? "done" : ""}>
        <form className="subConfigForm" onSubmit={handleSubmit(this.submit)}>
          <div id="registry-search-wrapper">
            <RegistrySearchbar
              clearValidationText={this.clearValidationText}
              validationText={this.state.validationText}
              tooltipShown={this.state.tooltipShown}
              setValidationText={this.setValidationText}
            />
            <DeviceSelectionList
              searchText={registrySearch}
              deviceData={deviceData}
              showCallToAction={deviceData.length === 0}
              changeSelected={this.changeSelected}
            />
          </div>
          <div style={{ position: "relative", top: "25px" }}>
            <RoundOutlineButton
              primary
              submitAnimation
              type="submit"
              disabled={numberOfSubscribedDevices === 0}>
              Start
            </RoundOutlineButton>
          </div>
        </form>
      </BigCard>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addConfiguredSubscribed: device => dispatch(addingNewSub(device))
});

const selector = formValueSelector("initialSubscriptionsForm");

const mapStateToProps = state => {
  const registrySearch = selector(state, "registrySearch");
  const registeredDevices = selectAllDevices(state).map(device =>
    device.get("deviceId")
  );
  return {
    registeredDevices,
    registrySearch
  };
};

let InitialSubscriptionsSelectionContainer = reduxForm({
  form: "initialSubscriptionsForm"
})(InitialSubscriptionsSelectionWrapped);
InitialSubscriptionsSelectionContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(InitialSubscriptionsSelectionContainer))
);

InitialSubscriptionsSelectionWrapped.propTypes = {
  handleSubmit: PropTypes.func,
  registrySearch: PropTypes.string,
  registeredDevices: PropTypes.array.isRequired,
  addConfiguredSubscribed: PropTypes.func,
  history: PropTypes.object.isRequired,
  initialState: PropTypes.object
};
const InitialSubscriptionsSelection = InitialSubscriptionsSelectionContainer;
export default InitialSubscriptionsSelection;
