import React from "react";
import { Item, Image, Label } from "semantic-ui-react";

class ShopProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Item>
        <Item.Image
          rounded
          size="medium"
          src="https://react.semantic-ui.com/images/wireframe/image.png"
        />
        <Item.Content>
          <Item.Header as="a">Shop's Profile</Item.Header>
          <Item.Meta>Description</Item.Meta>
          <Item.Description>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Item.Description>
          <Item.Extra>
            <Label>tag1</Label>
            <Label>tag2</Label>
            <Label>tag3</Label>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default ShopProfile;

/*
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
*/
