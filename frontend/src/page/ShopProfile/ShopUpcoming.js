import React from "react";
import { Table,Button } from "semantic-ui-react";
import axios from "axios";
import jwtDecode from "jwt-decode";

class ShopUpcoming extends React.Component {
  constructor(props) {
    super(props);
    this.state = { records: [] };
  }

  componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    //get merchantid
    let id = jwtDecode(token).id;
    axios.get(`/api/shopProfile/current/${id}`).then(result => {
      console.log(result.data); // should be array of records
      this.setState({ records: result.data });
    });
  }

  handleComplete(uid) {
    axios.get(`/api/booking/${uid}`)
    .then((result)=>{
      if (result.status === 200){
        alert(`Order: ${uid} Complete`)
        this.componentDidMount()
      }
    }).catch((e)=>{alert(e)})
  }

  render() {
    return (
      <Table striped color="black">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>TimeSlot</Table.HeaderCell>
            <Table.HeaderCell>Client Name</Table.HeaderCell>
            <Table.HeaderCell>Contact Number</Table.HeaderCell>
            <Table.HeaderCell>Service</Table.HeaderCell>
            <Table.HeaderCell>Payment</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {this.state.records.map(record => (
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {record.bookingdate.split("_", 2).slice(0)[0]}
              </Table.Cell>
              <Table.Cell>
                {record.bookingdate.split("_", 2).slice(1)[0]}
              </Table.Cell>
              <Table.Cell>{record.fullname}</Table.Cell>
              <Table.Cell>{record.tel}</Table.Cell>
              <Table.Cell>{record.name}</Table.Cell>
              <Table.Cell>{record.price}</Table.Cell>
              <Table.Cell><Button 
              color='teal' 
              disabled={record.status !== "confirmed"}
              onClick={()=>{this.handleComplete(record.uid)}}>Complete</Button></Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    );
  }
}

export default ShopUpcoming;
