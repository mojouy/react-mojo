import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as sessionActions from '../actions/sessionActions';
import LoginForm from '../components/session/LoginForm'; // eslint-disable-line import/no-named-as-default
import { routes } from '../constants/routesPaths';
import SharedFormLink from '../components/common/SharedFormLink';

const LoginPage = ({ actions: { login }, authenticated }) => {
  if (authenticated) {
    browserHistory.push(routes.index);
  }
  return (
    <div>
      <p>LOGIN</p>
      <LoginForm onSubmit={login} />
      <SharedFormLink name="Sign up" to={routes.signUp} />
    </div>
  );
};

const { bool, object } = PropTypes;

LoginPage.propTypes = {
  actions: object.isRequired,
  authenticated: bool.isRequired
};

const mapStateToProps = ({ session: { authenticated } }) => ({
  authenticated
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatch)(LoginPage);
