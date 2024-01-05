import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
import { Box } from '@mui/system';
import { useReviewerContext } from '../../../../context/reviewerContextContext';


const Contain = styled("div")({
    // marginRight: "20px",
    // marginLeft: "25px",
    marginTop: "10px",

});
const Typos1 = styled("div")({

    fontSize: '13px',
    color: '#333333',
    opacity: '0.7',
    marginLeft: "25px",
    marginTop: "10px",


});
const ItemHeading = styled("div")({
    // marginLeft: "25px",
    marginTop: '20px',
    color: "#717171",
    fontSize: "16px",
    fontFamily:"Arial"
});

const Tf = styled('div')({
    fontSize: '13x',

    backgroundColor: "#f8f8f8",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
        color: "#333333",
        fontSize: "14px",
        fontFamily:"arial",
        fontWeight: "400",
        textTransform: "none",
        // padding: "4px",
        textAlign:"left"
    },
});

const ReviewerFeedbackComments1 = (props: any) => {
    const { other1Data, employeeData, moveTab, setMoveTab, navPrompt,setnavPrompt } = props
   
    // @ts-ignore
    const { reviewerOverallFeedComments, setReviewerOverallFeedComments,reviewerComments,setReviewerComments,disableTextAfterSubmission, empData} = useReviewerContext()
    console.log(empData, 'employeeeeeData')
    const [comments, setComments] = useState();

    // const handleCommentsChange = (e: any) => {
    //     console.log(e);
    //     setReviewerOverallFeedComments(e.target.value)
    //     setMoveTab(false);
    // }
    const handleCommentsChange = (e: any) => {
            console.log(e);
            setReviewerComments(e.target.value)
            setMoveTab(false);
        }
 console.log(reviewerOverallFeedComments,"nn")
 console.log(reviewerComments,"reviewerComments")
    return (
        <>
        
            <div>
                <ItemHeading>
                    <b>Reviewer Comments</b>
                    {/* <span style={{
      fontSize:"22px",}}>*</span> */}
                </ItemHeading>
                <Contain>
                    <Box>
                        <Tf>
                            <TextField fullWidth
                                multiline
                                // inputProps={{ maxLength: 500 }}
                                // variant="standard"
                                // InputProps={{
                                //     disableUnderline: true,
                                // }}
                                InputProps={{ readOnly: disableTextAfterSubmission }}
                                // disabled={disableTextAfterSubmission}
                                placeholder='Add'
                                size='small'
                                name="comments"
                                // value={reviewerOverallFeedComments}
                                value={reviewerComments}
                                onChange={e => {
                                    handleCommentsChange(e);
                                    setMoveTab(true);
                                    setnavPrompt(true);
                            }} 
                            />
                        </Tf>
                    </Box>
                </Contain>


            </div>
        </>
    )
}
export default ReviewerFeedbackComments1