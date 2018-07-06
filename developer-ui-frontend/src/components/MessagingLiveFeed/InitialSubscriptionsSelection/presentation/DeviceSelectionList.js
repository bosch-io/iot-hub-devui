/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import ChecklistSelect, {
  ChecklistOptionEntries
} from "components/common/ChecklistSelect";
import { RoundOutlineButton } from "components/common/buttons";
import { Link } from "react-router-dom";

const DeviceSelectionList = ({
  searchText,
  deviceData,
  changeSelected,
  showCallToAction
}) => (
  <ChecklistSelect
    asField
    name="selectedDevice"
    leadingCheckbox
    className="reg-listing">
    <ChecklistOptionEntries
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
    {showCallToAction && (
      <div className="redirect-call">
        <span>There seem to be no devices registered yet.</span>
        <RoundOutlineButton secondary type="button">
          <Link to="/registrations">Register a device to get started</Link>.
        </RoundOutlineButton>
      </div>
    )}
  </ChecklistSelect>
);
DeviceSelectionList.defaultProps = {
  searchText: ""
};

DeviceSelectionList.propTypes = {
  searchText: PropTypes.string,
  deviceData: PropTypes.array,
  showCallToAction: PropTypes.bool.isRequired,
  changeSelected: PropTypes.func.isRequired
};

export default DeviceSelectionList;
