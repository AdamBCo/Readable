import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import * as Redux from 'react-redux';

// Pages
import Main from './pages/App';
import Category from './pages/Category';

export default (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Main}/>
      <Route path='/:category' component={Category}/>
    </Switch>
  </BrowserRouter>
);
