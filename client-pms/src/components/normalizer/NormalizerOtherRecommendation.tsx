import * as React from 'react';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { TextField } from "@mui/material";
import Box from '@mui/material/Box'
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import { useReviewerContext } from '../../context/reviewerContextContext';
import { useNormalizerContext } from '../../context/normalizerContext';
import NFeedbackComments from './NormalizerFeedbackComments';

const Contain = styled("div")({
  // marginRight: "20px",
  marginTop: '10px',
  // width: '1200',
  paddingTop: '0px',
  paddingBottom:"20px"

});
const Tf = styled('div')({
  marginLeft: "58px",
  marginRight:"58px",
    marginTop: "5px",
    // width: "92.5%",
    borderRadius: "5px",
    backgroundColor: "white",

    "& .MuiInputBase-input": {
      fontSize: "14px",
      fontWeight: "400",
      textTransform: "none",
      fontFamily: "Arial",
      color: "#333333",
      // padding: "4px",
      textAlign:"left"
    },
});
const Tf1 = styled('div')({
  marginLeft: "58px",
  marginRight: "58px",
  marginTop: "5px",
  fontSize: '13x',
  // width: "92.6%",
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
  //   width:"93%",
    fontWeight: "400",
    textTransform: "none",
    // padding: "4px",
    textAlign:"left"
  },
  "& .MuiTextField-root": {
      // color: "#333333",
      // fontSize: "13px",
      // fontWeight: "400",
      // textTransform: "none",
      // padding: "8px",
      width: "100%",
    },
});
const Tf2 = styled('div')({
  marginLeft: "58px",
  marginRight: "58px",
  marginTop: "5px",
  fontSize: '13x',
  // width: "92.5%",
  backgroundColor: "white",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
  //   width:"93%",
    fontWeight: "400",
    textTransform: "none",
    // padding: "4px",
    textAlign:"left"
  },
  "& .MuiTextField-root": {
      // color: "#333333",
      // fontSize: "13px",
      // fontWeight: "400",
      // textTransform: "none",
      // padding: "8px",
      width: "100%",
    },
});
const I1 = styled("div")({
  fontSize: '14px',
  color: '#008E97',
  opacity: 0.84
});
const TrainingRecommendations = styled("div")({
  marginLeft: "58px",
  // marginTop: '10px',
  color: "#717171",
  fontSize: '16px',
  fontFamily:"arial"
});
const ROrecommendation = styled("div")({
  marginLeft: "58px",
  marginTop: '20px',
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
const NormalizerOtherComments = (props: any) => {
  const { employeeData,other1Data,setnavPrompt,navPrompt,moveTab,setMoveTab } = props;
  // const [users, setUsers] = useState<any>([])
  //@ts-ignore
  const {empData, normalizerOtherRecommendationComments, setNormalizerOtherRecommendationComments,normalizerOverallFeedComments, setNormalizerOverallFeedComments,appraiserOverallFeedback,setAppraiserOverallFeedback } = useNormalizerContext();
   //@ts-ignore
   const { reviewerOverallFeedComments, setReviewerOverallFeedComments } = useReviewerContext()
  const [ otherRComments, setOtherRComments ] = useState('');
  
  const [comments, setComments] = useState('');
  const handleCommentsChange = (e: any) => {
    // console.log(e);
    setComments(e.target.value)
    setnavPrompt(true)
}

useEffect(() => {
    //@ts-ignore
    // console.log(checkboxIdHandler(checkboxHandler(users)))
    setNormalizerOverallFeedComments(comments)
}, [comments]);

  console.log(moveTab,"dd")

  const handleOtherCommentsChange = (e: any) => {
   //setnavPrompt(true)
    console.log(e);
    setOtherRComments(e.target.value)
    setnavPrompt(true)
}
const [comments1, setComments1] = useState();

useEffect(() => {
  setReviewerOverallFeedComments(comments1)
}, [comments1]);

useEffect(() => {
  //@ts-ignore
  // console.log(checkboxIdHandler(checkboxHandler(users)))
  setNormalizerOtherRecommendationComments(otherRComments)
}, [otherRComments]);
useEffect(() => {
  if (empData) {
      setReviewerOverallFeedComments (() =>{
          return empData?.data?.reviewer?.reviewer_overall_feedback
      });  
      setAppraiserOverallFeedback (() =>{
          return empData?.data?.appraisal?.appraiser_overall_feedback
      });  
      setNormalizerOverallFeedComments (() =>{
          return empData?.data?.normalizer?.normalizer_overall_feedback
      });  
  }       
}, [empData])



  return (
    <div >
      {/* <ROrecommendation>
        <b> Other Recommendations Justification (Normalizer)</b>
      </ROrecommendation>
<Contain>
        <Box>
          <Tf>
            <TextField
            //  fullWidth
              multiline
              inputProps={{ maxLength: 256 }}
              placeholder="Add"
              size='small'
              name="comments"
              variant="standard"
                      InputProps={{
                        disableUnderline: true,
                      }}
              value={normalizerOtherRecommendationComments || ""}
              onChange={e => handleOtherCommentsChange(e)} />
          </Tf>
        </Box>
        </Contain> */}
        <ROrecommendation><b>Appraiser Overall Feedback</b> </ROrecommendation>
          <Contain>
           
              <Tf>
                <TextField
                  //  fullWidth 
                  // placeholder="Add"
                  multiline
                  // autoComplete="off"
                  inputProps={{ maxLength: 500 }}
                  InputProps={{readOnly: true}}
                  fullWidth
                  size='small'
                  // variant="standard"
                  // rows={1}
                  // InputProps={{
                  //   disableUnderline: true,
                  // }}
                  // key={i._id}
                  value={appraiserOverallFeedback}></TextField>

              </Tf>
           
          </Contain>
          <TrainingRecommendations>
          <b>Reviewer Overall Feedback</b>
          </TrainingRecommendations>


          <Contain>

                        <Tf2>
                            <TextField 
                            // fullWidth
                            InputProps={{readOnly: true}}
                                multiline
                                inputProps={{ maxLength: 500 }}
                                // variant="standard"
                                // InputProps={{
                                //     disableUnderline: true,
                                // }}
                                // placeholder='Add'
                                size='small'
                                name="comments"
                                value={reviewerOverallFeedComments}
                                onChange={e => handleCommentsChange(e)} />
                        </Tf2>
                  
                </Contain>

          <TrainingRecommendations>
               <b>Normalizer Overall  Feedback</b>
            </TrainingRecommendations>
            <Contain>
                <Tf1>
                   
                        <TextField
                        placeholder="Add"
                        size ="small"
                        //  fullWidth
                            multiline
                            inputProps={{ maxLength: 500 }}
                            // variant="standard"
                            autoComplete="off"
                    //   InputProps={{
                    //     disableUnderline: true,
                    //   }}
                            name="comments"
                            value={ normalizerOverallFeedComments}
                            onChange={e => {handleCommentsChange(e)
                                setnavPrompt(true);
                                setMoveTab(true);
                            }} />
                   
                </Tf1>
            </Contain>

        <NFeedbackComments employeeData={employeeData} 
moveTab={moveTab} setMoveTab={setMoveTab}        />
    </div>
  );
}

export default NormalizerOtherComments
