import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ input, label, type, placeholder, meta: { touched, error } }) => {
  const hasError = touched && error;
  const errorClass = hasError && 'error';
  return (
    <div>
      {hasError && <span className="error">{error}</span>}
      {label && <label className={errorClass}>{label}</label>}
      <div>
        <input className={errorClass} {...input} {...{ placeholder, type }} />
      </div>
    </div>
  );
};

const { string, object } = PropTypes;

Input.propTypes = {
  input: object.isRequired,
  label: string,
  type: string.isRequired,
  placeholder: string,
  meta: object
};

export default Input;
