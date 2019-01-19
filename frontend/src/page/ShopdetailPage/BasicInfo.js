import React from 'react'
import { Segment, Table, Icon,Rating } from 'semantic-ui-react'

const BasicInfo = () => (
  <Segment basic>
    <Table singleLine striped style={{ border: 0 }}>
      <Table.Body>
        <Table.Row>
          <Table.Cell width="2"><Icon name='home' />Shop Address</Table.Cell>
          <Table.Cell width="12">(address)</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width="2"><Icon name='phone' />Telephone</Table.Cell>
          <Table.Cell width="12">(telephone)</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width="2"><Icon name='internet explorer' />Website</Table.Cell>
          <Table.Cell width="12">(link)</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width="2"><Icon name='clock' />Open Hour</Table.Cell>
          <Table.Cell width="12">(time)</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width="2"><Icon name='calendar times' />Regular holiday</Table.Cell>
          <Table.Cell width="12">(weekday)</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width="2"><Icon name='dollar sign' />Price Range</Table.Cell>
          <Table.Cell width="12">$200 - 500</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width="2"><Icon name='smile' />Rating</Table.Cell>
          <Table.Cell width="12"><Rating icon='heart' defaultRating={3} maxRating={5} disabled /></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Segment>
)

export default BasicInfo