import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react'

export default class Articles extends Component {
    render() {
        return (
            <Grid container verticalAlign='top' style={{ minHeight: window.innerHeight * 0.8, padding: 20 }}>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Segment>
                            <Header content="Title"></Header>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        )
    }
}