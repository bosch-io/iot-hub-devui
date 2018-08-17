/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";

const ApplicationHeaderTable = ({ modalMessage }) => (
  <div className="application-header-table-container">
    <h5>Application Headers</h5>
    <table className="application-header-table">
      {modalMessage &&
        Object.keys(modalMessage.message.applicationProperties).map(
          headerKey => (
            <tr>
              <td>{headerKey}</td>
              <td>{modalMessage.message.applicationProperties[headerKey]}</td>
            </tr>
          )
        )}
    </table>
  </div>
);

ApplicationHeaderTable.propTypes = {
  modalMessage: PropTypes.object
};

export default ApplicationHeaderTable;
