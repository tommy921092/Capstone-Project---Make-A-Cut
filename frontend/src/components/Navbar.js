import React, { Component } from "react";
import {
  Dropdown,
  Input,
  Menu,
  Segment,
  Container,
  Responsive,
  Visibility,
  Icon
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../actions/userAuthAction';
import queryString from 'query-string';
import axios from 'axios';

import { locationOptions } from '../page/HomePage/HomePage';
import './Navbar.css';

class Navbar extends Component {

  state = {
    activeItem: "home",
    searchNameField: "",
    isOpen: false
  };

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (this.state.searchNameField === "") {
        alert('Please enter a barber shop name')
      } else {
        this.props.history.push(`/test2/search?name=${this.state.searchNameField}`)
      }
    }
  }

  handleOnChange = (event) => {
    this.setState({
      searchNameField: event.target.value
    })
  }

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
        return <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/user/profile"
            name='user_profile'
            onClick={this.handleItemClick}
          >
            <Icon name='user' />{this.props.auth.user.fullname}
          </Menu.Item>
          <Menu.Item
            name="logout"
            onClick={this.props.logout}
          />
        </Menu.Menu>
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

                <Dropdown item name='search' text='Search' className='link'
                  onClick={this.handleItemClick}
                  simple scrolling
                >
                  <Dropdown.Menu>
                    <Input onKeyPress={this.handleKeyPress} onChange={this.handleOnChange} icon='search' placeholder='Search By Name' />
                    <Dropdown.Header content='Or' style={{ textAlign: 'center' }} />
                    <Dropdown
                      item clearable
                      options={locationOptions}
                      placeholder='Search district'
                      name='district'
                      selection scrolling
                    />
                  </Dropdown.Menu>
                </Dropdown>


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

export default withRouter(connect(
  mapStateToProps, { logout })(Navbar));

