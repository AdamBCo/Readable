import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import uuid  from 'uuid';
import { fetchComments, postComment, loadPost } from '../redux/modules/comments';
import { Grid, Divider, Header, Icon, Modal, Image, Form, TextArea, Button, Input, Item, List } from 'semantic-ui-react'
import CommentList from '../components/CommentList';

class PostView extends Component {

  state = {
    loading: true,
    comments: null,
    error: null,
    username: null
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  componentWillMount() {

    const id = this.props.match.params.id;
    const { loadData, loadPost } = this.props;

    loadData(id);
    loadPost(id);

  }


  onSubmit = (e) => {
    e.preventDefault()

    const id = this.props.match.params.id;
    const { postComment } = this.props;
    const { comment, username } = this.state;

    const newComment = {
      id: uuid(),
      author: username,
      body: comment,
      parentId: id
    }

    console.log(newComment);

    postComment(newComment)


    this.setState({
      ...this.state,
      username: null,
      comment: null
    })

  }

  render() {

    const id = this.props.match.params.id;
    const { title, body, comments } = this.props;
    const { loading, comment, username} = this.state;

    return (
      <div>
        <Header as='h1'>
          {title}
        <Header.Subheader>{body}</Header.Subheader>
        </Header>
        <CommentList comments={comments} postID={id}/ >
        <Form onSubmit={this.onSubmit}>
          <Form.Input placeholder='Username' name='username' value={username || ""} onChange={this.handleChange} />
          <Form.Input placeholder='Comment' name='comment' value={comment || ""} onChange={this.handleChange} />
          <Form.Button content="Submit" />
        </Form>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  title: state.comments.title,
  body: state.comments.body,
  comments: state.comments.comments,
  error: state.comments.error,
  loading: state.comments.loading
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (id) => {dispatch(fetchComments(id))},
    loadPost: (id) => {dispatch(loadPost(id))},
    postComment: (comment) => {dispatch(postComment(comment))}
  }
}

PostView.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  comments: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  loadData: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)
