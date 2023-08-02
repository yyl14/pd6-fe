import api from '../api';

// eslint-disable-next-line import/prefer-default-export
export const getAccountTemplateFile = api.path('/account/template').method('get').create();
