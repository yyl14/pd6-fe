import fetchAPI from '@/lib/fetchAPI';

import api from '../api';

// useClassGrade()
export const importClassGrade = (
  url: string,
  {
    arg,
  }: {
    arg: {
      title: string;
      file: Blob;
    };
  },
) => {
  const formData = new FormData();
  formData.append('grade_file', arg.file);

  const options = {
    params: {
      title: arg.title,
    },
    method: 'POST',
    body: formData,
  };

  fetchAPI(url, options);
};

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
