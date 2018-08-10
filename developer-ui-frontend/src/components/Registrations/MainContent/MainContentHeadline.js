/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
// Child Components
import DeleteRegistrationModal from "../Modals/DeleteRegistrationModal";
import HoverTooltip from "components/common/HoverTooltip";
import Spinner from "components/common/Spinner";
// Animations TODO: Replace Velocity
import { VelocityComponent } from "velocity-react";
// SVG Imports
// import DeviceIcon from "images/deviceIcon.svg"; // TODO: Use this again
import DeleteIcon from "images/deleteIcon.svg";
// Redux
import { connect } from "react-redux";
import { selectIsFetchingByDeviceId } from "reducers/selectors";
import { deleteRegistration } from "actions/RegistrationActions";
import { deleteAllCredentialsOfDevice } from "actions/CredentialActions";
// Redux Form
import { reset, formValueSelector } from "redux-form/immutable";

class MainContentHeadlineWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmModalOpen: false,
      footerOptionChecked: true
    };
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this);
    this.confirmDeletion = this.confirmDeletion.bind(this);
  }

  onCheckboxClick() {
    this.setState(state => ({
      footerOptionChecked: !state.footerOptionChecked
    }));
  }

  confirmDeletion() {
    const { resetSelectedDevice, deleteReg, selectedDevice } = this.props;
    const rememberedSelection = selectedDevice;
    resetSelectedDevice(); // Clear selection
    if (this.state.footerOptionChecked) {
      this.props
        .deleteAllCredentialsOfDevice(rememberedSelection)
        .then(() => deleteReg(rememberedSelection));
    } else {
      deleteReg(rememberedSelection);
    }
  }

  toggleConfirmModal() {
    this.setState(state => ({ confirmModalOpen: !state.confirmModalOpen }));
  }

  render() {
    const {
      mainPanelExpanded,
      selectedDevice,
      isFetching,
      setMainPanel
    } = this.props;
    const tooltipIdDeleteReg = "delete-reg-tt";
    return (
      <React.Fragment key="mainPanelHeadline">
        <VelocityComponent
          animation={{
            translateX: mainPanelExpanded ? "0%" : "+100%"
          }}
          duration={100}
          delay={0}>
          <div id="main-panel-headline">
            <span>
              <svg
                onClick={
                  !mainPanelExpanded
                    ? () => setMainPanel(!mainPanelExpanded)
                    : null
                }
                id="device-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="546.1333"
                height="546.1333"
                viewBox="0 0 546.1333 546.1333">
                <path
                  d="M261.26763 544.53302c-5.27135-1.44685-245.143204-93.75814-249.534297-96.02974-4.111809-2.12712-8.7578841-7.51838-10.3032416-11.95579-2.06304764-5.92391-2.06304764-332.7711 0-338.69502 1.7933475-5.149489 6.2082765-9.730188 12.0036106-12.454316C18.893404 82.83179 254.26983 3.0054472 261.61529 1.2290225c6.50567-1.57332988 15.36708-1.56802232 21.83605.013078 2.79509.6831562 57.88197 19.1040495 122.4153 40.9353195 64.53333 21.831269 119.98621 40.454593 123.22863 41.385164 8.08676 2.320888 14.01689 7.572336 15.71327 13.914924 1.99389 7.454912 1.89265 333.332912-.10528 339.069982-1.56309 4.48834-6.19019 9.82048-10.4565 12.04979-5.20929 2.72205-241.36502 93.53899-248.38006 95.51797-7.86592 2.21902-17.44385 2.38169-24.59901.41777zm-12.73431-131.31383c0-70.2935-.0994-74.20653-1.86667-73.47899-3.79944 1.56417-5.6322 1.8163-8.3126 1.14357-4.66621-1.17115-11.73409-8.76669-17.57481-18.88693-12.00746-20.8053-28.99157-40.64099-44.77925-52.29753-26.83542-19.81344-52.06633-26.19845-75.49469-19.10491-8.797858 2.66377-14.634019 6.19526-24.958833 15.1027-6.408429 5.52869-9.330336 7.36955-11.697312 7.36955-4.254931 0-8.454423-2.31876-12.45823-6.87885-1.829163-2.08329-3.580416-3.78782-3.891673-3.78782-.311257 0-.565922 33.09167-.565922 73.53704 0 57.66908.28771 73.7189 1.333334 74.37978 1.944425 1.22897 197.354176 76.89991 198.933316 77.03542 1.055.0906 1.33334-15.38517 1.33334-74.13303zm-101.15156 4.84646c-9.96793-4.42536-20.87075-19.58247-23.75286-33.02128-2.82996-13.19569 1.06678-26.96899 9.02089-31.88489 5.68777-3.51525 13.96666-3.07696 20.22878 1.0709 10.07345 6.67238 18.24624 19.07828 20.876 31.68876 1.59903 7.66788 1.48221 12.67179-.44755 19.16999-3.86588 13.01781-14.19115 18.18598-25.92526 12.97652zm52.46255-43.65785c-4.02875-1.62563-9.37667-7.90017-16.20735-19.0156-15.0248-24.44957-32.49139-36.61878-50.2313-34.99683-7.27593.66524-11.28088 2.84061-22.83112 12.40116-7.79332 6.45082-13.429918 5.60432-21.396009-3.21318-7.046982-7.80017-10.282354-18.49871-8.103618-26.79657.93054-3.54402 2.912256-6.28457 8.312149-11.49499 8.848361-8.53791 14.854528-12.38369 23.525298-15.0634 27.66284-8.54925 62.50473 9.95584 88.38386 46.94211 17.55017 25.08258 21.1233 40.08787 11.6198 48.79717-3.9529 3.62256-8.1839 4.41237-13.07171 2.44013zm195.889 75.76872c51.92-20.05895 96.43999-37.36761 98.93333-38.46369l4.53333-1.9929V276.85996c0-109.76684-.24632-132.85997-1.41713-132.85997-1.40543 0-194.73359 73.97209-198.31619 75.88064-1.76253.93894-1.86667 8.43769-1.86667 134.41462 0 126.5592.096 133.39274 1.86667 132.88614 1.02666-.29374 44.34666-16.94593 96.26666-37.00487zM247.74532 219.67728c-1.09776-.97345-195.376246-74.8544-198.41199-75.45285l-2.4-.47313v44.92434c0 24.70839.322763 44.92435.717249 44.92435.394488 0 3.562976-2.47514 7.041085-5.5003 18.267962-15.88899 34.190111-22.33007 55.174996-22.32026 13.88315.006 24.4142 1.9749 37.41596 6.99358 36.76116 14.18979 68.46469 43.85057 98.07994 91.7603l2.63742 4.26667.27867-44.20133c.15326-24.31074-.0867-44.52535-.53333-44.92137zm112.39832-76.75948c47.86901-18.1952 87.81946-33.52292 88.77879-34.06159 1.50775-.84664 1.5273-1.06097.14421-1.58103-.88-.33088-40.84-13.790058-88.8-29.909281l-87.19999-29.307678-87.19999 29.307678C85.077244 111.24094 95.526448 107.61533 96.340347 108.42923c.494895.4949 175.189643 67.34019 176.480853 67.52872.15832.0231 39.45343-14.84495 87.32244-33.04015z"
                  fill="#28353d"
                />
              </svg>
              <h2>{selectedDevice || <i>Please select a device</i>}</h2>
              {isFetching && <Spinner type="bubbles" />}
            </span>
            <span id="action-buttons">
              <DeleteIcon
                className={!selectedDevice ? "disabled" : null}
                onClick={selectedDevice ? this.toggleConfirmModal : null}
                data-tip
                data-for={tooltipIdDeleteReg}
              />
            </span>
          </div>
        </VelocityComponent>
        <DeleteRegistrationModal
          subject={"Delete device " + selectedDevice}
          modalShown={this.state.confirmModalOpen}
          toggleModal={this.toggleConfirmModal}
          confirm={this.confirmDeletion}
        />
        {selectedDevice && (
          <HoverTooltip
            id={tooltipIdDeleteReg}
            text={"Delete " + selectedDevice}
          />
        )}
      </React.Fragment>
    );
  }
}

const MainContentHeadline = connect(
  (state, ownProps) => ({
    isFetching: selectIsFetchingByDeviceId(state, ownProps.selectedDevice),
    selectedDevice: formValueSelector("registrationsTabListing")(
      state,
      "selectedDevice"
    )
  }),
  dispatch => ({
    deleteReg: deviceId => dispatch(deleteRegistration(deviceId)),
    deleteAllCredentialsOfDevice: deviceId =>
      dispatch(deleteAllCredentialsOfDevice(deviceId)),
    resetSelectedDevice: () => dispatch(reset("registrationsTabListing"))
  })
)(MainContentHeadlineWrapped);

MainContentHeadlineWrapped.propTypes = {
  mainPanelExpanded: PropTypes.bool.isRequired,
  setMainPanel: PropTypes.func.isRequired,
  selectedDevice: PropTypes.string,
  resetSelectedDevice: PropTypes.func.isRequired,
  deleteReg: PropTypes.func.isRequired,
  deleteAllCredentialsOfDevice: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default MainContentHeadline;
