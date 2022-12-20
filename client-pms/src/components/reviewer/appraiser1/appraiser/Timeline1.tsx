import React, { useState } from "react";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

export default function LeftPositionedTimeline() {
  const [title, setTitle] = useState('');
  const [textfeildError, settextfeildError] = useState(false);
  //console.log(setName);
  const handleSubmit = (e: any) => {
    e.preventDefault()
    settextfeildError(false)

    if (title == "") {
      //  console.log(title)
      settextfeildError(true)
    }

  };

  return (
    <div>

      <TextField
        error={textfeildError}
        //helperText="Incorrect entry."
        helperText={textfeildError ? 'required':" "}
        inputProps={{ maxLength: 256 }}

        onChange={(e) => setTitle(e.target.value)}  >
      </TextField>
      <Button onClick={handleSubmit} >save</Button>
      {/* <TextField
        error={!title}
       value={title}
        helperText={!title ? 'required':" "}
        onChange={(e) => setTitle(e.target.value)}  >
      </TextField> */}

    </div>
  );
}
