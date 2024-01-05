import * as React from 'react';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { TextField } from "@mui/material";
import Box from '@mui/material/Box'
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import { useReviewerContext } from '../../../../context/reviewerContextContext';
import { useNormalizerContext } from '../../../../context/normalizerContext';
import NFeedbackComments from './NormalizerFeedbackComments';

const Contain = styled("div")({
  // marginRight: "20px",
  // marginTop: '10px',
  // width: '1200',
  paddingTop: '0px',
  // paddingBottom:"20px"

});
const Tf = styled('div')({
  marginLeft: "35px",
  marginRight:"35px",
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
  marginLeft: "35px",
  marginRight: "35px",
  marginTop: "5px",
  fontSize: '14px',
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
  marginLeft: "35px",
  marginRight: "35px",
  marginTop: "5px",
  fontSize: '14px',
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
  marginLeft: "35px",
   marginBottom: '10px',
  color: "#717171",
  fontSize: '16px',
  fontFamily:"arial"
});
const ROrecommendation = styled("div")({
  marginLeft: "35px",
   marginBottom: '10px',
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
  const {empData,  reviewerOverallFeedback, setReviewerOverallFeedback ,normalizerOtherRecommendationComments, setNormalizerOtherRecommendationComments,normalizerOverallFeedComments, setNormalizerOverallFeedComments,appraiserOverallFeedback,setAppraiserOverallFeedback,normalizerComments,setNormalizerComments,setReviewerComments ,reviewerComments} = useNormalizerContext();
   //@ts-ignore
  //  const { reviewerOverallFeedComments, setReviewerOverallFeedback } = useReviewerContext()
  const [ otherRComments, setOtherRComments ] = useState('');
  console.log(reviewerComments,"reviewerComments")
  const [comments, setComments] = useState('');
  const handleCommentsChange = (e: any) => {
    // console.log(e);
    setComments(e.target.value)
    setnavPrompt(true)
}

useEffect(() => {
    //@ts-ignore
    // console.log(checkboxIdHandler(checkboxHandler(users)))
    // setNormalizerOverallFeedComments(comments)
    setNormalizerComments(comments)
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
  setReviewerOverallFeedback(comments1)
}, [comments1]);

useEffect(() => {
  //@ts-ignore
  // console.log(checkboxIdHandler(checkboxHandler(users)))
  setNormalizerOtherRecommendationComments(otherRComments)
}, [otherRComments]);
const [hidecomments, setHidcomments] = useState(false);

useEffect(() => {
  if (empData) {
      setReviewerOverallFeedback (() =>{
          return empData?.data?.reviewer?.reviewer_overall_feedback
      });  
      setAppraiserOverallFeedback (() =>{
          return empData?.data?.appraisal?.appraiser_overall_feedback
      });  
      // setNormalizerOverallFeedComments (() =>{
      //     return empData?.data?.normalizer?.normalizer_overall_feedback
      // });  
      setNormalizerComments(() =>{
        return empData?.data?.normalizer?.reason_for_rejection
    });  
    //  setReviewerComments(empData?.data?.reviewer?.reviewer_comments)
  }  
  if(reviewerComments == "" || reviewerComments == null || reviewerComments == undefined){
    setHidcomments(false)
}else{
    setHidcomments(true)
} 
}, [reviewerComments])

console.log(reviewerComments,"reviewerComments")

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
        {appraiserOverallFeedback !== "" && appraiserOverallFeedback !== null &&
        <>
        <div style={{marginBottom:"20px"}}>
        <ROrecommendation><b>Appraiser Message for Employee</b> </ROrecommendation>
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
          </div>
          </>
        }
         
            {empData?.data?.reviewer?.reviewer_comments !== undefined &&
                empData?.data?.reviewer?.reviewer_comments !== "" &&
                empData?.data?.reviewer?.reviewer_PA_rejected !== true && (
             <div style={{marginBottom:"20px"}}>
             <TrainingRecommendations>
               <b>Reviewer Comments</b>
            </TrainingRecommendations>
            <Contain>
                <Tf2>
                   
                        <TextField
                        // placeholder="Add"
                        size ="small"
                        //  fullWidth
                            // multiline
                            InputProps={{ readOnly: true }}
                            // inputProps={{ maxLength: 500 }}
                            // variant="standard"
                            autoComplete="off"
                    //   InputProps={{
                    //     disableUnderline: true,
                    //   }}
                            name="comments"
                            value={reviewerComments}
                            // onChange={e => {handleCommentsChange(e)
                            //     setnavPrompt(true);
                            //     setMoveTab(true);
                            // }}
                             />
                   
                </Tf2>
            </Contain>
            </div>
            )}
             {/* : 
            <div>
            <TrainingRecommendations>
          <b>Reviewer Rejection Reason</b>
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
                                // onChange={e => handleCommentsChange(e)}
                                 />
                        </Tf2>
                  
                </Contain>

           </div>
} */}
{/* <TrainingRecommendations>
               <b>HR Normalizer Rejection Reason</b>
               <span style={{
      fontSize:"22px",}}>*</span>
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
            </Contain> */}
        <NFeedbackComments employeeData={employeeData} 
moveTab={moveTab} setMoveTab={setMoveTab}        />
    </div>
  );
}

export default NormalizerOtherComments
