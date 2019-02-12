import React, { Component } from 'react';
import { Button, Divider, Dropdown, Grid, Input, Menu, Select } from 'semantic-ui-react';

import { locationOptions } from '../HomePage/HomePage';

class FilterButtons extends Component {

  handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      alert('enter press here! ')
    }
  }

  render() {
    return (

      <Menu secondary stackable>

        <Menu.Item fitted="horizontally">
          <Dropdown button basic compact text='Price' name='prices'>
            <Dropdown.Menu>
              <Dropdown.Item icon='sort up' text='Most expensive' />
              <Dropdown.Item icon='sort down' text='Least expensive' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        <Menu.Item fitted="horizontally">
          <Dropdown button basic compact text='Rating' name='rating'>
            <Dropdown.Menu>
              <Dropdown.Item icon='sort up' text='Highest rated' />
              <Dropdown.Item icon='sort down' text='Lowest rated' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        <Menu.Item fitted="horizontally">
          <Dropdown
            basic clearable
            options={[
              { key: '1', value: 'Pube Trim', text: 'Pube Trim' },
              { key: '2', value: 'Anal Wax', text: 'Anal Wax' },
              { key: '3', value: 'Pejazzling', text: 'Pejazzling' },
            ]}
            placeholder='Services'
            name='services'
            multiple selection
          />
        </Menu.Item>

        <Menu.Item fitted="horizontally">
          <Input onKeyPress={this.handleKeyPress} onChange={(e) => console.log(e.target.value)} icon='search' placeholder='Filter by name' />
        </Menu.Item>

      </Menu>

    )
  }

}

export default FilterButtons
