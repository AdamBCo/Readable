import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { List, Button, Form, Input } from 'semantic-ui-react'

import * as CommentsAPI from '../api/CommentsAPI';

import Comment from './Comment';

class CommentList extends Component {

  render() {

    const { comments, postID } = this.props;

    if (!comments || comments.length === 0) {
      return <p>There are 0 comments.</p>
    }

    var filteredComments = comments.filter((comment) => {
      return comment.deleted === false
    })

    var sortedComments = filteredComments && filteredComments.sort(function(a, b){
      return a.voteScore < b.voteScore;
    });

    return (
      <div>
        <List>
          {sortedComments.map((comment) => (
            <Comment key={comment.id} {...comment} postID={postID}/>
          ))}
        </List>
      </div>
    );
  }
}

export default connect()(CommentList)
