import React, { Component } from 'react'
import { Grid, Segment, Message, Icon, Button } from 'semantic-ui-react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import jwtDecode from "jwt-decode";
import axios from 'axios';

import StripeCheckout from "react-stripe-checkout";

export default class Step2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            shopname: '',
            menuname: '',
            menuprice: '',
            username: '',
            useremail: ''
        }
    }

    handleToken(token) {
        let stripeToken = token.id
        let amount = this.state.menuprice * 100
        let menuid = this.props.menuid
        let data = {
            stripeToken,
            amount,
            menuid,
            shopid: this.state.shopid,
            date: this.props.date,
            time: this.props.time
        }

        this.setState({
            isLoading: true
        })

        axios.post('/api/billing', data)
        .then((result)=>{
            let uid = result.data
            this.props.goStep3(uid)
        })
    }

    componentDidMount() {
        axios.get(`/api/menu/${this.props.menuid}`)
            .then((result) => {
                if (result.data !== "No data") {
                    let decodedToken = {}
                    if(localStorage.jwtToken){
                        decodedToken = jwtDecode(localStorage.jwtToken);
                    }
                    this.setState({
                        isLoading: false,
                        shopname: result.data.shopname,
                        menuname: result.data.name,
                        menuprice: result.data.price,
                        username: decodedToken.fullname,
                        useremail: decodedToken.email,
                        shopid: result.data._shopid
                    })
                }
            })
    }

    // processPayment() {
    //     this.setState({
    //         isLoading: true
    //     })
    //     setTimeout(() => { this.props.goStep3() }, 3000);
    // }


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
                                Barber Shop name: {this.state.shopname}
                                <br />
                                Menu name: {this.state.menuname}
                                <br />
                                Price: HKD$ {this.state.menuprice}
                                <br />
                                User Full Name: {this.state.username}
                                <br />
                                <p>User email: {this.state.useremail}</p>
                                <br />
                                <b>Selected Date:</b> {this.props.date}
                                <br />
                                <b>Selected Timeslot:</b> {this.props.time}
                            </div>
                        </Segment>
                    </ReactCSSTransitionGroup>
                </Grid.Column>
                <Grid.Row centered>
                    <Button.Group style={{}} >
                        <Button onClick={this.props.backStep1.bind(this)} disabled={this.state.isLoading}>Edit</Button>
                        <Button.Or />
                        <StripeCheckout
                            name="Confirm your Booking"
                            description={`${this.state.menuname} FOR ${this.state.shopname}`}
                            amount={this.state.menuprice * 100}
                            currency="HKD"
                            locale="zh"
                            email={`${this.state.useremail}`}
                            token={token => this.handleToken(token)}
                            stripeKey={process.env.REACT_APP_STRIPE_KEY}
                            disabled={this.state.isLoading}
                        >
                        <Button positive
                                loading={this.state.isLoading}
                                disabled={this.state.isLoading}>Pay</Button>
                        </StripeCheckout>

                    </Button.Group>

                </Grid.Row>
            </Grid.Row>


        )
    }
}