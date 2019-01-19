import React, { Component } from 'react'
import { Form, Radio,Button } from 'semantic-ui-react'

export default class ServiceList extends Component {
  state = {}
  handleChange = (e, { label,menuid }) => this.setState({ menuid,servicename:label })

  render() {
    return (
      <Form>
        <Form.Field>
          <span style={{color:"red"}}>You've selected servivce</span>:   <b>{this.state.servicename}</b>
        </Form.Field>
        <Form.Field style={{display:"flex",justifyContent:"space-between"}}>
          <Radio
            label='HairCut'
            name='radioGroup'
            menuid='1'
            checked={this.state.servicename === 'HairCut'}
            onChange={this.handleChange}
          />
          <p style={{color:"#990036"}}>Price: ($100)</p>
        </Form.Field>
        <Form.Field style={{display:"flex",justifyContent:"space-between"}}>
          <Radio
            label='Cut + Wash'
            name='radioGroup'
            menuid='2'
            checked={this.state.servicename === 'Cut + Wash'}
            onChange={this.handleChange}
          />
          <p style={{color:"#990036"}}>Price: ($150)</p>
        </Form.Field>
        <Button fluid color='teal' disabled={!this.state.servicename ? true : false}>Start Reservation</Button>
      </Form>
    )
  }
}
