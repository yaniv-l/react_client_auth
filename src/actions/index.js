import axios from 'axios';
import { browserHistory } from 'react-router';

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  // Since we are using the redux-thunk middleware, instead of returning an
  // object, as action creattor typically does, we'll return a function.
  // this fucntion get one parameter, 'dispatch', which is the reference to
  // the dispatcher between the actions and reducers. This is enabled using the
  // redux-thunk middleware.
  return function (dispatch) {
    // Submit email and password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        //console.log('signed-in'); // For Debug
        // If request is good:
        // - Update state to indicate user is Authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        console.log(response.data.token);
        localStorage.setItem('token', response.data.token);
        // - redirect user the the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad:
        // - Show an error to the user
        // Since we're using reduxThunk, we have the ability to call an action
        // creator directly from here, the current actionCreator, as opposed to
        // not working with reduxThunk where we can only call an actionCreator
        // from a component
        dispatch(authError('Bad login info'));
      });
  };
}

export function signupUser({ email, password }) {
  // Since we are using the redux-thunk middleware, instead of returning an
  // object, as action creattor typically does, we'll return a function.
  // this fucntion get one parameter, 'dispatch', which is the reference to
  // the dispatcher between the actions and reducers. This is enabled using the
  // redux-thunk middleware.
  return function (dispatch) {
    // Submit email and password to the server
    axios.post(`${ROOT_URL}/signup`, { email, password })
    .then(response => {
      //console.log('signed-in'); // For Debug
      // If request is good:
      // - Update state to indicate user is Authenticated
      dispatch({ type: AUTH_USER });
      // - Save the JWT token
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token);
      // - redirect user the the route '/feature'
      browserHistory.push('/feature');
    })
    .catch(error => {
      // If request is bad:
      // - Show an error to the user
      // Since we're using reduxThunk, we have the ability to call an action
      // creator directly from here, the current actionCreator, as opposed to
      // not working with reduxThunk where we can only call an actionCreator
      // from a component
      dispatch(authError(error.response.data.error));
    });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signOutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function (dispatch) {
    // Issue an ajax/promise request with the JWT token in the header so we can
    // get protected API routes
    axios.get(ROOT_URL, {
      // We add our JWT token into the request header
      headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      }); });
    }
}
