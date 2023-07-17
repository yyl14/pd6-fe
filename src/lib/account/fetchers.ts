import api from '../api';

export const logIn = api.path('/account/jwt').method('post').create();

export const readAccountWithDefaultStudentId = api.path('/account/{account_id}').method('get');

export const signUp = api.path('/account').method('post').create();
