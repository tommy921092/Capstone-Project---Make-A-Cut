import React, { Component } from 'react';
import { Container, Divider, Form, Grid, Icon, Image, Input, Item, Label, Segment, Select } from 'semantic-ui-react'
import Footer from './Footer';
import Map from './MapResult';
import FilterButtons from './FilterButtons';
import queryString from 'query-string';
import axios from 'axios';

import './SearchResults.css';

import { connect } from 'react-redux';
import { fetchShops } from '../../actions/index'

const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchListing: []
    }
  }

    componentDidMount() {
      console.log(this.props.location.search);
      const name = queryString.parse(this.props.location.search)
      console.log(name.name)

      axios.get(`/api/search?name=${name.name}`) 
        .then((result) => {
          // console.log(result);
          const searchListing = result.data;
          this.setState({
            searchListing
          });
          console.log(this.state.searchListing);
        }).catch((error) => {
          console.log(error);
        })

      // calling our async action
      this.props.fetchShops()
    }

    render() {
      return (
        <Container fluid>
          <Container fluid>
            <Container style={{ paddingTop: '0' }}>
              <FilterButtons fluid list={this.props.list} />
            </Container>

            <Segment fluid style={{ opacity: 0.8, margin: 0, padding: '2rem' }}>

              <Grid columns={2}>

                <Grid.Column width={6} style={{ overflow: 'auto', maxHeight: '80vh' }}>
                  <Item.Group link divided>

                    {this.state.searchListing.map(l =>
                      <Item key={l.id}>
                        <Item.Image size='small' rounded src={`/img/upload/${l.photo[0]}`} />
                        <Item.Content>
                          <Item.Header as='a'>{l.shopname}</Item.Header>
                          <Item.Meta>
                            <span>{l.address}</span>
                          </Item.Meta>
                          <Item.Description>{l.description}</Item.Description>
                          <Item.Meta>Haircut - ${l.pricerange}</Item.Meta>
                          <Item.Extra>
                            <Tag hasTags={l}/>
                            {/* <Label>{l.tag}</Label> */}
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
        </Container>
      )
    }
  }

// Logic for tag display
function Tag(props) {
  const hasTag = props.tag;
  if (hasTag){
    return <Label>{props.tag}</Label>
  }
  return (null);
}

const mapStateToProps = state => {
  return { list: state.searchResult }
}

export default connect(
  mapStateToProps, { fetchShops }
  )(SearchResults);