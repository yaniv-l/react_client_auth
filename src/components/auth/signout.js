import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    console.log('signing out user');
    this.props.signOutUser();
  }

  render() {
    return (
      <div>Sorry to you go...</div>
    );
  }
}

export default connect(null, actions)(Signout);
