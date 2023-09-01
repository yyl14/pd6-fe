import { useEffect, useState } from 'react';

import useProblem from '@/lib/problem/useProblem';
import useS3FileContent from '@/lib/s3File/useS3FileContent';

import { ReviserLanguageType } from '../types';

const useReviserEditFields = (problemId: number) => {
  const { problem } = useProblem(problemId);

  /** Input values */
  const [reviserIsEnabledInputValue, setReviserIsEnabledInputValue] = useState(false);
  const [reviserCodeInputValue, setReviserCodeInputValue] = useState('');
  const [reviserLanguageInputValue, setReviserLanguageInputValue] = useState<ReviserLanguageType>('python 3.8');

  const { fileContent: reviserCodeDefaultValue } = useS3FileContent(
    problem?.reviser?.code_uuid ?? null,
    problem?.reviser?.filename ?? null,
  );

  useEffect(() => {
    /** Initializes input values */
    if (problem?.reviser) {
      setReviserIsEnabledInputValue(problem.reviser_is_enabled);
      if (problem.reviser_is_enabled) {
        setReviserLanguageInputValue(problem.reviser.judge_language as ReviserLanguageType);
      }
    }
  }, [problem]);

  useEffect(
    /** Initializes reviser code input value */
    () => {
      if (reviserCodeDefaultValue) {
        setReviserCodeInputValue(reviserCodeDefaultValue);
      }
    },
    [reviserCodeDefaultValue],
  );

  return {
    hasInitialized: !!problem,

    reviserIsEnabledInputValue,
    reviserCodeInputValue,
    reviserLanguageInputValue,

    setReviserIsEnabledInputValue,
    setReviserCodeInputValue,
    setReviserLanguageInputValue,
  };
};

export default useReviserEditFields;
