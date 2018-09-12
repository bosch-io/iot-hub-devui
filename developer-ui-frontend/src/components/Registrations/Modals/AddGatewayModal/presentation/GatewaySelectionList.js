/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import ChecklistSelect, {
  ChecklistSelectHeader,
  ChecklistOptionEntries
} from "components/common/ChecklistSelect";
import "styles/gatewayStyle.scss";

const GatewaySelectionList = ({ searchText, deviceData, changeSelected }) => (
  <ChecklistSelect
    name="selectedDevice"
    leadingCheckbox
    className="table"
    asField
  >
    <div className="header">
      <ChecklistSelectHeader textTitle="ID" />
    </div>
    <ChecklistOptionEntries
      className="entries"
      data={deviceData.map(entry => ({
        text: entry.deviceId,
        checked: entry.selected
      }))}
      filterText={searchText}
      onClick={changeSelected}
      onCheckboxClick={() => {
        /* Left out (the checkbox gets selected onClick */
      }}
    />
  </ChecklistSelect>
);
GatewaySelectionList.defaultProps = {
  searchText: ""
};

GatewaySelectionList.propTypes = {
  searchText: PropTypes.string,
  deviceData: PropTypes.array,
  changeSelected: PropTypes.func.isRequired
};

export default GatewaySelectionList;
