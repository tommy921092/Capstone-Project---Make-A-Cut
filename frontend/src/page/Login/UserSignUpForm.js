import React, {Component} from "react";
import { Field, reduxForm } from "redux-form";
import validator from "validator";
import {
  Button,
  Form,
  Header,
  Icon,
  Divider
} from "semantic-ui-react";
import { LabelInputField } from "react-semantic-redux-form";
import { connect } from 'react-redux';

import { userSignupRequest } from '../../actions/userSignupAction';
import { withRouter } from "react-router";


const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = "User name is Required";
  } else if (!validator.isLength(values.username, { max: 10 })) {
    errors.username = "User name cannot be longer than 10";
  } else if (validator.isInt(values.username)) {
    errors.username = "You can't only have number in your username";
  }

  if (!values.fullName) {
    errors.fullName = "Full name is Required";
  } else if (!validator.isAlpha(values.fullName)) {
    errors.fullName = "Your name should only contain alphabets with no space";
  }

  if (!values.contactNumber) {
    errors.contactNumber = "Contact number is Required";
  } else if (!validator.isMobilePhone(values.contactNumber, 'zh-HK')) {
    errors.contactNumber = "Your contact number should be in correct format(only accept HK mobile phone)";
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
  } else if (!validator.isLength(values.password, { min: 6 })) {
    errors.password = "Password must at least 6 digtals";
  }

  if (!values.password_confirm) {
    errors.password_confirm = "Confirm-Password is Required";
  } else if (values.password_confirm !== values.password){
    errors.password_confirm = "Password not match";
  }

  return errors;
};


class UserSignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  onClick(e) {
    e.preventDefault();
    this.setState({isLoading:true});
    let data = {
      username: this.props.formInput.values.username,
      fullname: this.props.formInput.values.fullName,
      email: this.props.formInput.values.email,
      password: this.props.formInput.values.password,
      tel: this.props.formInput.values.contactNumber
    }
    this.props.userSignupRequest(data)
    .then(()=>{
      alert('reg ok!!');
      this.props.history.push('/user/login');
    }).catch((err)=>{
      alert(err)
    })
  }

  render() {
    return (
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
      <div className="ui stacked segment" style={{ maxWidth: 450, margin: "0 auto" }}>
        <Form size="large">
          <Field
            name="username"
            type="text"
            component={LabelInputField}
            label={{ content: <Icon name="user" /> }}
            labelPosition="left"
            placeholder="User Name"
          />
          <Field
            name="fullName"
            type="text"
            component={LabelInputField}
            label={{ content: <Icon name="user" /> }}
            labelPosition="left"
            placeholder="full Name (No Space)"
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
          <Field
            name="password_confirm"
            component={LabelInputField}
            type="password"
            label={{ content: <Icon name="lock" /> }}
            labelPosition="left"
            placeholder="Confirm your Password"
          />
          <Form.Group />
          <Form.Field
            control={Button}
            color="black"
            className="submit-btn"
            type="submit"
            fluid
            disabled={!this.props.valid || this.state.isLoading}
            onClick={this.onClick.bind(this)}
            loading={this.state.isLoading}
          >
            Sign up
          </Form.Field>
        </Form>
      </div>
    </div>
  );
    
  }
}

const mapStateToProps = (state) => {
  return {
    formInput: state.form.userSignUpForm
  }
}

UserSignUpForm = withRouter(connect(
  mapStateToProps,{ userSignupRequest }
)(UserSignUpForm));

export default reduxForm({
  form: "userSignUpForm", // a unique identifier for this form
  validate
})(UserSignUpForm);
