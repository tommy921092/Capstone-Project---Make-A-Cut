import React, { Component } from 'react'
import { Grid, Segment, Container,Header,Divider } from 'semantic-ui-react'
import QRCode from 'qrcode.react';

export default class Step3 extends Component {
    render() {
        return (
            <Grid basic>
                <Grid.Row centered>
                    <Grid.Column width={10}>
                        <Container>
                            <Segment piled centered textAlign="center">
                            <Header as="h1">Thank you!</Header>
                            <p style={{color:"grey"}}>Your order has completed...</p>
                            <Divider/>
                            <p>Your Booking ID: <b>{this.props.uid}</b></p>

                            <QRCode value={this.props.uid} />
                            <p style={{color:"darkred"}}>Please save as the QR code above, you can find it in your <a href="/user/profile">Upcoming booking.</a></p>
                            </Segment>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )

    }
}