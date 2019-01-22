import React, { Component } from 'react';

import { Grid, Image, Icon } from 'semantic-ui-react'

export default class RecommendColumn extends Component {
    render() {
        return (
            <Grid.Column
                verticalAlign="center"
                textAlign="center"
            >
                <Icon name='hand point right' size='large' fitted>{this.props.tag}</Icon><br></br>
                <Image inline src='https://via.placeholder.com/150' />
                <p>{this.props.shopname}</p>
            </Grid.Column>
        )
    }
}