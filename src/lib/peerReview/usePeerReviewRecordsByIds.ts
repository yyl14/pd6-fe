import useSWR from 'swr';

import { readPeerReviewRecord } from './fetchers';

const usePeerReviewRecordByIds = (reviewRecordIds: number[]) => {
  const readPeerReviewRecordByIds = useSWR(`${reviewRecordIds.join(', ')}`, () =>
    Promise.all(
      reviewRecordIds.map(async (peer_review_record_id) => {
        const item = await readPeerReviewRecord({ peer_review_record_id });
        return item;
      }),
    ),
  );

  return {
    peerReviewRecords: readPeerReviewRecordByIds.data,
  };
};

export default usePeerReviewRecordByIds;
