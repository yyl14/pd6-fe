import api from '../api';

export const addInstitute = api.path('/institute').method('post').create();

export const browseAllInstitute = api.path('/institute').method('get').create();

export const editInstitute = api.path('/institute/{institute_id}').method('patch').create();

export const readInstitute = api.path('/institute/{institute_id}').method('get').create();
