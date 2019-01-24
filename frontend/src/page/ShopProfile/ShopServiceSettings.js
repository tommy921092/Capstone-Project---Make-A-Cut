import React from "react";
import { Form, Button, Icon, Message } from "semantic-ui-react";

export default class ShopServiceSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDisable: true, success: false, numService: 1 };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState(state => ({
      isDisable: !state.isDisable
    }));
  };

  handleSubmit = () => {
    this.setState({ success: true });
  };

  render() {
    const ServiceChildren = [];
    for (var i = 0; i < this.state.numService; i += 1) {
      ServiceChildren.push(
        <div key={i}>
          <Form.Group widths="equal" disabled={this.state.isDisable}>
            <Form.Field>
              <label>Service Name</label>
              <input placeholder="First Name" />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <input placeholder="Price" type="number" />
            </Form.Field>
          </Form.Group>
          <Form.TextArea
            disabled={this.state.isDisable}
            label="Description"
            placeholder="Tell us more about your service..."
          />
        </div>
      );
    }
    return (
      <Form onSubmit={this.handleSubmit} success={this.state.success}>
        {ServiceChildren}
        <Button
          icon
          disabled={this.state.isDisable}
          onClick={e => {
            e.preventDefault();

            this.setState({ numService: this.state.numService + 1 });
          }}
        >
          <Icon name="add" />
        </Button>
        <Button
          icon
          disabled={this.state.isDisable}
          onClick={e => {
            e.preventDefault();
            if (this.state.numService >= 1) {
              this.setState({ numService: this.state.numService - 1 });
            } else return;
          }}
        >
          <Icon name="minus" />
        </Button>
        <Button color="black" type="button" onClick={this.handleClick}>
          Edit
        </Button>
        <Button color="black" type="submit">
          Save
        </Button>

        <Message
          success
          header="Form Completed"
          content="You've successfully updated your service"
        />
      </Form>
    );
  }
}
