import SimpleBar from '@/components/ui/SimpleBar';
import { Button, TextField, makeStyles } from '@material-ui/core';
import { useState } from 'react';

import useEssay from '@/lib/essay/useEssay';

const useStyles = makeStyles(() => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '-15px',
  },
  textfield: {
    width: '400px',
  },
  textfield2: {
    width: '100%',
  },
}));

interface EssayEditProps {
  essayId: string;
  closeEdit: () => void;
}

/* This is a level 4 component (page component) */
export default function EssayEdit({ essayId, closeEdit }: EssayEditProps) {
  const classNames = useStyles();

  const { essay, editEssay } = useEssay(Number(essayId));

  const [label, setLabel] = useState(!essay ? 'error' : essay.challenge_label);
  const [title, setTitle] = useState(!essay ? 'error' : essay.title);
  const [description, setDescription] = useState(!essay ? 'error' : essay.description);

  const handleClickSave = async () => {
    await editEssay({ essay_id: Number(essayId), challenge_label: label, title, description });
    closeEdit();
  };

  return (
    <>
      <SimpleBar title="Label" noIndent>
        <TextField
          value={label}
          variant="outlined"
          onChange={(e) => {
            setLabel(e.target.value);
          }}
          className={classNames.textfield}
        />
      </SimpleBar>
      <SimpleBar title="Title" noIndent>
        <TextField
          value={title}
          variant="outlined"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className={classNames.textfield}
        />
      </SimpleBar>
      <SimpleBar title="Description" noIndent>
        <TextField
          placeholder="(Text, LaTeX, Markdown and HTML supported)"
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
        <Button color="default" onClick={() => closeEdit()}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleClickSave}>
          Save
        </Button>
      </div>
    </>
  );
}
