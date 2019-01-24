import React, { Component } from 'react';
import { Button, Divider, Dropdown, Grid, Input, Select } from 'semantic-ui-react';

import { locationOptions } from '../HomePage/HomePage';

class FilterButtons extends Component {

  handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      alert('enter press here! ')
    }
  }

  render() {

    return (

      <Grid columns='equal'>
        <Grid.Row>
          <Grid.Column verticalAlign='middle'>

            <Dropdown
              button basic clearable compact
              options={[
                { key: '1', value: 'low', text: '<$200' },
                { key: '2', value: 'medium', text: '$200 - $400' },
                { key: '3', value: 'high', text: '>$400' },
              ]}
              placeholder='Price'
              name='price'
              selection
            />
            <Dropdown
              button basic clearable compact
              options={[
                { key: '1', value: 'Pube Trim', text: 'Pube Trim' },
                { key: '2', value: 'Anal Wax', text: 'Anal Wax' },
                { key: '2', value: 'Pejazzling', text: 'Pejazzling' },
              ]}
              placeholder='Services'
              name='services'
              selection
            />
            <Dropdown
              button basic clearable compact
              options={[
                { key: '1', value: '5', text: '5 stars' },
                { key: '2', value: '4', text: '4 stars or more' },
                { key: '3', value: '3', text: '3 stars or more' },
              ]}
              placeholder='Rating'
              name='rating'
              selection
            />
            <Button basic color black>
              Something
            </Button>

          </Grid.Column>
          <Grid.Column textAlign='right' verticalAlign='middle'>

            <Input onKeyPress={this.handleKeyPress} onChange={(e) => console.log(e.target.value)} icon='search' placeholder='New search' />
            <Dropdown
              button basic clearable compact
              options={locationOptions} 
              placeholder='Search district' 
              name='district'
              selection
            />

          </Grid.Column>
        </Grid.Row>
      </Grid>

    )
  }

}

export default FilterButtons
