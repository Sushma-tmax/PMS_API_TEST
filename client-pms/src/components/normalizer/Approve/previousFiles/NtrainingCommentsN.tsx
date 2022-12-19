import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
import Blueadd from './Reviewericons/Blueadd.svg';
import Blueminus from './Reviewericons/Blueminus.svg';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IconButton } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNormalizerContext } from '../../../../context/normalizerContext';

const Contain = styled("div")({
  marginRight: "20px",
  marginTop: "10px",

});
const TrainingRecommendations = styled("div")({
  // marginLeft: "25px",
  marginTop: '10px',
  color: "#717171",
  fontSize: '16px',
fontFamily:"arial",
});

const Tf = styled('div')({
  // marginLeft: "25px",
  marginTop: "5px",
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
    padding: "8px",
  },
});





const NtrainingCommentsN = (props: any) => {
   // @ts-ignore
   const {normalizerTrainingRecommendationComments, setNormalizerTrainingRecommendationComments}=useNormalizerContext()
  const { setnavPrompt, navPrompt } = props;
  const [trainingComments, setTrainingComments] = useState();    

    const handleTrainingCommentsChange = (e: any) => {
        // setnavPrompt(true)
        console.log(e);
        setTrainingComments(e.target.value)
    } 

    useEffect(() => {
      setNormalizerTrainingRecommendationComments(trainingComments)
  }, [trainingComments])
  return (
    <div>
      {/* <TrainingRecommendations>
        <b> Training Recommendations Justification (Normalizer)</b>
      </TrainingRecommendations>
      <Contain>
        <Box>
          <Tf>
            <TextField fullWidth
            placeholder='Add'
              multiline
              inputProps={{ maxLength: 256 }}
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              size='small'
              name="comments"
              value={normalizerTrainingRecommendationComments || ""}
              onChange={e => handleTrainingCommentsChange(e)} />
          </Tf>
        </Box>
      </Contain> */}
    </div>
  )
}
export default NtrainingCommentsN