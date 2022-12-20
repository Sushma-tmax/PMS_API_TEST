import React, { useEffect, useState } from 'react';
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { useAppraiserRejectsReviewerContext } from '../../../context/AppraiserRejectsReviewer';

const Typo7 = styled("div")({
    marginLeft: "58px",
    // position: "absolute",
    marginTop: '20px',
    // color: '#008E97',
    // fontSize: '13px',
    // opacity: 0.85
    color: "#717171",
    fontSize: "16px",
    fontFamily: "arial"
});
const Contain = styled("div")({
    marginRight: "58px",
    marginLeft: "58px",
    marginTop: "10px",
});
const Tf = styled("div")({

    // backgroundColor: "#FFFFFF",
    // "& .MuiInputBase-root": {
    //     color: "#333333",
    //     fontSize: "14px",
    //     fontFamily:"Arial",
    //     textTransform: "none",
      
    // },

    // width:"90%",
    backgroundColor: "#FFFFFF",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily:"arial",
    fontWeight: "400",
    textTransform: "none",
    // padding: "4px",
    tetxAlign:"left"
  },
});

const ReviewerFeedbackComments = (props: any) => {
    const {navPrompt, setnavPrompt} = props;
    // @ts-ignoreotherRecommendation
    const { reviewerOverallFeedComments, appraiserFeedbackComments, setAppraiserFeedbackComments } = useAppraiserRejectsReviewerContext();
    const [otherComments, setOtherComments] = useState('');
    const [appraiserotherComments, setAppraiserOtherComments] = useState('');
    useEffect(() => {
        setOtherComments(reviewerOverallFeedComments)
    }, [reviewerOverallFeedComments])
    useEffect(() => {
        setAppraiserOtherComments(appraiserFeedbackComments)
    }, [appraiserFeedbackComments])

    const handleTrainingCommentsChange = (e: any) => {
        setnavPrompt(true)
        console.log(e);
        setAppraiserFeedbackComments(e.target.value)
    }
    return (
        <>
          {/* <div>
                <Typo7>
                    <p><b>Appraiser Feedback Comments</b></p>
                </Typo7>
                <Contain>
                    <Box>
                        <Tf>
                            <TextField fullWidth
                                size='small'
                                name="comments"
                                value={appraiserotherComments || ""} 
                                inputProps={{ maxLength: 512 }}
                                multiline
                                placeholder='Add'
                                variant="standard"
                                InputProps={{
                                  disableUnderline: true,
                                }}
                                onChange={e => handleTrainingCommentsChange(e)}
                                />
                        </Tf>
                    </Box>
                </Contain>
            </div> */}
            <div>
                <Typo7>
                    <b>Reviewer Overall Feedback</b> <span style={{fontSize:"22px",}}>*</span>
                </Typo7>
                <Contain>
                   
                        <Tf>
                            <TextField 
                             inputProps={{ maxLength: 500 }}
                            fullWidth 
                            InputProps={{ readOnly: true }}
                                size='small'
                                name="comments"
                                multiline
                                // variant="standard"
                                // placeholder='Add'
                                // InputProps={{
                                //   disableUnderline: true,
                                // }}
                                value={otherComments || ""} />
                        </Tf>
                  
                </Contain>
            </div>
          
        </>
    )
}

export default ReviewerFeedbackComments;
