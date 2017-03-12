import axios from 'axios';
import { browserHistory } from 'react-router';

import { AUTH_USER } from './types';

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
        console.log('signed-in');
        // If request is good:
        // - Update state to indicate user is Authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        // - redirect user the the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad:
        // - Show an error to the user
      });
  };
}
