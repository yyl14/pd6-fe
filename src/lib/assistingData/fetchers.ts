import api from '../api';

export const browseAssistingData = api.path('/problem/{problem_id}/assisting-data').method('get').create();

export const addAssistingData = api.path('/problem/{problem_id}/assisting-data').method('post').create();

export const editAssistingData = api.path('/assisting-data/{assisting_data_id}').method('put').create();

export const deleteAssistingData = api.path('/assisting-data/{assisting_data_id}').method('delete').create();
