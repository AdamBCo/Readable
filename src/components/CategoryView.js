import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { isLoaded, fetchPosts } from '../redux/modules/posts';
import { List, Button } from 'semantic-ui-react'

import PostList from '../components/PostList';
import CreatePost from '../components/CreatePost';

class CategoryView extends Component {

  componentWillMount() {

    const category = this.props.match.params.category;
    const { isDataLoaded, loadData } = this.props;

    if (!isDataLoaded) {
      loadData(category)
    }
  }

  render() {

    const category = this.props.match.params.category;
    const { isDataLoaded, posts } = this.props;

    const currentPosts = posts && posts.filter((post) => {
      return post.category === category
    })

    const sortedPosts = currentPosts && currentPosts.sort(function(a, b){
      return a.voteScore < b.voteScore;
    });

    return (
      <div>
        <List divided relaxed>
          <h1>{category}</h1>
          <CreatePost category={category}/>
          <PostList posts={sortedPosts} />
        </List>
      </div>
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
    loadData: (category) => {dispatch(fetchPosts())}
  }
}

CategoryView.propTypes = {
  posts: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  loadData: PropTypes.func.isRequired,
  isDataLoaded: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryView)
