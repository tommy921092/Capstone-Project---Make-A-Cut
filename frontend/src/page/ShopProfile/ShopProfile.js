import React from "react";
import {Item, Image} from "semantic-ui-react";

class ShopProfile extends React.Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (    <Item>
      <Item.Image size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png' />
      <Item.Content>
        <Item.Header as='a'>Shop's Profile</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>)

  }
}

export default ShopProfile
