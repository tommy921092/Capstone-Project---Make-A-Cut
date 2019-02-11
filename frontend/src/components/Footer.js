import React, { Component } from 'react';
import { Segment, Container, Header,List,Grid } from 'semantic-ui-react'

export default class Footer extends Component {
    render() {
        return (
            <Segment inverted vertical style={{ padding: '3em 0em' }}>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Header inverted as='h4' content='About' />
                            <p>Web application to help users find the right barbershop and booking management system for merchants - not responsible for the anti-vax movement - "The best thing since sliced bread" - Anon</p>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Header as='h4' inverted>
                                Disclaimer
      </Header>
                            <p>
                                All the barber shop prvoided is fake.
      </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
        )
    }
}