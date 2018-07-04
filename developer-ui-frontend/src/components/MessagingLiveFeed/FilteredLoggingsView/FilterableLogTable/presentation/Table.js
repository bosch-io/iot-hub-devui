/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import { HYPERLINK_MINLENGTH } from "_APP_CONSTANTS";
import { formatDateString } from "utils";
import DisconnectedIcon from "images/warningIcon.svg";
import ConnectedIcon from "images/successIcon.svg";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.getSortButtonClasses = this.getSortButtonClasses.bind(this);
  }

  getSortButtonClasses(category) {
    let classNamesList = "";
    if (this.props.sortingOrder.category === category) {
      if (this.props.sortingOrder.ascending === true) {
        classNamesList = "ascSortActive";
      } else {
        classNamesList = "descSortActive";
      }
    }
    return classNamesList;
  }

  render() {
    const theadRow = this.props.tableCategories.map((category, index) => (
      <th key={"th" + index}>
        {category.name}
        <span
          className={this.getSortButtonClasses(category.id)}
          onClick={() => this.props.handleSortingChange(category.id)}
        />
      </th>
    ));
    // Override last category (currently no payload sorting implemented)
    theadRow[theadRow.length - 1] = <th key="payload">Payload</th>;
    const tableRows = [];
    this.props.tableRows.map((logObj, index) => {
      const hasHyperLink = logObj.message.content.length > HYPERLINK_MINLENGTH;

      const timeCell = <td>{formatDateString(logObj.time)}</td>;
      const typeCell = <td>{logObj.message.type}</td>;
      const deviceCell = <td>{logObj.message.deviceId}</td>;
      const contentTypeCell = <td>{logObj.message.contentType}</td>;
      const contentCell = (
        <td
          className={hasHyperLink ? "withEllipsis" : null}
          onClick={
            hasHyperLink ? () => this.props.handleOpenModal(logObj) : null
          }>
          {logObj.message.content.substring(0, HYPERLINK_MINLENGTH)}
        </td>
      );
      tableRows.push(
        <tr key={"tr" + index}>
          {timeCell}
          {typeCell}
          {deviceCell}
          {contentTypeCell}
          {contentCell}
        </tr>
      );
    });

    return (
      <table id="feedTable">
        <thead>
          <tr>{theadRow}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
        <tfoot>
          <tr>
            <td>{`Displayed Logs: ${tableRows.length}/${
              this.props.numberOfAllLogs
            }`}</td>
            <td>
              <span>{`Developer UI Backend: ${
                this.props.eventBusConnected ? "Connected " : "Disconnected "
              }`}</span>
              <span>{`Eclipse Hono Client: ${
                this.props.hubConnected ? "Connected" : "Disconnected"
              }`}</span>
              {this.props.eventBusConnected && this.props.hubConnected ? (
                <ConnectedIcon />
              ) : (
                <DisconnectedIcon />
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

Table.propTypes = {
  /**
   * The category of sorting inside the table and whether the sorting is descending or ascending.
   */
  sortingOrder: PropTypes.object.isRequired,
  /**
   * All log objects received since the application started.
   */
  tableRows: PropTypes.array,
  numberOfAllLogs: PropTypes.number.isRequired,
  eventBusConnected: PropTypes.bool.isRequired,
  hubConnected: PropTypes.bool.isRequired,
  /**
   * Called through the buttons next to the entries inside the table head. Changes the sortingOrder of the table.
   */
  handleSortingChange: PropTypes.func,
  /**
   * All categories/ collumn for the table
   */
  tableCategories: PropTypes.array,
  /**
   * Opens the payload modal. Gets called on clicking the payload link on a long message that doesn't fit in one line.
   */
  handleOpenModal: PropTypes.func
};
