import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Input from '../common/Input';
import * as constraints from '../../utils/constraints';

export const LoginForm = ({ handleSubmit, submitting, pristine, error }) => (
  <form onSubmit={handleSubmit}>
    {error && <p className="errors">{error}</p>}
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
        component={Input}
        type="password"
      />
    </div>
    <button type="submit" disabled={pristine || submitting} className="button expanded">Submit</button>
  </form>
);

const { func, array, bool } = PropTypes;

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  pristine: bool,
  submitting: bool,
  error: array
};

export default reduxForm({
  form: 'login',
  validate: constraints.validations(constraints.login)
})(LoginForm);
