import React, { Component } from "react";
import { Comment, Rating } from "semantic-ui-react";
import faker from "faker";
import moment from 'moment';

export default class UserComment extends Component {
  render() {
    const commentList = this.props.commentData.map(comment => (
      <Comment>
        <Comment.Avatar as="a" src={faker.image.avatar()} />
        <Comment.Content>
          <Comment.Author>{comment.username}</Comment.Author>
          <Comment.Metadata>
            <div>{moment(comment.created_at).fromNow()}</div>
            <div>
              <Rating icon="start" maxRating={5} rating={comment.rating} disabled={true}/>
              {comment.rating} Star
            </div>
          </Comment.Metadata>
          <Comment.Text>{comment.content}</Comment.Text>
        </Comment.Content>
      </Comment>
    ));
    return (
      <Comment.Group>
        {this.props.commentData.length > 0 ? commentList : <p>No Comment</p>}
      </Comment.Group>
    );
  }
}
