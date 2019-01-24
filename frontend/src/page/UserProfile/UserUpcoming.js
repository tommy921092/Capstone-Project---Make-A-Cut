import React from "react";
import { Table, Button } from "semantic-ui-react";
import UserEditBookingModal from "./UserEditBookingModal";

class UserUpcoming extends React.Component {
  handleEdit = () => {};
  handleCancel = () => {};

  render() {
    return (
      <Table striped color="black">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Shop Name</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Services</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>John Lilki</Table.Cell>
            <Table.Cell>September 14, 2013</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>No</Table.Cell>
            <Table.Cell>
              <UserEditBookingModal />
              <Button basic color="black" onClick={this.handleCancel}>
                Cancel
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default UserUpcoming;
