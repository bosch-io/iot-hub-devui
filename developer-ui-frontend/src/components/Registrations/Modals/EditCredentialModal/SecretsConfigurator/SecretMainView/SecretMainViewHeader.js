/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteSecret } from "actions/CredentialActions";
import { selectSecretsByCredentialId } from "reducers/selectors";
// Child Components
import { SimpleButton } from "components/common/buttons";
import AddBox from "images/addBox.svg";
import RemoveBox from "images/removeBox.svg";
import EditButton from "images/editIcon.svg";
import CaretDown from "images/caretDownIcon.svg";
import "styles/credentialModal.scss";

class SecretMainViewHeaderWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDialogShown: false
    };
    this.toggleConfirmDialog = this.toggleConfirmDialog.bind(this);
    this.confirmRemove = this.confirmRemove.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
  }

  toggleConfirmDialog() {
    const { numberOfSecrets } = this.props;
    if (numberOfSecrets > 1) {
      this.setState({ confirmDialogShown: !this.state.confirmDialogShown });
    }
  }

  confirmRemove() {
    const {
      deviceId,
      authId,
      numberOfSecrets,
      selectedSecret,
      selectedSecretId,
      decreaseSelectedSecret
    } = this.props;
    this.props.deleteSecret(deviceId, authId, selectedSecretId);
    if (selectedSecret === numberOfSecrets - 1) {
      decreaseSelectedSecret();
    }
    this.setState({ confirmDialogShown: !this.state.confirmDialogShown });
  }

  cancelDelete() {
    this.setState({ confirmDialogShown: !this.state.confirmDialogShown });
  }

  render() {
    const {
      numberOfSecrets,
      selectedSecret,
      toggleAddingMode,
      toggleEditingMode,
      decreaseSelectedSecret,
      inEditingMode,
      increaseSelectedSecret
    } = this.props;
    const { confirmDialogShown } = this.state;
    let renderedRightSideHeader = null;
    if (confirmDialogShown) {
      renderedRightSideHeader = (
        <div className="secrets-messageRemove">
          <p>Do you really want to delete the secret?</p>
          <SimpleButton
            primary
            submitAnimation
            className="buttonConfirmation"
            onClick={this.confirmRemove}
            type="submit">
            Yes
          </SimpleButton>
          <SimpleButton
            primary
            submitAnimation
            className="buttonRejection"
            onClick={this.cancelDelete}
            type="submit">
            No
          </SimpleButton>
        </div>
      );
    } else if (inEditingMode) {
      renderedRightSideHeader = (
        <button className="cancel-button" onClick={toggleEditingMode}>
          +
        </button>
      );
    } else {
      renderedRightSideHeader = (
        <Fragment>
          <EditButton
            className="secrets-editButton"
            onClick={toggleEditingMode}
          />
          <AddBox onClick={toggleAddingMode} />
          <RemoveBox
            onClick={this.toggleConfirmDialog}
            className={`${numberOfSecrets > 1 ? "" : "disabled"}`}
          />
        </Fragment>
      );
    }

    return (
      <div className="secrets-nav-header">
        <div className="secrets-label">
          <CaretDown
            style={
              inEditingMode
                ? { visibility: "hidden", pointerEvents: "none" }
                : {}
            }
            className={`arrow previous ${selectedSecret < 1 ? "disabled" : ""}`}
            onClick={decreaseSelectedSecret}
          />
          <label>
            Secret {selectedSecret + 1} of {numberOfSecrets}
          </label>
          <CaretDown
            style={
              inEditingMode
                ? { visibility: "hidden", pointerEvents: "none" }
                : {}
            }
            className={`arrow next ${
              selectedSecret === numberOfSecrets - 1 ? "disabled" : ""
            }`}
            onClick={increaseSelectedSecret}
          />
        </div>
        <div className="secrets-buttons">{renderedRightSideHeader}</div>
      </div>
    );
  }
}

const SecretMainViewHeader = connect(
  (state, ownProps) => ({
    numberOfSecrets: selectSecretsByCredentialId(state, ownProps.authId).size
  }),
  { deleteSecret }
)(SecretMainViewHeaderWrapped);

SecretMainViewHeaderWrapped.propTypes = {
  deviceId: PropTypes.string,
  authId: PropTypes.string,
  inEditingMode: PropTypes.bool,
  numberOfSecrets: PropTypes.number,
  selectedSecret: PropTypes.number,
  selectedSecretId: PropTypes.string,
  deleteSecret: PropTypes.func,
  toggleAddingMode: PropTypes.func,
  toggleEditingMode: PropTypes.func,
  decreaseSelectedSecret: PropTypes.func,
  increaseSelectedSecret: PropTypes.func
};

export default SecretMainViewHeader;
