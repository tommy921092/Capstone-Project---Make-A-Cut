import React from "react";
import { Item, Form, Button, Message } from "semantic-ui-react";

const districtOptions = [
  { text: "Central and Western", value: "Central and Western" },
  { text: "Eastern", value: "Eastern" },
  { text: "Southern", value: "Southern" },
  { text: "Wan Chai", value: "Wan Chai" },
  { text: "Sham Shui Po", value: "Sham Shui Po" },
  { text: "Kowloon City", value: "Kowloon City" },
  { text: "Kwun Tong", value: "Kwun Tong" },
  { text: "Wong Tai Sin", value: "Wong Tai Sin" },
  { text: "Yau Tsim Mong", value: "Yau Tsim Mong" },
  { text: "Islands", value: "Islands" },
  { text: "Yau Tsim Mong", value: "Yau Tsim Mong" },
  { text: "Kwai Tsing", value: "Kwai Tsing" },
  { text: "North", value: "North" },
  { text: "Sai Kung", value: "Sai Kung" },
  { text: "Sha Tin", value: "Sha Tin" },
  { text: "Tai Po", value: "Tai Po" },
  { text: "Tsuen Wan", value: "Tsuen Wan" },
  { text: "Tuen Mun", value: "Tuen Mun" },
  { text: "Yuen Long", value: "Yuen Long" }
];

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDisable: true, success: false };

    // This binding is necessary to make `this` work in the callback
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit = () => {
    this.setState(state => ({
      isDisable: !state.isDisable
    }));
  };
  handleResetPW = () => {
    console.log('resetPW');
  };

  handleSubmit = () => {
    this.setState({ success: true });
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
                  <label>Username</label>
                  <input placeholder="Username" disabled />
                </Form.Field>

                <Form.Field>
                  <label>Email</label>
                  <input placeholder="Email" disabled />
                </Form.Field>

                <Form.Field>
                  <label />
                  <input
                    placeholder="fullName"
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
                  <label>District</label>
                  <Form.Select
                    placeholder="District"
                    disabled={this.state.isDisable}
                    options={districtOptions}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Age</label>
                  <input placeholder="age" disabled={this.state.isDisable} />
                </Form.Field>

                <Form.Button color="black" type="button" onClick={this.handleEdit} >
                  Edit
                </Form.Button>

                <Form.Button color="black" type="submit">
                  Save
                </Form.Button>

                <Form.Button color="black" type="button" style={{margin: '1rem 0'}} onClick={this.handleResetPW}>
                  Reset Password
                </Form.Button>

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
