/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import DeviceEntityItem from "./DeviceEntityItem";
import { Field } from "redux-form/immutable";
import { ConfirmationModal } from "components/common/dialogModals";
import { TransitionMotion, Motion } from "react-motion";
import * as devicesListTransition from "animations/devicesListTransitions";

export default class DevicesListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmModal: { open: false, deviceId: "" },
      additionalEntryShown: false
    };
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this);
    this.getStyles = this.getStyles.bind(this);
  }

  toggleConfirmModal(deviceId, toOpen) {
    this.setState({
      confirmModal: {
        deviceId: this.state.confirmModal.open ? "" : deviceId,
        open: toOpen ? toOpen : !this.state.confirmModal.open
      }
    });
  }
  getStyles() {
    const {
      devices,
      expanded,
      asField,
      fields,
      registrySearchValue
    } = this.props;
    let exactMatch = false;
    let styles = [];
    if (expanded && asField) {
      fields.forEach((el, index, fieldsProp) => {
        // 2x .get needed (first get is a function property on the fieldsProp object prop of the FieldArray, second get is from Immutable.js)
        const id = fieldsProp
          .get(index)
          .get("deviceId")
          .toString();
        if (id.includes(registrySearchValue)) {
          if (id === registrySearchValue) {
            exactMatch = true;
          }
          styles.push({
            key: el,
            data: {
              deviceId: fieldsProp.get(index).get("deviceId"),
              lastActive: devices[index].lastActive,
              currentlyActive: devices[index].currentlyActive,
              isSubscribed: devices[index].isSubscribed
            },
            style: devicesListTransition.startingStyleConfig
          });
        }
      });
      // An additional entry must be added if
      // - there is no exact match between search value and a registrations entry
      // AND if
      // - there is any search text
      const showAdditionalEntry = !exactMatch && registrySearchValue.length > 0;
      if (this.state.additionalEntryShown !== showAdditionalEntry) {
        this.setState({ additionalEntryShown: showAdditionalEntry });
      }
    } else {
      styles = devicesListTransition.mapDevicesToTransitionStyle(
        devicesListTransition.startingStyleConfig,
        devices
      );
    }
    return styles;
  }
  render() {
    const {
      expanded,
      asField,
      deleteSub,
      fields,
      registrySearchValue,
      devices
    } = this.props;

    const renderAsFieldDevices = () => (
      <ul style={expanded ? { opacity: 1 } : { opacity: 0 }}>
        <Motion
          defaultStyle={devicesListTransition.defaultStyleConfig}
          style={
            this.state.additionalEntryShown
              ? devicesListTransition.startingStyleConfig
              : devicesListTransition.willLeave()
          }>
          {interpolatingStyle => (
            <DeviceEntityItem
              style={interpolatingStyle}
              isAdditional
              deviceId={registrySearchValue}
            />
          )}
        </Motion>
        <TransitionMotion
          defaultStyles={devicesListTransition.getDefaultStyles(devices)}
          styles={this.getStyles()}
          willLeave={devicesListTransition.willLeave}
          willEnter={devicesListTransition.willEnter}>
          {interpStyles => {
            const registeredFields = [];
            /* eslint-disable consistent-return */
            fields.forEach((el, index) => {
              if (index < interpStyles.length) {
                const {
                  key,
                  data: { deviceId, lastActive, currentlyActive, isSubscribed },
                  style
                } = interpStyles[index];
                return registeredFields.push(
                  <DeviceEntityItem
                    key={key}
                    deviceId={deviceId}
                    lastActive={lastActive}
                    currentlyActive={currentlyActive}
                    isSubscribed={isSubscribed}
                    style={style}>
                    <Field
                      name={`${key}.configuredSubscribed`}
                      id={deviceId}
                      component="input"
                      autoComplete="off"
                      type="checkbox"
                      readOnly
                    />
                  </DeviceEntityItem>
                );
              }
            });
            /* eslint-enable */
            return <div>{registeredFields}</div>;
          }}
        </TransitionMotion>
      </ul>
    );

    const renderAsSubs = () => (
      <ul style={expanded ? { opacity: 1 } : { opacity: 0 }}>
        <TransitionMotion
          defaultStyles={devicesListTransition.getDefaultStyles(devices)}
          styles={this.getStyles()}
          willLeave={devicesListTransition.willLeave}
          willEnter={devicesListTransition.willEnter}>
          {styles => (
            <span>
              {styles.map(
                ({
                  key,
                  style,
                  data: { deviceId, lastActive, currentlyActive, isSubscribed }
                }) => (
                  <DeviceEntityItem
                    onlySub={styles.length === 1}
                    key={key}
                    deviceId={deviceId}
                    lastActive={lastActive}
                    currentlyActive={currentlyActive}
                    isSubscribed={isSubscribed}
                    toggleConfirmModal={this.toggleConfirmModal}
                    style={style}
                  />
                )
              )}
            </span>
          )}
        </TransitionMotion>
      </ul>
    );

    return (
      <span>
        {asField && expanded ? renderAsFieldDevices() : renderAsSubs()}
        <ConfirmationModal
          key="ListingFrag2"
          subject="Delete Subscription"
          modalShown={this.state.confirmModal.open}
          toggleModal={this.toggleConfirmModal}
          confirm={() => deleteSub(this.state.confirmModal.deviceId)}
          submitType="delete">
          <Fragment>
            Are you sure, you want to delete the subscription for{" "}
            <i>{this.state.confirmModal.deviceId}</i>? You will no longer see
            any traffic of it in the feed.
          </Fragment>
        </ConfirmationModal>
      </span>
    );
  }
}

DevicesListing.propTypes = {
  /**
   *  Whether or not the panel is expanded (visible/ rendered).
   **/
  expanded: PropTypes.bool.isRequired,
  /**
   *  List of all devices that get displayed (either registered and subscribed devices or just subscribed devices)
   **/
  devices: PropTypes.array,
  /**
   *  Whether or not the DeviceEntityItems will be rendered as Fields. In the registry view, every device must be
   *  rendered as <Field> inside a <FieldArray>.
   **/
  asField: PropTypes.bool.isRequired,
  /**
   * Gets passed to the DevicesListing by the decorator HOC FieldArray and contains reading/writing functionality
   * for the containing <Field>s.
   **/
  fields: PropTypes.object,
  /**
   * Gets passed to the DevicesListing through the formValueSelector API and contains the current value inside the
   * DevicesSearchbar form.
   **/
  registrySearchValue: PropTypes.string,
  /**
   * Gets called on clicking the minus button/ device icon of the DeviceEntityItem in the default view.
   **/
  deleteSub: PropTypes.func
};
