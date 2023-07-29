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
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useReduxStateShape from '../../../hooks/useReduxStateShape';
import useSubmitLang from '../../../lib/submitLang/useSubmitLang';
import useSubmitLangs from '../../../lib/submitLang/useSubmitLangs';
import GeneralLoading from '../../GeneralLoading';
import NoMatch from '../../noMatch';
import AlignedText from '../../ui/AlignedText';
import PageTitle from '../../ui/PageTitle';
import SimpleBar from '../../ui/SimpleBar';

/* This is a level 4 component (page component) */
export default function LangSetting() {
  const { languageId } = useParams();
  const { submitLangs, mutateSubmitLangs } = useSubmitLang();
  const [submitLangById, submitLangIds] = useReduxStateShape(submitLangs);
  const { editSubmitLang } = useSubmitLangs(submitLangIds);
  const loading = useSelector((state) => state.loading.admin.system.fetchAnnouncement);
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
      setLanguageStatus(submitLangById[languageId].is_disabled);
    }
  }, [languageId, submitLangById, submitLangIds]);

  if (submitLangById[languageId] === undefined) {
    if (loading.fetchSubmitLanguage) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  const handleEditSubmitLanguage = async () => {
    try {
      const res = editSubmitLang({
        language_id: languageId,
        name: submitLangById[languageId].name,
        version: submitLangById[languageId].version,
        is_disabled: languageStatus,
      });
      if ((await res).ok) {
        setChangeLanguageStatus(false);
        setSubmit(true);
        mutateSubmitLangs();
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <>
      <PageTitle text={`${submitLangById[languageId].name} ${submitLangById[languageId].version} / Setting`} />
      <SimpleBar title="Submission Language Information">
        <AlignedText text="Language" childrenType="text">
          <Typography variant="body1">{submitLangById[languageId].name}</Typography>
        </AlignedText>
        <AlignedText text="Version" childrenType="text">
          <Typography variant="body1">{submitLangById[languageId].version}</Typography>
        </AlignedText>
        <AlignedText text="Status" childrenType="text">
          <Typography variant="body1">{submitLangById[languageId].is_disabled ? 'Disabled' : 'Enabled'}</Typography>
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
                  setChangeLanguageStatus(languageStatus === submitLangById[languageId].is_disabled);
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
