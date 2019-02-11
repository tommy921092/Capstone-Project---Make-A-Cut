import React  from 'react';
import { Icon, Item, Label } from 'semantic-ui-react'

// Logic for tag display
export function Tag(props) {
  const hasTag = props.t;
  return <Label>{hasTag}</Label>
}

export default function ListItem(props) {

  const l = props.l;

  return (
    <Item onClick={ e => console.log(`I'm clicked!`) } >
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
  )
}