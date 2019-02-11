import React, { Component } from 'react';

import { Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class ArticleColumn extends Component {
    render() {
        const isMobile = window.innerWidth <= 768;
        return (
            <div>
                {isMobile ?
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Image src={this.props.imgurl} />
                            </Grid.Column>
                            <Grid.Column
                                width={8}>
                                <Link to={"/article/" + this.props.articleid}><b style={{ color: 'pink',fontSize:"1.25rem" }} dangerouslySetInnerHTML={{ __html: this.props.title }}></b></Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    :
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={6}>
                                <Image src={this.props.imgurl} />
                            </Grid.Column>
                            <Grid.Column
                                width={10}>
                                <b style={{ color: 'pink' }} dangerouslySetInnerHTML={{ __html: this.props.title }}></b>
                                <Link to={"/article/" + this.props.articleid}><p style={{ color: 'white', fontSize: '0.75rem' }} dangerouslySetInnerHTML={{ __html: this.props.excerpt }}>
                                </p></Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>}
            </div>
        )
    }
}