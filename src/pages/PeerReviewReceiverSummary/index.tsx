import { Snackbar, makeStyles } from '@material-ui/core';
import range from 'lodash/range';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import BrowsingTable from '@/components/BrowsingTable';
import CopyToClipboardButton from '@/components/CopyToClipboardButton';
import PageTitle from '@/components/PageTitle';
import useChallenge from '@/lib/challenge/useChallenge';
import usePeerReview from '@/lib/peerReview/usePeerReview';
import useViewPeerReviewReceiverSummary, {
  PeerReviewSummaryReceiveSchema,
} from '@/lib/view/useViewPeerReviewReceiverSummary';

const useStyles = makeStyles(() => ({
  copyButton: {
    marginRight: '10px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
}));

const basicColumns1 = [
  {
    name: 'Receiver',
    align: 'center',
    minWidth: 139,
    type: 'link',
    formatLink: (datum: PeerReviewSummaryReceiveSchema) => `/user-profile/${datum.account_id}`,
  },
  {
    name: 'Student ID',
    align: 'center',
    minWidth: 155,
    type: 'string',
  },
  {
    name: 'Real Name',
    align: 'center',
    minWidth: 144,
    type: 'string',
  },
];

const basicColumns2 = [
  {
    name: 'Average Score',
    align: 'center',
    minWidth: 160,
    type: 'string',
  },
];

export default function PeerReviewReceiverSummary({
  courseId,
  classId,
  challengeId,
  peerReviewId,
  isNull,
}: {
  courseId: string;
  classId: string;
  challengeId: string;
  peerReviewId: string;
  isNull: string;
}) {
  const classes = useStyles();
  const history = useHistory();
  const { challenge } = useChallenge(Number(challengeId));
  const { peerReview } = usePeerReview(Number(peerReviewId));
  const { browsePeerReviewSummaryReceive, isLoading, error } = useViewPeerReviewReceiverSummary(Number(peerReviewId));

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [PRsummaryHTML, setPRsummaryHTML] = useState('');

  useEffect(() => {
    if (isNull && Number(isNull) === 1) {
      setShowSnackbar(true);
    }
  }, [isNull]);

  useEffect(() => {
    const baseUrl = window.location.origin;
    const HTML = browsePeerReviewSummaryReceive.data?.data
      .sort((a, b) => a.account_id - b.account_id)
      .map((data) => {
        const profile = `${baseUrl}/user-profile/${data.account_id}`;
        const peerData: { text: string | number; path: string }[] = range(peerReview?.max_review_count ?? 0).map(
          (id) => ({
            text: data?.peer_review_record_scores?.[id] ?? '',
            path: data.peer_review_record_ids
              ? `${baseUrl}/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/receive/${data.account_id}/${data.peer_review_record_ids[id]}`
              : '',
          }),
        );
        return [
          '<tr>',
          `<td><a href="${profile}">${data.username}</a></td>`,
          `<td>${data.student_id}</td>`,
          `<td>${data.real_name}</td>`,
          ...peerData.map((item) =>
            item.text !== '' ? `<td><a href="${item.path}">${item.text}</a></td>` : '<td></td>',
          ),
          data.average_score ? `<td>${data.average_score}</td>` : '<td></td>',
          '</tr>',
        ];
      })
      .reduce(
        (wholeTable, currRow) => wholeTable + currRow.reduce((wholeRow, currentColumn) => wholeRow + currentColumn, ''),
        // TODO: thead part?
        '<table>',
      );
    if (HTML) setPRsummaryHTML(`${HTML}</table>`);
  }, [
    browsePeerReviewSummaryReceive.data?.data,
    challengeId,
    classId,
    courseId,
    peerReview?.max_review_count,
    peerReviewId,
  ]);

  return (
    <>
      <PageTitle text={`${challenge?.title} / ${peerReview?.challenge_label} / Receiver Mode`} />
      <BrowsingTable<
        PeerReviewSummaryReceiveSchema,
        { id: string; Receiver: string; 'Student ID': string; 'Real Name': string; 'Average Score': string }
      >
        // FIXIT:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        columnsConfig={[
          ...basicColumns1,
          ...range(peerReview?.max_review_count ?? 0).map((peerIndex) => ({
            name: `Peer ${peerIndex + 1}`,
            align: 'center',
            minWidth: 100,
            type: 'link',
            formatLink: (item: PeerReviewSummaryReceiveSchema) =>
              `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/receive/${
                item.account_id
              }/${item.peer_review_record_ids.sort((a, b) => a - b)[peerIndex]}`,
          })),
          ...basicColumns2,
        ]}
        filterConfig={[
          {
            label: 'Receiver',
            dataColumn: 'username',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            label: 'Student ID',
            dataColumn: 'student_id',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            label: 'Real Name',
            dataColumn: 'real_name',
            type: 'TEXT',
            operator: 'LIKE',
          },
        ]}
        data={browsePeerReviewSummaryReceive.data?.data}
        dataToRow={(item) => {
          const peerData = item.peer_review_record_ids
            .map((id, index) => ({
              id,
              score: item.peer_review_record_scores[index],
            }))
            .sort((a, b) => a.id - b.id)
            .reduce(
              (acc, curr, index) => ({
                ...acc,
                [`Peer ${index + 1}`]: curr.score ?? '',
              }),
              {},
            );
          return {
            id: String(item.account_id),
            Receiver: item.username,
            'Student ID': item.student_id,
            'Real Name': item.real_name,
            'Average Score': String(item?.average_score ?? ''),
            link: item.peer_review_record_ids[0]
              ? `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/receive/${
                  item.account_id
                }/${item.peer_review_record_ids.sort((a, b) => a - b)[0]}`
              : `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/receiver-summary/1`,
            ...peerData,
          };
        }}
        isLoading={isLoading.browse}
        error={error.browse}
        pagination={browsePeerReviewSummaryReceive.pagination}
        filter={browsePeerReviewSummaryReceive.filter}
        sort={browsePeerReviewSummaryReceive.sort}
        buttons={
          <div className={classes.copyButton}>
            <CopyToClipboardButton text={PRsummaryHTML} />
          </div>
        }
        hasLink
      />
      <Snackbar
        open={showSnackbar}
        autoHideDuration={1500}
        onClose={() => {
          history.push(
            `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/receiver-summary`,
          );
          setShowSnackbar(false);
        }}
        message={"Code hasn't been assigned to anyone yet."}
      />
    </>
  );
}
