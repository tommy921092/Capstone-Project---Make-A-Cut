import React from "react";
import {Item, Form, Button } from "semantic-ui-react";

class ShopProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDisable: true };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isDisable: !state.isDisable
    }));
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
            <Item.Header as="a">Profile:</Item.Header>
            <Item.Description>
              <Form size="large">
                <Form.Field>
                  <label>First Name</label>
                  <input placeholder="First Name" type="text" disabled={this.state.isDisable}/>
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input placeholder="Last Name" type="text" disabled={this.state.isDisable}/>
                </Form.Field>
                <Form.Field>
                  <label>Contact Number</label>
                  <input placeholder="Contact Number" type="number" disabled={this.state.isDisable}/>
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input placeholder="Email"  type="Email" disabled={this.state.isDisable}/>
                </Form.Field>
                <Button color="black" onClick={this.handleClick}>
                  Edit
                </Button>
                <Button color="black" type="submit">
                  Submit
                </Button>
              </Form>
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default ShopProfile
