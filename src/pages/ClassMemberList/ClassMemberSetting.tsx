import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { useHistory } from 'react-router-dom';

import useBrowseClassMembersWithAccountReferral from '@/lib/class/useBrowseClassMembersWithAccountReferral';
import useReplaceClassMembers from '@/lib/class/useReplaceClassMembers';
import useViewClassMembers from '@/lib/view/useViewClassMembers';

type AccountType = {
  account_referral: string;
  role: string;
};

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  editorCol: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px 23px 16px 23px',
    width: '26.4%',
  },
  editorItem: {
    marginBottom: '12px',
  },
  textField: {
    width: '100%',
    marginTop: '0px',
  },
  buttonsBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '50px',
  },
  leftButton: {
    marginRight: '18px',
  },
  dialogContent: {
    padding: '0px 24px 6px 24px',
  },
  failedList: {
    marginTop: '16px',
  },
  dialogButtons: {
    justifyContent: 'space-between',
  },
  backToEditButton: {
    marginLeft: '24px',
  },
  buttonFlexEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}));

const ClassMemberSetting = ({
  classId,
  backToMemberList,
}: {
  classId: string;
  backToMemberList: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const classNames = useStyles();
  const history = useHistory();

  const {
    browseClassMembers: { refresh: browseClassMembersRefresh },
  } = useViewClassMembers(Number(classId));
  const { browseClassMembersWithAccountReferral } = useBrowseClassMembersWithAccountReferral(Number(classId));
  const { replaceClassMembers, error: replaceClassMembersError } = useReplaceClassMembers(Number(classId));

  const [TA, setTA] = useState('');
  const [student, setStudent] = useState('');
  const [guest, setGuest] = useState('');

  const [hasInitialized, setHasInitialized] = useState(false);
  const [TAChanged, setTAChanged] = useState(false);
  const [studentChanged, setStudentChanged] = useState(false);
  const [guestChanged, setGuestChanged] = useState(false);

  const [duplicateList, setDuplicateList] = useState<string[]>([]);
  const [errorDetectedList, setErrorDetectedList] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState(false);
  const [showUnsavedChangesDialog, setShowUnsavedChangesDialog] = useState(false);
  const [showDuplicateIdentityDialog, setShowDuplicateIdentityDialog] = useState(false);
  const [showErrorDetectedDialog, setShowErrorDetectedDialog] = useState(false);
  const [targetPath, setTargetPath] = useState('');
  const unblockHandle = useRef<() => void>();

  // unblock user leaving current page through header and sidebar links
  // and push to original target location if necessary
  const unblockAndReturn = (needRedirection: boolean) => {
    backToMemberList(needRedirection);
    if (unblockHandle.current) {
      unblockHandle.current();
      setShowDuplicateIdentityDialog(false);
      setShowErrorDetectedDialog(false);
      setHasInitialized(false);
      if (needRedirection) {
        history.push(targetPath);
      }
    }
  };
  // remove empty elements in an array
  const handleBlankListForAccountType = (list: AccountType[]) =>
    list.filter((element) => element.role !== '' && element.account_referral !== '');

  const handleBlankListForStringType = (list: string[]) => list.filter((element) => element !== '');

  useEffect(() => {
    const classMembers = browseClassMembersWithAccountReferral;
    if (!hasInitialized && classMembers !== undefined) {
      setTA(
        classMembers
          .filter((item) => item.member_role === 'MANAGER')
          .map((member) => member.member_referral)
          .join('\n'),
      );
      setStudent(
        classMembers
          .filter((item) => item.member_role === 'NORMAL')
          .map((member) => member.member_referral)
          .join('\n'),
      );
      setGuest(
        classMembers
          .filter((item) => item.member_role === 'GUEST')
          .map((member) => member.member_referral)
          .join('\n'),
      );
      setHasInitialized(true);
    }
  }, [hasInitialized, browseClassMembersWithAccountReferral]);

  // block user leaving current page through header and sidebar links (if contents have been changed)
  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const unblock = history.block((location) => {
      if (TAChanged || studentChanged || guestChanged) {
        setTargetPath(location.pathname);
        setShowUnsavedChangesDialog(true);
        return false;
      }
    });

    unblockHandle.current = unblock;
  }, [targetPath, TAChanged, guestChanged, history, studentChanged]);

  // block user leaving current page through browser close button and refresh button
  // (if any dialog is shown, or contents have been changed)
  useBeforeunload((e: BeforeUnloadEvent) => {
    if (showErrorDetectedDialog || showDuplicateIdentityDialog) {
      e.preventDefault();
    } else if (TAChanged || studentChanged || guestChanged) {
      e.preventDefault();
      setShowUnsavedChangesDialog(true);
    }
  });

  const handleChangeTA = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTA(e.target.value);
    setTAChanged(
      e.target.value !==
        browseClassMembersWithAccountReferral
          ?.filter((item) => item.member_role === 'MANAGER')
          .map((member) => member.member_referral)
          .join('\n'),
    );
  };
  const handleChangeStudent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStudent(e.target.value);
    setStudentChanged(
      e.target.value !==
        browseClassMembersWithAccountReferral
          ?.filter((item) => item.member_role === 'NORMAL')
          .map((member) => member.member_referral)
          .join('\n'),
    );
  };
  const handleChangeGuest = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGuest(e.target.value);
    setGuestChanged(
      e.target.value !==
        browseClassMembersWithAccountReferral
          ?.filter((item) => item.member_role === 'GUEST')
          .map((member) => member.member_referral)
          .join('\n'),
    );
  };

  const handleClickCancel = () => {
    if (TAChanged || studentChanged || guestChanged) {
      setShowUnsavedChangesDialog(true);
    } else {
      setHasInitialized(false);
      unblockAndReturn(false);
    }
  };
  const handleUnsave = () => {
    setShowUnsavedChangesDialog(false);
    setHasInitialized(false);
    unblockAndReturn(true);
  };
  const handleSave = async (saveWithDialog: boolean) => {
    setShowUnsavedChangesDialog(false);

    if (TAChanged || studentChanged || guestChanged) {
      const TAStudentDuplicateList = TA.split('\n').filter(
        (id: string) =>
          student
            .split('\n')
            .map((accountReferral) => accountReferral)
            .indexOf(id) !== -1,
      );
      const guestStudentDuplicateList = guest.split('\n').filter(
        (id: string) =>
          student
            .split('\n')
            .map((accountReferral) => accountReferral)
            .indexOf(id) !== -1,
      );
      const guestTADuplicateList = guest.split('\n').filter(
        (id: string) =>
          TA.split('\n')
            .map((accountReferral) => accountReferral)
            .indexOf(id) !== -1,
      );

      const combinedDuplicateList = handleBlankListForStringType(
        TAStudentDuplicateList.concat(guestStudentDuplicateList, guestTADuplicateList),
      );
      setDuplicateList(combinedDuplicateList);

      if (combinedDuplicateList.length !== 0) {
        setShowDuplicateIdentityDialog(true);
      } else {
        const TATransformedList = TA.split('\n').map((accountReferral) => ({
          account_referral: accountReferral,
          role: 'MANAGER',
        }));
        const studentTransformedList = student.split('\n').map((accountReferral) => ({
          account_referral: accountReferral,
          role: 'NORMAL',
        }));
        const guestTransformedList = guest.split('\n').map((accountReferral) => ({
          account_referral: accountReferral,
          role: 'GUEST',
        }));

        const replacingList = handleBlankListForAccountType(
          TATransformedList.concat(studentTransformedList, guestTransformedList),
        );

        // if data is saved with dialog, redirection is needed
        try {
          const data = await replaceClassMembers({ class_id: Number(classId), members: replacingList });
          const failedList = data.data
            .reduce((acc, cur, index) => (cur === false ? acc.concat(index) : acc), [] as number[])
            .map((index) => replacingList[index].account_referral);

          setHasInitialized(false);
          if (failedList.length === 0) {
            unblockAndReturn(saveWithDialog);
          } else {
            setErrorDetectedList(failedList);
            setShowErrorDetectedDialog(true);
          }
        } catch {
          setSubmitError(true);
        }
        browseClassMembersRefresh();
      }
    } else {
      unblockAndReturn(false);
    }
  };

  return (
    <div>
      <Typography variant="body1">
        Account: NTU Student ID, Institute Email or #Username (priority from high to low accordingly)
      </Typography>
      <br />
      <Card className={classNames.card} variant="outlined">
        <div className={classNames.editorCol}>
          <div className={classNames.editorItem}>
            <Typography variant="body1">TA</Typography>
          </div>
          <div className={classNames.editorItem}>
            <Typography variant="caption">List of Accounts</Typography>
          </div>
          <TextField
            className={classNames.textField}
            value={TA}
            onChange={(e) => handleChangeTA(e)}
            multiline
            minRows={20}
            maxRows={20}
            placeholder="B01234567&#10;aaa@ntnu.edu.tw&#10;#pdogs"
          />
        </div>
        <div className={classNames.editorCol}>
          <div className={classNames.editorItem}>
            <Typography variant="body1">Student</Typography>
          </div>
          <div className={classNames.editorItem}>
            <Typography variant="caption">List of Accounts</Typography>
          </div>
          <TextField
            className={classNames.textField}
            value={student}
            onChange={(e) => handleChangeStudent(e)}
            multiline
            minRows={20}
            maxRows={20}
            placeholder="B01234567&#10;aaa@ntnu.edu.tw&#10;#pdogs"
          />
        </div>
        <div className={classNames.editorCol}>
          <div className={classNames.editorItem}>
            <Typography variant="body1">Guest</Typography>
          </div>
          <div className={classNames.editorItem}>
            <Typography variant="caption">List of Accounts</Typography>
          </div>
          <TextField
            className={classNames.textField}
            value={guest}
            onChange={(e) => handleChangeGuest(e)}
            multiline
            minRows={20}
            maxRows={20}
            placeholder="B01234567&#10;aaa@ntnu.edu.tw&#10;#pdogs"
          />
        </div>
      </Card>
      <div className={classNames.buttonsBar}>
        <Button onClick={handleClickCancel} className={classNames.leftButton}>
          Cancel
        </Button>
        <Button onClick={() => handleSave(false)} color="primary">
          Save
        </Button>
      </div>
      <Dialog open={showUnsavedChangesDialog} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Unsaved Changes</Typography>
        </DialogTitle>
        <DialogContent className={classNames.dialogContent}>
          <Typography variant="body1">
            You have unsaved changes, do you want to save your changes or back to edit?
          </Typography>
        </DialogContent>
        <DialogActions className={classNames.dialogButtons}>
          <Button
            variant="outlined"
            onClick={() => setShowUnsavedChangesDialog(false)}
            className={classNames.backToEditButton}
          >
            Back to Edit
          </Button>
          <div>
            <Button onClick={handleUnsave}>Don’t Save</Button>
            <Button onClick={() => handleSave(true)} color="primary">
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <Dialog open={showDuplicateIdentityDialog} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Duplicate Identity</Typography>
        </DialogTitle>
        <DialogContent className={classNames.dialogContent}>
          <Typography variant="body1">
            The following accounts appear in more than one column. Please remove duplicate identities.
          </Typography>
          <div className={classNames.failedList}>
            {duplicateList.map((account) => (
              <Typography variant="body1" key={`duplicate-${account}`}>
                {account}
              </Typography>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => setShowDuplicateIdentityDialog(false)}
            className={classNames.buttonFlexEnd}
          >
            Back to Edit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showErrorDetectedDialog} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Error Detected</Typography>
        </DialogTitle>
        <DialogContent className={classNames.dialogContent}>
          {submitError ? (
            <>
              <Typography variant="body1">Save member failed due to the following reasons:</Typography>
              <Typography variant="body1" className={classNames.failedList}>
                {replaceClassMembersError.replaceClassMembers?.message}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body1">Changes saved, but error detected in the following accounts:</Typography>
              <div className={classNames.failedList}>
                {errorDetectedList.map((accountReferral) => (
                  <Typography variant="body1" key={`errorDetected-${accountReferral}`}>
                    {accountReferral}
                  </Typography>
                ))}
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {submitError ? (
            <Button
              color="primary"
              onClick={() => setShowErrorDetectedDialog(false)}
              className={classNames.buttonFlexEnd}
            >
              Back to Edit
            </Button>
          ) : (
            <Button color="primary" onClick={handleUnsave} className={classNames.buttonFlexEnd}>
              Back to Member List
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClassMemberSetting;
