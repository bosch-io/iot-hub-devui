/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Spinner from "components/common/Spinner";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
// SVG Imports
import AddIcon from "images/addIcon.svg";

class DeviceEntityItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastActiveRelative: moment(props.lastActive).fromNow()
    };
    this.refreshDateInterval;
  }
  componentDidMount() {
    this.refreshDateInterval = setInterval(
      () =>
        this.setState({
          lastActiveRelative: moment(this.props.lastActive).fromNow()
        }),
      500
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lastActive !== this.props.lastActive) {
      this.setState({
        lastActiveRelative: moment(nextProps.lastActive).fromNow()
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshDateInterval);
  }

  render() {
    // props.children is either a Field component (hidden checkbox controlled by the li if deviceAddingModeActive) or null
    // if props.children is not undefined, the additionalSubscriptions view (RegisteredDevicesListing) is active
    let liSubline;
    if (
      !this.props.isAdditional &&
      this.props.isSubscribed &&
      this.props.currentlyActive
    ) {
      liSubline = <p>{"Last active " + this.state.lastActiveRelative}</p>;
    } else if (!this.props.isSubscribed && !this.props.children) {
      liSubline = <p>Adding subscription</p>;
    } else {
      liSubline = <p>Currently inactive</p>;
    }

    let clickHandler = null;
    if (
      !this.props.isAdditional &&
      !this.props.children &&
      !this.props.onlySub
    ) {
      clickHandler = () => this.props.toggleConfirmModal(this.props.deviceId);
    } else if (this.props.isAdditional) {
      clickHandler = () => {
        /* Add a redirect here */
      };
    } else if (this.props.onlySub) {
      clickHandler = () => {
        ReactTooltip.show(this.lastSubIcon);
        setTimeout(() => {
          ReactTooltip.hide(this.lastSubIcon);
        }, 2000);
      };
    }

    let liCircleIcon;
    if (
      !this.props.isAdditional &&
      !this.props.isSubscribed &&
      !this.props.children
    ) {
      liCircleIcon = (
        <div
          className="circle-icon registered-device-icon fetching"
          onClick={clickHandler}
          ref={
            this.props.onlySub &&
            (icon => {
              this.lastSubIcon = icon;
            })
          }
          data-tip={this.props.onlySub}
          data-for={this.props.onlySub ? "min-one-sub-tooltip" : null}>
          <Spinner type="default" />
        </div>
      );
    } else if (!this.props.isAdditional) {
      liCircleIcon = (
        <div
          className={
            this.props.currentlyActive
              ? "circle-icon registered-device-icon device-active"
              : "circle-icon registered-device-icon"
          }
          onClick={clickHandler}
          ref={
            this.props.onlySub
              ? icon => {
                  this.lastSubIcon = icon;
                }
              : null
          }
          data-tip={this.props.onlySub}
          data-for={this.props.onlySub ? "min-one-sub-tooltip" : null}
        />
      );
    } else {
      liCircleIcon = (
        <Link
          to={`/registrations/additionalRegs/${this.props.deviceId}`}
          className="circle-icon additional-reg-icon">
          <AddIcon />
        </Link>
      );
    }
    const liContent = (
      <span>
        {liCircleIcon}
        <div className="device-description">
          <h3>
            {this.props.isAdditional ? (
              <i>{this.props.deviceId}</i>
            ) : (
              this.props.deviceId
            )}
          </h3>
          {!this.props.isAdditional && liSubline}
        </div>
      </span>
    );

    if (this.props.children) {
      return (
        <div style={this.props.style}>
          <li>
            <label htmlFor={this.props.deviceId}>
              {this.props.children}
              {liContent}
            </label>
          </li>
        </div>
      );
    }

    return [
      <div style={this.props.style} key={this.props.deviceId + "listFrag1"}>
        <li>{liContent}</li>
      </div>,
      <ReactTooltip
        key={this.props.deviceId + "listFrag2"}
        id="min-one-sub-tooltip"
        place="bottom"
        type="dark"
        effect="solid"
        event="none">
        <span>You must have at least one subscription</span>
      </ReactTooltip>
    ];
  }
}

export default DeviceEntityItem;

DeviceEntityItem.propTypes = {
  /**
   * The DeviceId of the device
   */
  deviceId: PropTypes.string,
  /**
   * Whether or not the device has sent since the application was started
   */
  currentlyActive: PropTypes.bool,
  isSubscribed: PropTypes.bool,
  /**
   * Whether or not the device is the only subsciption (At least one device has to remain subscribed).
   */
  onlySub: PropTypes.bool,
  /**
   * A ms timestamp when the last message was received in the application. (gets formatted in the component)
   */
  lastActive: PropTypes.number,
  /**
   * Gets called on confirming the click on the minus button/ device icon of the DeviceEntityItem in the default view.
   **/
  deleteSub: PropTypes.func,
  /**
   * Gets called on clicking the minus button/ device icon of the DeviceEntityItem in the default view.
   **/
  toggleConfirmModal: PropTypes.func,
  /**
   * Identifies that the entry is an entry for adding additional registrations.
   */
  isAdditional: PropTypes.bool,
  /**
   * The react-motion interpolated styles
   */
  style: PropTypes.object,
  children: PropTypes.element
};
