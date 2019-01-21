import React from "react";
import { Button, Image, Modal, Grid, Segment, Divider } from "semantic-ui-react";
import shop from "./img/shop.jpeg";
import user from "./img/user.jpeg";

const UserLoginModal = (props) => {
  return (
    <Modal
      trigger={
        <Button color={props.buttonColor}>
          Login/SignUp
        </Button>
      }
    >
      <Modal.Header>Login/SignUp</Modal.Header>
      <Modal.Content>
        <Segment placeholder>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              <Image src={user} />
            </Grid.Column>

            <Grid.Column verticalAlign="middle">
              <Image src={shop} />
            </Grid.Column>
          </Grid>

          <Divider vertical>Or</Divider>
        </Segment>
      </Modal.Content>
    </Modal>
  );

}


export default UserLoginModal;
