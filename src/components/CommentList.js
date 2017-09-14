import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { List, Button, Form, Input } from 'semantic-ui-react'

import * as CommentsAPI from '../api/CommentsAPI';

import Comment from './Comment';

class CommentList extends Component {

  render() {

    const { comments } = this.props;

    if (!comments || comments.length === 0) {
      return <p>There are 0 comments.</p>
    }

    return (
      <div>
        <List>
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </List>
      </div>
    );
  }
}

export default connect()(CommentList)
