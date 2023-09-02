import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import AlignedText from '@/components/AlignedText';
import SimpleBar from '@/components/SimpleBar';
import useAccount from '@/lib/account/useAccount';
import useAccountStudentCards from '@/lib/studentCard/useAccountStudentCards';

export default function AccountDelete({ accountId }: { accountId: number }) {
  const history = useHistory();

  const { studentCards } = useAccountStudentCards(accountId);
  const { account, deleteAccount } = useAccount(accountId);

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [accountDeleteErrorMessage, setAccountDeleteErrorMessage] = useState('');

  const handleDeleteAccount = async () => {
    setShowConfirmPopup(false);
    const res = await deleteAccount({ account_id: accountId });
    if (!res.ok) {
      setShowErrorPopup(true);
      setAccountDeleteErrorMessage(res.data.error);
    } else {
      setShowErrorPopup(false);
      history.push('/admin/account/account');
    }
  };

  return (
    <div>
      <SimpleBar
        title="Delete Account"
        childrenButtons={
          <>
            <Button
              color="secondary"
              onClick={() => {
                setShowConfirmPopup(true);
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <Typography>Once you delete this account, there is no going back. Please be certain.</Typography>
      </SimpleBar>
      {studentCards && (
        <Dialog open={showConfirmPopup} onClose={() => setShowConfirmPopup(false)} maxWidth="md">
          <DialogTitle>
            <Typography variant="h4">Delete account</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText variant="body1" color="secondary">
              <AlignedText text="Username" childrenType="text">
                <Typography>{account?.username}</Typography>
              </AlignedText>
              <AlignedText text="Student ID" childrenType="text">
                {studentCards?.length > 0 && <Typography>{studentCards.at(0)?.student_id}</Typography>}
              </AlignedText>
              <AlignedText text="Real name" childrenType="text">
                <Typography>{account?.real_name}</Typography>
              </AlignedText>
              <AlignedText text="Email" childrenType="text">
                {studentCards?.length > 0 && <Typography>{studentCards.at(0)?.email}</Typography>}
              </AlignedText>
              <Typography variant="body2" color="textPrimary">
                Once you delete a student information, there is no going back. Please be certain.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowConfirmPopup(false)}>Cancel</Button>
            <Button color="secondary" onClick={handleDeleteAccount}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        message={`Error: ${accountDeleteErrorMessage}`}
        key="errorMsg"
      />
    </div>
  );
}
