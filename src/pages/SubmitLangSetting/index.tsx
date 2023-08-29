import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';

import GeneralLoading from '@/components/GeneralLoading';
import NoMatch from '@/components/noMatch';
import AlignedText from '@/components/ui/AlignedText';
import PageTitle from '@/components/ui/PageTitle';
import SimpleBar from '@/components/ui/SimpleBar';
import useReduxStateShape from '@/hooks/useReduxStateShape';
import useSubmitLang from '@/lib/submitLang/useSubmitLang';
import useSubmitLangs from '@/lib/submitLang/useSubmitLangs';

export default function SubmitLangSetting({ submitLangId }: { submitLangId: string }) {
  const { submitLangs, mutateSubmitLangs, isLoading } = useSubmitLangs();
  const [submitLangById, submitLangIds] = useReduxStateShape(submitLangs);
  const { editSubmitLang } = useSubmitLang(Number(submitLangId));
  const [popUp, setPopUp] = useState(false);
  const [languageStatus, setLanguageStatus] = useState(false);
  const [changeLanguageStatus, setChangeLanguageStatus] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    setSubmit(false);
    setPopUp(false);
  }, [submit]);

  useEffect(() => {
    if (submitLangIds.length !== 0) {
      setLanguageStatus(submitLangById[submitLangId].is_disabled);
    }
  }, [submitLangId, submitLangById, submitLangIds]);

  if (submitLangById[submitLangId] === undefined) {
    if (isLoading.browseAll) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  const handleEditSubmitLanguage = async () => {
    try {
      await editSubmitLang({
        language_id: Number(submitLangId),
        name: submitLangById[submitLangId].name,
        version: submitLangById[submitLangId].version,
        is_disabled: languageStatus,
      });
      setChangeLanguageStatus(false);
      setSubmit(true);
      mutateSubmitLangs();
      // eslint-disable-next-line no-empty
    } catch {}
  };

  return (
    <>
      <PageTitle text={`${submitLangById[submitLangId].name} ${submitLangById[submitLangId].version} / Setting`} />
      <SimpleBar title="Submission Language Information">
        <AlignedText text="Language" childrenType="text">
          <Typography variant="body1">{submitLangById[submitLangId].name}</Typography>
        </AlignedText>
        <AlignedText text="Version" childrenType="text">
          <Typography variant="body1">{submitLangById[submitLangId].version}</Typography>
        </AlignedText>
        <AlignedText text="Status" childrenType="text">
          <Typography variant="body1">{submitLangById[submitLangId].is_disabled ? 'Disabled' : 'Enabled'}</Typography>
        </AlignedText>
      </SimpleBar>

      <SimpleBar
        title="Change Institute Status"
        childrenButtons={
          <>
            <Button onClick={() => setPopUp(true)} color="secondary">
              Change Status
            </Button>
          </>
        }
      >
        <Typography variant="body1">
          Once you change the status, future submission will be affected. Please be certain.
        </Typography>
      </SimpleBar>

      <Dialog open={popUp}>
        <DialogTitle>
          <Typography variant="h4">Change Submission Language</Typography>
        </DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Switch
                checked={!languageStatus} // true = Disable
                onChange={() => {
                  setLanguageStatus(!languageStatus);
                  setChangeLanguageStatus(languageStatus === submitLangById[submitLangId].is_disabled);
                }}
                color="primary"
              />
            }
            label={languageStatus ? 'Disabled' : 'Enabled'}
          />
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">
            Once you change the status, future submission will be affected. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopUp(false)} color="default">
            Cancel
          </Button>
          <Button
            onClick={() => handleEditSubmitLanguage()}
            color="secondary"
            disabled={changeLanguageStatus === false}
          >
            Modify
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
