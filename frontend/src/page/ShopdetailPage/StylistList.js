import React from 'react'
import { Segment, Grid, Image, Header } from 'semantic-ui-react'

const StylistList = () => (
    <Segment basic>
        <Grid>
            <Grid.Row>
                <Grid.Column width={4}><Image src="https://imgbp.hotp.jp/CSP/IMG_SRC_K/74/93/C012107493/C012107493_164-219.jpg" /></Grid.Column>
                <Grid.Column width={12}>
                    <Header content="(Stylist Name)"></Header>
                    <div>(Stylist Introduction)</div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>
)

export default StylistList