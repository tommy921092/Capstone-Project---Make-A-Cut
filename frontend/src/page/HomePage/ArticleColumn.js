import React, { Component } from 'react';

import { Grid, Image, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class ArticleColumn extends Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Image src={this.props.imgurl} />
                    </Grid.Column>
                    <Grid.Column 
                    width={10}>
                        <Link to={"/article/"+this.props.articleid}><p style={{ color: 'white' }} dangerouslySetInnerHTML={{__html: this.props.excerpt}}>
                        </p></Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}