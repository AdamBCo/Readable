import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { List, Item, Image, Segment, Button, Label, Form } from 'semantic-ui-react'
import { upVote, downVote, deletePost, updatePost } from '../redux/modules/posts';

import CommentList from './CommentList';
import { Link } from 'react-router-dom'

class Post extends Component {

  state = {
    editing: true,
    title: "",
    body: ""
  }

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      author: this.props.author,
      body: this.props.body
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  onUpButtonPressed = () => {
    const { id, dispatch } = this.props;
    dispatch(upVote(id))
  }

  onDownButtonPressed = () => {
    const { id, dispatch } = this.props;
    dispatch(downVote(id))
  }

  onDeleteButtonPressed = () => {
    const { id, dispatch } = this.props;
    dispatch(deletePost(id))
  }

  onEditButtonPressed = () => {

    const { id, dispatch } = this.props;
    const { editing, title, body } = this.state;

    if (editing) {
      dispatch(updatePost(id, title, body))
    }

    this.setState({
      editing: !editing
    });
  }

  render() {

    const { id, voteScore, category, author } = this.props;
    const { title, body, editing } = this.state;

    return (
      <Item>
        <Item.Content>

          {editing ?
            <Form onSubmit={this.onSubmit}>
              <Form.Input placeholder='Title' name='title' value={title} onChange={this.handleChange} />
              <Form.TextArea placeholder='Body' name='body' value={body} onChange={this.handleChange} />
            </Form>
            :
            <div>
              <Link to={`/${category}/${id}`}>{title}</Link>
              <Item.Meta>Author: {author}</Item.Meta>
              <Item.Description>
                {body}
              </Item.Description>
            </div>
          }


          <Item.Extra>
            <Button icon='arrow up' onClick={this.onUpButtonPressed} />
            <Label>{voteScore}</Label>
            <Button icon='arrow down' onClick={this.onDownButtonPressed} />
            <Button icon='trash' floated='right'onClick={this.onDeleteButtonPressed} />
            <Button content={ !editing ? "Edit" : "Post" } floated='right'onClick={this.onEditButtonPressed} />
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default connect()(Post)
