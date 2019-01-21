import React, { Component } from 'react'
import { Comment,Icon} from 'semantic-ui-react'

export default class UserComment extends Component {
    render() {
        return (
            <Comment.Group>
            <Comment>
              <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
              <Comment.Content>
                <Comment.Author>(UserName)</Comment.Author>
                <Comment.Metadata>
                  <div>2 days ago</div>
                  <div>
                    <Icon name='star' />
                    1 Start
                  </div>
                </Comment.Metadata>
                <Comment.Text>
                  This barber shop is fucking on9.
                </Comment.Text>
              </Comment.Content>
            </Comment>
            <Comment>
              <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
              <Comment.Content>
                <Comment.Author>(UserName)</Comment.Author>
                <Comment.Metadata>
                  <div>2 days ago</div>
                  <div>
                    <Icon name='star' />
                    5 Start
                  </div>
                </Comment.Metadata>
                <Comment.Text>
                  Hey guys, I love this shop.
                </Comment.Text>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        )
    }
}