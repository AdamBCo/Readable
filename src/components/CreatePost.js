import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import uuid  from 'uuid';
import { createPost } from '../redux/modules/posts';
import { Grid, Divider, Header, Icon, Modal, Image, Form, TextArea, Button, Input } from 'semantic-ui-react'


class CreatePost extends Component {

  state = {
    title: '',
    author: '',
    body: '',
    modalOpen: false
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleOpen = (e) => this.setState({
    modalOpen: true
  })

  handleClose = (e) => this.setState({
    modalOpen: false
  })

  onSubmit = (e) => {

    e.preventDefault()

    const { title, author, body } = this.state
    const { category } = this.props;

    const post = {
      id: uuid(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category
    }

    createPost(post);

    this.setState({
      modalOpen: false
    });

  }

  render() {

    const { title, author, body } = this.state

    return (
      <Modal
        trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={ this.handleOpen }>
            <Icon name='plus' /> New
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon='close'
        >
        <Modal.Header>
          Create Post
        </Modal.Header>
        <Modal.Content>
          <Form fluid onSubmit={this.onSubmit}>
            <Form.Input placeholder='Title' name='title' value={title} onChange={this.handleChange} />
            <Form.Input placeholder='Author' name='author' value={author} onChange={this.handleChange} />
            <Form.TextArea placeholder='Body' name='body' value={body} onChange={this.handleChange} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='blue' onClick={this.onSubmit}>Post</Button>
        </Modal.Actions>
      </Modal>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => {dispatch(createPost(post))}
  }
}

export default connect(
  mapDispatchToProps
)(CreatePost)
