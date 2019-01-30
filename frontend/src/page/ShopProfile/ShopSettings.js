import React from "react";
// import PropTypes from "prop-types";
// import validator from "validator";
import { Button, Form, Header, Icon, Message, Image } from "semantic-ui-react";
import { TimeInput } from "semantic-ui-calendar-react";
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

const feeOptions = [
  { text: "Cannot provide", value: "Cannot provide" },
  { text: "Less than $100", value: "Less than $100" },
  { text: "$101-250", value: "$101-250" },
  { text: "$251-500", value: "$251-500" },
  { text: "More than $500", value: "More than $500" }
];
//options for tags
const options = [];

class ShopSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      numImage: 0,
      nameError: false,
      success: false,
      isDisable: true,
      description: "",
      address: "",
      district: "",
      shopname: "",
      tag: [],
      email: "",
      mainPhoto: "",
      otherPhoto: [],
      openTime: "",
      closeTime: "",
      contactNumber: ""
    };
    // This binding is necessary to make `this` work in the callback
    this.handleEdit = this.handleEdit.bind(this);
    this.handleMainPhotoChange = this.handleMainPhotoChange.bind(this);
    this.handleOtherPhotoChange = this.handleOtherPhotoChange.bind(this);
  }

  handleAddition = (e, { value }) => {
    if (this.state.options.length < 5 && value.length < 10) {
      this.setState({
        options: [{ text: value, value }, ...this.state.options]
      });
    } else return;
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleMainPhotoChange(event) {
    this.setState({
      mainPhoto: URL.createObjectURL(event.target.files[0])
    });
  }
  handleOtherPhotoChange(event) {
    this.setState({
      otherPhoto: [
        ...this.state.otherPhoto,
        /[^/]*$/.exec(`${URL.createObjectURL(event.target.files[0])}.jpg`)[0]
      ]
    });
  }

  handleOpenTimeChange = (e, { value }) => {
    this.setState({ openTime: value });
    console.log(this.state.openTime);
  };
  handleCloseTimeChange = (e, { value }) => {
    this.setState({ closeTime: value });
    console.log(this.state.closeTime);
  };
  handleEdit = () => {
    this.setState(state => ({
      isDisable: !state.isDisable
    }));
  };
  handleResetPW = () => {
    console.log("resetPW");
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ success: true });
    let token = localStorage.getItem("jwtToken");
    let id = jwtDecode(token).id;
    console.log(id);
    let data = {
      shopname: this.state.shopname,
      address: this.state.district,
      address_2: this.state.address,
      tel: this.state.contactNumber,
      website: this.state.website,
      pricerange: this.state.averageFee,
      tag: this.state.options.map(e => e.value),
      openhour: this.state.openTime,
      closehour: this.state.closehour,
      description: this.state.description
    };
    console.log(data);
    // axios.put(`/api/shopProfile/${id}`, data);
  };

  componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    let id = jwtDecode(token).id;
    axios.get(`/api/shopProfile/${id}`).then(result => {
      console.log(result.data[0]);
      this.setState({
        email: result.data[0].email,
        shopname: result.data[0].shopname,
        address: result.data[0].address_2,
        district: result.data[0].address,
        options: result.data[0].tag.map(e => {
          return { text: e, value: e };
        }),
        contactNumber: result.data[0].tel,
        mainPhoto: result.data[0].photo[0],
        otherPhoto: result.data[0].photo.filter(
          ele => ele != result.data[0].photo[0]
        ),
        averageFee: result.data[0].pricerange,
        website: result.data[0].website,
        description: result.data[0].description,
        openTime: result.data[0].openhour,
        closeTime: result.data[0].closehour,
        numImage: result.data[0].photo.length
      });
    });
  }
  render() {
    //values for tags
    const imageChildren = [];
    for (var i = 0; i < this.state.numImage - 1; i++) {
      imageChildren.push(
        <Form.Field>
          <Image
            size="medium"
            alt="no image"
            src={
              !this.state.otherPhoto.indexOf("blob")
                ? this.state.otherPhoto[i]
                : `/img/upload/${this.state.otherPhoto[i]}`
            }
          />
          <Form.Input
            key={i}
            name="otherImage"
            type="file"
            onChange={this.handleOtherPhotoChange}
          />
        </Form.Field>
      );
    }
    return (
      <div className="shop-settings">
        {/*
                Heads up! The styles below are necessary for the correct render of this example.
                You can do same with CSS, the main idea is that all the elements up to the `Grid`
                below must have a height of 100%.
              */}
        <div
          class="ui stacked segment"
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <Form
            size="large"
            onSubmit={this.handleSubmit}
            success={this.state.success}
          >
            <Header as="h3" color="black" textAlign="center">
              LOGIN INFO
            </Header>
            <Form.Field>
              <label>Email</label>
              <Form.Input
                label={{ content: <Icon name="mail" /> }}
                name="email"
                labelPosition="left"
                placeholder="Email"
                disabled
                value={this.state.email}
              />
            </Form.Field>
            <Header as="h3" color="black" textAlign="center">
              BASIC INFO
            </Header>
            <Form.Field>
              <label>Shop Name</label>
              <Form.Input
                name="name"
                labelPosition="left"
                placeholder="Shop Name"
                onChange={this.handleChange}
                error={this.state.nameError}
                disabled={this.state.isDisable}
                value={this.state.shopname}
              />
            </Form.Field>
            <Header as="h3" color="black" textAlign="center">
              DETAIL INFO
            </Header>
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
              <label>Shop Name</label>
              <Form.Input
                name="address"
                labelPosition="left"
                placeholder="address"
                onChange={this.handleChange}
                disabled={this.state.isDisable}
                value={this.state.address}
              />
            </Form.Field>
            <Form.Field>
              <label>
                ADD TAGS HERE FOR YOUR SHOP(max 5 tags and each with less than
                10 characters)
              </label>
              <Form.Dropdown
                name="tag"
                placeholder="add tags by pressing enter key"
                options={this.state.options}
                search
                selection
                fluid
                multiple
                allowAdditions
                onAddItem={this.handleAddition}
                disabled={this.state.isDisable}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Contact Number</label>
              <Form.Input
                label={{ content: <Icon name="phone" /> }}
                name="contactNumber"
                type="number"
                labelPosition="left"
                placeholder="Contact Number"
                disabled={this.state.isDisable}
                value={this.state.contactNumber}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Website</label>
              <Form.Input
                name="website"
                placeholder="Website"
                disabled={this.state.isDisable}
                value={this.state.website}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Opening time</label>
              <TimeInput
                name="openTime"
                placeholder="openTime"
                value={this.state.openTime}
                iconPosition="left"
                onChange={this.handleOpenTimeChange}
                disabled={this.state.isDisable}
              />
            </Form.Field>
            <Form.Field>
              <label>Closing time</label>
              <TimeInput
                name="closeTime"
                placeholder="closeTime"
                value={this.state.closeTime}
                iconPosition="left"
                onChange={this.handleCloseTimeChange}
                disabled={this.state.isDisable}
              />
            </Form.Field>
            <Form.Field>
              <label>Average Fee</label>
              <Form.Select
                name="averageFee"
                placeholder="Average Fee"
                disabled={this.state.isDisable}
                options={feeOptions}
                disabled={this.state.isDisable}
                value={this.state.averageFee}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Group />
            <Form.Field>
              <label>Description</label>
              <Form.TextArea
                name="description"
                placeholder="Tell us about your shop"
                disabled={this.state.isDisable}
                onChange={this.handleChange}
                value={this.state.description}
              />
            </Form.Field>

            <Form.Field>
              <label>
                <i class="ui upload icon" />
                Main Photo
              </label>
              <Image
                size="medium"
                alt="no image"
                src={
                  !this.state.mainPhoto.indexOf("blob")
                    ? this.state.mainPhoto
                    : `/img/upload/${this.state.mainPhoto}`
                }
              />
              <Form.Input
                name="mainPhoto"
                type="file"
                onChange={this.handleMainPhotoChange}
                disabled={this.state.isDisable}
              />
            </Form.Field>

            <Header as="h4" color="black" textAlign="left">
              Other photo
            </Header>
            {imageChildren}
            <Button
              icon
              disabled={this.state.isDisable}
              onClick={e => {
                e.preventDefault();
                this.setState({ numImage: this.state.numImage + 1 });
              }}
            >
              <Icon name="add" />
            </Button>
            <Button
              icon
              disabled={this.state.isDisable}
              onClick={e => {
                e.preventDefault();
                e.preventDefault();
                if (this.state.numImage >= 1) {
                  this.setState({ numImage: this.state.numImage - 1 });
                } else return;
              }}
            >
              <Icon name="minus" />
            </Button>
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
        </div>
      </div>
    );
  }
}

export default ShopSettings;
