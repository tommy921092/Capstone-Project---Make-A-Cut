import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import UserLoginForm from "./UserLoginForm";

const UserLoginModal = () => (
  <Modal trigger={<Button color="black" text>Login</Button>}>
    <Modal.Header>User Login</Modal.Header>
    <Modal.Content>
      <UserLoginForm />
    </Modal.Content>
  </Modal>
);

export default UserLoginModal;
