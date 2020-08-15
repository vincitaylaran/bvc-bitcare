import React, { Component } from "react";

import AvailabilityTableRow from "./AvailabilityTableRow";

import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class AvailabilityTable extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container>
        <Table responsive striped hover size="sm">
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AvailabilityTableRow
              list={this.props.list}
              handleDelete={this.props.handleDelete}
            />
          </TableBody>
        </Table>
      </Container>
    );
  }
}
export default AvailabilityTable;
