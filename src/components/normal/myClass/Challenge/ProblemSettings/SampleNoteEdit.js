import React, { useState } from 'react';
import {
  Typography,
  makeStyles,
  TextField,
} from '@material-ui/core';
import AlignedText from '../../../../ui/AlignedText';

const useStyles = makeStyles((theme) => ({

}));

export default function SampleNoteEdit({
  sampleData, setSampleData,
}) {
  const classes = useStyles();

  //   {
  //     [id]: {
  //         id: testcases[id].id,
  //         no: sampleTransToNumber(id),
  //         time_limit: testcases[id].time_limit,
  //         memory_limit: testcases[id].memory_limit,
  //         score: testcases[id].score,
  //         input_filename: testcases[id].input_filename,
  //         output_filename: testcases[id].output_filename,
  //         in_file: null,
  //         out_file: null,
  //         input: null, // input content
  //         output: null, // output content
  //         label : note,
  //         new: false,
  //     }
  //   }

  return (
    <>
      {/* use map to display all sample card */}
    </>
  );
}
