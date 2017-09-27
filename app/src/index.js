import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker'

// Pages
import App from './pages/App';

import {store} from './redux/store'

import {Provider} from 'react-redux'

store.subscribe(() => {
  var state = store.getState();
});

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>, document.getElementById('root')
)
registerServiceWorker()
