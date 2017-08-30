import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { List, Image, Segment } from 'semantic-ui-react'

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

  render() {

    const { title, body } = this.props;
    const { loading, comments } = this.state;

    return (
      <List.Item>
        <List.Icon name='github' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header as='a'>{title}</List.Header>
          <List.Description as='a'>{body}</List.Description>
        </List.Content>
        <List.Content>
        <Segment loading={loading}>
          <CommentList comments={comments}/ >
        </Segment>
        </List.Content>
      </List.Item>
    );
  }
}

export default connect()(Post)
