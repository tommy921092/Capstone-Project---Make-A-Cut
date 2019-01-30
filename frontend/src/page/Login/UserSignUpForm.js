import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
// import PropTypes from "prop-types";
import validator from "validator";
import { Button, Form, Header, Icon, Divider } from "semantic-ui-react";
import { LabelInputField, SelectField } from "react-semantic-redux-form";
import { connect } from "react-redux";

import { userSignupRequest } from "../../actions/userSignupAction";
import { withRouter } from "react-router";

import axios from "axios";

const districtOptions = [
  { key: "1", text: "Central and Western", value: "Central and Western" },
  { key: "2", text: "Wan Chai", value: "Wan Chai" },
  { key: "3", text: "Eastern", value: "Eastern" },
  { key: "4", text: "Southern", value: "Southern" },
  { key: "5", text: "Yau Tsim Mong", value: "Yau Tsim Mong" },
  { key: "6", text: "Sham Shui Po", value: "Sham Shui Po" },
  { key: "7", text: "Kowloon City", value: "Kowloon City" },
  { key: "8", text: "Wong Tai Sin", value: "Wong Tai Sin" },
  { key: "9", text: "Kwun Tong", value: "Kwun Tong" },
  { key: "10", text: "Kwai Tsing", value: "Kwai Tsing" },
  { key: "11", text: "Tsuen Wan", value: "Tsuen Wan" },
  { key: "12", text: "Tuen Mun", value: "Tuen Mun" },
  { key: "13", text: "Yuen Long", value: "Yuen Long" },
  { key: "14", text: "North", value: "North" },
  { key: "15", text: "Tai Po", value: "Tai Po" },
  { key: "16", text: "Sha Tin", value: "Sha Tin" },
  { key: "17", text: "Sai Kung", value: "Sai Kung" },
  { key: "18", text: "Islands", value: "Islands" }
];

const asyncValidate = values => {
  return axios
    .get(`/api/users?username=${values.username}&email=${values.email}`)
    .then(result => {
      if (result.data === "User exist") {
        throw { username: "That username is taken" };
      }
      if (result.data === "Email exist") {
        throw { email: "That email is taken" };
      }
    });
};

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

  if (!values.district) {
    errors.district = "District is Required";
  }

  if (!values.age) {
    errors.age = "Age is Required";
  }

  if (!values.contactNumber) {
    errors.contactNumber = "Contact number is Required";
  } else if (!validator.isMobilePhone(values.contactNumber, "zh-HK")) {
    errors.contactNumber =
      "Your contact number should be in correct format(only accept HK mobile phone)";
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
    errors.password = "Password must at least 6 digitals";
  }

  if (!values.password_confirm) {
    errors.password_confirm = "Confirm-Password is Required";
  } else if (values.password_confirm !== values.password) {
    errors.password_confirm = "Password not match";
  }

  return errors;
};

class UserSignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  onClick(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    // {database name: value from form,....}
    let data = {
      username: this.props.formInput.values.username,
      fullname: this.props.formInput.values.fullName,
      email: this.props.formInput.values.email,
      password: this.props.formInput.values.password,
      tel: this.props.formInput.values.contactNumber,
      age: this.props.formInput.values.age,
      district: this.props.formInput.values.district
    };
    this.props
      //action creator to handle user sign up request with form data input
      .userSignupRequest(data)
      .then(() => {
        alert("reg ok!!");
        //redirect user to login after sign up
        this.props.history.push("/user/login");
      })
      .catch(err => {
        alert(err);
      });
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
        <div
          className="ui stacked segment"
          style={{ maxWidth: 450, margin: "0 auto" }}
        >
          <Form size="large">
            <Header as="h4" color="black" textAlign="left">
              Email:
            </Header>
            <Field
              name="email"
              type="email"
              component={LabelInputField}
              label={{ content: <Icon name="mail" /> }}
              labelPosition="left"
              placeholder="Email"
            />
            <Header as="h4" color="black" textAlign="left">
              Password:
            </Header>
            <Field
              name="password"
              component={LabelInputField}
              type="password"
              label={{ content: <Icon name="lock" /> }}
              labelPosition="left"
              placeholder="Password"
            />
            <Header as="h4" color="black" textAlign="left">
              Password Confirm:
            </Header>
            <Field
              name="password_confirm"
              component={LabelInputField}
              type="password"
              label={{ content: <Icon name="lock" /> }}
              labelPosition="left"
              placeholder="Confirm your Password"
            />
            <Header as="h4" color="black" textAlign="left">
              UserName:
            </Header>
            <Field
              name="username"
              type="text"
              component={LabelInputField}
              label={{ content: <Icon name="user" /> }}
              labelPosition="left"
              placeholder="User Name"
            />
            <Header as="h4" color="black" textAlign="left">
              FullName:
            </Header>
            <Field
              name="fullName"
              type="text"
              component={LabelInputField}
              label={{ content: <Icon name="user" /> }}
              labelPosition="left"
              placeholder="full Name (No Space)"
            />
            <Header as="h4" color="black" textAlign="left">
              Contact Number:
            </Header>
            <Field
              name="contactNumber"
              type="text"
              component={LabelInputField}
              label={{ content: <Icon name="phone" /> }}
              labelPosition="left"
              placeholder="Contact Number"
            />

            <Header as="h4" color="black" textAlign="left">
              Age:
            </Header>
            <Field
              name="age"
              type="number"
              component={LabelInputField}
              labelPosition="left"
              label={{ content: <Icon name="user" /> }}
              placeholder="age"
            />
            <Header as="h4" color="black" textAlign="left">
              District:
            </Header>
            <Field
              name="district"
              component={SelectField}
              options={districtOptions}
              labelPosition="left"
              placeholder="district"
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

const mapStateToProps = state => {
  return {
    formInput: state.form.userSignUpForm
  };
};

UserSignUpForm = withRouter(
  connect(
    mapStateToProps,
    { userSignupRequest }
  )(UserSignUpForm)
);

export default reduxForm({
  form: "userSignUpForm", // a unique identifier for this form
  validate,
  asyncValidate,
  asyncBlurFields: ["username", "email"]
})(UserSignUpForm);
