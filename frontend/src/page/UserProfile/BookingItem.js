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
  }

  handleCancel() {
    console.log("cancelled booking");
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
              {/* <p>Booking ID:{this.props.record.uid}</p>
              <p>Shop Name:{this.props.record.shopname}</p>
              <p>Shop Address:{this.props.record.address}</p>
              <p>Shop Tel:{this.props.record.tel}</p>
              <a href={this.props.record.website} target="_blank">
                Shop Website
              </a>
              <p>
                Date:{this.props.record.bookingdate.split("_", 2).slice(0)[0]}
              </p>
              <p>
                Time slot:
                {this.props.record.bookingdate.split("_", 2).slice(1)[0]}
              </p>
              <p>Service:{this.props.record.name}</p>
              <p>Payment:{this.props.record.price}</p>
              <p>Status:{this.props.record.status}</p> */}
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
