import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import SimpleBar from '../../../../../ui/SimpleBar';
import SimpleTable from '../../../../../ui/SimpleTable';

/* This is a level 4 component (page component) */
// This page is for normal.
export default function Overview() {
  const peerReviewRecords = useSelector((state) => state.peerReviewRecords);

  const [tableData, setTableData] = useState([
    { peer: 'peer1', status: 'Not Yet' },
    { peer: 'peer1', status: 'Not Yet' },
  ]);

  useEffect(() => {
    setTableData(
      peerReviewRecords.allIds.map((id) => {
        const item = peerReviewRecords.byId[id];
        return ({
          peer: item.receiver_id,
          status: item.submit_time,
        });
      }),
    );
    console.log('peerReviewRecords :', peerReviewRecords);
  }, [peerReviewRecords]);

  return (
    <>
      <SimpleBar title="Overview" noIndent>
        <SimpleTable
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
          data={tableData}
        />
      </SimpleBar>
    </>
  );
}
