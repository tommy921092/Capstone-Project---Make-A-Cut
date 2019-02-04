import React, { Component } from 'react'
import { Form, Radio,Button } from 'semantic-ui-react'
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class ServiceList extends Component {
  state = {}
  handleChange = (e, { label,menuid }) => this.setState({ menuid,servicename:label })

  handleOnClick = () => {
    this.props.history.push(`/booking/${this.state.menuid}`);
  }
  
  render() {
    const serviceList = this.props.menuData.map((service) => 
      <Form.Field style={{display:"flex",justifyContent:"space-between"}}>
      <Radio
        label={service.name}
        name='radioGroup'
        menuid={service.id}
        checked={this.state.servicename === service.name}
        onChange={this.handleChange}
      />
      <p style={{color:"#990036"}}>Price: HKD$ {service.price}</p>
    </Form.Field>
    )

    return (
      <Form>
        <Form.Field>
          <span style={{color:"red"}}>You've selected servivce</span>:   <b>{this.state.servicename}</b>
        </Form.Field>
        {this.props.menuData.length > 0 ? serviceList : <p>No Service</p>}
        {this.props.auth.isAuthenticated === true && this.props.auth.merchant !== true ?
                <Button 
                fluid 
                color='teal' 
                disabled={!this.state.servicename ? true : false}
                onClick={this.handleOnClick}>Start Reservation</Button>
                :
                <Button 
                fluid 
                color='red' 
                disabled>Login as a User in order to Book</Button>}

      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};


export default withRouter(connect(
  mapStateToProps, null)(ServiceList));