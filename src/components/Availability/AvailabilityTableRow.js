import React, { Component } from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class AvailabilityTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  deleteRow = e => {
    console.log(e.currentTarget.getAttribute("id"));

    if (this.props.handleDelete)
      this.props.handleDelete(e.currentTarget.getAttribute("id"));
  };

  tableRows = () => {
    if (this.props.list) {
      let row = this.props.list().map((availabilityObj, index) => (
        <TableRow
          onClick={this.deleteRow}
          key={index}
          id={availabilityObj.blockId}
          hover
        >
          <TableCell>{availabilityObj.day}</TableCell>
          <TableCell>{availabilityObj.start}</TableCell>
          <TableCell>{availabilityObj.end}</TableCell>
        </TableRow>
      ));
      return row;
    }
  };

  render() {
    return <>{this.tableRows()}</>;
  }
}
export default AvailabilityTableRow;
