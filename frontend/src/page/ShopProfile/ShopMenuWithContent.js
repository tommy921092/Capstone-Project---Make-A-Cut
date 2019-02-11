import React, { Component } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

import ShopUpcoming from "./ShopUpcoming";
import ShopPrevious from "./ShopPrevious";
import ShopSettings from "./ShopSettings";
import ShopServicePage from "./ShopServicePage";

export default class ShopMenuWithContent extends Component {
  state = { activeItem: "Profile" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const isMobile = window.innerWidth <= 768;


    const getContent = () => {
      switch (activeItem) {
        case "Upcoming Booking":
          return <ShopUpcoming />;
        case "Previous Booking":
          return <ShopPrevious />;
        case "Account Settings":
          return <ShopSettings />;
        case "Service Settings":
          return <ShopServicePage />;
        default:
          return <ShopSettings />;
      }
    };

    const desktopContainer = () =>{
      return(
        <Grid container style={{ minHeight: "70vh" }}>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name="Account Settings"
              active={activeItem === "Account Settings"}
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
      )
    }

    const mobileContainer = () =>{
      return(
        <Grid container style={{ minHeight: "70vh" }}>
        <Grid.Row>
        <Grid.Column width={16}>
          <Menu fluid vertical style={{marginTop:20}}>
            <Menu.Item
              name="Account Settings"
              active={activeItem === "Account Settings"}
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
              name="Service Settings"
              active={activeItem === "Service Settings"}
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
      </Grid>
      )
    }

    return (
      <div>
      {isMobile ? mobileContainer() : desktopContainer()}
      </div>
    );
  }
}
