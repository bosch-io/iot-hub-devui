/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { connect } from "react-redux";
import { selectIsFetchingByAuthId } from "reducers/selectors";
import PropTypes from "prop-types";
import AccordionTab from "../presentation/AccordionTab";

class CredentialEditorWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: props.isFirst
    };
    this.toggleIsOpened = this.toggleIsOpened.bind(this);
  }

  toggleIsOpened() {
    this.setState(state => ({
      isOpened: !state.isOpened
    }));
  }

  render() {
    const { isOpened } = this.state;
    const {
      credential,
      changeAddSecretModalIsOpen,
      selectedDevice,
      isFetching
    } = this.props;

    return (
      <AccordionTab
        isOpened={isOpened}
        credential={credential}
        selectedDevice={selectedDevice}
        isFetching={isFetching}
        changeAddSecretModalIsOpen={changeAddSecretModalIsOpen}
        changeIsOpened={this.toggleIsOpened}
      />
    );
  }
}

const CredentialEditor = connect((state, ownProps) => ({
  isFetching: selectIsFetchingByAuthId(
    state,
    ownProps.credential.get("auth-id")
  )
}))(CredentialEditorWrapped);

CredentialEditorWrapped.propTypes = {
  credential: ImmutablePropTypes.map.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFirst: PropTypes.bool.isRequired,
  triggerErrorMessage: PropTypes.func.isRequired,
  changeAddSecretModalIsOpen: PropTypes.func.isRequired,
  selectedDevice: PropTypes.string
};

export default CredentialEditor;
