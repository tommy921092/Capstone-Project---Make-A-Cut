import React, { Component } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

import UserProfile from "./UserProfile";
import UserUpcoming from "./UserUpcoming";
import UserPrevious from "./UserPrevious";

export default class UserMenuWithContent extends Component {
  state = { activeItem: "Profile" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const getContent = () => {
      switch (activeItem) {
        case "Profile":
          return <UserProfile />;
        case "Upcoming Booking":
          return <UserUpcoming/>;
        case "Previous Booking":
          return <UserPrevious/>
        default:
          return <UserProfile />;
      }
    };
    return (
      <Grid container style={{ minHeight: "70vh" }}>
        <Grid.Column width={2}>
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
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={14}>
          <Segment style={{ overflow: "auto" }}>{getContent()}</Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
