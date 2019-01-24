import React, { Component } from 'react';
import { Container, Grid, Image, Item, Label, Segment } from 'semantic-ui-react'
import Footer from './Footer';
import Map from './MapResult';

import './SearchResults.css';

import { connect } from 'react-redux';
import { fetchShops } from '../../actions/index'

const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

class SearchResults extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     list: null
  //   }
  // }

  componentDidMount() {
    // calling our async action
    this.props.fetchShops()
    
    // .then(()=>{
    //   this.setState({
    //     list: this.props.list
    //   })
    // });
  }

  render() {
    return (
      <Container fluid>
        <Container fluid>
          <Segment placeholder style={{ opacity: 0.8, padding: '2rem' }}>

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
                        <Item.Extra>
                          <Label>{l.tag}</Label>
                        </Item.Extra>
                      </Item.Content>
                    </Item>

                  )} 
                </Item.Group>
              </Grid.Column>

              <Grid.Column width={10} verticalAlign='middle'>
                {/* {this.props.list &&  */}
                <Map list={this.props.list}/>
                {/* } */}
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
  mapStateToProps,{fetchShops})(SearchResults);