import React from "react";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import validator from "validator";
import { Button, Form, Header, Icon, Divider } from "semantic-ui-react";
import {
  LabelInputField,
  SelectField,
  Dropdown,
  TextAreaField,
  Upload
} from "react-semantic-redux-form";
import { TimeInput } from "semantic-ui-calendar-react";
const validate = values => {
  const errors = {};
  // contact validation
  if (!values.contactNumber) {
    errors.contactNumber = "Contact number is Required";
  } else if (!validator.isMobilePhone(values.contactNumber)) {
    errors.contactNumber =
      "Your contact number should be in correct format(only contains number)";
  }
  // email validation
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!validator.isEmail(values.email)) {
    errors.email = `Please include @ in the email address, ${
      values.email
    } is missing an @`;
  }
  // password validation
  if (!values.password) {
    errors.password = "Password is Required";
  }

  if (!values.name) {
    errors.name = "Shop name is Required";
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

const feeOptions = [
  { text: "Cannot provide", value: "Cannot provide" },
  { text: "Less than $100", value: "Less than $100" },
  { text: "$101-250", value: "$101-250" },
  { text: "$251-500", value: "$251-500" },
  { text: "More than $500", value: "More than $500" }
];
//options for tags
const options = [];
class AccountSettings extends React.Component {
  state = { options, numImage: 0, openTime: "" };

  handleAddition = (e, { value }) => {
    if (this.state.options.length < 5 && value.length < 10) {
      this.setState({
        options: [{ text: value, value }, ...this.state.options]
      });
    } else return;
  };

  handleChange = (e, { value }) => {
    this.setState({ currentValues: value });
  };

  handleOpenTimeChange = (e, { value }) => {
    this.setState({ openTime: value });
    console.log(this.state.openTime);
  };
  handleCloseTimeChange = (e, { value }) => {
    this.setState({ closeTime: value });
    console.log(this.state.closeTime);
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    //values for tags
    const { currentValues } = this.state;
    const imageChildren = [];
    for (var i = 0; i < this.state.numImage; i += 1) {
      imageChildren.push(
        <Field
          key={i}
          number={i}
          name="mainPhoto"
          required
          component={Upload}
        />
      );
    }
    return (
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
        <div
          class="ui stacked segment"
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <Form size="large" onSubmit={handleSubmit}>
            <Header as="h3" color="black" textAlign="center">
              LOGIN INFO
            </Header>
            <Form.Field>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                disabled={this.state.isDisable}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                disabled={this.state.isDisable}
              />
            </Form.Field>

            <Header as="h3" color="black" textAlign="center">
              BASIC INFO
            </Header>
            <Form.Field>
              <label>Shop Name</label>
              <input
                type="text"
                placeholder="Shop Name"
                disabled={this.state.isDisable}
              />
            </Form.Field>
            <Header as="h3" color="black" textAlign="center">
              DETAIL INFO
            </Header>
            <Header as="h4" color="black" textAlign="left">
              District:
            </Header>
            <Field
              name="district of your barber shop"
              component={SelectField}
              options={districtOptions}
              placeholder="District"
            />

            <Header as="h4" color="black" textAlign="left">
              ADD TAGS HERE FOR YOUR SHOP
              <br />
              (maximum five tags and each with less than 10 characters)
            </Header>
            <Field
              name="tag"
              component={Dropdown}
              placeholder="add tags by pressing enter key"
              options={this.state.options}
              selection
              fluid
              multiple
              allowAdditions
              value={currentValues}
              onAddItem={this.handleAddition}
              onChange={this.handleChange}
            />
            <br />
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
              Website:
            </Header>
            <Field
              name="website"
              type="text"
              component={LabelInputField}
              labelPosition="left"
              placeholder="Website URL"
            />
            <Header as="h4" color="black" textAlign="left">
              Opening time:
            </Header>
            <TimeInput
              name="openTime"
              placeholder="openTime"
              value={this.state.openTime}
              iconPosition="left"
              onChange={this.handleOpenTimeChange}
            />
            <Header as="h4" color="black" textAlign="left">
              Closing time:
            </Header>
            <TimeInput
              name="closeTime"
              placeholder="closeTime"
              value={this.state.closeTime}
              iconPosition="left"
              onChange={this.handleCloseTimeChange}
            />
            <Header as="h4" color="black" textAlign="left">
              Average Fee:
            </Header>
            <Field
              name="average fee of your services"
              component={SelectField}
              options={feeOptions}
              placeholder="averageFee"
            />
            <Form.Group />
            <Header as="h4" color="black" textAlign="left">
              Self-description:
            </Header>
            <Field
              name="Description"
              component={TextAreaField}
              placeholder="Tell us about your shop"
            />
            <Header as="h4" color="black" textAlign="left">
              Main photo:
            </Header>
            <Field name="mainPhoto" required component={Upload} />
            <Header as="h4" color="black" textAlign="left">
              Other photo:
            </Header>
            {imageChildren}
            <Button
              icon
              onClick={e => {
                e.preventDefault();
                this.setState({ numImage: this.state.numImage + 1 });
              }}
            >
              <Icon name="add" />
            </Button>
            <Button
              icon
              onClick={e => {
                e.preventDefault();
                this.setState({ numImage: this.state.numImage - 1 });
              }}
            >
              <Icon name="minus" />
            </Button>
            <Form.Field
              style={{ width: "70%", margin: "1rem auto" }}
              control={Button}
              color="black"
              className="submit-btn"
              type="submit"
              fluid
            >
              Sign up
            </Form.Field>
            <Button
              style={{ width: "70%", margin: "1rem auto" }}
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
              fluid
            >
              Clear Values
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default AccountSettings;
