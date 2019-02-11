import React, { Component } from 'react';
import { Grid,Divider} from 'semantic-ui-react'

import ArticleColumn from './ArticleColumn'
import axios from 'axios';


class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postslist: []
        }
    }

    componentDidMount() {
        axios.get('https://public-api.wordpress.com/rest/v1/sites/hairlesscut.wordpress.com/posts?pretty=true&number=6',{ headers: {
            'Authorization': null
          } })
            .then((result) => {
                const postslist = result.data.posts
                console.log(postslist)
                this.setState({
                    postslist
                })
            })
    }


    render() {
        const isMobile = window.innerWidth <= 768;

        const desktopContainer = () => {
            return (
                <Grid style={{paddingTop:60}}>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <ArticleColumn
                            title={this.state.postslist[0] ? this.state.postslist[0].title : null}
                            articleid={this.state.postslist[0] ? this.state.postslist[0].ID : null}
                            excerpt={this.state.postslist[0] ? this.state.postslist[0].excerpt : null}
                            imgurl={this.state.postslist[0] ? this.state.postslist[0].featured_image : null}
                        />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <ArticleColumn
                            title={this.state.postslist[1] ? this.state.postslist[1].title : null}
                            articleid={this.state.postslist[1] ? this.state.postslist[1].ID : null}
                            excerpt={this.state.postslist[1] ? this.state.postslist[1].excerpt : null}
                            imgurl={this.state.postslist[1] ? this.state.postslist[1].featured_image : null}
                        />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={8}>
                        <ArticleColumn
                            title={this.state.postslist[2] ? this.state.postslist[2].title : null}
                            articleid={this.state.postslist[2] ? this.state.postslist[2].ID : null}
                            excerpt={this.state.postslist[2] ? this.state.postslist[2].excerpt : null}
                            imgurl={this.state.postslist[2] ? this.state.postslist[2].featured_image : null}
                        />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <ArticleColumn
                            title={this.state.postslist[3] ? this.state.postslist[3].title : null}
                            articleid={this.state.postslist[3] ? this.state.postslist[3].ID : null}
                            excerpt={this.state.postslist[3] ? this.state.postslist[3].excerpt : null}
                            imgurl={this.state.postslist[3] ? this.state.postslist[3].featured_image : null}
                        />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={8}>
                        <ArticleColumn
                            title={this.state.postslist[4] ? this.state.postslist[4].title : null}
                            articleid={this.state.postslist[4] ? this.state.postslist[4].ID : null}
                            excerpt={this.state.postslist[4] ? this.state.postslist[4].excerpt : null}
                            imgurl={this.state.postslist[4] ? this.state.postslist[4].featured_image : null}
                        />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <ArticleColumn
                            title={this.state.postslist[5] ? this.state.postslist[5].title : null}
                            articleid={this.state.postslist[5] ? this.state.postslist[5].ID : null}
                            excerpt={this.state.postslist[5] ? this.state.postslist[5].excerpt : null}
                            imgurl={this.state.postslist[5] ? this.state.postslist[5].featured_image : null}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            )
        }

        const mobileContainer = () => {
            return (<Grid style={{paddingTop:60}}>
            <Grid.Row>
                <Grid.Column width={16}>
                    <ArticleColumn
                        title={this.state.postslist[0] ? this.state.postslist[0].title : null}
                        articleid={this.state.postslist[0] ? this.state.postslist[0].ID : null}
                        excerpt={this.state.postslist[0] ? this.state.postslist[0].excerpt : null}
                        imgurl={this.state.postslist[0] ? this.state.postslist[0].featured_image : null}
                    />
                    <Divider />
                </Grid.Column>
                <Grid.Row>
                <Grid.Column width={16}>
                    <ArticleColumn
                        title={this.state.postslist[1] ? this.state.postslist[1].title : null}
                        articleid={this.state.postslist[1] ? this.state.postslist[1].ID : null}
                        excerpt={this.state.postslist[1] ? this.state.postslist[1].excerpt : null}
                        imgurl={this.state.postslist[1] ? this.state.postslist[1].featured_image : null}
                    />
                    <Divider />
                </Grid.Column>
                </Grid.Row>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={16}>
                    <ArticleColumn
                        title={this.state.postslist[2] ? this.state.postslist[2].title : null}
                        articleid={this.state.postslist[2] ? this.state.postslist[2].ID : null}
                        excerpt={this.state.postslist[2] ? this.state.postslist[2].excerpt : null}
                        imgurl={this.state.postslist[2] ? this.state.postslist[2].featured_image : null}
                    />
                    <Divider />
                </Grid.Column>
                <Grid.Row>
                <Grid.Column width={16}>
                    <ArticleColumn
                        title={this.state.postslist[3] ? this.state.postslist[3].title : null}
                        articleid={this.state.postslist[3] ? this.state.postslist[3].ID : null}
                        excerpt={this.state.postslist[3] ? this.state.postslist[3].excerpt : null}
                        imgurl={this.state.postslist[3] ? this.state.postslist[3].featured_image : null}
                    />
                    <Divider />
                </Grid.Column>
                </Grid.Row>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={16}>
                    <ArticleColumn
                        title={this.state.postslist[4] ? this.state.postslist[4].title : null}
                        articleid={this.state.postslist[4] ? this.state.postslist[4].ID : null}
                        excerpt={this.state.postslist[4] ? this.state.postslist[4].excerpt : null}
                        imgurl={this.state.postslist[4] ? this.state.postslist[4].featured_image : null}
                    />
                    <Divider />
                </Grid.Column>
            <Grid.Row>
                <Grid.Column width={16}>
                    <ArticleColumn
                        title={this.state.postslist[5] ? this.state.postslist[5].title : null}
                        articleid={this.state.postslist[5] ? this.state.postslist[5].ID : null}
                        excerpt={this.state.postslist[5] ? this.state.postslist[5].excerpt : null}
                        imgurl={this.state.postslist[5] ? this.state.postslist[5].featured_image : null}
                    />
                </Grid.Column>
            </Grid.Row>
            </Grid.Row>
        </Grid>);
        }

        return (
            <div>
            {isMobile ? mobileContainer() : desktopContainer()}
            </div>
        )
    }

}

export default Article