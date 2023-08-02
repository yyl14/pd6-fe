import api from '../api';

export const getAccountTemplateFile = api.path('/account/template').method('get').create();

export const readAccountWithDefaultStudentId = api.path('/account/{account_id}').method('get').create();

export const deleteAccount = api.path('/account/{account_id}').method('delete').create();

export const editAccount = api.path('/account/{account_id}').method('patch').create();

export const makeStudentCardDefault = api.path('/account/{account_id}/default-student-card').method('put').create();

export const addNormalAccount = api.path('/account-normal').method('post').create();

export const importAccount = api.path('/account-import').method('post').create();

export const editPassword = api.path('/account/{account_id}/pass_hash').method('put').create();
