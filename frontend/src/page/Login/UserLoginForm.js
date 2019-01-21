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
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!validator.isEmail(values.email)) {
    errors.email = `Please include @ in the email address, ${values.email} is missing an @`;
  }

  if (!values.password) {
    errors.password = "Password is Required";
  }
  return errors;
};
const UserLoginForm = () => (
  <div className="login-form" style={{ padding: "5%" }}>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <Header as="h2" color="black" textAlign="center">
      User Login
    </Header>
    <Divider style={{ width: "40%", margin: "1rem auto" }} />
    <div class="ui stacked segment" style={{ maxWidth: 450, margin: "0 auto" }}>
      <Button fluid color="facebook" style={{ marginBottom: "1em" }}>
        <Icon name="facebook" /> Login with Facebook
      </Button>
      <Button fluid color="google plus">
        <Icon name="google" /> Login with Google
      </Button>
      <Divider horizontal>Or</Divider>
      <Form size="large">
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
          Login
        </Form.Field>
      </Form>
      <Message style={{ textAlign: "center" }}>Forgot password?</Message>
      <Message style={{ textAlign: "center" }}>
        New to us? <a href="/user/signup">Sign Up</a>
      </Message>
    </div>
  </div>
);

export default reduxForm({
  form: "userLoginForm", // a unique identifier for this form
  validate
})(UserLoginForm);
