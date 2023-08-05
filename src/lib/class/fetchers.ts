import api from '../api';

export const readClass = api.path('/class/{class_id}').method('get').create();

export const deleteClass = api.path('/class/{class_id}').method('delete').create();

export const editClass = api.path('/class/{class_id}').method('patch').create();

export const browseAllAccountWithClassRole = api.path('/account/{account_id}/class').method('get').create();

export const browseClass = api.path('/class').method('get').create();

export const browseAllClassUnderCourse = api.path('/course/{course_id}/class').method('get').create();

export const addClassUnderCourse = api.path('/course/{course_id}/class').method('post').create();
