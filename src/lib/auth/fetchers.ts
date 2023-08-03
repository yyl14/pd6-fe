import api from '../api';

export const logIn = api.path('/account/jwt').method('post').create();

export const readAccountWithDefaultStudentId = api.path('/account/{account_id}').method('get');

export const addAccount = api.path('/account').method('post').create();

export const forgetPassword = api.path('/account/forget-password').method('post').create();

export const forgetUsername = api.path('/account/forget-username').method('post').create();

export const resetPassword = api.path('/account/reset-password').method('post').create();
