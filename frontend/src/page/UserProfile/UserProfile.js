import React from "react";
import { Item, Form, Button, Message } from "semantic-ui-react";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDisable: true, success: false };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState(state => ({
      isDisable: !state.isDisable
    }));
  };

  handleSubmit = () => {
    this.setState({success: true})
  };
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
              <Form
                size="large"
                onSubmit={this.handleSubmit}
                success={this.state.success}
              >
                <Form.Field>
                  <label>First Name</label>
                  <input
                    placeholder="First Name"
                    disabled={this.state.isDisable}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input
                    placeholder="Last Name"
                    disabled={this.state.isDisable}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Contact Number</label>
                  <input
                    placeholder="Contact Number"
                    disabled={this.state.isDisable}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input placeholder="Email" disabled={this.state.isDisable} />
                </Form.Field>
                <Button color="black" type="button" onClick={this.handleClick}>
                  Edit
                </Button>
                <Button color="black" type="submit">
                  Submit
                </Button>
                <Message
                  success
                  header="Form Completed"
                  content="You've successfully updated your profile"
                />
              </Form>
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default UserProfile;
