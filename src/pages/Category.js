import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { isLoaded, loadPostsWithID } from '../redux/modules/posts';
import { List } from 'semantic-ui-react'

import Post from '../components/Post';

class Category extends Component {

  componentWillMount() {

    const category = this.props.match.params.category;
    const { isDataLoaded, loadData } = this.props;

    if (!isDataLoaded) {
      loadData(category)
    }
  }

  render() {

    const { isDataLoaded, posts } = this.props;

    if (!posts) {
      return <p>Your search has 0 results.</p>
    }

    return (
      <List divided relaxed>
      <h1>COOL</h1>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </List>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  error: state.posts.error,
  loading: state.posts.loading,
  isDataLoaded: isLoaded(state)
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (category) => {dispatch(loadPostsWithID(category))}
  }
}

Category.propTypes = {
  posts: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  loadData: PropTypes.func.isRequired,
  isDataLoaded: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)
