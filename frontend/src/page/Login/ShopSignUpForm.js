import React from "react";
import { Field, reduxForm } from "redux-form";
// import PropTypes from "prop-types";
import validator from "validator";
import { Button, Form, Header, Icon, Divider } from "semantic-ui-react";
import {
  LabelInputField,
  SelectField,
  Dropdown,
  TextAreaField,
  Upload,
  change
} from "react-semantic-redux-form";
import { TimeInput } from "semantic-ui-calendar-react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { bindActionCreators } from 'redux'

import { shopSignupRequest } from "../../actions/shopSignupAction"



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
  // shop name validation
  if (!values.name) {
    errors.name = "Shop name is Required";
  }
  // district validation
  if (!values.district) {
    errors.district = "District is Required"
  }
  if (!values.address) {
    errors.address = "Address is Required"
  }
  // description validation
  if (!values.description) {
    errors.description = 'Description is Required'
  }
  // mainPhoto validation
  if (!values.mainPhoto) {
    errors.mainPhoto = 'Please upload at least 1 photo'
  } else if(values.mainPhoto[0]){
    if (values.mainPhoto[0].type !== "image/jpeg") {
      errors.mainPhoto = 'Only accept jpeg file'
      alert("Only accept jpeg file")
    }
  }
  return errors;
};

const districtOptions = [
  { key: '1', text: 'Central and Western', value: 'Central and Western' },
  { key: '2', text: 'Wan Chai', value: 'Wan Chai' },
  { key: '3', text: 'Eastern', value: 'Eastern' },
  { key: '4', text: 'Southern', value: 'Southern' },
  { key: '5', text: 'Yau Tsim Mong', value: 'Yau Tsim Mong' },
  { key: '6', text: 'Sham Shui Po', value: 'Sham Shui Po' },
  { key: '7', text: 'Kowloon City', value: 'Kowloon City' },
  { key: '8', text: 'Wong Tai Sin', value: 'Wong Tai Sin' },
  { key: '9', text: 'Kwun Tong', value: 'Kwun Tong' },
  { key: '10', text: 'Kwai Tsing', value: 'Kwai Tsing' },
  { key: '11', text: 'Tsuen Wan', value: 'Tsuen Wan' },
  { key: '12', text: 'Tuen Mun', value: 'Tuen Mun' },
  { key: '13', text: 'Yuen Long', value: 'Yuen Long' },
  { key: '14', text: 'North', value: 'North' },
  { key: '15', text: 'Tai Po', value: 'Tai Po' },
  { key: '16', text: 'Sha Tin', value: 'Sha Tin' },
  { key: '17', text: 'Sai Kung', value: 'Sai Kung' },
  { key: '18', text: 'Islands', value: 'Islands' }
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

class ShopSignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      numImage: 0,
      options: []
    }
  }


  handleAddition = (e, { value }) => {
    if (this.props.formInput.values.tag.length <= 5 && value.length < 10) {
      this.setState({
        options: [{ text: value, value }, ...this.state.options]
      });
    } else {
      this.props.change('tag', this.props.formInput.values.tag.slice(0, -1));
    }
    return;
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

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({isLoading:true})
    const formData = new FormData();
    Object.keys(this.props.formInput.values).forEach(key => formData.append(key, this.props.formInput.values[key]))
    formData.append('mainPhoto:', this.props.formInput.values.mainPhoto[0]);
    formData.append('otherPhoto_1:', this.props.formInput.values.otherPhoto_0 ? this.props.formInput.values.otherPhoto_0[0] : null);
    formData.append('otherPhoto_2:', this.props.formInput.values.otherPhoto_1 ? this.props.formInput.values.otherPhoto_1[0] : null);
    formData.append('otherPhoto_3:', this.props.formInput.values.otherPhoto_2 ? this.props.formInput.values.otherPhoto_2[0] : null);
    this.props.shopSignupRequest(formData)
      .then(() => {
        alert('Shop reg ok!!');
        this.props.history.push('/shop/login');
      }).catch((err) => {
        alert(err)
        this.setState({isLoading:false})
      })
    // console.log(this.props.formInput.values)
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    //values for tags
    const imageChildren = [];
    for (var i = 0; i < this.state.numImage; i += 1) {
      imageChildren.push(
        <Field
          key={i}
          number={i}
          name={`otherPhoto_${i}`}
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
          className="ui stacked segment"
          style={{ maxWidth: 450, margin: "0 auto" }}
        >
          <Form size="large" encType="multipart/form-data" onSubmit={this.onSubmit}>
            <Header as="h3" color="black" textAlign="center">
              LOGIN INFO
            </Header>
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
            <Header as="h3" color="black" textAlign="center">
              BASIC INFO
            </Header>
            <Header as="h4" color="black" textAlign="left">
              Shop Name:
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
            <Header as="h4" color="black" textAlign="left">
              District:
            </Header>
            <Field
              name="district"
              component={SelectField}
              options={districtOptions}
              placeholder="district of your barber shop"
            />
            <Header as="h4" color="black" textAlign="left">
              Address:
            </Header>
            <Field
              name="address"
              type="text"
              component={LabelInputField}
              placeholder="address of your barber shop"
            />

            <Header as="h4" color="black" textAlign="left">
              ADD TAGS HERE FOR YOUR SHOP <span style={{color:"grey"}}>(optional)</span>
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
              value={[]}
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
              Website: <span style={{color:"grey"}}>(optional)</span>
            </Header>
            <Field
              name="website"
              type="text"
              component={LabelInputField}
              labelPosition="left"
              placeholder="Website URL"
            />
            <Header as="h4" color="black" textAlign="left">
              Opening time: <span style={{color:"grey"}}>(optional)</span>
            </Header>
            <TimeInput
              name="openTime"
              placeholder="openTime"
              value={this.state.openTime}
              iconPosition="left"
              onChange={this.handleOpenTimeChange}
              disableMinute
            />
            <Header as="h4" color="black" textAlign="left">
              Closing time: <span style={{color:"grey"}}>(optional)</span>
            </Header>
            <TimeInput
              name="closeTime"
              placeholder="closeTime"
              value={this.state.closeTime}
              iconPosition="left"
              onChange={this.handleCloseTimeChange}
              disableMinute
            />
            <Header as="h4" color="black" textAlign="left">
              Average Fee:
            </Header>
            <Field
              name="averageFee"
              component={SelectField}
              options={feeOptions}
              placeholder="average fee of your services"
            />
            <Form.Group />
            <Header as="h4" color="black" textAlign="left">
              Self-description:
            </Header>
            <Field
              name="description"
              component={TextAreaField}
              placeholder="Tell us about your shop"
            />
            <Header as="h4" color="black" textAlign="left">
              Main photo:
            </Header>
            <Field name="mainPhoto" required component={Upload} type="file" />
            <Header as="h4" color="black" textAlign="left">
              Other photo:
            </Header>
            {imageChildren}
            <Button
              icon
              onClick={e => {
                e.preventDefault();
                if (this.state.numImage < 2) {
                  this.setState({ numImage: this.state.numImage + 1 });
                }
              }}
            >
              <Icon name="add" />
            </Button>
            <Button
              icon
              onClick={e => {
                e.preventDefault();
                if (this.state.numImage >= 1) {
                  this.setState({ numImage: this.state.numImage - 1 });
                } else return;
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
              disabled={!this.props.valid || this.state.isLoading}
              loading={this.state.isLoading}
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

const mapStateToProps = (state) => {
  return {
    formInput: state.form.shopSignUpForm
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ change, shopSignupRequest }, dispatch);
}

ShopSignUpForm = withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(ShopSignUpForm));

export default reduxForm({
  form: "shopSignUpForm", // a unique identifier for this form
  validate
})(ShopSignUpForm);
