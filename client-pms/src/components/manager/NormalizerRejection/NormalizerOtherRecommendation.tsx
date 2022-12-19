import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
import { Box } from '@mui/system';
import { useAppraiserRejectsNormalizerContext } from '../../../context/AppraiserRejectsNormalizer';
import NAreaofImprovementComments from './NormalizerAreaComments';
import NFeedbackComments from '../../normalizer/NormalizerFeedbackComments';

const Contain = styled("div")({
  marginLeft: "58px",
  marginRight: "20px",
  marginTop: '10px',
  width: '1200',
  paddingTop: '0px'

});
const Tf = styled('div')({
  // fontSize: '13x',
 width:"93%",
  backgroundColor: "white",
  '& .MuiInputLabel-root': {
    color: '#333333',
    opacity: '0.5',
    fontSize: '14px',
    fontWeight: '400',
    textTransform: 'none',
    borderRadius: "5px",
  },
});
const I1 = styled("div")({
  fontSize: '14px',
  color: '#008E97',
  opacity: 0.84
});
const ROrecommendation = styled("div")({
  marginLeft: "75px",
  marginTop: '25px',
  color: "#717171",
  fontSize: '16px',
  // opacity: 0.85,

});
const Labels = styled("div")({
  fontSize: '14px',
  color: 'rgb(0 142 151/84%)',
  // opacity: 0.84,
  marginLeft: '5px'
});
const NormalizerOtherComments = (props: any) => {
  const { other1Data,navPrompt, setnavPrompt } = props;
  // const [users, setUsers] = useState<any>([])
  //@ts-ignore
  const { normalizerOtherRecommendationComments, setNormalizerOtherRecommendationComments } = useAppraiserRejectsNormalizerContext();
  const [ otherRComments, setOtherRComments ] = useState('');


  useEffect(() => {
    //@ts-ignore
    // console.log(checkboxIdHandler(checkboxHandler(users)))
    setOtherRComments(normalizerOtherRecommendationComments)
  }, [normalizerOtherRecommendationComments]);

  const handleOtherCommentsChange = (e: any) => {
    setnavPrompt(true)
    console.log(e);
    setNormalizerOtherRecommendationComments(e.target.value)
}   



  return (
    <div>
      {/* <ROrecommendation>
       <b>  Other Recommendations Comments</b>
      </ROrecommendation>
      <Contain>

        <Box>
          <Tf>
            <TextField 
            // fullWidth
            disabled
              multiline
              size='small'
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              name="comments"
              value={otherRComments || ""}
              onChange={e => handleOtherCommentsChange(e)} />
          </Tf>
        </Box>
      </Contain> */}
      {/* <NFeedbackComments /> */}
    </div>
  );
}

export default NormalizerOtherComments
