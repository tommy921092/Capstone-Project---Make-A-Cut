import React from 'react';
import { Divider, Item } from 'semantic-ui-react';

const DisplayList = (props) => {
  const listItems = props.list.map( l=>
    <Item.Group link key={l.id}> {l.item} <Divider section /></Item.Group>)

  return (
    <div>
      <h1> Search result </h1>
      {/* <ul className="list-group"> */}
        {listItems}
      {/* </ul> */}
    </div>
  )
}

export default DisplayList;