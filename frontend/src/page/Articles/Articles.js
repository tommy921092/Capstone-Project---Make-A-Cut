import React, { Component } from 'react';
import { Grid, Segment, Placeholder } from 'semantic-ui-react'

import axios from 'axios';
import moment from 'moment';

export default class Articles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            title: null,
            date: null,
            context: null
        }
    }

    componentDidMount() {
        axios.get(`https://public-api.wordpress.com/rest/v1/sites/hairlesscut.wordpress.com/posts/${this.props.match.params.articleid}`,{ headers: {
            'Authorization': null
          } })
            .then((result) => {
                const messages = result.data
                this.setState({
                    isLoading: false,
                    title: messages.title,
                    date: messages.date,
                    context: messages.content
                })
            }).catch((err) => {
                this.setState({
                    isLoading: false,
                    title: "No this arcitle",
                    date: null,
                    context: null
                })
            })
    }

    render() {
        const Loading = () => {
            return (
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
            )
        };

        const Loaded = () => {
            return (
                <div>
                <h1 dangerouslySetInnerHTML={{ __html: this.state.title }}/>
                <p style={{fontSize:"0.75rem",color:"grey"}}>{moment(this.state.date).fromNow()}</p>
                <p dangerouslySetInnerHTML={{ __html: this.state.context }}></p>
                </div>
            )
        }

        return (
            <Grid container verticalAlign='top' style={{ minHeight: window.innerHeight * 0.8, padding: 20 }}>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Segment>
                            {this.state.isLoading ? Loading() : Loaded()}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        )
    }
}