import { Button, FormControl, MenuItem, Select, TextField, makeStyles } from '@material-ui/core';
import { range } from 'lodash';
import { useState } from 'react';

import AlignedText from '@/components/AlignedText';
import SimpleBar from '@/components/SimpleBar';
import usePeerReview from '@/lib/peerReview/usePeerReview';
import usePeerReviewRecord from '@/lib/peerReview/usePeerReviewRecord';

const useStyles = makeStyles(() => ({
  textfield: {
    width: '40vw',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default function PeerReviewReviewedRecordEdit({
  peerReviewId,
  recordId,
  setEdit,
  setShowErrorSnackbar,
}: {
  peerReviewId: string;
  recordId: string;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setShowErrorSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const classes = useStyles();
  const { peerReview } = usePeerReview(Number(peerReviewId));
  const { peerReviewRecord, submitPeerReviewRecord } = usePeerReviewRecord(Number(recordId));

  const [score, setScore] = useState(peerReviewRecord?.score ?? peerReview?.min_score ?? '');
  const [comment, setComment] = useState(peerReviewRecord?.comment ?? '');

  const handleSubmit = async () => {
    try {
      if (score && comment)
        await submitPeerReviewRecord({ peer_review_record_id: Number(recordId), score: Number(score), comment });
    } catch {
      setShowErrorSnackbar(true);
    } finally {
      setEdit(false);
    }
  };

  return (
    <>
      <SimpleBar title="Review">
        <AlignedText text="Score" childrenType="field">
          <FormControl variant="outlined">
            <Select
              labelId="score"
              id="score"
              value={score}
              onChange={(e) => {
                setScore(Number(e.target.value));
              }}
            >
              {peerReview &&
                range(peerReview.min_score, peerReview.max_score + 1).map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </AlignedText>
        <AlignedText text="Comment" childrenType="field">
          <TextField
            value={comment}
            variant="outlined"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            className={classes.textfield}
            multiline
            minRows={5}
            maxRows={5}
          />
        </AlignedText>
      </SimpleBar>
      <div className={classes.buttons}>
        <Button
          color="default"
          onClick={() => {
            setEdit(false);
          }}
        >
          Cancel
        </Button>
        <Button disabled={!comment} color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
}
