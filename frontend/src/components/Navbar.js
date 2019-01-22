import React, { Component } from "react";
import {
  Menu,
  Segment,
  Container,
  Responsive,
  Visibility
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../actions/userAuthAction';

class Navbar extends Component {

  state = { activeItem: "home" };

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { fixed } = this.state;

    const menuWithoutLogin = <Menu.Item
      as={Link}
      to="/login"
      name="login"
      onClick={this.handleItemClick}
    />

    const menuWithLogin = <Menu.Item
      name="logout"
      onClick={this.props.logout}
    />

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
                <Menu.Menu position="right">
                {this.props.auth.isAuthenticated ? menuWithLogin : menuWithoutLogin}
                </Menu.Menu>
              </Container>
            </Menu>
          </Segment>
        </Visibility>
      </Responsive>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(
  mapStateToProps, { logout })(Navbar);

