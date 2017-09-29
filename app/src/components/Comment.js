import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, Button, Label, Input } from 'semantic-ui-react';
import { deleteComment, upVoteComment, downVoteComment, updateComment } from '../redux/modules/comments';

class Comment extends Component {

  state = {
    editing: true,
    body: ""
  }

  constructor(props) {
    super(props);
    this.state = {
      body: this.props.body
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

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

  onEditButtonPressed = () => {
    const { id, dispatch } = this.props;
    const { editing, body } = this.state;

    if (editing) {
      dispatch(updateComment(id, body))
    }

    this.setState({
      editing: !editing
    });
  }

  render() {

    const { editing, body } = this.state;
    const { author, voteScore } = this.props;

    return (
      <List.Item>
        <List.Content floated='right'>
          <Button icon='arrow up' onClick={this.onUpButtonPressed} />
          <Label>{voteScore}</Label>
          <Button icon='arrow down' onClick={this.onDownButtonPressed} />
          <Button content={ !editing ? "Edit" : "Post" } onClick={this.onEditButtonPressed} />
          <Button icon='trash' onClick={this.onDeleteButtonPressed} />
        </List.Content>
        <List.Content>

          {editing ?
            <Input placeholder='Body' name='body' value={body} onChange={this.handleChange} />
            :
            <div>
              <List.Header>{author}</List.Header>
              <List.Description>{body}</List.Description>
            </div>
          }

        </List.Content>
      </List.Item>
    );
  }
}

export default connect()(Comment)
