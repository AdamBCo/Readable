import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import { Grid } from 'semantic-ui-react'

// Components
import CategoryView from '../components/CategoryView';
import PostView from '../pages/PostView';
import CategoryList from '../components/CategoryList';


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Grid>
          <Grid.Column width={2}>
            <CategoryList />
          </Grid.Column>
          <Grid.Column width={14}>
            <Route exact={true} path='/' component={CategoryView} />
            <Route exact={true} path='/:category' component={CategoryView} />
            <Route exact={true} path='/:category/:id' component={PostView} cool={"nice"}/>
          </Grid.Column>
        </Grid>
      </BrowserRouter>
    );
  }
}

export default connect()(App)
