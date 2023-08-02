import api from '../api';

export const browseAssistingData = api.path('/problem/{problem_id}/assisting-data').method('get').create();

export const addAssistingData = api.path('/problem/{problem_id}/assisting-data').method('post').create();
