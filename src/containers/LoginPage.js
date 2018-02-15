import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as sessionActions from '../actions/sessionActions';
import LoginForm from '../components/session/LoginForm'; // eslint-disable-line import/no-named-as-default
import { routes } from '../constants/routesPaths';
import SharedFormLink from '../components/common/SharedFormLink';
import AppPromotion from '../components/common/AppPromotion';
import logo from '../resources/images/smilies.svg';

class LoginPage extends Component {

  componentWillReceiveProps(nextProps) {
    const { authenticated } = nextProps;
    if (authenticated) {
      browserHistory.push(routes.index);
    }
  }

  render() {
    const { actions: { login } } = this.props;
    return (
      <div className="session-page login-page grid-container full">
        <div className="grid-x grid-margin-x align-middle">
          <div className="session-wrapper">
            <div className="content">
              <img className="logo" src={logo} alt="Target MVD Logo"/>
              <h5>TARGET MVD</h5>
              <h6>Find people near you & Connect</h6>
              <p>Create a target wherever on the map, specify your interest: Travel, Dating, Music, etc and start conecting with others who share your interest.</p>
            </div>
            <LoginForm onSubmit={login} />
            <SharedFormLink name="Sign up" to={routes.signUp} />
          </div>
          <AppPromotion />
        </div>
      </div>
    );
  }
}

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
