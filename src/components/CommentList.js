import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'

import Comment from './Comment';

class CommentList extends Component {
  
  render() {

    const { comments } = this.props;

    if (!comments || comments.length == 0) {
      return <p>There are 0 comments.</p>
    }

    return (
      <List>
        {comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </List>
    );
  }
}

export default connect()(CommentList)
