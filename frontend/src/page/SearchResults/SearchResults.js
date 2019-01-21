import React, { Component } from 'react';
import { Segment, Container, Grid } from 'semantic-ui-react'

import Footer from './Footer';

import ItemCard from './ItemCard';
import DisplayList from './DisplayList';
import Map from './MapResult';

import './SearchResults.css';


export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [

        { id: 1, item: <ItemCard shop="Handsome" street="123 Bukkake Road" comment="Straight razor"></ItemCard> },
        { id: 2, item: <ItemCard shop="Average" street="123 Man Fuk Road" comment="Great deal"></ItemCard> },
        { id: 3, item: <ItemCard shop="Ugly" street="123 Fuk Yu Road" comment="Quick cut"></ItemCard> },
        { id: 4, item: <ItemCard shop="Stunning" street="123 Yur mUm" comment="Quick shave"></ItemCard> },
        { id: 5, item: <ItemCard shop="Stunning" street="123 Yur mUm" comment="Quick shave"></ItemCard> }

      ]
    }
  }

  handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      alert('enter press here! ')
    }
  }

  render() {
    return (
      <Container fluid>
        <Container fluid>
          <Segment placeholder style={{ opacity: 0.8, padding: '2rem' }}>
            <Grid columns={2}>

              <Grid.Column width={6} style={{overflow: 'auto', maxHeight: '80vh' }}>
                <DisplayList list={this.state.list}></DisplayList>
              </Grid.Column>

              <Grid.Column width={10} verticalAlign='middle' >
                <Map ></Map>
              </Grid.Column>

            </Grid>
          </Segment>
        </Container>
        <Footer />
      </Container>
    )
  }
}