import React, { Component } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

import UserProfile from "./UserProfile";
import UserUpcoming from "./UserUpcoming";
import UserPrevious from "./UserPrevious";

export default class UserMenuWithContent extends Component {
  state = { activeItem: "Profile" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const isMobile = window.innerWidth <= 768;
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

    const desktopContainer = () =>{
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
      )
    }

    const mobileContainer = () =>{
      return (      <Grid container style={{ minHeight: "70vh" }}>
      <Grid.Row>
      <Grid.Column width={16}>
        <Menu fluid vertical style={{marginTop:20}}>
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
      </Grid.Row>
      <Grid.Row>
      <Grid.Column stretched width={16}>
        <Segment style={{ overflow: "auto" }}>{getContent()}</Segment>
      </Grid.Column>
      </Grid.Row>
    </Grid>)
    }

    return (
      <div>
      {isMobile ? mobileContainer() : desktopContainer()}
      </div>
    );
  }
}
