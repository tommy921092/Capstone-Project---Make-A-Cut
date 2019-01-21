import React, { Component } from 'react';
import { Grid} from 'semantic-ui-react'

import ArticleColumn from './ArticleColumn'

const Article = () => (
    <Grid>
        <Grid.Row>
            <Grid.Column width={8}>
                <ArticleColumn />
            </Grid.Column>
            <Grid.Column width={8}>
                <ArticleColumn />
            </Grid.Column>
        </Grid.Row>

        <Grid.Row>
            <Grid.Column width={8}>
                <ArticleColumn />
            </Grid.Column>
            <Grid.Column width={8}>
                <ArticleColumn />
            </Grid.Column>
        </Grid.Row>

        <Grid.Row>
            <Grid.Column width={8}>
                <ArticleColumn />
            </Grid.Column>
            <Grid.Column width={8}>
                <ArticleColumn />
            </Grid.Column>
        </Grid.Row>
    </Grid>
)

export default Article