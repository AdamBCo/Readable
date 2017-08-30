import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Grid, Menu } from 'semantic-ui-react'

// Components
import Categories from '../components/Categories';
import PostList from '../components/PostList';

class App extends Component {
  render() {
    return (
      <Grid className="App">
        <Grid.Column width={2}>
          <Categories />
        </Grid.Column>
        <Grid.Column width={13}>
          <PostList />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect()(App)
