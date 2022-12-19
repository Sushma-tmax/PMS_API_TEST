import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
import Blueadd from '../Reviewericons/Blueadd.svg';
import Blueminus from '../Reviewericons/Blueminus.svg';
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
import { useReviewerContext } from "../../../../context/reviewerContextContext";
const Contain = styled("div")({
  marginRight: "20px",
  marginLeft: "25px",
  marginTop: "10px",

});
const TrainingRecommendations = styled("div")({
  marginLeft: "25px",
  marginTop: '25px',
  color: "#717171",
  fontSize: '16px',
  //opacity: 0.85
});

const Tfbox = styled('div')({
  width: '400px',
  backgroundColor: '#FFFFFF',
  '& .MuiInputLabel-root': {
      color: '#333333',
      opacity: '0.5',
      fontSize: '13px',
      fontWeight: '400',
      textTransform: 'none',
  },
});
const Tf = styled('div')({
  fontSize: '13x',

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
const Containers = styled('div')({
  marginTop: 18,
  marginLeft: 12,
  marginRight: 16
});
const Griditems1 = styled('div')({
  width: "33%", border: "1px solid #ddd", height: 75,
});
const Griditems2 = styled('div')({
  width: "33%", border: "1px solid #ddd", height: 75,
});
const Griditems3 = styled('div')({
  width: "33%", border: "1px solid #ddd", height: 75,
});
const TextField1 = styled(TextField)({
  backgroundColor: "#FFFFFF",
  borderRadius: "5px",
  //opacity: 0.7,
  "& .MuiInputBase-input": {
      color: "#333333",
      fontSize: "13px",
      fontWeight: "400",
      textTransform: "none",
      //opacity: 0.5
  },
  "& .MuiInputLabel-root": {
      color: "#333333",
      fontSize: "13px",
      fontWeight: "400",
      textTransform: "none",
      opacity: 0.5,
  },
  "& .MuiFormLabel-root": {
      lineHeight: "1.75em",
  },
  "& label.Mui-focused": {
      color: "#008E97",
  },
  "& .MuiInput-underline:after": {
      borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
      "& fieldset": {
          borderColor: "#EBEBEB",
          //backgroundColor: '#FFFFFF',
          color: "#333333",
          fontSize: "13px",
          fontWeight: "400",
          textTransform: "none",
          // opacity: 0.5
      },
      "&:hover fieldset": {
          borderColor: "#E7EEEE",
      },
      "&.Mui-focused fieldset": {
          borderColor: "#EBEBEB",
      },
  },
});

const Typo1 = styled("div")({

  marginTop: "-15px",
  fontSize: '13px',
  opacity: '0.5',
  fontWeight: '400',
  color: '#333333'

});

const Rtrecommendation1 = (props:any) => {
  const { training1Data,setnavPrompt,navPrompt } = props
    // @ts-ignore
    const { reviewerTrainingRecommendationComments, setReviewerTrainingRecommendationComments, } = useReviewerContext()

    const [trainingComments, setTrainingComments] = useState();    

    const handleTrainingCommentsChange = (e: any) => {
        setnavPrompt(true)
        console.log(e);
        setTrainingComments(e.target.value)
    } 

    useEffect(() => {
      setReviewerTrainingRecommendationComments(trainingComments)
  }, [trainingComments])


  return (
    <div>
       <TrainingRecommendations>
       <b>Training Recommendations Comments (Reviewer)</b>
            </TrainingRecommendations>
            <Contain>                
                <Box>
                    <Tf>
                        <TextField fullWidth
                            multiline
                            inputProps={{ maxLength: 512 }}
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            placeholder='Add'
                            size='small'
                            name="comments"
                            value={reviewerTrainingRecommendationComments || ""}
                            onChange={e => handleTrainingCommentsChange(e)} />
                    </Tf>
                </Box>
            </Contain>
    </div>
  )
}
export default Rtrecommendation1