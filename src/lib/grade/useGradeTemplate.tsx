import useSWR from 'swr';
import { getGradeTemplateFile } from './fetchers';

const useGradeTemplate = () => {
  const gradeTemplateSWR = useSWR(`/grade/template`, () => getGradeTemplateFile({}));

  return {
    gradeTemplate: gradeTemplateSWR.data?.data.data,

    isLoading: {
      gradeTemplate: gradeTemplateSWR.isLoading,
    },

    error: {
      gradeTemplate: gradeTemplateSWR.error,
    },
  };
};

export default useGradeTemplate;
