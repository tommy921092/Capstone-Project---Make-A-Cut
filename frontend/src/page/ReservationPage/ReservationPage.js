import React, { Component } from 'react'
import { Icon, Step, Container, Grid, Header} from 'semantic-ui-react'
import queryString from 'query-string'


import Step1 from './Step1'
import Step2 from './Step2'


class ReservationPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Step: 1,
      SelectedDate: '',
      SelectedTime: ''
    }
  }

  goStep2(date, time) {
    console.log('Step2 clicked')
    window.scrollTo(0, 0)
    this.setState({
      Step: 2,
      SelectedDate: date,
      SelectedTime: time
    })
  }

  backStep1() {
    window.scrollTo(0, 0)
    this.setState({
      Step: 1,
      SelectedDate: '',
      SelectedTime: ''
    })
  }

  goStep3() {
    window.scrollTo(0, 0)
    this.setState({
      Step: 3,
      SelectedDate: '',
      SelectedTime: ''
    })
  }


  render() {
    // console.log(queryString.parse(this.props.location.search).shopid)
    const currentStep = this.state.Step;
    let element;
    if (currentStep === 1) {
      element = <Step1
        shopid={queryString.parse(this.props.location.search).shopid}
        menuid={queryString.parse(this.props.location.search).menuid}
        goStep2={this.goStep2.bind(this)} />
    } else if (currentStep === 2) {
      element = 
      <Step2
        shopid={queryString.parse(this.props.location.search).shopid}
        menuid={queryString.parse(this.props.location.search).menuid}
        date={this.state.SelectedDate}
        time={this.state.SelectedTime}
        backStep1={this.backStep1.bind(this)}
        goStep3={this.goStep3.bind(this)} />
    } else if (currentStep === 3) {
      element = <Header>Payment Finish!!</Header>
    } else {
      element = <Header>Error</Header>
    }

    return (<Container style={{ minHeight: 800, padding: 20 }}>
      <Grid>
        <Grid.Column width={16} stretched>
          <Step.Group>
            <Step active={this.state.Step === 1}>
              <Icon name='calendar check' />
              <Step.Content>
                <Step.Title>Confirming</Step.Title>
                <Step.Description>Choose your reservation date</Step.Description>
              </Step.Content>
            </Step>

            <Step active={this.state.Step === 2}>
              <Icon name='payment' />
              <Step.Content>
                <Step.Title>Billing</Step.Title>
                <Step.Description>Progress your payment online</Step.Description>
              </Step.Content>
            </Step>

            <Step active={this.state.Step === 3}>
              <Icon name='info' />
              <Step.Content>
                <Step.Title>Confirm Order</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </Grid.Column>
      </Grid>
      <Grid>
      {element}
      </Grid>
    </Container>
    )
  }
}

export default ReservationPage
