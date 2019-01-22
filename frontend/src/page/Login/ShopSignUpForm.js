import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  Form,
  Header,
  Icon,
  Divider
} from "semantic-ui-react";
import {
  LabelInputField,
  SelectField
} from "react-semantic-redux-form";
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
const ShopSignUpForm = () => (
  <div className="login-form" style={{ paddingTop: "5em" }}>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <Header as="h2" color="black" textAlign="center">
      Merchant Sign Up
    </Header>
    <Divider style={{ width: "40%", margin: "1rem auto" }} />
    <div class="ui stacked segment" style={{ maxWidth: 600, margin: "0 auto" }}>
      <Form size="large">
        <Header as="h3" color="black" textAlign="center">
          LOGIN INFO
        </Header>
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
        <Header as="h3" color="black" textAlign="center">
          BASIC INFO
        </Header>
        <Field
          name="name"
          component={LabelInputField}
          type="text"
          label={{ content: <Icon name="user" /> }}
          labelPosition="left"
          placeholder="Shop Name"
        />
        <Header as="h3" color="black" textAlign="center">
          DETAIL INFO
        </Header>
        <Field
          name="district"
          component={SelectField}
          options={districtOptions}
          placeholder="District"
        />
        <Form.Group />
      </Form>
    </div>
  </div>
);

export default reduxForm({
  form: "shopSignUpForm", // a unique identifier for this form
  validate
})(ShopSignUpForm);
