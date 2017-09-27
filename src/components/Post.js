import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { List, Item, Image, Segment, Button, Label } from 'semantic-ui-react'
import { upVote, downVote } from '../redux/modules/posts';

import CommentList from './CommentList';
import PostDetailView from './PostDetailView';

class Post extends Component {

  state = {
    loading: true,
    comments: null,
    error: null
  }

  onUpButtonPressed = () => {
    const { id, dispatch } = this.props;
    dispatch(upVote(id))
  }

  onDownButtonPressed = () => {
    const { id, dispatch } = this.props;
    dispatch(downVote(id))
  }

  render() {

    const { id, title, body, author } = this.props;
    const { loading, comments } = this.state;

    return (
      <Item>
        <Item.Content>
          <Item.Header as='a'>{title}</Item.Header>
          <Item.Meta>Author: {author}</Item.Meta>
          <Item.Description>
            {body}
          </Item.Description>
          <Item.Extra>
            <Button icon='arrow up' onClick={this.onUpButtonPressed} />
            <Button icon='arrow down' onClick={this.onDownButtonPressed} />
            <PostDetailView {...this.props} comments/>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default connect()(Post)
