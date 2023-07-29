import api from '../api';

export const addSubmitLang = api.path('/submission/language').method('post').create();

export const browseAllSubmitLang = api.path('/submission/language').method('get').create();

export const editSubmitLang = api.path('/submission/language/{language_id}').method('patch').create();
