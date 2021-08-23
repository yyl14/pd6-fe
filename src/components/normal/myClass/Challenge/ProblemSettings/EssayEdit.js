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
import Icon from '../../../../ui/icon/index';
import NoMatch from '../../../../noMatch';
import { editEssay } from '../../../../../actions/myClass/essay';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
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
}));

/* This is a level 4 component (page component) */
export default function EssayEdit({ closeEdit, role = 'NORMAL' }) {
  const {
    courseId, classId, challengeId, essayId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const essays = useSelector((state) => state.essay.byId);
  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.essay);

  const [label, setLabel] = useState(essays[essayId] === undefined ? 'error' : essays[essayId].challenge_label);
  const [title, setTitle] = useState(essays[essayId] === undefined ? 'error' : essays[essayId].title);
  const [description, setDescription] = useState(essays[essayId] === undefined ? '繳交作業時，請至 PDOGS（http://pdogs.ntu.im/judge/）為第一題上傳一份 Python 原始碼（以複製貼上原始碼的方式上傳）。每位學生都要上傳自己寫的解答。不接受紙本繳交；不接受遲交。\n \n 如果你在一家零售店幫消費的客人結帳，你可能需要快速地挑出合適且數量正確的鈔票與零錢。假設客人的消費金額 a 一定是 1 到 1000 之間的整數，而你有無限量的 500、100、50、10、5、1 這些面額的鈔票和零錢，我們希望你能依照下面的規則找錢： \n \n 此次作業包含一份手寫作業、一份程式作業、以及程式互改，前兩份作業分數總和為 110 分。作業四 的截止日期在 4 月 27 日。\n \n 此次作業包含一份手寫作業、一份程式作業、以及程式互改，前兩份作業分數總和為 110 分。作業四 的截止日期在 4 月 27 日。' : essays[essayId].description);

  const handleClickSave = () => {
    const body = {
      label: setLabel,
      title: setTitle,
      description: setDescription,
    };
    dispatch(editEssay(authToken, essayId));
    closeEdit();
  };
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
      <div className={classNames.buttons}>
        <Button color="default" onClick={() => closeEdit()}>Cancel</Button>
        <Button color="primary" onClick={handleClickSave}>Save</Button>
      </div>
    </>
  );
}
