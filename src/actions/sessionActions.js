import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';
import { sessionService } from 'redux-react-session';
import sessionApi from '../api/sessionApi';
import { routes } from '../constants/routesPaths';

export const login = user =>
  () =>
    sessionApi.login({ user }).then(({ data }) => {
      sessionService.saveUser(data)
      .then(() => {
        browserHistory.push(routes.index);
      });
    }).catch((err) => {
      throw new SubmissionError({
        _error: err.errors
      });
    });

export const logout = () =>
  () =>
    sessionApi.logout().then(() => {
      sessionService.deleteSession();
      sessionService.deleteUser();
      browserHistory.push(routes.login);
    }).catch((err) => {
      throw (err);
    });
