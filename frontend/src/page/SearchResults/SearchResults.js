import React, { Component } from 'react';
import { Container, Grid, Header, Icon, Item, Label, Segment } from 'semantic-ui-react'
import axios from 'axios';

import Map from './MapResult';
import FilterButtons from './FilterButtons';
import ListItem, { Tag } from './SearchResultsCard';

import './SearchResults.css';

import { connect } from 'react-redux';
import { fetchShops } from '../../actions/index'

//////////////////////////////////////// Class component ////////////////////////////////////////

export default class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchListing: [],
      selectedItem: null,
    }
  }
  // fetch query search results
  fetchListings() {
    const name = this.props.location.search;
    console.log(this.props.location.search);
    // console.log(name.name)

    axios.get(`/api/search${name}`)
      .then((result) => {
        console.log(result.data);
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

  showInfo(e, selectedItem) {
    this.setState({ 'selectedItem': selectedItem });
    console.log(this.state.selectedItem);
    console.log('selected!')
  }

  componentDidMount() {
    // calling our async action
    this.fetchListings();
    console.log(this.state.searchListing);
    // this.props.fetchShops();
    // console.log(this.props.state)
  }

  componentDidUpdate(prevProps, _prevState) {
    console.log(typeof (this.state.searchListing));
    console.log(this.state.searchListing);
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
                    // <ListItem key={l.id} l={l} /> // commented out until I can figure out how to pass onClick to component

                    <Item key={l.id} onClick={ e => this.showInfo(e, l) }>
                      <Item.Image size='small' rounded src={`/img/upload/${l.photo[0]}`} />
                      <Item.Content>
                        <Item.Header as='a' href={`/shop/${l.id}`}>{l.shopname}</Item.Header>
                        <Item.Meta>
                          <span>{l.address}</span>
                        </Item.Meta>
                        <Item.Description>{l.description}</Item.Description>
                        <Item.Meta>Haircut - {l.pricerange}</Item.Meta>
                        <Item.Extra>

                          {l.tag !== null ? l.tag.map(t =>
                            <Tag key={l.tag.indexOf(t)} t={t} /> // dirty fix indexOf for tag key
                          ) : null}

                          <Label>
                            <Icon name='hand scissors outline' style={{ margin: 'auto' }} />
                          </Label>
                          <Label >
                            <Icon name='hourglass half' style={{ margin: 'auto' }} />
                          </Label>
                        </Item.Extra>
                      </Item.Content>
                    </Item>

                  ) : <Header size="small">No results? I'll give you a bowl cut for free</Header>}

                </Item.Group>
              </Grid.Column>

              <Grid.Column width={10} verticalAlign='middle'>
                <Map list={this.state.searchListing} selectedItem={this.state.selectedItem} />
              </Grid.Column>

            </Grid>
          </Segment>
        </Container>
      </Container>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     list: state.searchResult,
//     // listing: state.searchListing 
//   }
// }

// export default connect(
//   mapStateToProps, {
//     fetchShops,
//     // fetchListings 
//   }
// )(SearchResults);