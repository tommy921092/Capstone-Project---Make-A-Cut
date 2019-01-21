import React from "react";
import { Field, reduxForm } from "redux-form";
import validator from "validator";
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

  if (!values.firstName) {
    errors.firstName = "First name is Required";
  } else if (!validator.isAlpha(values.firstName)) {
    errors.firstName = "Your name should only contain alphabets";
  }

  if (!values.lastName) {
    errors.lastName = "First name is Required";
  } else if (!validator.isAlpha(values.lastName)) {
    errors.lastName = "Your name should only contain alphabets";
  }
  
  if (!values.contactNumber) {
    errors.contactNumber = "Contact number is Required";
  } else if (!validator.isMobilePhone(values.contactNumber)) {
    errors.contactNumber = "Your contact number should be in correct format(only contains number)";
  }

  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!validator.isEmail(values.email)) {
    errors.email = `Please include @ in the email address, ${
      values.email
    } is missing an @`;
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
    <Header as="h2" color="black" textAlign="center">
      User Sign Up
    </Header>
    <Divider style={{ width: "40%", margin: "1rem auto" }} />
    <div class="ui stacked segment" style={{ maxWidth: 450, margin: "0 auto" }}>
      <Form size="large">
        <Field
          name="firstName"
          type="text"
          component={LabelInputField}
          label={{ content: <Icon name="user" /> }}
          labelPosition="left"
          placeholder="First Name"
        />
        <Field
          name="lastName"
          type="text"
          component={LabelInputField}
          label={{ content: <Icon name="user" /> }}
          labelPosition="left"
          placeholder="Last Name"
        />
        <Field
          name="contactNumber"
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
        <Form.Group />
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
