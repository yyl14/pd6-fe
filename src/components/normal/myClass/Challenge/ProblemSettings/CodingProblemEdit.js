import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import SimpleBar from '../../../../ui/SimpleBar';
import SimpleTable from '../../../../ui/SimpleTable';
import Icon from '../../../../ui/icon/index';

import SampleUploadCard from './SampleUploadCard';
import NoMatch from '../../../../noMatch';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  sampleArea: {
    marginTop: '50px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textfield: {
    width: '400px',
  },
  textfield2: {
    width: '60vw',
  },
  loadButtons: {
    width: 'max-content',
  },
  statusSwitch: {
    marginTop: '20px',
  },
}));

/* This is a level 4 component (page component) */
export default function CodingProblemEdit({ closeEdit, role = 'NORMAL' }) {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const problems = useSelector((state) => state.problem.byId);
  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);

  const [label, setLabel] = useState(problems[problemId] === undefined ? 'error' : problems[problemId].challenge_label);
  const [title, setTitle] = useState(problems[problemId] === undefined ? 'error' : problems[problemId].title);
  const [description, setDescription] = useState(problems[problemId] === undefined ? '繳交作業時，請至 PDOGS（http://pdogs.ntu.im/judge/）為第一題上傳一份 Python 原始碼（以複製貼上原始碼的方式上傳）。每位學生都要上傳自己寫的解答。不接受紙本繳交；不接受遲交。\n \n 如果你在一家零售店幫消費的客人結帳，你可能需要快速地挑出合適且數量正確的鈔票與零錢。假設客人的消費金額 a 一定是 1 到 1000 之間的整數，而你有無限量的 500、100、50、10、5、1 這些面額的鈔票和零錢，我們希望你能依照下面的規則找錢： \n \n 此次作業包含一份手寫作業、一份程式作業、以及程式互改，前兩份作業分數總和為 110 分。作業四 的截止日期在 4 月 27 日。\n \n 此次作業包含一份手寫作業、一份程式作業、以及程式互改，前兩份作業分數總和為 110 分。作業四 的截止日期在 4 月 27 日。' : problems[problemId].description);
  const [ioDescription, setIoDescription] = useState('nothing');
  const [status, setStatus] = useState(false);

  const [samplePopUp, setSamplePopUp] = useState(false);

  const handleClosePopUp = () => {
    setSamplePopUp(false);
  };
  console.log(typeof samplePopUp);

  return (
    <>
      <SimpleBar title="Label">
        <TextField
          value={label}
          variant="outlined"
          onChange={(e) => {
            setLabel(e.target.value);
          }}
          className={classNames.textfield}
        />
      </SimpleBar>
      <SimpleBar title="Title">
        <TextField
          value={title}
          variant="outlined"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className={classNames.textfield}
        />
      </SimpleBar>
      <SimpleBar title="Description">
        <TextField
          value={description}
          variant="outlined"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          multiline
          minRows={10}
          maxRows={10}
          className={classNames.textfield2}
        />
      </SimpleBar>
      <SimpleBar title="About Input and Output">
        <TextField
          value={ioDescription}
          variant="outlined"
          onChange={(e) => {
            setIoDescription(e.target.value);
          }}
          multiline
          minRows={10}
          maxRows={10}
          className={classNames.textfield2}
        />
      </SimpleBar>
      <SimpleBar title="Sample">
        <div classNames={classNames.loadButtons}>
          <Button variant="outlined" color="primary" startIcon={<Icon.Upload />} onClick={() => setSamplePopUp(true)}>Upload</Button>
          <Button variant="outlined" color="inherit" startIcon={<Icon.Download />}>Download All Files</Button>
        </div>
        <SimpleTable
          isEdit={false}
          hasDelete={false}
          columns={[
            {
              id: 'No.',
              label: 'No.',
              minWidth: 40,
              align: 'center',
              width: 50,
              type: 'string',
            },
            {
              id: 'max_time',
              label: 'Max Time(ms)',
              minWidth: 50,
              align: 'center',
              width: 200,
              type: 'string',
            },
            {
              id: 'max_memory',
              label: 'Max Memory(kb)',
              minWidth: 50,
              align: 'center',
              width: 200,
              type: 'string',
            },
          ]}
          data={[]}
        />
      </SimpleBar>
      <SimpleBar
        title="Testing Data"
        buttons={(
          <FormControlLabel
            control={<Switch checked={status} onChange={() => setStatus(!status)} name="status" color="primary" />}
            label={status ? 'Enabled' : 'Disabled'}
            className={classNames.statusSwitch}
          />
        )}
      >
        <div classNames={classNames.loadButtons}>
          <Button variant="outlined" color="primary" startIcon={<Icon.Upload />}>Upload</Button>
          <Button variant="outlined" color="inherit" startIcon={<Icon.Download />}>Download All Files</Button>
        </div>
        <SimpleTable
          isEdit={false}
          hasDelete={false}
          columns={[
            {
              id: 'No.',
              label: 'No.',
              minWidth: 40,
              align: 'center',
              width: 50,
              type: 'string',
            },
            {
              id: 'max_time',
              label: 'Max Time(ms)',
              minWidth: 50,
              align: 'center',
              width: 300,
              type: 'string',
            },
            {
              id: 'max_memory',
              label: 'Max Memory(kb)',
              minWidth: 50,
              align: 'center',
              width: 300,
              type: 'string',
            },
            {
              id: 'score',
              label: 'score',
              minWidth: 50,
              align: 'center',
              width: 100,
              type: 'string',
            },
          ]}
          data={[]}
        />
      </SimpleBar>
      <SimpleBar title="Assisting Data (Optional)">
        <div classNames={classNames.loadButtons}>
          <Button variant="outlined" color="primary" startIcon={<Icon.Upload />}>Upload</Button>
          <Button variant="outlined" color="inherit" startIcon={<Icon.Download />}>Download All Files</Button>
        </div>
        <SimpleTable
          isEdit={false}
          hasDelete
          columns={[
            {
              id: 'filename',
              label: 'File Name',
              minWidth: 40,
              align: 'center',
              width: 100,
              type: 'string',
            },
          ]}
          data={[]}
        />
      </SimpleBar>
      <div className={classNames.buttons}>
        <Button color="default" onClick={() => closeEdit()}>Cancel</Button>
        <Button color="primary" onClick={() => closeEdit()}>Save</Button>
      </div>
      <SampleUploadCard popUp={samplePopUp} closePopUp={handleClosePopUp} action={handleClosePopUp} />
    </>
  );
}
