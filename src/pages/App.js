import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Grid, Menu } from 'semantic-ui-react'

// Components
import Categories from '../components/Categories';
import CategoryView from '../components/CategoryView';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <Grid>
          <Grid.Column width={2}>
            <Categories />
          </Grid.Column>
          <Grid.Column width={13}>
            <Route path='/:category' component={CategoryView} />
          </Grid.Column>
        </Grid>
      </BrowserRouter>
    );
  }
}

export default connect()(App)
