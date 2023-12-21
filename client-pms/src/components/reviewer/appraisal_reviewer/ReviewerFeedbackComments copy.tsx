import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
import { Box } from '@mui/system';
import { useReviewerContext } from "../../../context/reviewerContextContext";


const Contain = styled("div")({
    marginRight: "58px",
    marginLeft: "58px",
    marginTop: "10px",

});
const Typos1 = styled("div")({

    fontSize: '13px',
    color: '#333333',
    opacity: '0.7',
    marginLeft: "58px",
    marginTop: "10px",


});
const ItemHeading = styled("div")({
    marginLeft: "58px",
    marginTop: '20px',
    color: "#717171",
    fontSize: "16px",
    fontFamily:"arial"
    //opacity: 0.85
});

const Tf = styled('div')({
    fontSize: '14x',

    // backgroundColor: '#FFFFFF',
    // '& .MuiInputLabel-root': {
    //     color: '#333333',
    //     opacity: '0.5',
    //     fontSize: '13px',
    //     fontWeight: '400',
    //     textTransform: 'none',
    // },
    backgroundColor: "#f8f8f8",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
      color: "#333333",
      fontSize: "14px",
      fontWeight: "400",
      textTransform: "none",
    //   padding: "4px",
      fontFamily:"arial",
      textAlign:"left"
    },
});

const ReviewerFeedbackComments = (props: any) => {
    const { other1Data, employeeData, setnavPrompt, moveTab, setMoveTab } = props

    // @ts-ignore
    const { reviewerOverallFeedComments, setReviewerOverallFeedComments } = useReviewerContext()
    console.log(reviewerOverallFeedComments, 'reviewerOverallFeedComments1')
    console.log(employeeData, 'employeeeeeData')
    const [comments, setComments] = useState(reviewerOverallFeedComments);

    // const handleCommentsChange = (e: any) => {
    //     console.log(e);
    //     setReviewerOverallFeedComments(e.target.value)
    // }

    // useEffect(() => {
    //     setComments(reviewerOverallFeedComments)
    // }, [reviewerOverallFeedComments]);

    const handleCommentsChange = (e: any) => {
        console.log(e);
        setComments(e.target.value)
        setnavPrompt(true)
    }

    useEffect(() => {
        setReviewerOverallFeedComments(comments)
    }, [comments,employeeData]);

    return (
        <>

            <div>
                <ItemHeading>
                    <b>Reviewer Overall Feedback </b>
                </ItemHeading>
                <Contain>
                    <Box>
                        <Tf>
                            <TextField 
                            fullWidth
                                multiline
                                inputProps={{ maxLength: 500 }}
                                // variant="standard"
                                // InputProps={{
                                //     disableUnderline: true,
                                // }}
                                placeholder='Add'
                                size='small'
                                name="comments"
                                value={comments || ""}
                                onChange={(e) => {handleCommentsChange(e);
                                setMoveTab(true);
                            }}
                                 />
                        </Tf>
                    </Box>
                </Contain>


            </div>
        </>

    );
}

export default ReviewerFeedbackComments

