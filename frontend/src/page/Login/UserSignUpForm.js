import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Icon,
  Segment,
  Divider
} from "semantic-ui-react";
import { LabelInputField, CheckboxField } from "react-semantic-redux-form";
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is Required";
  }

  if (!values.password) {
    errors.password = "Password is Required";
  }
  return errors;
};
const UserSignUpForm = () => (
  <div className="login-form" style={{ paddingTop: "5em" }}>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <Header
      as="h2"
      color="black"
      textAlign="center"
    >
      User SignUp
    </Header>
    <Divider style={{width: '40%', margin: '1rem auto'}}/>
    <div class="ui stacked segment" style={{ maxWidth: 450, margin: "0 auto" }}>
      <Form size="large">
        <Field
          name="first-name"
          type="text"
          component={LabelInputField}
          label={{ content: <Icon name="user" /> }}
          labelPosition="left"
          placeholder="First Name"
        />
        <Field
          name="last-name"
          type="text"
          component={LabelInputField}
          label={{ content: <Icon name="user" /> }}
          labelPosition="left"
          placeholder="Last Name"
        />
        <Field
          name="contact-number"
          type="text"
          component={LabelInputField}
          label={{ content: <Icon name="phone" /> }}
          labelPosition="left"
          placeholder="Contact Number"
        />
        <Field
          name="email"
          type="email"
          component={LabelInputField}
          label={{ content: <Icon name="mail" /> }}
          labelPosition="left"
          placeholder="Email"
        />
        <Field
          name="password"
          component={LabelInputField}
          type="password"
          label={{ content: <Icon name="lock" /> }}
          labelPosition="left"
          placeholder="Password"
        />
        <Form.Group>
          <Field
            name="remember"
            component={CheckboxField}
            label="Stay sign in"
          />
        </Form.Group>
        <Form.Field
          control={Button}
          color="black"
          className="submit-btn"
          type="submit"
          fluid
        >
          Sign up
        </Form.Field>
      </Form>
    </div>
  </div>
);

export default reduxForm({
  form: "userSignUpForm", // a unique identifier for this form
  validate
})(UserSignUpForm);
