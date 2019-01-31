import React from "react";
import BookingItem from "./BookingItem";
import axios from "axios";
import jwtDecode from "jwt-decode";

class UserUpcoming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [
        //should be sorted according to date
        {
          id: 1,
          bookingid: "booking1", //from booking
          shopname: "shop1", // from booking->shopid->shop
          address: "a1", // booking->shopid->address
          tel: "123213212", // booking->shopid->address
          date: "20190201", // booking
          timeslot: "16:00", // booking
          service: "service1", // booking->menuid->menu
          payment: 50, // booking
          paymentid: "paymentid",
          status: "confirmed" // booking,should always be current because we are getting confirmed records in axios for this page
        },
        {
          id: 2,
          bookingid: "booking1",
          shopname: "shop1",
          address: "a1",
          tel: "213489893",
          date: "20190201",
          timeslot: "14:00",
          service: "service1",
          payment: 100,
          paymentid: "paymentid",
          status: "confirmed"
        }
      ]
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    //get userid
    let id = jwtDecode(token).id;
    // axios.get(`/api/userProfile/profile/current/:${id}`).then(result => {
    //   console.log(result.data[0]); // should be array of records
    //   this.setState({ records: result.data[0] });
    // });
  }

  render() {
    return this.state.records.map((record, index) => {
      return (
        <BookingItem
          index={index + 1}
          key={record.id}
          record={record}
          status={record.status}
        />
      );
    });
  }
}

export default UserUpcoming;

// import React from "react";
// import { Table, Button } from "semantic-ui-react";
// import UserEditBookingModal from "./UserEditBookingModal";

// class UserUpcoming extends React.Component {
//   handleEdit = () => {};
//   handleCancel = () => {};

//   render() {
//     return (
//       <Table striped color="black">
//         <Table.Header>
//           <Table.Row>
//             <Table.HeaderCell>Shop Name</Table.HeaderCell>
//             <Table.HeaderCell>Date</Table.HeaderCell>
//             <Table.HeaderCell>Time</Table.HeaderCell>
//             <Table.HeaderCell>Services</Table.HeaderCell>
//             <Table.HeaderCell>Price</Table.HeaderCell>
//             <Table.HeaderCell>Action</Table.HeaderCell>
//           </Table.Row>
//         </Table.Header>

//         <Table.Body>
//           <Table.Row>
//             <Table.Cell>John Lilki</Table.Cell>
//             <Table.Cell>September 14, 2013</Table.Cell>
//             <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
//             <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
//             <Table.Cell>No</Table.Cell>
//             <Table.Cell>
//               <UserEditBookingModal />
//               <Button basic color="black" onClick={this.handleCancel}>
//                 Cancel
//               </Button>
//             </Table.Cell>
//           </Table.Row>
//         </Table.Body>
//       </Table>
//     );
//   }
// }

// export default UserUpcoming;
