import api from '../api';

// useAccountStudentCards(accountId)
export const addStudentCard = api.path('/account/{account_id}/student-card').method('post').create();

export const browseAllStudentCards = api.path('/account/{account_id}/student-card').method('get').create();

export const browsePendingStudentCards = api.path('/account/{account_id}/email-verification').method('get').create();

export const makeStudentCardDefault = api.path('/account/{account_id}/default-student-card').method('put').create();

// useStudentCard(studentCardId)
export const readStudentCard = api.path('/student-card/{student_card_id}').method('get').create();