import { Button, FormControl, MenuItem, Select, Snackbar, makeStyles } from '@material-ui/core';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';

import AlignedText from '@/components/ui/AlignedText';
import CodeField from '@/components/ui/CodeField';
import PageTitle from '@/components/ui/PageTitle';
import useChallenge from '@/lib/challenge/useChallenge';
import useProblem from '@/lib/problem/useProblem';
import useSubmit from '@/lib/submission/useSubmit';
import useSubmitLangs from '@/lib/submitLang/useSubmitLangs';

const useStyles = makeStyles(() => ({
  selectField: {
    width: '300px',
  },
  bottomButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '35px',
    marginRight: '-5px',
  },
  snackbarWidth: {
    width: '650px',
  },
}));

export default function CodeSubmission({
  challengeId,
  problemId,
  handleSubmissionSuccess,
  handleCancel,
}: {
  challengeId: string;
  problemId: string;
  handleSubmissionSuccess: () => void;
  handleCancel: () => void;
}) {
  const classNames = useStyles();

  const { challenge } = useChallenge(Number(challengeId));
  const { problem } = useProblem(Number(problemId));
  const { submitLangs } = useSubmitLangs();
  const { submit, error: submitError } = useSubmit(Number(problemId));

  const enabledLangs = useMemo(() => submitLangs?.filter((lang) => !lang.is_disabled) ?? [], [submitLangs]);

  const [langId, setLangId] = useState<number | null>(null);
  const [code, setCode] = useState('');

  const [currentTime] = useState(moment());
  const [warningPopup, setWarningPopup] = useState(false);

  useEffect(() => {
    if (challenge && currentTime.isAfter(moment(challenge.end_time))) {
      setWarningPopup(true);
    }
  }, [challenge, currentTime]);

  useEffect(() => {
    const localStorageLangId = localStorage.getItem('langId');
    if (localStorageLangId && enabledLangs.some((lang) => lang.id === Number(localStorageLangId))) {
      setLangId(Number(localStorageLangId));
    } else {
      setLangId(enabledLangs.at(0)?.id || null);
    }
  }, [enabledLangs]);

  const handleSubmit = async () => {
    if (!langId) return;

    await submit({ problem_id: Number(problemId), language_id: langId, content: code });

    localStorage.setItem('langId', String(langId));
    handleSubmissionSuccess();
  };

  return (
    <>
      <PageTitle text={`${challenge?.title} / ${problem?.challenge_label} / Code Submission`} />
      <AlignedText text="Language" maxWidth="lg" childrenType="field">
        <FormControl variant="outlined" className={classNames.selectField}>
          <Select
            labelId="lang"
            id="lang"
            value={langId}
            onChange={(e) => {
              setLangId(e.target.value as number);
            }}
          >
            {enabledLangs.map((lang) => (
              <MenuItem key={lang.id} value={lang.id}>
                {`${lang.name} ${lang.version}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </AlignedText>
      <AlignedText text="Content" maxWidth="lg" childrenType="field">
        <CodeField
          value={code}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCode(e.target.value);
          }}
        />
      </AlignedText>
      <div className={classNames.bottomButton}>
        <Button color="default" onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit} disabled={code === '' || langId === -1}>
          Submit
        </Button>
      </div>
      <Snackbar
        open={warningPopup}
        ContentProps={{
          className: classNames.snackbarWidth,
        }}
        message="Submission over deadline will not be considered in score calculation."
        onClose={() => setWarningPopup(false)}
      />
      <Snackbar open={!!submitError.submit} autoHideDuration={3000} message={`Error: ${submitError.submit}`} />
    </>
  );
}
