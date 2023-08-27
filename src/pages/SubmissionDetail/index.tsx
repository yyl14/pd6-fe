import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';
import moment from 'moment';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import AlignedText from '@/components/ui/AlignedText';
import CodeArea from '@/components/ui/CodeArea';
import PageTitle from '@/components/ui/PageTitle';
import SimpleBar from '@/components/ui/SimpleBar';
import SimpleTable from '@/components/ui/SimpleTable';
import Icon from '@/components/ui/icon/index';
import useUserClassRole from '@/hooks/useUserClassRole';
import useAccount from '@/lib/account/useAccount';
import useChallenge from '@/lib/challenge/useChallenge';
import useJudgementJudgeCases from '@/lib/judgeCase/useJudgementJudgeCases';
import useSubmissionLatestJudgement from '@/lib/judgement/useSubmissionLatestJudgement';
import useProblem from '@/lib/problem/useProblem';
import useS3FileContent from '@/lib/s3File/useS3FileContent';
import useSubmission from '@/lib/submission/useSubmission';
import useSubmitLangs from '@/lib/submitLang/useSubmitLangs';
import useProblemTestcase from '@/lib/testcase/useProblemTestcases';
import { TestcaseSchema } from '@/lib/testcase/useTestcase';
import useUserClasses from '@/lib/user/useUserClasses';

import useStyles from './useStyles';

/* This is a level 4 component (page component) */
export default function SubmissionDetail({
  courseId,
  classId,
  challengeId,
  problemId,
  submissionId,
}: {
  courseId: string;
  classId: string;
  challengeId: string;
  problemId: string;
  submissionId: string;
}) {
  const classNames = useStyles();
  const [popUp, setPopUp] = useState(false);
  const role = useUserClassRole(Number(classId));

  const { challenge } = useChallenge(Number(challengeId));
  const { problem } = useProblem(Number(problemId));
  const { submission, mutateSubmission, rejudge } = useSubmission(Number(submissionId));
  const { submissionLatestJudgement, mutateSubmissionLatestJudgement } = useSubmissionLatestJudgement(
    Number(submissionId),
  );
  const { testcases } = useProblemTestcase(Number(problemId));
  const { submitLangs } = useSubmitLangs();
  const { accountClasses: userClasses } = useUserClasses();

  const { account } = useAccount(submission?.account_id ?? null);
  const { fileContent: submissionContent } = useS3FileContent(
    submission?.content_file_uuid ?? null,
    submission?.filename ?? null,
  );
  const { judgeCases } = useJudgementJudgeCases(submissionLatestJudgement?.id ?? null);

  const submitLang = submitLangs?.find((lang) => lang.id === submission?.id);

  const isInUserClass = userClasses?.some((userClass) => userClass.class_id === Number(classId)) ?? false;
  const baseUrl = isInUserClass ? 'my-class' : 'problem-set';

  const getSampleTestCaseOrder = (testCase: TestcaseSchema): number => {
    if (testCase.input_filename !== null) {
      return Number(testCase.input_filename.slice('sample'.length, testCase.input_filename.indexOf('.')));
    }
    if (testCase.output_filename !== null) {
      return Number(testCase.output_filename.slice('sample'.length, testCase.output_filename.indexOf('.')));
    }
    return -1;
  };

  const getNonSampleTestCaseOrder = (testCase: TestcaseSchema): number => {
    if (testCase.input_filename !== null) {
      return Number(testCase.input_filename.slice(0, testCase.input_filename.indexOf('.')));
    }
    if (testCase.output_filename !== null) {
      return Number(testCase.output_filename.slice(0, testCase.output_filename.indexOf('.')));
    }
    return -1;
  };

  const getTestCaseLabel = (testCase: TestcaseSchema): string => {
    if (testCase.input_filename !== null) {
      return testCase.input_filename.slice(0, testCase.input_filename.indexOf('.'));
    }
    if (testCase.output_filename !== null) {
      return testCase.output_filename.slice(0, testCase.output_filename.indexOf('.'));
    }
    return '';
  };

  const sampleTestCases = testcases?.filter((testcase) => testcase.is_sample);
  const nonSampleTestCases = testcases?.filter((testcase) => !testcase.is_sample);

  const sampleTestCaseTableData = (
    sampleTestCases?.map((testcase) => {
      const judgeCase = judgeCases?.find(({ testcase_id }) => testcase_id === testcase.id);
      return {
        id: testcase.id,
        order: getSampleTestCaseOrder(testcase),
        no: getTestCaseLabel(testcase),
        time: judgeCase?.time_lapse,
        memory: judgeCase?.peak_memory,
        status: startCase(toLower(judgeCase?.verdict)),
        score: judgeCase?.score,
      };
    }) ?? []
  ).sort((a, b) => a.order - b.order);

  const nonSampleTestcaseTableData = (
    nonSampleTestCases?.map((testcase) => {
      const judgeCase = judgeCases?.find(({ testcase_id }) => testcase_id === testcase.id);
      return {
        id: testcase.id,
        order: getNonSampleTestCaseOrder(testcase),
        no: getTestCaseLabel(testcase),
        time: judgeCase?.time_lapse,
        memory: judgeCase?.peak_memory,
        status: startCase(toLower(judgeCase?.verdict)),
        score: judgeCase?.score,
      };
    }) ?? []
  ).sort((a, b) => a.order - b.order);

  const tableData = sampleTestCaseTableData.concat(nonSampleTestcaseTableData);

  const handleRefresh = () => {
    mutateSubmission();
    mutateSubmissionLatestJudgement();
  };

  const handleRejudge = () => {
    rejudge({ submission_id: Number(submissionId) });
    setPopUp(false);
  };

  return (
    <>
      <PageTitle text={`${submissionId} / Submission Detail`} />
      <div className={classNames.generalButtons}>
        {role === 'MANAGER' && (
          <Button
            onClick={() => {
              setPopUp(true);
            }}
          >
            Rejudge
          </Button>
        )}
        <Button color="primary" startIcon={<Icon.RefreshOutlinedIcon />} onClick={handleRefresh}>
          Refresh
        </Button>
      </div>
      <SimpleBar title="Submission Information">
        <AlignedText text="Submission ID" childrenType="text">
          <Typography variant="body1">{submissionId}</Typography>
        </AlignedText>
        <AlignedText text="Username" childrenType="text">
          <Link to={`/6a/user-profile/${account?.id}`} className={classNames.textLink}>
            <Typography variant="body1">{account?.username}</Typography>
          </Link>
        </AlignedText>
        <AlignedText text="Student ID" childrenType="text">
          <Typography variant="body1">{account?.student_id}</Typography>
        </AlignedText>
        <AlignedText text="Real Name" childrenType="text">
          <Typography variant="body1">{account?.real_name}</Typography>
        </AlignedText>
        <AlignedText text="Challenge" childrenType="text">
          <Link to={`/6a/${baseUrl}/${courseId}/${classId}/challenge/${challengeId}`} className={classNames.textLink}>
            <Typography variant="body1">{challenge?.title}</Typography>
          </Link>
        </AlignedText>
        <AlignedText text="Task Label" childrenType="text">
          <Link
            to={`/6a/${baseUrl}/${courseId}/${classId}/challenge/${challengeId}/problem/${problemId}`}
            className={classNames.textLink}
          >
            <Typography variant="body1">{problem?.challenge_label}</Typography>
          </Link>
        </AlignedText>
        <AlignedText text="Task Title" childrenType="text">
          <Typography variant="body1">{problem?.title}</Typography>
        </AlignedText>
        <AlignedText text="Status" childrenType="text">
          {submissionLatestJudgement ? (
            <div>
              {submissionLatestJudgement.verdict === 'ACCEPTED' ? (
                <Typography variant="body1" className={classNames.acceptedStatus}>
                  {startCase(toLower(submissionLatestJudgement.verdict))}
                </Typography>
              ) : (
                <Typography variant="body1" color="secondary">
                  {startCase(toLower(submissionLatestJudgement.verdict))}
                </Typography>
              )}
            </div>
          ) : (
            <Typography variant="body1">Waiting for judge</Typography>
          )}
        </AlignedText>
        <AlignedText text="Score" childrenType="text">
          {submissionLatestJudgement && (
            <div>
              <Typography variant="body1">{submissionLatestJudgement.score}</Typography>
            </div>
          )}
        </AlignedText>
        <AlignedText text="Submit Time" childrenType="text">
          <Typography variant="body1">{moment(submission?.submit_time).format('YYYY-MM-DD, HH:mm:ss')}</Typography>
        </AlignedText>
        <AlignedText text="Language" childrenType="text">
          {submitLang && <Typography variant="body1">{`${submitLang.name} ${submitLang.version}`}</Typography>}
        </AlignedText>
      </SimpleBar>
      <SimpleBar title="Submission Result" noIndent>
        <SimpleTable
          isEdit={false}
          hasDelete={false}
          setData={() => {}}
          buttons={<></>}
          columns={[
            {
              id: 'no',
              label: 'No.',
              minWidth: 30,
              align: 'center',
              width: 400,
              type: 'string',
            },
            {
              id: 'time',
              label: 'Time (ms)',
              minWidth: 50,
              align: 'center',
              width: 600,
              type: 'string',
            },
            {
              id: 'memory',
              label: 'Memory (kb)',
              minWidth: 50,
              align: 'center',
              width: 600,
              type: 'string',
            },
            {
              id: 'status',
              label: 'Status',
              minWidth: 50,
              align: 'center',
              width: 600,
              type: 'string',
              colors: {
                'Waiting for judge': 'default',
                'No Status': 'error',
                Accepted: 'accepted',
                'Wrong Answer': 'error',
                'Memory Limit Exceed': 'error',
                'Time Limit Exceed': 'error',
                'Runtime Error': 'error',
                'Compile Error': 'error',
                'Contact Manager': 'error',
                'Forbidden Action': 'error',
                'System Error': 'error',
              },
            },
            {
              id: 'score',
              label: 'Score',
              minWidth: 50,
              align: 'center',
              width: 600,
              type: 'string',
            },
          ]}
          data={tableData}
        />
      </SimpleBar>
      <SimpleBar title="Code" noIndent>
        <CodeArea value={submissionContent} />
      </SimpleBar>
      <Dialog
        maxWidth="md"
        open={popUp}
        onClose={() => {
          setPopUp(false);
        }}
      >
        <DialogTitle>
          <Typography variant="h4">Rejudge Submission</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Submission ID" childrenType="text">
            <Typography variant="body1">{submissionId}</Typography>
          </AlignedText>
          <Typography variant="body2">
            Once you rejudge a submission, the corresponding score and status may change.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPopUp(false);
            }}
          >
            Cancel
          </Button>
          <Button color="secondary" onClick={handleRejudge}>
            Rejudge
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
