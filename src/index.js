import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';

// Adding reduxThrunk as a middleware - will provide more granular approach to
// handle the dispatch of actions to reducers
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} >
      <Route path='/' components={App}>
        <Route path='signin' components={Signin} />
        <Route path='signout' components={Signout} />
        <Route path='signup' components={Signup} />
        <Route path='feature' components={RequireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
