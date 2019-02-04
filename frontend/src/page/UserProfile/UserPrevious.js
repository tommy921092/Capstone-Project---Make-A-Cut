import React from "react";
import { Item, Form, Rating } from "semantic-ui-react";

class UserUpcoming extends React.Component {
  render() {
    return (
      <Item.Group>
        <Item>
          <Item.Image
            size="medium"
            src="https://react.semantic-ui.com/images/wireframe/image.png"
          />
          <Item.Content>
            <Item.Header>Previous Booking 1</Item.Header>
            <Item.Description>
              <p>Shop Name: </p>
              <p>Shop Address: </p>
              <p>Date: </p>
              <p>Time slot: </p>
              <p>Service: </p>
              <p>Payment: </p>
              <p>Status: </p>
            </Item.Description>
            <Item.Header>Comment</Item.Header>
            <Form>
              <Form.TextArea disabled placeholder="Your comment" />
            </Form>
            <Item.Header>Rating</Item.Header><br />
            <Rating icon="heart" defaultRating={3} maxRating={5} />
          </Item.Content>
        </Item>
        <Item>
          <Item.Image
            size="medium"
            src="https://react.semantic-ui.com/images/wireframe/image.png"
          />
          <Item.Content>
            <Item.Header>Previous Booking 2</Item.Header>
            <Item.Description>
              <p>Shop Name: </p>
              <p>Shop Address: </p>
              <p>Date: </p>
              <p>Time slot: </p>
              <p>Services: </p>
              <p>Payment: </p>
              <p>Status: </p>
            </Item.Description>
            <Item.Header>Comment</Item.Header>
            <Form>
              <Form.TextArea disabled placeholder="Your comment" />
            </Form>
            <Item.Header>Rating</Item.Header><br />
            <Rating icon="heart" defaultRating={3} maxRating={5} onClick={this.handleClick} />
          </Item.Content>
        </Item>
        <Item>
          <Item.Image
            size="medium"
            src="https://react.semantic-ui.com/images/wireframe/image.png"
          />
          <Item.Content>
            <Item.Header>Previous Booking 3</Item.Header>
            <Item.Description>
              <p>Shop Name: </p>
              <p>Shop Address: </p>
              <p>Date: </p>
              <p>Time slot: </p>
              <p>Services: </p>
              <p>Payment: </p>
              <p>Status: </p>
            </Item.Description>
            <Item.Header>Comment</Item.Header>
            <Form>
              <Form.TextArea disabled placeholder="Your comment" />
            </Form>
            <Item.Header>Rating</Item.Header><br />
            <Rating icon="heart" defaultRating={3} maxRating={5} />
          </Item.Content>
        </Item>
        <Item>
          <Item.Image
            size="medium"
            src="https://react.semantic-ui.com/images/wireframe/image.png"
          />
          <Item.Content>
            <Item.Header>Previous Booking 4</Item.Header>
            <Item.Description>
              <p>Shop Name: </p>
              <p>Shop Address: </p>
              <p>Date: </p>
              <p>Time slot: </p>
              <p>Services: </p>
              <p>Payment: </p>
              <p>Status: </p>
            </Item.Description>
            <Item.Header>Comment</Item.Header>
            <Form>
              <Form.TextArea disabled placeholder="Your comment" />
            </Form>
            <Item.Header>Rating</Item.Header><br />
            <Rating icon="heart" defaultRating={3} maxRating={5} />
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default UserUpcoming;
