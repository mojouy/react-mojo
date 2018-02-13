import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as signUpActions from '../actions/signUpActions';
import SignUpForm from '../components/user/SignUpForm';
import { routes } from '../constants/routesPaths';
import AppPromotion from '../components/common/AppPromotion';
import SharedFormLink from '../components/common/SharedFormLink';

const SignUpPage = ({ actions: { signUp }, authenticated }) => {
  if (authenticated) {
    browserHistory.push(routes.index);
  }
  return (
    <div className="session-page signup-page grid-container full">
      <div className="grid-x grid-margin-x align-middle">
        <div className="session-wrapper">
          <h5>SIGN UP</h5>
          <SignUpForm onSubmit={signUp} />
          <SharedFormLink name="Sign In" to={routes.login} />
        </div>
        <AppPromotion />
      </div>
    </div>
  );
};

const { bool, object } = PropTypes;

SignUpPage.propTypes = {
  actions: object.isRequired,
  authenticated: bool.isRequired
};

const mapStateToProps = ({ session: { authenticated } }) => ({
  authenticated
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators(signUpActions, dispatch)
});

export default connect(mapStateToProps, mapDispatch)(SignUpPage);
