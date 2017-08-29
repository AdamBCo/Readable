import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { isLoaded, loadPosts } from '../redux/modules/posts';
import { Grid, Header } from 'semantic-ui-react'


class Posts extends Component {

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
      <Grid centered className="App">
      {posts.map((post) => (
        <Header key={post.id}>Huge Header</Header>
      ))}
      </Grid>
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

Posts.propTypes = {
  posts: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  loadData: PropTypes.func.isRequired,
  isDataLoaded: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
