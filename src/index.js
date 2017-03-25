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
import Welcome from './components/welcome';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';

import { AUTH_USER } from './actions/types';

// Adding reduxThrunk as a middleware - will provide more granular approach to
// handle the dispatch of actions to reducers
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

/******* Check if user is already authnticated and update state if so ********/
// We create the store in sadvanced so we can updtae app state with user auth
// (if we have a token already) prior to any components render
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
// If we have a token, than user is already authnticated.
// Will push the authenticated flag to our state prior to any components render
if (token) {
  // We update the application state by invoking the AUTH_USER action
  store.dispatch({ type: AUTH_USER });
}
/**** END - Check if user is already authnticated and update state if so *****/

ReactDOM.render(
  // We pass the provide the store already created and updated with auth state
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path='/' components={App}>
        <IndexRoute components={Welcome} />
        <Route path='signin' components={Signin} />
        <Route path='signout' components={Signout} />
        <Route path='signup' components={Signup} />
        <Route path='feature' components={RequireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
