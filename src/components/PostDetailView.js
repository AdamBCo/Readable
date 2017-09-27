import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import uuid  from 'uuid';
import { createPost } from '../redux/modules/posts';
import { Grid, Divider, Header, Icon, Modal, Image, Form, TextArea, Button, Input, Item } from 'semantic-ui-react'

import * as CommentsAPI from '../api/CommentsAPI';

import CommentList from './CommentList';

class PostDetailView extends Component {

  state = {
    loading: true,
    comments: null,
    error: null,
    comment: null,
    username: null
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleOpen = (e) => this.setState({
    modalOpen: true
  })

  handleClose = (e) => this.setState({
    modalOpen: false
  })

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

  onSubmit = (e) => {
    e.preventDefault()

    const { id } = this.props;
    const { comment, username } = this.state;

    const newComment = {
      id: uuid(),
      author: username,
      body: comment,
      parentId: id
    }

    var comments = this.state.comments.slice(); // copy the array
    comments.push(newComment);

    this.setState({
      loading: false,
      comments,
      error: null,
      username: null,
      comment: null
    })

    CommentsAPI.postComment(newComment)

  }

  render() {

    const { id, title, body, author } = this.props;
    const { loading, comments, comment, username } = this.state;

    return (
      <Modal
        trigger={
          <Item.Header as='a'>{title}</Item.Header>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon='close'
        >
        <Modal.Header>
          {title}
        </Modal.Header>
        <Modal.Content>
          {body}
        </Modal.Content>
        <Modal.Content scrolling>
          <CommentList comments={comments}/ >
          <Form fluid onSubmit={this.onSubmit}>
            <Form.Input placeholder='Username' name='username' value={username || ""} onChange={this.handleChange} />
            <Form.Input placeholder='Comment' name='comment' value={comment || ""} onChange={this.handleChange} />
            <Form.Button content="Submit" />
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
};

export default connect()(PostDetailView)
