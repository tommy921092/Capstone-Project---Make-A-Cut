import React, { Component } from 'react'
import { Grid, Segment, Message, Icon, Button } from 'semantic-ui-react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Step2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    processPayment() {
        this.setState({
            isLoading: true
        })
        setTimeout(() => { this.props.goStep3() }, 3000);
    }


    render() {
        return (
            <Grid.Row centered>
                <Grid.Column width={16} style={{ padding: 20 }}>
                    <Message icon>
                        <Icon name='circle notched' loading />
                        <Message.Content>
                            <Message.Header>Almost there...!</Message.Header>
                            We've created a order and upon your payment!
                        </Message.Content>
                    </Message>
                    <ReactCSSTransitionGroup
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={2000}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <Segment loading={this.state.isLoading} textAlign='left' color='purple'>
                            <b>Please confirm all the detail below:</b>
                            <div style={{ paddingTop: 20, paddingBottom: 20 }}>
                                Barber Shop name: {this.props.shopid}
                                <br />
                                Menu name: {this.props.menuid}
                                <br />
                                Price: (Query from datebase though menuid)
                    <br />
                                User Full Name: (get from jwt)
                    <br />
                                Selected Date: {this.props.date}
                                <br />
                                Selected Timeslot: {this.props.time}
                            </div>
                        </Segment>
                    </ReactCSSTransitionGroup>
                </Grid.Column>
                <Grid.Row centered>
                    <Button.Group style={{}} >
                        <Button onClick={this.props.backStep1.bind(this)} disabled={this.state.isLoading}>Edit</Button>
                        <Button.Or />
                        <Button positive
                            loading={this.state.isLoading}
                            disabled={this.state.isLoading}
                            onClick={this.processPayment.bind(this)}>Pay</Button>
                    </Button.Group>
                </Grid.Row>
            </Grid.Row>


        )
    }
}