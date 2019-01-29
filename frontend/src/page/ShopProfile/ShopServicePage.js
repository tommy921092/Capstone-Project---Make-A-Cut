import React from "react";
import ShopServiceForm from "./ShopServiceForm";
import { Header } from "semantic-ui-react";

class ShopServicePage extends React.Component {
  submit = values => {
    // print the form values to the console
    console.log(values);
  };
  render() {
    return (
      <div
        className="ui stacked segment"
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <Header as="h3" color="black" textAlign="center">
          SERVICES
        </Header>
        <ShopServiceForm onSubmit={this.submit} />
      </div>
    );
  }
}

export default ShopServicePage;

// export default class ShopServiceSettings extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isDisable: true,
//       success: false,
//       numService: 1
//     };

//     // This binding is necessary to make `this` work in the callback
//     this.handleClick = this.handleClick.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleClick = () => {
//     this.setState(state => ({
//       isDisable: !state.isDisable
//     }));
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.setState({ success: true });
//   };

//   handleChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   render() {
//     const ServiceChildren = [];
//     for (var i = 0; i < this.state.numService; i += 1) {
//       ServiceChildren.push(
//         <div key={i}>
//           <Form.Group widths="equal" disabled={this.state.isDisable}>
//             <Form.Field>
//               <label>Service Name</label>
//               <input
//                 placeholder="Service Name"
//                 onChange={this.handleChange}
//               />
//             </Form.Field>
//             <Form.Field>
//               <label>Price</label>
//               <input
//                 placeholder="Price"
//                 type="number"
//                 onChange={this.handleChange}
//               />
//             </Form.Field>
//           </Form.Group>
//           <Form.TextArea
//             disabled={this.state.isDisable}
//             label="Description"
//             placeholder="Tell us more about your service..."
//             onChange={this.handleChange}
//           />
//         </div>
//       );
//     }
//     return (
//       <Form onSubmit={submittedValues => this.setState({ submittedValues })} success={this.state.success}>
//         {ServiceChildren}
//         <Button
//           icon
//           disabled={this.state.isDisable}
//           onClick={e => {
//             e.preventDefault();

//             this.setState({ numService: this.state.numService + 1 });
//           }}
//         >
//           <Icon name="add" />
//         </Button>
//         <Button
//           icon
//           disabled={this.state.isDisable}
//           onClick={e => {
//             e.preventDefault();
//             if (this.state.numService >= 1) {
//               this.setState({ numService: this.state.numService - 1 });
//             } else return;
//           }}
//         >
//           <Icon name="minus" />
//         </Button>
//         <Button color="black" type="button" onClick={this.handleClick}>
//           Edit
//         </Button>
//         <Button color="black" type="submit">
//           Save
//         </Button>

//         <Message
//           success
//           header="Form Completed"
//           content="You've successfully updated your service"
//         />
//       </Form>
//     );
//   }
// }
