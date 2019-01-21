import React, { Component } from 'react';

import { Grid, Image} from 'semantic-ui-react'

export default class ArticleColumn extends Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Image src='https://via.placeholder.com/200x100' />
                    </Grid.Column>
                    <Grid.Column 
                    width={10}>
                        <p style={{ color: 'white' }}>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                            A\illa vel, aliquet nec, vulputate eget, arcu.
    </p><a href="#">Read more...</a>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}