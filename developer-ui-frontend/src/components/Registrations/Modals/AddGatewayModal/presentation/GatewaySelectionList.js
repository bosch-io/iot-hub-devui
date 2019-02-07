/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import ListSelect, { ListOptionEntries } from "components/common/ListSelect";
import "styles/gateway.scss";
import HoverTooltip from "components/common/HoverTooltip";
import CancelIcon from "images/cancelIcon.svg";

const tooltipReset = "reset-gateway-selection";

const GatewaySelectionList = ({
  searchText,
  deviceData,
  changeSelected,
  resetSelected,
  name,
  viaProperty
}) => (
  <div>
    <ListSelect name="via" className="table" asField>
      <ListOptionEntries
        id={tooltipReset}
        className="entries"
        data={deviceData.map(entry => ({
          text: entry.deviceId,
          selected: entry.selected
        }))}
        filterText={searchText}
        onClick={changeSelected}
        onIconClick={resetSelected}
        icon={<CancelIcon />}
        tooltipFunc={tooltipReset}
        name={name}
        selectedItem={`${
          viaProperty ? "Currently selected gateway device: " + viaProperty : ""
        }`}
      />
    </ListSelect>
    <HoverTooltip id={tooltipReset} text={"Deselect the gateway device"} />
  </div>
);
GatewaySelectionList.defaultProps = {
  searchText: ""
};

GatewaySelectionList.propTypes = {
  searchText: PropTypes.string,
  deviceData: PropTypes.array,
  changeSelected: PropTypes.func.isRequired,
  resetSelected: PropTypes.func,
  name: PropTypes.string,
  selectedGateway: PropTypes.string,
  viaProperty: PropTypes.string
};

export default GatewaySelectionList;
