import React from "react";
import {
  Button,
  Header,
  Dimmer,
  Image,
  Modal,
  Grid,
  Segment,
  Divider
} from "semantic-ui-react";
import shop from "./img/shop.jpeg";
import user from "./img/user.jpeg";

class LoginPage extends React.Component {
  state = { activeUser: false, activeShop: false };
  handleShowUser = () => this.setState({ activeUser: true });
  handleHideUser = () => this.setState({ activeUser: false });
  handleShowShop = () => this.setState({ activeShop: true });
  handleHideShop = () => this.setState({ activeShop: false });
  render() {
    const { activeUser, activeShop } = this.state;
    const contentUser = (
      <div>
        <Header as="h2" inverted>
          User
        </Header>
        <br />
        <Button color="blue" size="large" href="/user/login">
          Login
        </Button>
        <br />
        <br />
        <Button color="red" size="large" href="/user/signup">
          SignUp
        </Button>
      </div>
    );
    const contentShop = (
      <div>
        <Header as="h2" inverted>
          Merchant
        </Header>
        <br />
        <Button color="blue" size="large" href="/shop/login">
          Login
        </Button>
        <br />
        <br />
        <Button color="red" size="large" href="/shop/signup">
          SignUp
        </Button>
      </div>
    );
    return (
      <Segment placeholder>
        <Grid centered columns="equal">
          <Grid.Column verticalAlign="middle">
            <Dimmer.Dimmable
              as={Image}
              dimmer={{ active: activeUser, content: contentUser }}
              onMouseEnter={this.handleShowUser}
              onMouseLeave={this.handleHideUser}
              src={user}
            />
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            <Dimmer.Dimmable
              as={Image}
              dimmer={{ active: activeShop, content: contentShop }}
              onMouseEnter={this.handleShowShop}
              onMouseLeave={this.handleHideShop}
              src={shop}
            />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    );
  }
}

export default LoginPage;
