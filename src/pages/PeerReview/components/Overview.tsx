import SimpleBar from '@/components/ui/SimpleBar';
import SimpleTable from '@/components/ui/SimpleTable';
import useAccountPeerReviewRecords from '@/lib/peerReview/useAccountPeerReviewRecords';
import usePeerReviewRecordByIds from '@/lib/peerReview/usePeerReviewRecordsByIds';

export default function Overview({ peerReviewId, accountId }: { peerReviewId: string; accountId: string }) {
  const { accountReviewedPeerReviewRecord: reviewRecordIds } = useAccountPeerReviewRecords(
    Number(peerReviewId),
    Number(accountId),
  );
  const { peerReviewRecords } = usePeerReviewRecordByIds(reviewRecordIds?.sort((a, b) => a - b) ?? []);

  return (
    <SimpleBar title="Overview" noIndent>
      <SimpleTable
        // TODO: remove after refactor SimpleTable
        buttons={null}
        setData={null}
        //
        isEdit={false}
        hasDelete={false}
        columns={[
          {
            id: 'peer',
            label: 'Peer',
            minWidth: 50,
            align: 'center',
            width: 60,
            type: 'string',
          },
          {
            id: 'status',
            label: 'Status',
            minWidth: 50,
            align: 'center',
            width: 60,
            type: 'string',
          },
        ]}
        data={
          peerReviewRecords?.map((item, index) => ({
            id: `Peer${index + 1}`,
            peer: `Peer${index + 1}`,
            status: item?.data.data.submit_time ? 'Done' : 'Not Yet',
          })) ?? []
        }
      />
    </SimpleBar>
  );
}
