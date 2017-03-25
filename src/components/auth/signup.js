import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // redux-form will only call handleSubmit once the form is valid, so no need
    // for adtional validation here
    // Call the SignUp action creator
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Aw-Snap!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const {
      handleSubmit,
      fields: { email, password, passwordConfirmation } } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input className='form-control' {...email} />
          {email.touched &&
            email.error &&
            <div className='error'>{email.error}</div>
          }
        </fieldset>
        <fieldset className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input type='password' className='form-control' {...password} />
          {password.touched &&
            password.error &&
            <div className='error'>{password.error}</div>
          }
        </fieldset>
        <fieldset className='form-group'>
          <label htmlFor='passwordConfirmation'>Confirm Password:</label>
          <input
            type='password' className='form-control'
            {...passwordConfirmation} />
          {passwordConfirmation.touched &&
            passwordConfirmation.error &&
            <div className='error'>{passwordConfirmation.error}</div>
          }
        </fieldset>
        {this.renderAlert()}
        <button action='submit' className='btn btn-primary'>Sign Up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Please enter an Email';
  }
  if (!formProps.password) {
    errors.password = 'Please enter a Password';
  }
  if (!formProps.passwordConfirmation) {
    errors.passwordConfirmation = 'Please enter Password Confirmation';
  }
  if (formProps.password !== formProps.passwordConfirmation) {
    errors.password = 'Password must match';
  }

  return errors;
}
function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}
export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirmation'],
  validate: validate
}, mapStateToProps, actions)(Signup);
