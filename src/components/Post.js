import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { List, Item, Image, Segment, Button } from 'semantic-ui-react'

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

    console.log("COOL");

    if (!this.input.value) {
      return
    }

    e.preventDefault()

    const { id } = this.props;
    const comment = this.input.value
    const author = "Adam"

    console.log(id, comment, author);

    CommentsAPI.postComment(id, author, comment).then((response) => {

      console.log(response);
    })

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
