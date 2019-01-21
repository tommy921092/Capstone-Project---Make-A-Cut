import React from 'react'
import { Image, Item, Label } from 'semantic-ui-react'

const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />


const ItemCard = (props) => (

  <Item>
    <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' />

    <Item.Content>
      <Item.Header as='a'>{props.shop}</Item.Header>
      <Item.Meta>
        <span className='cinema'>{props.street}</span>
      </Item.Meta>
      <Item.Description>{paragraph}</Item.Description>
      <Item.Extra>
        <Label>{props.comment}</Label>
      </Item.Extra>
    </Item.Content>
  </Item>

)

export default ItemCard