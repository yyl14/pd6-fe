import api from '../api';

export const getAccountTemplateFile = api.path('/account/template').method('get').create();

export const readAccountWithDefaultStudentId = api.path('/account/{account_id}').method('get').create();

export const deleteAccount = api.path('/account/{account_id}').method('delete').create();

export const editAccount = api.path('/account/{account_id}').method('patch').create();

export const makeStudentCardDefault = api.path('/account/{account_id}/default-student-card').method('put').create();
