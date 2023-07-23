import api from '../api';

export const readEssay = api.path('/essay/{essay_id}').method('get').create();

export const deleteEssay = api.path('/essay/{essay_id}').method('delete').create();

export const editEssay = api.path('/essay/{essay_id}').method('patch').create();
