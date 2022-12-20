import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
import { Box } from '@mui/system';
import { useReviewerContext } from "../../../context/reviewerContextContext";
import { useAppraiserRejectsReviewerContext } from '../../../context/AppraiserRejectsReviewer';

const Contain = styled("div")({
    marginRight: "20px",
    marginLeft: "25px",
    marginTop: "10px",

});
const ItemHeading = styled("div")({
    marginLeft: "25px",
    marginTop: '10px',
    color: "#717171",
  fontSize: "16px",
    //opacity: 0.85
});

const Tf = styled('div')({
    fontSize: '13x',

    backgroundColor: '#FFFFFF',
    '& .MuiInputLabel-root': {
        color: '#333333',
        opacity: '0.5',
        fontSize: '13px',
        fontWeight: '400',
        textTransform: 'none',
    },
});

const ReviewerAreaComments = (props: any) => {
    const { other1Data } = props

    // @ts-ignore
    const { reviewerAreaImprovementComments, setReviewerAreaImprovementComments  } = useReviewerContext()

    const [comments, setComments] = useState();
    console.log(comments,'comments');
    const handleCommentsChange = (e: any) => {
        console.log(e);
        setComments(e.target.value)
    }

    useEffect(() => {
        setReviewerAreaImprovementComments(comments)
    }, [comments]);

    return (
        <div>
            <ItemHeading>
                <b>Reviewer Areas of Improvements (Reviewer)</b>
            </ItemHeading>
            <Contain>
                <Box>
                    <Tf>
                        <TextField fullWidth
                            multiline
                            inputProps={{ maxLength: 512}}

                            size='small'
                            name="comments"
                            value={reviewerAreaImprovementComments || ""}
                            onChange={e => handleCommentsChange(e)} />
                    </Tf>
                </Box>
            </Contain>


        </div>
    );
}

export default ReviewerAreaComments

