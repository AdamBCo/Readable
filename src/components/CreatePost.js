import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import uuid  from 'uuid';
import { createPost } from '../redux/modules/posts';


import { Grid, Divider, Button, Header, Icon, Modal, Input, Image, Form } from 'semantic-ui-react'

class CreatePost extends Component {

  state = { modalOpen: false }

  handleOpen = (e) => this.setState({
    modalOpen: true
  })

  handleClose = (e) => this.setState({
    modalOpen: false
  })

  onPostButtonPressed = (e) => {

    e.preventDefault()

    const { category } = this.props;

    const post = {
      id: uuid(),
      timestamp: Date.now(),
      title: "Spotter",
      body: "Nice spot",
      author: "Simon",
      category: "udacity"
    }

    console.log(post);


    createPost(post);



  }

  render() {

    const { handleSubmit } = this.props;

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
          <Header content='Create Post' />
        </Modal.Header>
        <Modal.Content>
        <input
          type='text'
          placeholder='Create Post...'
          ref={(input) => this.input = input}
        />
        </Modal.Content>
        <Modal.Actions>
        <Button color='blue' onClick={this.onPostButtonPressed}>Create Post</Button>
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
