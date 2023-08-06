import api from '../api';

// useClassGrade()
export const importClassGrade = api.path('/class/{class_id}/grade-import').method('post').create({ title: true });

export const browseClassGrade = api.path('/class/{class_id}/grade').method('get').create();

export const addClassGrade = api.path('/class/{class_id}/grade').method('post').create();
// useAccountGrade()
export const browseAccountGrade = api.path('/account/{account_id}/grade').method('get').create();

// useGradeTemplate()
export const getGradeTemplateFile = api.path('/grade/template').method('get').create();

// useGrade()
export const getGrade = api.path('/grade/{grade_id}').method('get').create();

export const deleteGrade = api.path('/grade/{grade_id}').method('delete').create();

export const editGrade = api.path('/grade/{grade_id}').method('patch').create();
