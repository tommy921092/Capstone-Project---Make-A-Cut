import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import validator from "validator";
import {
  Button,
  Form,
  Header,
  Message,
  Icon,
  Divider
} from "semantic-ui-react";
import { LabelInputField, CheckboxField } from "react-semantic-redux-form";
import { connect } from 'react-redux';

import { withRouter } from "react-router";
import { userLogin } from '../../actions/userAuthAction'

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const validate = values => {
  const errors = {};
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

class UserLoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      wrongPassword: false
    }
  }

  onClick(e) {
    e.preventDefault();
    this.setState({ isLading: true, wrongPassword: false })
    this.props.userLogin(this.props.formInput.values)
      .then(
        (res) => this.props.history.push('/'),
        (err) => this.setState({ isLoading: false, wrongPassword: true })
      );
  }

  render() {
    const warning = <Message negative>
      <Message.Header>You may Enter a wrong Password or Username</Message.Header>
      <p>Try Again, Bitch!</p>
    </Message>
    const responseFacebook = (response) => {
      console.log(response);
    }

    return (
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
        <div className="ui stacked segment" style={{ maxWidth: 450, margin: "0 auto" }}>
          <FacebookLogin
            appId="1088597931155576"
            autoLoad
            callback={responseFacebook}
            render={renderProps => (
              <Button fluid color="facebook" style={{ marginBottom: "1em" }} onClick={renderProps.onClick}>
                <Icon name="facebook" /> Login with Facebook
          </Button>
            )}
          />

          <Button fluid color="google plus">
            <Icon name="google" /> Login with Google
        </Button>
          <Divider horizontal>Or</Divider>
          {this.state.wrongPassword && warning}
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
              onClick={this.onClick.bind(this)}
              loading={this.state.isLoading}
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    formInput: state.form.userLoginForm
  }
}

UserLoginForm = withRouter(connect(
  mapStateToProps, { userLogin }
)(UserLoginForm))


export default reduxForm({
  form: "userLoginForm", // a unique identifier for this form
  validate
})(UserLoginForm);
