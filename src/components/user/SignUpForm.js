import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Input from '../common/Input';
import * as constraints from '../../utils/constraints';
import DropDown from '../common/DropDown';

const genders = ['male', 'female'];

/* eslint-disable import/no-mutable-exports */
let SignUpForm = ({ handleSubmit, submitting, pristine, error }) => (
  <form onSubmit={handleSubmit}>
    {error && <strong>{error}</strong>}
    <div>
      <Field
        name="name"
        label="Name"
        component={Input}
        type="text"
      />
    </div>
    <div>
      <Field
        name="email"
        label="Email"
        component={Input}
        type="email"
      />
    </div>
    <div>
      <Field
        name="password"
        label="Password"
        placeholder="Min. 6 characters long"
        component={Input}
        type="password"
      />
    </div>
    <div>
      <Field
        name="password_confirmation"
        label="Confirm Password"
        component={Input}
        type="password"
      />
    </div>
    <div>
      <Field
        name="gender"
        label="Gender"
        data={genders}
        component={DropDown}
        placeholder="Select a gender"
      />
    </div>
    <button type="submit" disabled={pristine || submitting} className="button expanded">Submit</button>
  </form>
);

const { func, bool, string } = PropTypes;

SignUpForm.propTypes = {
  handleSubmit: func.isRequired,
  pristine: bool,
  submitting: bool,
  error: string
};

SignUpForm = reduxForm({
  form: 'signUp',
  validate: constraints.validations(constraints.signUp)
})(SignUpForm);

export default SignUpForm;
