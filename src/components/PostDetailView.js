import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import uuid  from 'uuid';
import { fetchComments } from '../redux/modules/comments';
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

  handleOpen = (e) => {

    const { id, loadData } = this.props;
    loadData(id);

    console.log("DATA");

    this.setState({
      modalOpen: true
    })
}

  handleClose = (e) => this.setState({
    modalOpen: false
  })

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

    const { id, title, body, author, comments } = this.props;
    const { loading, comment, username } = this.state;

    return (
      <Modal
        trigger={
          <Item.Header as='a'>{title}</Item.Header>
        }
        onOpen={this.handleOpen}
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
          <CommentList comments={comments} postID={id}/ >
          <Form onSubmit={this.onSubmit}>
            <Form.Input placeholder='Username' name='username' value={username || ""} onChange={this.handleChange} />
            <Form.Input placeholder='Comment' name='comment' value={comment || ""} onChange={this.handleChange} />
            <Form.Button content="Submit" />
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
};

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  error: state.posts.error,
  loading: state.posts.loading
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (id) => {dispatch(fetchComments(id))}
  }
}

PostDetailView.propTypes = {
  comments: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  loadData: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailView)
