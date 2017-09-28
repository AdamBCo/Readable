import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, Button, Label } from 'semantic-ui-react';
import { deleteComment, upVoteComment, downVoteComment } from '../redux/modules/comments';

class Comment extends Component {

  onUpButtonPressed = () => {
    const { id, dispatch } = this.props;
    dispatch(upVoteComment(id))
  }

  onDownButtonPressed = () => {
    const { id, dispatch } = this.props;
    dispatch(downVoteComment(id))
  }

  onDeleteButtonPressed = () => {
    const { id, dispatch } = this.props;
    dispatch(deleteComment(id));
  }

  render() {

    const { body, author, voteScore } = this.props;

    return (
      <List.Item>
        <List.Content floated='right'>
          <Button icon='arrow up' onClick={this.onUpButtonPressed} />
          <Label>{voteScore}</Label>
          <Button icon='arrow down' onClick={this.onDownButtonPressed} />
          <Button icon='trash' onClick={this.onDeleteButtonPressed} />
        </List.Content>
        <List.Content>
          <List.Header>{author}</List.Header>
          <List.Description>{body}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

export default connect()(Comment)
