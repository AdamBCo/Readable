import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, Button } from 'semantic-ui-react';
import { deleteComment } from '../redux/modules/comments';

class Comment extends Component {

  onDeleteButtonPressed = () => {
    const { id, dispatch } = this.props;
    dispatch(deleteComment(id));
  }

  render() {

    const { body, author } = this.props;

    return (
      <List.Item>
        <List.Content floated='right'>
          <Button icon='trash' onClick={this.onDeleteButtonPressed} />
        </List.Content>
        <List.Content>
          <List.Header as='a'>{author}</List.Header>
          <List.Description>{body}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

export default connect()(Comment)
