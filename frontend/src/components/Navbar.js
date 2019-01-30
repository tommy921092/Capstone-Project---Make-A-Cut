import React, { Component } from "react";
import {
  Menu,
  Segment,
  Container,
  Responsive,
  Visibility,
  Icon,
  Image
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/userAuthAction";
import { SingleSelectionPicker } from "semantic-ui-calendar-react/dist/pickers/BasePicker";
import logo from '../sign.png'

class Navbar extends Component {
  state = { activeItem: "home" };

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { fixed } = this.state;

    const menuWithoutLogin = () => {
      return (
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/login"
            name="login"
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      );
    };

    const menuWithLogin = () => {
      if (this.props.auth.merchant === false) {
        return (
          <Menu.Menu position="right">
            <Menu.Item
              as={Link}
              to="/user/profile"
              name="user_profile"
              onClick={this.handleItemClick}
            >
              <Icon name="user" />
              {this.props.auth.user.username}
            </Menu.Item>
            <Menu.Item name="logout" onClick={this.props.logout} />
          </Menu.Menu>
        );
      } else {
        return (
          <Menu.Menu position="right">
            <Menu.Item
              as={Link}
              to="/shop/profile"
              name="shop_profile"
              onClick={this.handleItemClick}
            >
              <Icon name="bolt" />
              Merchant Account
            </Menu.Item>
            <Menu.Item name="logout" onClick={this.props.logout} />
          </Menu.Menu>
        );
      }
    };

    return (
      <Responsive>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment basic inverted style={{ margin: 0 }}>
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
            >
              <Container>
                {/* <Menu.Item header>
                  <Image src={logo} size="small" />
                </Menu.Item> */}
                <Menu.Item
                  as={Link}
                  to="/"
                  name="home"
                  active={activeItem === "home"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  as={Link}
                  to="/about"
                  name="about"
                  active={activeItem === "about"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="search"
                  active={activeItem === "search"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="articles"
                  active={activeItem === "articles"}
                  onClick={this.handleItemClick}
                />
                {this.props.auth.isAuthenticated
                  ? menuWithLogin()
                  : menuWithoutLogin()}
              </Container>
            </Menu>
          </Segment>
        </Visibility>
      </Responsive>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
