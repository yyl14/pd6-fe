import { Button, Snackbar, Typography } from '@material-ui/core';
import { MathpixLoader, MathpixMarkdown } from 'mathpix-markdown-it';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AlignedText from '@/components/AlignedText';
import CodeArea from '@/components/CodeArea';
import PageTitle from '@/components/PageTitle';
import SimpleBar from '@/components/SimpleBar';
import Icon from '@/components/icon';
import NoMatch from '@/components/noMatch';
import useChallenge from '@/lib/challenge/useChallenge';
import useAccountPeerReviewRecords from '@/lib/peerReview/useAccountPeerReviewRecords';
import usePeerReview from '@/lib/peerReview/usePeerReview';
import usePeerReviewRecord from '@/lib/peerReview/usePeerReviewRecord';
import useProblem from '@/lib/problem/useProblem';
import useS3FileContent from '@/lib/s3File/useS3FileContent';
import useUserClasses from '@/lib/user/useUserClasses';
import BasicInfo from '@/pages/PeerReview/components/BasicInfo';
import GraderInfo from '@/pages/PeerReviewReceivedRecord/components/GraderInfo';
import ReceiverInfo from '@/pages/PeerReviewReceivedRecord/components/ReceiverInfo';
import PeerReviewReviewedRecordEdit from '@/pages/PeerReviewReviewedRecord/components/PeerReviewReviewedRecordEdit';
import { useStyles } from '@/pages/PeerReviewReviewedRecord/styles';

export default function PeerReviewReviewedRecord({
  courseId,
  classId,
  challengeId,
  peerReviewId,
  accountId,
  recordId,
}: {
  courseId: string;
  classId: string;
  challengeId: string;
  peerReviewId: string;
  accountId: string;
  recordId: string;
}) {
  const classes = useStyles();

  const { accountClasses: userClasses } = useUserClasses();
  const { challenge } = useChallenge(Number(challengeId));
  const { peerReview } = usePeerReview(Number(peerReviewId));
  const { problem: targetProblem } = useProblem(peerReview?.target_problem_id);
  const { challenge: targetChallenge } = useChallenge(targetProblem?.challenge_id);

  const { accountReviewedPeerReviewRecord: reviewedRecordIds } = useAccountPeerReviewRecords(
    Number(peerReviewId),
    Number(accountId),
  );
  const { peerReviewRecord, error } = usePeerReviewRecord(Number(recordId));
  const { fileContent: code } = useS3FileContent(
    peerReviewRecord?.file_uuid ?? null,
    peerReviewRecord?.filename ?? null,
  );

  const [role, setRole] = useState('GUEST');
  const [peerId, setPeerId] = useState(-1);
  const [edit, setEdit] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  useEffect(() => {
    if (userClasses?.filter((item) => item.class_id === Number(classId))?.[0]?.role) {
      setRole(userClasses?.filter((item) => item.class_id === Number(classId))[0].role);
    }
  }, [classId, userClasses]);

  useEffect(() => {
    if (peerReview) {
      const id = reviewedRecordIds?.findIndex((element) => element === Number(recordId)) ?? -1;
      if (id !== -1) setPeerId(id + 1);
    }
  }, [peerReview, reviewedRecordIds, recordId, accountId, peerReviewId]);

  if (role === 'GUEST' || peerId === -1) {
    return <NoMatch />;
  }
  return (
    <>
      {role === 'MANAGER' ? (
        <>
          <PageTitle text={`Peer Review Detail / Peer ${peerId}`} />
          <BasicInfo courseId={courseId} classId={classId} peerReviewId={peerReviewId} />
          {peerReviewRecord && (
            <>
              <ReceiverInfo accountId={peerReviewRecord.receiver_id} />
              <GraderInfo accountId={peerReviewRecord.grader_id} reviewedTime={peerReviewRecord.submit_time} />
            </>
          )}
        </>
      ) : (
        <>
          <PageTitle text={`${challenge?.title} / ${peerReview?.challenge_label} / Peer ${peerId}`} />
          <SimpleBar title="Original Problem">
            {peerReview?.challenge_id !== null && (
              <Link
                className={classes.textLink}
                to={`/my-class/${courseId}/${classId}/challenge/${peerReview?.challenge_id}/${peerReview?.target_problem_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${targetChallenge?.title} / ${targetProblem?.challenge_label}`}
                <Icon.NewWin className={classes.newTabIcon} />
              </Link>
            )}
          </SimpleBar>
          <SimpleBar title="Description">
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <MathpixLoader>
                {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  <MathpixMarkdown text={peerReview?.description} htmlTags />
                }
              </MathpixLoader>
            }
          </SimpleBar>
        </>
      )}
      <SimpleBar title="Code" noIndent>
        <CodeArea value={code} />
      </SimpleBar>
      {role === 'MANAGER' && (
        <>
          <SimpleBar title="Score">{peerReviewRecord?.score ?? ''}</SimpleBar>
          <SimpleBar title="Comment">{peerReviewRecord?.comment ?? ''}</SimpleBar>
        </>
      )}
      {role === 'NORMAL' &&
        (edit ? (
          <PeerReviewReviewedRecordEdit
            peerReviewId={peerReviewId}
            recordId={recordId}
            setEdit={setEdit}
            setShowErrorSnackbar={setShowErrorSnackbar}
          />
        ) : (
          <>
            <SimpleBar title="Review" buttons={<Button onClick={() => setEdit(true)}>Edit</Button>}>
              <AlignedText text="Score" childrenType="text">
                <Typography variant="body1">{peerReviewRecord?.score ?? ''}</Typography>
              </AlignedText>
              <AlignedText text="Comment" childrenType="text">
                <Typography variant="body1">{peerReviewRecord?.comment ?? ''}</Typography>
              </AlignedText>
            </SimpleBar>
          </>
        ))}
      <Snackbar
        open={showErrorSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setShowErrorSnackbar(false);
        }}
        message={`Error:  ${error.submit}`}
      />
    </>
  );
}
