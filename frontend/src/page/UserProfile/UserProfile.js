import React from "react";
import { Item, Form, Input, Button, Message, Divider } from "semantic-ui-react";
// import validator from "validator";
import { connect } from "react-redux";
import axios from "axios";
import jwtDecode from "jwt-decode";

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

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisable: true,
      success: false,
      username: "",
      fullName: "",
      email: "",
      contactNumber: "",
      age: '',
      district: "",
      usernameError: false,
      fullNameError: false
    };

    // This binding is necessary to make `this` work in the callback
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    let id = jwtDecode(token).id;
    axios.get(`/api/userProfile/${id}`).then(result => {
      console.log(result.data[0]);
      this.setState({
        username: result.data[0].username,
        fullName: result.data[0].fullname,
        email: result.data[0].email,
        contactNumber: result.data[0].tel,
        age: result.data[0].age,
        district: result.data[0].district
      });
    });
  }
  //handle value changes for some of the form values which needs validations
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };
  //handle edit button
  handleEdit = () => {
    this.setState(state => ({
      isDisable: !state.isDisable
    }));
  };
  //handle reset button
  handleResetPW = () => {
    console.log("resetPW");
  };
  //handle save button
  handleSubmit = () => {
    //if saved with no error return successfully saved message
    console.log('the state: ',this.state);
    let token = localStorage.getItem("jwtToken");
    let id = jwtDecode(token).id;
    this.setState({ success: true });
  };

  render() {
    return (
      <Item.Group>
        <Item>
          <Item.Image
            size="medium"
            src="https://react.semantic-ui.com/images/wireframe/image.png"
          />
          <Item.Content>
            <Item.Header as="a">Profile:</Item.Header>
            <Item.Description>
              <Form
                size="large"
                onSubmit={this.handleSubmit}
                success={this.state.success}
              >
                <Form.Field>
                  <label>Username</label>
                  <Form.Input
                    name="username"
                    placeholder="Username"
                    disabled={this.state.isDisable}
                    value={this.state.username}
                    onChange={this.handleChange}
                    error={this.state.usernameError}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Email</label>
                  <Form.Input
                    name="email"
                    placeholder="Email"
                    disabled
                    value={this.state.email}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Full Name</label>
                  <Form.Input
                    name="fullName"
                    placeholder="fullName"
                    disabled={this.state.isDisable}
                    value={this.state.fullName}
                    onChange={this.handleChange}
                    error={this.state.fullNameError}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Contact Number</label>
                  <Form.Input
                    name="contactNumber"
                    placeholder="Contact Number"
                    disabled={this.state.isDisable}
                    value={this.state.contactNumber}
                    onChange={this.handleChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label>District</label>
                  <Form.Select
                    name="district"
                    placeholder={this.state.district}
                    disabled={this.state.isDisable}
                    options={districtOptions}
                    onChange={this.handleChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Age</label>
                  <Form.Input
                    parse={value => Number(value)}
                    name="age"
                    placeholder="age"
                    type="number"
                    disabled={this.state.isDisable}
                    value={this.state.age}
                    onChange={this.handleChange}
                  />
                </Form.Field>

                <Button color="black" type="button" onClick={this.handleEdit}>
                  Edit
                </Button>

                <Button color="black" type="submit">
                  Save
                </Button>

                <Button
                  color="black"
                  type="button"
                  style={{ margin: "1rem 0" }}
                  onClick={this.handleResetPW}
                >
                  Reset Password
                </Button>

                <Message
                  success
                  header="Form Completed"
                  content="You've successfully updated your profile"
                />
              </Form>
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(UserProfile);
