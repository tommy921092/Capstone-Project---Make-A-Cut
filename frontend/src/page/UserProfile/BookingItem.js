import React from "react";
import {
  Item,
  Button,
  Form,
  Rating,
  Table,
  Icon,
  Segment
} from "semantic-ui-react";
import QRCode from 'qrcode.react';
import UserEditBookingModal from "./UserEditBookingModal";


class BookingItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      rating: this.props.record.rating,
      content: this.props.record.content,
      isDisabled:
        this.props.record.rating || this.props.record.status == "cancelled"
          ? true
          : false
    };
  }

  handleCancel() {
    console.log("cancelled booking");
    axios
      .put(`/api/userProfile/cancelbooking/${this.props.record._bookingid}`)
      .then(result => console.log(result));
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    let data = {
      _bookingid: this.props.record._bookingid,
      _shopid: this.props.record._shopid,
      _userid: this.props.record._userid,
      rating: this.state.rating,
      content: this.state.content
    };
    axios
      .post("/api/userProfile/comment", data)
      .then(result => console.log(result));
    this.setState({ isDisabled: true });
  };

  handleRate(e, { rating, maxRating }) {
    this.setState({ rating, maxRating });
  }

  render() {
    return (
      <Item.Group>
        <Item>
          <Item.Image
            size="large"
            src={
              !this.props.record.photo[0].indexOf("blob")
                ? this.props.record.photo[0]
                : `/img/upload/${this.props.record.photo[0]}`
            }
          />
          <Item.Content>
            <Item.Header>
              {this.props.isCurrent === true
                ? `Upcoming Booking${this.props.index}`
                : `Previous Booking${this.props.index}`}
            </Item.Header>
            <Item.Description>
              <Segment basic>
                <Table singleLine striped style={{ border: 0 }}>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width="2">
                        <Icon name="info" />
                        BookingID
                      </Table.Cell>
                      <Table.Cell width="12">
                        {this.props.record.uid}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="2">
                        <Icon name="home" />
                        Shop Name
                      </Table.Cell>
                      <Table.Cell width="12">
                        {this.props.record.shopname}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="2">
                        <Icon name="home" />
                        Shop Address
                      </Table.Cell>
                      <Table.Cell width="12">
                        {this.props.record.address}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="2">
                        <Icon name="phone" />
                        Telephone
                      </Table.Cell>
                      <Table.Cell width="12">
                        {this.props.record.tel}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="2">
                        <Icon name="internet explorer" />
                        Website
                      </Table.Cell>
                      <Table.Cell width="12">
                        {this.props.record.website || "N/A"}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="2">
                        <Icon name="clock" />
                        Date
                      </Table.Cell>
                      <Table.Cell width="12">
                        {this.props.record.bookingdate
                          .split("_", 2)
                          .slice(0)[0] || "N/A"}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="2">
                        <Icon name="clock" />
                        Time slot
                      </Table.Cell>
                      <Table.Cell width="12">
                        {this.props.record.bookingdate
                          .split("_", 2)
                          .slice(1)[0] || "N/A"}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="2">
                        <Icon name="dollar sign" />
                        Price
                      </Table.Cell>
                      <Table.Cell width="12">
                        {this.props.record.price}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="2">
                        <Icon name="circle" />
                        Status
                      </Table.Cell>
                      <Table.Cell width="12">
                        {this.props.record.status}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="16">
                      <QRCode value={this.props.record.uid}/>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Segment>
            </Item.Description>
            {this.props.isCurrent === true ? (
              <Item.Extra>
                {/* <UserEditBookingModal /> */}
                <Button basic color="black" onClick={this.handleCancel} floated="right">
                  Cancel
                </Button>
              </Item.Extra>
            ) : (
              <div>
                <Item.Header>Comment</Item.Header>
                <Form onSubmit={this.handleSubmit}>
                  <Form.TextArea
                    name="content"
                    placeholder="Your comment"
                    onChange={this.handleChange}
                    disabled={this.state.isDisabled}
                    value={this.state.content}
                  />
                  <Item.Header>Rating</Item.Header>
                  <br />
                  <Rating
                    icon="heart"
                    maxRating={5}
                    onRate={(e, rating) => {
                      this.handleRate(e, rating);
                    }}
                    rating={this.state.rating}
                    disabled={this.state.isDisabled}
                  />
                  <Button
                    basic
                    color="black"
                    type="submit"
                    floated="right"
                    disabled={this.state.isDisabled}
                  >
                    Save
                  </Button>
                </Form>
              </div>
            )}
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default BookingItem;
