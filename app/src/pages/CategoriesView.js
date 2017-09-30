import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import { Grid } from 'semantic-ui-react'

// Components
import CategoryList from '../components/CategoryList';
import CategoryView from '../components/CategoryView';


class CategoriesView extends Component {

  render() {
    return (
      <Grid>
        <Grid.Column width={13}>
          <Route exact={true} path='/' component={CategoryView} />
          <Route exact={true} path='/:category' component={CategoryView} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect()(CategoriesView)
