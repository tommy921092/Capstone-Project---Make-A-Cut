import React from "react";
import { Segment, Table, Icon, Rating } from "semantic-ui-react";

const BasicInfo = props => (
  <Segment basic>
    <Table singleLine striped style={{ border: 0 }}>
      <Table.Body>
        <Table.Row>
          <Table.Cell width="2">
            <Icon name="home" />
            Shop Address
          </Table.Cell>
          <Table.Cell width="12">{props.shopData.address_2}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width="2">
            <Icon name="phone" />
            Telephone
          </Table.Cell>
          <Table.Cell width="12">{props.shopData.tel}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width="2">
            <Icon name="internet explorer" />
            Website
          </Table.Cell>
          <Table.Cell width="12">{props.shopData.website || "N/A"}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width="2">
            <Icon name="clock" />
            Open Hour
          </Table.Cell>
          <Table.Cell width="12">{props.shopData.openhour || "N/A"}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width="2">
            <Icon name="clock" />
            Close Hour
          </Table.Cell>
          <Table.Cell width="12">
            {props.shopData.closehour || "N/A"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width="2">
            <Icon name="calendar times" />
            Regular holiday
          </Table.Cell>
          <Table.Cell width="12">{props.shopData.restday || "N/A"}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width="2">
            <Icon name="dollar sign" />
            Price Range
          </Table.Cell>
          <Table.Cell width="12">{props.shopData.pricerange}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width="2">
            <Icon name="smile" />
            Rating
          </Table.Cell>
          <Table.Cell width="12">
            <Rating
              icon="heart"
              maxRating={5}
              disabled
              rating={props.avgRate}
            />
            <b> {props.avgRate.toFixed(2)}</b>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Segment>
);

export default BasicInfo;
