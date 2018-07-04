/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/payload-modal.scss";
import React from "react";
import PropTypes from "prop-types";
import { toJS } from "components/helpers/to-js";
// Redux
import { changeSorting } from "actions/UserSettingsActions";
import { connect } from "react-redux";
import {
  selectLogsSorting,
  selectVisibleLogs,
  selectNumberOfAllLogs,
  selectEventbusConnected,
  selectHubConnected
} from "reducers/selectors";
// Modal for shortened payload entries
import PayloadModal from "../presentation/PayloadModal";
import Table from "../presentation/Table";

/**
 * The filtered table for the loggings.
 *
 * @author Tim Weise
 * @version 0.1.0
 */
let LogTable = props => {
  const tableCategories = [
    { name: "Received at", id: "time" },
    { name: "Type", id: "type" },
    { name: "Device", id: "deviceId" },
    { name: "Content-Type", id: "contentType" },
    { name: "Payload", id: "payload" }
  ];
  return (
    <div id="feedTableContainer">
      <PayloadModal
        showModal={props.showModal}
        modalMessage={props.modalMessage}
        handleOpenModal={props.handleOpenModal}
        handleCloseModal={props.handleCloseModal}
      />
      <Table
        tableRows={props.tableRows}
        tableCategories={tableCategories}
        handleSortingChange={props.handleSortingChange}
        sortingOrder={props.sortingOrder}
        eventBusConnected={props.eventBusConnected}
        hubConnected={props.hubConnected}
        handleOpenModal={props.handleOpenModal}
        numberOfAllLogs={props.numberOfAllLogs}
      />
    </div>
  );
};

/**
 *  The sorting function that gets applied to all remaining logs after filtering with checkSingleLog().
 *  Sorts the logs based on the current sorting configuration object logsOrder (in store->filtering -> logsOrder).
 *  logsOrder has a structure like this: {category: "time", ascending: false}
 **/
const sortLogs = (visibleLogs, logsOrder) => {
  let sortedLogs = visibleLogs;
  const category = logsOrder.get("category");
  switch (category) {
    case "time":
      sortedLogs = sortedLogs.sort((a, b) => a.get("time") - b.get("time"));
      if (logsOrder.get("ascending")) {
        sortedLogs = sortedLogs.reverse();
      }
      break;
    case "type":
    case "contentType":
    case "deviceId":
      sortedLogs = sortedLogs.sort((a, b) => {
        if (a.getIn(["message", category]) > b.getIn(["message", category])) {
          return 1;
        }
        return b.getIn(["message", category]) > a.getIn(["message", category])
          ? -1
          : 0;
      });
      if (logsOrder.get("ascending")) {
        sortedLogs = sortedLogs.reverse();
      }
      break;
    case "unsorted":
      // no further sort method calls needed.
      break;
    default:
      return new Error("Unknown Sorting category");
  }
  return sortedLogs;
};

const mapStateToProps = state => {
  return {
    sortingOrder: selectLogsSorting(state),
    numberOfAllLogs: selectNumberOfAllLogs(state),
    tableRows: sortLogs(selectVisibleLogs(state), selectLogsSorting(state)),
    eventBusConnected: selectEventbusConnected(state),
    hubConnected: selectHubConnected(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSortingChange: category => dispatch(changeSorting(category))
  };
};
/* Decorate the LogTable container component with the redux aware props and use the props proxy HOC toJS to convert
the immutable props to plain JS props. */
export default (LogTable = connect(mapStateToProps, mapDispatchToProps)(
  toJS(LogTable)
));

LogTable.propTypes = {
  /**
   * Whether or not the modal is shown
   */
  showModal: PropTypes.bool.isRequired,
  /**
   * The log entry object that get displayed
   */
  modalMessage: PropTypes.object,
  /**
   * Function to open the modal/ set the state in the LogTable component
   */
  handleOpenModal: PropTypes.func.isRequired,
  /**
   * Function to close the modal/ set the state in the LogTable component
   */
  handleCloseModal: PropTypes.func.isRequired,
  sortingOrder: PropTypes.object,
  tableRows: PropTypes.array,
  numberOfAllLogs: PropTypes.number,
  hubConnected: PropTypes.bool,
  eventBusConnected: PropTypes.bool,
  handleSortingChange: PropTypes.func
};
