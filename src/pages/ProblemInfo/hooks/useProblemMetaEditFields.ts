import { useEffect, useState } from 'react';

import useProblem from '@/lib/problem/useProblem';
import useProblemTestcases from '@/lib/testcase/useProblemTestcases';

const useProblemMetaEditFields = (problemId: number) => {
  const { problem } = useProblem(problemId);
  const { testcases } = useProblemTestcases(problemId);

  /** Input values */
  const [labelInputValue, setLabelInputValue] = useState('');
  const [titleInputValue, setTitleInputValue] = useState('');
  const [descriptionInputValue, setDescriptionInputValue] = useState('');
  const [ioDescriptionInputValue, setIoDescriptionInputValue] = useState('');
  const [sourceInputValue, setSourceInputValue] = useState('');
  const [hintInputValue, setHintInputValue] = useState('');
  const [testcaseIsDisabledInputValue, setTestcaseIsDisabledInputValue] = useState(false);

  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    /** Initializes problem meta input values */
    if (!problem || hasInitialized) {
      return;
    }

    setLabelInputValue(problem.challenge_label);
    setTitleInputValue(problem.title);
    setDescriptionInputValue(problem.description);
    setIoDescriptionInputValue(problem.io_description);
    setSourceInputValue(problem.source);
    setHintInputValue(problem.hint);

    setHasInitialized(true);
  }, [problem, hasInitialized]);

  useEffect(
    /** Initializes testcase disabled input value */
    () => {
      if (testcases) {
        setTestcaseIsDisabledInputValue(testcases.some((testcase) => testcase.is_disabled));
      }
    },
    [testcases],
  );

  return {
    hasInitialized,

    labelInputValue,
    titleInputValue,
    descriptionInputValue,
    ioDescriptionInputValue,
    sourceInputValue,
    hintInputValue,
    testcaseIsDisabledInputValue,

    setLabelInputValue,
    setTitleInputValue,
    setDescriptionInputValue,
    setIoDescriptionInputValue,
    setSourceInputValue,
    setHintInputValue,
    setTestcaseIsDisabledInputValue,
  };
};

export default useProblemMetaEditFields;
