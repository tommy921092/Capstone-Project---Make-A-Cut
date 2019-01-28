import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";

export default class UserEditBookingModal extends Component {
  state = { modalOpen: false, date: "" };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });
  //change for date
  handleDateChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };
  //change for time
  handleTimeChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  render() {
    return (
      <Modal
        trigger={<Button basic color="black" onClick={this.handleOpen} >Edit</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="small"
      >
        <Header icon="edit" content="Edit your booking" />
        <Modal.Content>
          <Form.Input
            fluid
            label="Shop Name"
            placeholder="Read only"
            readOnly
          />
          <Form.Field>
            <label>Date</label>
            <DateInput
              name="date"
              placeholder="Date"
              value={this.state.date}
              iconPosition="left"
              onChange={this.handleDateChange}
            />
          </Form.Field>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="checkmark" /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
