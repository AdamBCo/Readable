import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Item } from 'semantic-ui-react'

import Post from '../components/Post';

class PostList extends Component {

  render() {

    const { posts } = this.props;

    if (!posts || posts.length === 0) {
      return <p>Your search has 0 results.</p>
    }

    return (
      <Item.Group divided>
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </Item.Group>
    );
  }
}


PostList.propTypes = {
  posts: PropTypes.array
};

export default connect()(PostList)
