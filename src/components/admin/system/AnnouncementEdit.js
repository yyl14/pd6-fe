import React, { useState } from 'react';
import {
  Typography, Button, Grid,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const AnnouncementEdit = () => {
  const [popUp, setPopUp] = useState(false);
  const [popUpDelete, setPopUpDelete] = useState(false);
  const handleClick = () => {
    setPopUp(true);
  };
  const handleClosePopUp = () => {
    setPopUp(false);
  };
  const handleSubmit = (e) => {

  };

  const handleClickDelete = () => {
    setPopUpDelete(true);
  };
  const handleClosePopUpDelete = () => {
    setPopUpDelete(false);
  };
  const handleSubmitDelete = (e) => {

  };

  return (
    <div>
      <h1>Edit</h1>
    </div>
  );
};

export default AnnouncementEdit;
