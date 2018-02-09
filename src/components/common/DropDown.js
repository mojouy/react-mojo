import React from 'react';
import PropTypes from 'prop-types';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';

const DropDown = ({ label, input, data, placeholder, meta: { touched, error } }) => {
  const hasError = touched && error;
  const errorClass = hasError && 'error';

  return (
    <div>
      {hasError && <span className="error">{error}</span>}
      {label && <label className={errorClass}>{label}</label>}
      <div>
        <DropdownList
          className={errorClass}
          {...input}
          data={data}
          {...{ placeholder }}
        />
      </div>
    </div>
  );
};

const { string, object, array } = PropTypes;

DropDown.propTypes = {
  data: array,
  label: string,
  placeholder: string,
  input: object.isRequired,
  meta: object
};

export default DropDown;
