/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { connect } from "react-redux";
import { selectIsFetchingByAuthId } from "reducers/selectors";
import PropTypes from "prop-types";
import AccordionTab from "../presentation/AccordionTab";

const CredentialEditorWrapped = ({
  credential,
  changeAddSecretModalIsOpen,
  selectedDevice,
  isFetching,
  isOpened,
  toggleIsOpened
}) => (
  <AccordionTab
    isOpened={isOpened}
    credential={credential}
    selectedDevice={selectedDevice}
    isFetching={isFetching}
    changeAddSecretModalIsOpen={changeAddSecretModalIsOpen}
    changeIsOpened={() => toggleIsOpened(credential.get("auth-id"))}
  />
);

const CredentialEditor = connect((state, ownProps) => ({
  isFetching: selectIsFetchingByAuthId(
    state,
    ownProps.credential.get("auth-id")
  )
}))(CredentialEditorWrapped);

CredentialEditorWrapped.propTypes = {
  credential: ImmutablePropTypes.map.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isOpened: PropTypes.bool.isRequired,
  toggleIsOpened: PropTypes.func.isRequired,
  triggerErrorMessage: PropTypes.func.isRequired,
  changeAddSecretModalIsOpen: PropTypes.func.isRequired,
  selectedDevice: PropTypes.string
};

export default CredentialEditor;
