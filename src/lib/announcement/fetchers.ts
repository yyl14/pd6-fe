import api from '../api';

export const readAnnouncement = api.path('/announcement/{announcement_id}').method('get').create();

export const editAnnouncement = api.path('/announcement/{announcement_id}').method('patch').create();

export const addAnnouncement = api.path('/announcement').method('post').create();

export const deleteAnnouncement = api.path('/announcement/{announcement_id}').method('delete').create();

export const browseAnnouncement = api.path('/announcement').method('get').create();
