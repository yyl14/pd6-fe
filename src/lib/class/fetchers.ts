import api from '../api';

export const readClass = api.path('/class/{class_id}').method('get').create();

export const deleteClass = api.path('/class/{class_id}').method('delete').create();

export const editClass = api.path('/class/{class_id}').method('patch').create();
