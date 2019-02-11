import React from "react";
import BookingItem from "./BookingItem";
import axios from "axios";
import jwtDecode from "jwt-decode";

class UserUpcoming extends React.Component {
  constructor(props) {
    super(props);
    this.state = { records: [], isCurrent: true };
  }
  componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    //get userid
    let id = jwtDecode(token).id;
    axios.get(`/api/userProfile/current/${id}`).then(result => {
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
          isCurrent={this.state.isCurrent}
        />
      );
    });
  }
}

export default UserUpcoming;
