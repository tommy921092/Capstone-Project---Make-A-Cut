import React, { Component } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

import ShopProfile from "./ShopProfile";
import ShopPrevious from './ShopPrevious'

export default class ShopMenuWithContent extends Component {
  state = { activeItem: "Profile" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const getContent = () => {
      switch (activeItem) {
        case "Profile":
          return <ShopProfile />;
        case "Upcoming Booking":
          return <div>up</div>;
        case "Previous Booking":
          return <ShopPrevious />
        case "Account Settings":
          return <div>Account Setting</div>;
        case "Service Settings":
          return <div>Service Setting</div>;
        default:
          return <ShopProfile />;
      }
    };
    return (
      <Grid container style={{ height: "70vh" }}>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name="Profile"
              active={activeItem === "Profile"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Upcoming Booking"
              active={activeItem === "Upcoming Booking"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Previous Booking"
              active={activeItem === "Previous Booking"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Account Settings"
              active={activeItem === "Account Settings"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Service Settings"
              active={activeItem === "Service Settings"}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment style={{ overflow: "auto" }}>{getContent()}</Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
