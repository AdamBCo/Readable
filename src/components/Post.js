import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { List, Item, Image, Segment, Button, Label } from 'semantic-ui-react'
import uuid  from 'uuid';

import * as CommentsAPI from '../api/CommentsAPI';

import CommentList from './CommentList';

class Post extends Component {

  state = {
    loading: true,
    comments: null,
    error: null
  }

  componentWillMount() {

    const { id } = this.props;

    CommentsAPI.fetchComments(id).then((response) => {

      this.setState({
        loading: false,
        comments: response,
        error: null
      })

    }, (error) => {

      this.setState({
        loading: false,
        comments: null,
        error: error
      })

    })

  }

  onCommentButtonPressed = (e) => {

    if (!this.input.value) {
      return
    }

    e.preventDefault()

    const { id } = this.props;

    const comment = {
      id: uuid(),
      author: "Adam",
      body: this.input.value,
      parentId: id
    }

    var comments = this.state.comments.slice(); // copy the array
    comments.push(comment);

    this.setState({
      loading: false,
      comments,
      error: null
    })

    CommentsAPI.postComment(comment).then((response) => {

      console.log(response);
    })

  }

  render() {

    const { id, title, body, author } = this.props;
    const { loading, comments } = this.state;

    return (
      <Item>
        <Button.Group vertical>
          <Button icon='arrow up'/>
          <Label>Two</Label>
          <Button icon='arrow down' />
        </Button.Group>
        <Item.Content>
          <Item.Header as='a'>{title}</Item.Header>
          <Item.Meta>Author: {author}</Item.Meta>
          <Item.Description>
            {body}
          </Item.Description>
          <Item.Extra>
            <CommentList comments={comments}/ >
          </Item.Extra>
          <Item.Extra>
            <input
              type='text'
              placeholder='Comment'
              ref={(input) => this.input = input}
            />
            <Button primary floated='right' onClick={this.onCommentButtonPressed}>Comment</Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default connect()(Post)
