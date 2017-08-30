import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { List, Image } from 'semantic-ui-react'

import CommentList from './CommentList';

class Post extends Component {

  state = {
    comments: null
  }

  render() {

    const { title, body } = this.props;

    return (
      <List.Item>
        <List.Icon name='github' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header as='a'>{title}</List.Header>
          <List.Description as='a'>{body}</List.Description>
        </List.Content>
        <List.Content>
          <CommentList / >
        </List.Content>
      </List.Item>
    );
  }
}

export default connect()(Post)
