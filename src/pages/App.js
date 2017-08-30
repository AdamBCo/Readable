import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Grid, Menu } from 'semantic-ui-react'

// Components
import Categories from '../components/Categories';
import Posts from '../components/Posts';

class App extends Component {
  render() {
    return (
      <Grid className="App">
        <Grid.Column width={2}>
          <Categories />
        </Grid.Column>
        <Grid.Column width={13}>
          <Posts />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect()(App)
