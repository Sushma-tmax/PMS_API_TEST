import * as React from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
import { Box } from '@mui/system';
import { useReviewerContext } from '../../../../context/reviewerContextContext';


const Contain = styled("div")({
    // marginRight: "20px",
    // marginLeft: "25px",
    marginTop: "10px",

});

const ItemHeading = styled("div")({
    // marginLeft: "25px",
    marginTop: '20px',
    color: "#717171",
    fontSize: "16px",
    fontFamily: "Arial"
});

const Tf = styled('div')({
    fontSize: '13x',
    backgroundColor: "#f8f8f8",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
        color: "#333333",
        fontSize: "14px",
        fontFamily: "arial",
        fontWeight: "400",
        textTransform: "none",
        // padding: "4px",
        textAlign: "left"
    },
});

const ReviewerFeedbackComments1 = (props: any) => {
    const { setMoveTab, setnavPrompt } = props
    // @ts-ignore
    const { reviewerComments, setReviewerComments,disableTextAfterSubmission } = useReviewerContext()

    const handleCommentsChange = (e: any) => {
        console.log(e);
        setReviewerComments(e.target.value)
        setMoveTab(false);
    }


    return (
        <>
            <div>
                <ItemHeading>
                    <b>Reviewer Comments</b>
                </ItemHeading>


                <Contain>
                    <Box>
                        <Tf>
                            <TextField 
                             InputProps={{ readOnly: disableTextAfterSubmission }}
                            // disabled={disableTextAfterSubmission}
                            fullWidth
                                multiline
                                // inputProps={{ maxLength: 500 }}
                                placeholder='Add'
                                size='small'
                                name="comments"
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