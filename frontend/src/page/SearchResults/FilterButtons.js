import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';

const FilterButtons = () => (
  <div>
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
  </div>
)

export default FilterButtons
