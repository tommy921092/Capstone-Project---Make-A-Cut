import React, { Component } from 'react';

import { Grid} from 'semantic-ui-react'

import RecommendColumn from './RecommendColumn'

const Recommend = () => (
  <Grid columns={3} divided relaxed>
    <Grid.Row centered>
      <RecommendColumn shopname={"Handsome shop"} tag={"No.1"}/>
      <RecommendColumn shopname={"fuck shop"} tag={"No.2"}/>
      <RecommendColumn shopname={"sexy shop"} tag={"No.3"}/>
    </Grid.Row>
  </Grid>
)

export default Recommend