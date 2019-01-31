import React from "react";
import ShopServiceForm from "./ShopServiceForm";
import { Header,Segment } from "semantic-ui-react";
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { fetchServiceList } from '../../actions/fetchServiceList';
import axios from 'axios'

class ShopServicePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true
    }
  }
  submit = values => {
    console.log(values);
    axios.put(`/api/shop/service/`, values).then(
      window.location.reload()
    ).catch((err)=>{
      alert(err)
    })
  };

  componentWillMount() {
    let merchantID = jwtDecode(localStorage.jwtToken).id

    this.props.fetchServiceList(merchantID).then(
      this.setState({isLoading:false})
    )
  }

  render() {
    return (
      <Segment basic>
        <Header as="h3" color="black" textAlign="center">
          SERVICES
        </Header>
        {/* <ShopServiceForm onSubmit={this.submit} /> */}
        {this.state.isLoading ? <div>Loading</div>: <ShopServiceForm onSubmit={this.submit} />}
        </Segment>
    );
  }
}

export default connect(null,{fetchServiceList})(ShopServicePage);