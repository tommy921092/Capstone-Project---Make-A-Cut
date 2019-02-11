import React from "react";
import { Item, Form, Input, Button, Message, Divider } from "semantic-ui-react";
// import validator from "validator";
import { connect } from "react-redux";
import axios from "axios";
import jwtDecode from "jwt-decode";

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
      age: "",
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
    axios.get(`/api/userProfile/profile/${id}`).then(result => {
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
  handleSubmit = e => {
    e.preventDefault();
    //if saved with no error return successfully saved message
    let token = localStorage.getItem("jwtToken");
    let id = jwtDecode(token).id;
    this.setState({ success: true });
    let data = {
      username: this.state.username,
      fullname: this.state.fullName,
      age: this.state.age,
      tel: this.state.contactNumber,
      district: this.state.district
    };
    axios.put(`/api/userProfile/profile/${id}`, data);
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
