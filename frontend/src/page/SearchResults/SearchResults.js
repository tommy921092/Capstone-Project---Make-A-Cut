import React, { Component } from 'react';
import { Segment, Container, Grid, Image, Item, Label } from 'semantic-ui-react'
import axios from 'axios';

import Footer from './Footer';

// import ItemCard from './ItemCard';
// import DisplayList from './DisplayList';
import Map from './MapResult';

import './SearchResults.css';

const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    axios.get(`https://5c4548513858aa001418c3e2.mockapi.io/api/shops/`)
      .then(res => {
        console.log(res.data);
        const list = res.data;
        this.setState(
          { list }
        )
      })
      .catch(error => {
        console.log("ERROR! " + error)
      })
  }

  render() {
    return (
      <Container fluid>
        <Container fluid>
          <Segment placeholder style={{ opacity: 0.8, padding: '2rem' }}>
            <Grid columns={2}>

              <Grid.Column width={6} style={{ overflow: 'auto', maxHeight: '80vh' }}>
                <Item.Group link divided>

                  {this.state.list.map(l =>
                    <Item key={l.id}>
                      <Item.Image size='small' rounded src={l.avatar} />
                      <Item.Content>
                        <Item.Header as='a'>{l.name}</Item.Header>
                        <Item.Meta>
                          <span>{l.street}</span>
                        </Item.Meta>
                        <Item.Description>{paragraph}</Item.Description>
                        <Item.Extra>
                          <Label>{l.tag}</Label>
                        </Item.Extra>
                      </Item.Content>
                    </Item>

                  )}
                </Item.Group>
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