/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import "styles/additionalSecretsModal.scss";
import { Field } from "redux-form/immutable";
// Child Components
import AdvancedSection from "./AdvancedSection";
import {
  ConfigurationModal,
  ConfigurationModalHeader,
  ConfigurationModalFooter,
  ConfigurationModalBody
} from "components/common/dialogModals";
import { TextField } from "components/common/textInputs";
// SVG Imports
import AddSecretLogo from "images/addPwSecretIcon.svg";

const AddSecretModal = ({
  isOpen,
  authId,
  changeIsOpen,
  handleSubmit,
  selectedType,
  pristine,
  submitting,
  invalid
}) => {
  const subjectTitle = "Add a Secret for ";
  return (
    <ConfigurationModal modalShown={isOpen} changeIsOpen={changeIsOpen}>
      <ConfigurationModalHeader
        subject={subjectTitle}
        subTitle={authId}
        icon={<AddSecretLogo />}
      />
      <ConfigurationModalBody className="configuration-modal-content">
        <div className="dropdown-input">
          <label htmlFor="secretType">Type</label>
          <Field name="secretType" component="select">
            <option value="Hashed Password">Hashed Password</option>
            <option value="Certificate" disabled>
              Certificate
            </option>
          </Field>
        </div>
        {selectedType === "Hashed Password" && (
          <div className="dropdown-input">
            <label htmlFor="hashAlgorithm">{"Hash Algorithm"}</label>
            <Field name="hashAlgorithm" component="select">
              <option>SHA-512</option>
              <option>SHA-256</option>
              <option>SHA-1</option>
            </Field>
          </div>
        )}
        <TextField asField name="password" type="password" label="Password" />
      </ConfigurationModalBody>
      <AdvancedSection />
      <ConfigurationModalFooter
        submitType="submit"
        toggleModal={() => changeIsOpen(!isOpen)}
        submitBlocked={invalid || pristine || submitting}
        confirm={handleSubmit}
      />
    </ConfigurationModal>
  );
};

AddSecretModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  authId: PropTypes.string,
  changeIsOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  selectedType: PropTypes.string,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool
};

export default AddSecretModal;
