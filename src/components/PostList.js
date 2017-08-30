import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { isLoaded, loadPosts } from '../redux/modules/posts';
import { List } from 'semantic-ui-react'

import Post from './Post';



class PostList extends Component {

  componentWillMount() {
    const { isDataLoaded, loadData } = this.props;

    if (!isDataLoaded) {
      loadData()
    }
  }

  render() {

    const { isDataLoaded, posts } = this.props;

    if (!posts) {
      return <p>Your search has 0 results.</p>
    }

    return (
      <List divided relaxed>
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
    loadData: () => {dispatch(loadPosts())}
  }
}

PostList.propTypes = {
  posts: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  loadData: PropTypes.func.isRequired,
  isDataLoaded: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
