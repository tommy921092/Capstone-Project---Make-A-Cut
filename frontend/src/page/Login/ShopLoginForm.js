import React from "react";
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
import { LabelInputField} from "react-semantic-redux-form";
import { withRouter } from "react-router";
import { merchantLogin } from '../../actions/userAuthAction'
import { connect } from 'react-redux';



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

class ShopLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      wrongPassword: false
    }
  }

  onClick(e) {
    e.preventDefault();
    this.setState({isLading:true,wrongPassword:false})
    this.props.merchantLogin(this.props.formInput.values)
      .then(
        (res) => this.props.history.push('/'),
        (err) => this.setState({ isLoading:false,wrongPassword: true })
      );
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const warning = <Message negative>
    <Message.Header>You may Enter a wrong Password or Username</Message.Header>
    <p>Try Again, Bitch!</p>
  </Message>
    return (
      <div className="login-form" style={{ padding: "5%" }}>
        <Header as="h2" color="black" textAlign="center">
          MerchantLogin
        </Header>
        <Divider style={{ width: "40%", margin: "1rem auto" }} />
        <div
          className="ui stacked segment"
          style={{ maxWidth: 450, margin: "0 auto" }}
        >
          {/* <Button fluid color="google plus">
            <Icon name="google" /> Login with Google
          </Button>
          <Divider horizontal>Or</Divider> */}
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
            {this.state.wrongPassword && warning}
            {/* <Form.Group>
              <Field
                name="remember"
                component={CheckboxField}
                label="Stay sign in"
              />
            </Form.Group> */}
            <Form.Field
              control={Button}
              color="black"
              className="submit-btn"
              type="submit"
              onClick={this.onClick.bind(this)}
              loading={this.state.isLoading}
              fluid
            >
              Login
            </Form.Field>
          </Form>
          <Message style={{ textAlign: "center" }}>Forgot password?</Message>
          <Message style={{ textAlign: "center" }}>
            New to us? <a href="/shop/signup">Sign Up</a>
          </Message>
        </div>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    formInput: state.form.shopLoginForm
  }
}

ShopLoginForm = withRouter(connect(
  mapStateToProps, { merchantLogin }
)(ShopLoginForm))

export default reduxForm({
  form: "shopLoginForm", // a unique identifier for this form
  validate
})(ShopLoginForm);
