import React from "react";
import {
  Image,
  Item,
  Form,
  Header,
  Icon,
  Button
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { LabelInputField, Upload } from "react-semantic-redux-form";

const UserProfile = () => {
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
              <Header as="h4" color="black" textAlign="left">
                First Name:
              </Header>
              <Field
                name="firstName"
                type="text"
                component={LabelInputField}
                label={{ content: <Icon name="user" /> }}
                labelPosition="left"
              />
              <Form.Field
                control={Button}
                color="black"
                className="submit-btn"
                type="submit"
                fluid
              >
                Edit
              </Form.Field>
            </Form>
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default reduxForm({form: "UserProfile"})(UserProfile);
