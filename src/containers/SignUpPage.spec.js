import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import nock from 'nock';
import { Field } from 'redux-form';
import { browserHistory } from 'react-router';
import { sessionService } from 'redux-react-session';
import configureStore from '../store/configureStore';
import SignUpPage from './SignUpPage';
import DropDown from '../components/common/DropDown';
import { routes } from '../constants/routesPaths';

jest.useFakeTimers();
describe('<SignUpPage />', () => {
  let store;
  let subject;
  let form;
  let fields;
  let username;
  let password;
  let confirmPassword;
  let email;
  let gender;
  let userResponse;

  beforeEach(() => {
    store = configureStore();
    subject = mount(
      <Provider store={store}>
        <SignUpPage />
      </Provider>
    );

    form = subject.find('form');
    fields = subject.find(Field);
    username = subject.find('input').at(0);
    email = subject.find('input').at(1);
    password = subject.find('input').at(2);
    confirmPassword = subject.find('input').at(3);
    gender = subject.find('.rw-dropdown-list-input');

    sessionService.saveUser = jest.fn(() => Promise.resolve());
    sessionService.saveSession = jest.fn(() => Promise.resolve());
    sessionService.loadSession = jest.fn(() => Promise.resolve());
  });

  it('should display a Name field', () => {
    expect(fields.get(0).props.name).toBe('name');
  });

  it('should display an Email field', () => {
    expect(fields.get(1).props.name).toBe('email');
  });

  it('should display a Password field', () => {
    expect(fields.get(2).props.name).toBe('password');
  });

  it('should display a DropDown Type with name gender', () => {
    expect(fields.get(4).props.component).toBe(DropDown);
    expect(fields.get(4).props.name).toBe('gender');
  });

  describe('submit with valid form', () => {
    beforeEach(() => {
      const user = {
        email: 'joe@joe.com',
        password: 'password',
        password_confirmation: 'password',
        name: 'JoeJoe',
        gender: 'male'
      };

      userResponse = {
        data: {
          id: 1,
          email: 'joe@joe.com',
          uid: 'joe@joe.com',
          provider: 'email',
          gender: 'male'
        }
      };

      nock(process.env.API_URL)
      .post('/users', { user })
      .reply(200, userResponse);

      // load valid data to the form
      username.simulate('change', { target: { value: 'JoeJoe' } });
      email.simulate('change', { target: { value: 'joe@joe.com' } });
      password.simulate('change', { target: { value: 'password' } });
      confirmPassword.simulate('change', { target: { value: 'password' } });
      gender.simulate('click');
      subject.find('.rw-popup-container ul li').at(0).simulate('click');
      form.simulate('submit');
      browserHistory.push = jest.fn(() => Promise.resolve());
      jest.runAllTimers();
    });

    it('should call redux-session-service to save the user data', (done) => {
      // wait for the call to save user
      sessionService.saveUser = jest.fn(() => {
        expect(sessionService.saveUser).toHaveBeenCalled();
        done();
        return Promise.resolve();
      });
    });

    it('should save the user data', (done) => {
      // wait for the call to save user
      sessionService.saveUser = jest.fn(() => {
        expect(sessionService.saveUser).toHaveBeenCalledWith(userResponse.data);
        done();
        return Promise.resolve();
      });
    });

    it('should redirect to the home page', (done) => {
      // wait for the call to redirect
      browserHistory.push = jest.fn(() => {
        expect(browserHistory.push).toHaveBeenCalledWith(routes.index);
        done();
      });
    });
  });
});
