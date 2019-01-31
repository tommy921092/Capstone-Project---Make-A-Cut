import React from "react";
import { Item, Button, Form, Rating } from "semantic-ui-react";
import axios from "axios";
import UserEditBookingModal from "./UserEditBookingModal";
class BookingItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel() {
    console.log("cancelled booking");
  }
  render() {
    return (
      <Item.Group>
        <Item>
          <Item.Image
            size="medium"
            src="https://react.semantic-ui.com/images/wireframe/image.png"
          />
          <Item.Content>
            <Item.Header>
              {this.props.status === "confirmed"
                ? `Upcoming Booking${this.props.index}`
                : `Previous Booking${this.props.index}`}
            </Item.Header>
            <Item.Description>
              <p>Booking ID:{this.props.record.bookingid}</p>
              <p>Shop Name:{this.props.record.shopname}</p>
              <p>Shop Address:{this.props.record.address}</p>
              <p>Shop Tel:{this.props.record.tel}</p>
              <p>Date:{this.props.record.date}</p>
              <p>Time slot:{this.props.record.timeslot}</p>
              <p>Service:{this.props.record.service}</p>
              <p>Payment:{this.props.record.payment}</p>
              <p>Status:{this.props.record.status}</p>
            </Item.Description>
            {this.props.status === "confirmed" ? (
              <Item.Extra>
                <UserEditBookingModal />
                <Button basic color="black" onClick={this.handleCancel}>
                  Cancel
                </Button>
              </Item.Extra>
            ) : (
              <div>
                <Item.Header>Comment</Item.Header>
                <Form>
                  <Form.TextArea placeholder="Your comment" />
                </Form>
                <Item.Header>Rating</Item.Header>
                <br />
                <Rating icon="heart" defaultRating={3} maxRating={5} />
              </div>
            )}
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default BookingItem;
