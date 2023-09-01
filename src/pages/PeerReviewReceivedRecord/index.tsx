import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

import AlignedText from '@/components/AlignedText';
import CodeArea from '@/components/CodeArea';
import PageTitle from '@/components/PageTitle';
import SimpleBar from '@/components/SimpleBar';
import NoMatch from '@/components/noMatch';
import useAccountPeerReviewRecords from '@/lib/peerReview/useAccountPeerReviewRecords';
import usePeerReview from '@/lib/peerReview/usePeerReview';
import usePeerReviewRecord from '@/lib/peerReview/usePeerReviewRecord';
import useS3FileContent from '@/lib/s3File/useS3FileContent';
import useUserClasses from '@/lib/user/useUserClasses';
import BasicInfo from '@/pages/PeerReview/components/BasicInfo';
import GraderInfo from '@/pages/PeerReviewReceivedRecord/components/GraderInfo';
import ReceiverInfo from '@/pages/PeerReviewReceivedRecord/components/ReceiverInfo';

export default function PeerReviewReceivedRecord({
  courseId,
  classId,
  peerReviewId,
  accountId,
  recordId,
}: {
  courseId: string;
  classId: string;
  peerReviewId: string;
  accountId: string;
  recordId: string;
}) {
  const { accountClasses: userClasses } = useUserClasses();
  const { peerReview } = usePeerReview(Number(peerReviewId));
  const { accountReceivedPeerReviewRecord: receiveRecordIds } = useAccountPeerReviewRecords(
    Number(peerReviewId),
    Number(accountId),
  );
  const { peerReviewRecord } = usePeerReviewRecord(Number(recordId));
  const { fileContent: code } = useS3FileContent(
    peerReviewRecord?.file_uuid ?? null,
    peerReviewRecord?.filename ?? null,
  );

  const [role, setRole] = useState('GUEST');
  const [peerId, setPeerId] = useState(-1);

  useEffect(() => {
    if (userClasses?.filter((item) => item.class_id === Number(classId))?.[0]?.role) {
      setRole(userClasses?.filter((item) => item.class_id === Number(classId))[0].role);
    }
  }, [classId, userClasses]);

  useEffect(() => {
    if (peerReview) {
      const id = receiveRecordIds?.findIndex((element) => element === Number(recordId)) ?? -1;
      if (id !== -1) {
        setPeerId(id + 1);
      }
    }
  }, [peerReview, receiveRecordIds, recordId, accountId, peerReviewId]);

  if (role === 'GUEST' || peerId === -1) {
    return <NoMatch />;
  }

  return (
    <>
      {role === 'MANAGER' ? (
        <PageTitle text={`Peer Review Detail / Peer ${peerId}`} />
      ) : (
        <PageTitle text={`Received Peer Review Detail / Peer ${peerId}`} />
      )}
      <BasicInfo courseId={courseId} classId={classId} peerReviewId={peerReviewId} />
      {role === 'MANAGER' && (
        <>
          {peerReviewRecord?.receiver_id && <ReceiverInfo accountId={peerReviewRecord.receiver_id} />}
          {peerReviewRecord?.grader_id && (
            <GraderInfo accountId={peerReviewRecord?.grader_id} reviewedTime={peerReviewRecord?.submit_time} />
          )}
        </>
      )}
      <SimpleBar title="Code" noIndent>
        <CodeArea value={code} />
      </SimpleBar>
      {role === 'MANAGER' ? (
        <>
          <SimpleBar title="Score">{peerReviewRecord?.score}</SimpleBar>
          <SimpleBar title="Comment">{peerReviewRecord?.comment}</SimpleBar>
        </>
      ) : (
        <>
          <SimpleBar title="Review">
            <AlignedText text="Score" childrenType="text">
              <Typography variant="body1">{peerReviewRecord?.score}</Typography>
            </AlignedText>
            <AlignedText text="Comment" childrenType="text">
              <Typography variant="body1">{peerReviewRecord?.comment}</Typography>
            </AlignedText>
          </SimpleBar>
        </>
      )}
    </>
  );
}
