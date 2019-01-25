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

      <Menu secondary>

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
            button basic clearable compact
            options={[
              { key: '1', value: 'Pube Trim', text: 'Pube Trim' },
              { key: '2', value: 'Anal Wax', text: 'Anal Wax' },
              { key: '3', value: 'Pejazzling', text: 'Pejazzling' },
            ]}
            placeholder='Services'
            name='services'
            selection
          />
        </Menu.Item>

        <Menu.Item fitted="horizontally">
          <Input onKeyPress={this.handleKeyPress} onChange={(e) => console.log(e.target.value)} icon='search' placeholder='Filter by name' />
        </Menu.Item>
        {/* New search functions */}
        <Menu.Menu position='right'>
          <Menu.Item fitted="horizontally">
            <Input onKeyPress={this.handleKeyPress} onChange={(e) => console.log(e.target.value)} icon='search' placeholder='New search' />
          </Menu.Item>

          <p style={{ display: 'flex', alignItems: 'center', margin: '0' }}>Or</p>

          <Menu.Item fitted="horizontally">
            <Dropdown
              button basic clearable compact
              options={locationOptions}
              placeholder='Search district'
              name='district'
              selection
            />
          </Menu.Item>

        </Menu.Menu>
      </Menu>

    )
  }

}

export default FilterButtons
