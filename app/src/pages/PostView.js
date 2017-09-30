import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import uuid  from 'uuid';
import { fetchComments, postComment, loadPost } from '../redux/modules/comments';
import { updatePost } from '../redux/modules/posts';
import { Grid, Divider, Header, Icon, Modal, Image, Form, TextArea, Button, Input, Item, List } from 'semantic-ui-react'
import CommentList from '../components/CommentList';

class PostView extends Component {

  state = {
    loading: true,
    comments: null,
    error: null,
    username: null,
    editing: false,
    title: "",
    body: ""
  }

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      author: this.props.author,
      body: this.props.body,
      editing: false
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("NEXT ", nextProps);
    if (nextProps) {

      const {title, body} = nextProps;

      this.setState({
        ...this.state,
        title,
        body,
        username: null,
        comment: null
      })
    }
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

    postComment(newComment)


    this.setState({
      ...this.state,
      username: null,
      comment: null
    })

  }

  onEditButtonPressed = () => {

    const id = this.props.match.params.id;
    const { editing, title, body } = this.state;

    if (editing) {
      updatePost(id, title, body)
    }

    this.setState({
      editing: !editing
    });
  }

  render() {

    const id = this.props.match.params.id;
    const { comments, error } = this.props;
    const { loading, comment, username, editing, title, body} = this.state;


    if (error) {
      return (
        <div>
          404 error, no such page!
        </div>
      )
    }

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            {editing ?
              <Form onSubmit={this.onSubmit}>
                <Form.Input placeholder='Title' name='title' value={title} onChange={this.handleChange} />
                <Form.TextArea placeholder='Body' name='body' value={body} onChange={this.handleChange} />
              </Form>
              :
              <Header as='h1'>
                {title}
              <Header.Subheader>{body}</Header.Subheader>
              </Header>
            }
            <Button content={ !editing ? "Edit" : "Post" } onClick={this.onEditButtonPressed} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <CommentList comments={comments} postID={id}/ >
            <Form onSubmit={this.onSubmit}>
              <Form.Input placeholder='Username' name='username' value={username || ""} onChange={this.handleChange} />
              <Form.Input placeholder='Comment' name='comment' value={comment || ""} onChange={this.handleChange} />
              <Form.Button content="Submit" />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
    postComment: (comment) => {dispatch(postComment(comment))},
    updatePost: (id, title, body) => {dispatch(updatePost(id, title, body))}
  }
}

PostView.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  comments: PropTypes.array,
  error: PropTypes.object,
  loading: PropTypes.bool,
  loadData: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)
