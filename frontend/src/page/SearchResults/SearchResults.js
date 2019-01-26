import React, { Component } from 'react';
import { Container, Divider, Form, Grid, Icon, Image, Input, Item, Label, Segment, Select } from 'semantic-ui-react'
import Footer from './Footer';
import Map from './MapResult';
import FilterButtons from './FilterButtons'

import './SearchResults.css';

import { connect } from 'react-redux';
import { fetchShops } from '../../actions/index'

const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

class SearchResults extends Component {

  componentDidMount() {
    // calling our async action
    this.props.fetchShops()
  }

  render() {
    return (
      <Container fluid>
        <Container fluid>
          <Container style={{ paddingTop: '0' }}>
            <FilterButtons fluid />
          </Container>

          <Segment fluid style={{ opacity: 0.8, margin: 0, padding: '2rem' }}>

            <Grid columns={2}>

              <Grid.Column width={6} style={{ overflow: 'auto', maxHeight: '80vh' }}>
                <Item.Group link divided>

                  {this.props.list.map(l =>
                    <Item key={l.id}>
                      <Item.Image size='small' rounded src={l.avatar} />
                      <Item.Content>
                        <Item.Header as='a'>{l.name}</Item.Header>
                        <Item.Meta>
                          <span>{l.street}</span>
                        </Item.Meta>
                        <Item.Description>{paragraph}</Item.Description>
                        <Item.Meta>Cut and Shave ${l.price}</Item.Meta>
                        <Item.Extra>
                          <Label>{l.tag}</Label>
                          <Label>
                            <Icon name='hand scissors outline' style={{ margin: 'auto' }} />
                          </Label>
                          <Label >
                            <Icon name='hourglass half' style={{ margin: 'auto' }} />
                          </Label>
                        </Item.Extra>
                      </Item.Content>
                    </Item>

                  )}
                </Item.Group>
              </Grid.Column>

              <Grid.Column width={10} verticalAlign='middle'>
                <Map list={this.props.list} />
              </Grid.Column>

            </Grid>
          </Segment>
        </Container>
        <Footer />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return { list: state.searchResult }
}

export default connect(
  mapStateToProps, { fetchShops })(SearchResults);