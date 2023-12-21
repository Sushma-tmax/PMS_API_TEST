import * as React from 'react';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { TextField } from "@mui/material";
import Box from '@mui/material/Box'
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import { useNormalizerContext } from '../../../../context/normalizerContext';

const Contain = styled("div")({
    marginRight: "20px",
    marginTop: '10px',
    width: '1200',
    paddingTop: '0px'
  
  });
  const Tf = styled('div')({
    // marginLeft: "25px",
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
  const I1 = styled("div")({
    fontSize: '14px',
    color: '#008E97',
    opacity: 0.84
  });
  const ROrecommendation = styled("div")({
    // marginLeft: "25px",
    marginTop: '25px',
    color: "#717171",
    fontSize: '16px',
fontFamily:"arial"  
  });
  const Labels = styled("div")({
    fontSize: '14px',
    color: 'rgb(0 142 151/84%)',
    // opacity: 0.84,
    marginLeft: '5px'
  });


const NormalizerOtherCommentsN = (props:any) => {
// @ts-ignore
const {normalizerOtherRecommendationComments,setNormalizerOtherRecommendationComments,normalizerComments,setNormalizerComments} = useNormalizerContext()
    const { other1Data,setnavPrompt,navPrompt } = props;
    // const [ otherRComments, setOtherRComments ] = useState('');
    const handleOtherCommentsChange = (e: any) => {
    //  setnavPrompt(true)
      console.log(e);
      setOtherComments(e.target.value)
  }
  console.log(normalizerComments,"normalizerComments")
  const [otherComments, setOtherComments] = useState();

  useEffect(() => {
    setNormalizerOtherRecommendationComments(otherComments)
}, [otherComments])
  return (
    <div>
        {/* <ROrecommendation>
       <b>  Other Recommendations Justification (Normalizer)</b>
      </ROrecommendation>
<Contain>
        <Box>
          <Tf>
            <TextField fullWidth
              multiline
              placeholder='Add'
              inputProps={{ maxLength: 256 }}
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              size='small'
              name="comments"
              value={normalizerOtherRecommendationComments || ""}
              onChange={e => handleOtherCommentsChange(e)} />
          </Tf>
        </Box>
        </Contain> */}
    </div>
  )
}
export default NormalizerOtherCommentsN