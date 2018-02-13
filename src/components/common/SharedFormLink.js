import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const SharedFormLink = ({ name, to }) => <Link className="button transparent" to={to}>{name}</Link>;

SharedFormLink.propTypes = {
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default SharedFormLink;
