import React, { Component } from 'react';
import { Container, Grid, Header, Icon, Item, Label, Segment } from 'semantic-ui-react'
import Map from './MapResult';
import FilterButtons from './FilterButtons';
import queryString from 'query-string';
import axios from 'axios';

import './SearchResults.css';

import { connect } from 'react-redux';
import { fetchShops } from '../../actions/index'

// display list item logic
function ListItem(props) {
  const l = props.l;

  return <Item key={l.id}>
    <Item.Image size='small' rounded src={`/img/upload/${l.photo[0]}`} />
    <Item.Content>
      <Item.Header as='a'>{l.shopname}</Item.Header>
      <Item.Meta>
        <span>{l.address}</span>
      </Item.Meta>
      <Item.Description>{l.description}</Item.Description>
      <Item.Meta>Haircut - {l.pricerange}</Item.Meta>
      <Item.Extra>

        {l.tag !== null ? l.tag.map(t => 
          <Tag t={t} />
        ) : null }

        <Label>
          <Icon name='hand scissors outline' style={{ margin: 'auto' }} />
        </Label>
        <Label >
          <Icon name='hourglass half' style={{ margin: 'auto' }} />
        </Label>
      </Item.Extra>
    </Item.Content>
  </Item>
}
// Logic for tag display
function Tag(props) {
  const hasTag = props.t;
    return <Label>{hasTag}</Label>
}

//////////////////////////////////////// Class component ////////////////////////////////////////

class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchListing: []
    }
  }
  // fetch query search results
  fetchListings() {
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
      }).catch(() => {
        // console.log(error);
        this.setState({
          searchListing: []
        })
      })
  }

  componentDidMount() {
    // calling our async action
    this.fetchListings();
    console.log(this.state.searchListing);
    // this.props.fetchShops();
    // console.log(this.props.state)
  }

  componentDidUpdate(prevProps, _prevState) {
    console.log(this.state.searchListing.length);
    // this is likely a dirty fix, to prevent fetchListings from repeatedly firing off
    if (prevProps.location.search !== this.props.location.search) {
      this.fetchListings();
    }
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

                  {this.state.searchListing.length > 0 ? this.state.searchListing.map(l =>
                    <ListItem l={l} />
                  ) : <Header size="small">No results? I'll give you a bowl cut for free</Header>}

                </Item.Group>
              </Grid.Column>

              <Grid.Column width={10} verticalAlign='middle'>
                <Map list={this.state.searchListing} />
              </Grid.Column>

            </Grid>
          </Segment>
        </Container>
      </Container>
    )
  }
}


const mapStateToProps = state => {
  return {
    list: state.searchResult,
    // listing: state.searchListing 
  }
}

export default connect(
  mapStateToProps, {
    fetchShops,
    // fetchListings 
  }
)(SearchResults);