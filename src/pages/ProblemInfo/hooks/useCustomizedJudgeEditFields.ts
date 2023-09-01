import { useEffect, useState } from 'react';

import useProblem from '@/lib/problem/useProblem';
import useS3FileContent from '@/lib/s3File/useS3FileContent';

import { JudgeLanguageType } from '../types';

const useCustomizedJudgeEditFields = (problemId: number) => {
  const { problem } = useProblem(problemId);

  /** Input values */
  const [judgeTypeInputValue, setJudgeTypeInputValue] = useState<'NORMAL' | 'CUSTOMIZED'>('NORMAL');
  const [judgeCodeInputValue, setJudgeCodeInputValue] = useState('');
  const [judgeLanguageInputValue, setJudgeLanguageInputValue] = useState<JudgeLanguageType>('python 3.8');

  const { fileContent: judgeCodeDefaultValue } = useS3FileContent(
    problem?.judge_source?.code_uuid ?? null,
    problem?.judge_source?.filename ?? null,
  );

  useEffect(() => {
    /** Initializes input values */
    if (problem?.judge_source) {
      setJudgeTypeInputValue(problem.judge_type);
      if (problem.judge_type === 'CUSTOMIZED') {
        setJudgeLanguageInputValue(problem.judge_source.judge_language as JudgeLanguageType);
      }
    }
  }, [problem]);

  useEffect(
    /** Initializes judge code input value */
    () => {
      if (judgeCodeDefaultValue) {
        setJudgeCodeInputValue(judgeCodeDefaultValue);
      }
    },
    [judgeCodeDefaultValue],
  );

  return {
    hasInitialized: !!problem,

    judgeTypeInputValue,
    judgeCodeInputValue,
    judgeLanguageInputValue,

    setJudgeTypeInputValue,
    setJudgeCodeInputValue,
    setJudgeLanguageInputValue,
  };
};

export default useCustomizedJudgeEditFields;
