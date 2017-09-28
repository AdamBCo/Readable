import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import { Grid } from 'semantic-ui-react'

// Components
import CategoriesView from '../pages/CategoriesView';
import PostView from '../pages/PostView';


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Grid>
          <Grid.Column width={16}>
            <Route exact={true} path='/' component={CategoriesView} />
            <Route exact={true} path='/:category' component={CategoriesView} />
            <Route exact={true} path='/:category/:id' component={PostView} />
          </Grid.Column>
        </Grid>
      </BrowserRouter>
    );
  }
}

export default connect()(App)
