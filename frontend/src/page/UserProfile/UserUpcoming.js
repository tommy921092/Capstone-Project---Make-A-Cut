import React from "react";
import BookingItem from "./BookingItem";
import axios from "axios";
import jwtDecode from "jwt-decode";

class UserUpcoming extends React.Component {
  constructor(props) {
    super(props);
    this.state = { records: [] };
  }
  componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    //get userid
    let id = jwtDecode(token).id;
    axios.get(`/api/userProfile/current/${id}`).then(result => {
      console.log(result.data); // should be array of records
      this.setState({ records: result.data });
    });
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
