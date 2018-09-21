/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import ListSelect, {
  ListSelectHeader,
  ListOptionEntries
} from "components/common/ListSelect";
import "styles/gatewayStyle.scss";

const GatewaySelectionList = ({ searchText, deviceData, changeSelected }) => (
  <ListSelect name="via" className="table" asField>
    <div className="header">
      <ListSelectHeader textTitle="ID" />
    </div>
    <ListOptionEntries
      className="entries"
      data={deviceData.map(entry => ({
        text: entry.deviceId,
        selected: entry.selected
      }))}
      filterText={searchText}
      onClick={changeSelected}
    />
  </ListSelect>
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
