import api from '../api';

export const readPeerReview = api.path('/peer-review/{peer_review_id}').method('get').create();

export const deletePeerReview = api.path('/peer-review/{peer_review_id}').method('delete').create();

export const editPeerReview = api.path('/peer-review/{peer_review_id}').method('patch').create();

export const browsePeerReviewRecord = api.path('/peer-review/{peer_review_id}/record').method('get').create();

export const assignPeerReviewRecord = api.path('/peer-review/{peer_review_id}/record').method('post').create();

export const readPeerReviewRecord = api.path('/peer-review-record/{peer_review_record_id}').method('get').create();

export const submitPeerReviewRecord = api.path('/peer-review-record/{peer_review_record_id}').method('patch').create();
