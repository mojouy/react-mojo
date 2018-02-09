import validate from 'validate.js';

export const login = {
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true
  }
};

export const signUp = {
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true,
    length: { minimum: 6 }
  },
  passwordConfirmation: {
    presence: true,
    equality: 'password'
  },
  gender: {
    presence: true
  },
  name: {
    presence: true,
    length: { minimum: 5 }
  }
};

export const validations = constraints =>
  data => validate(data, constraints) || {};
