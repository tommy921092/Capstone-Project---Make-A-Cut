import UserSignUpForm from './UserSignUpForm';
import React from 'react';

class UserPage extends React.Component {
  handleSubmit = (values) => {
    // Do something with the form values
    console.log(values);
  }
  render() {
    return (
      <UserSignUpForm onSubmit={this.handleSubmit} />
    );
  }
}

export default UserPage;