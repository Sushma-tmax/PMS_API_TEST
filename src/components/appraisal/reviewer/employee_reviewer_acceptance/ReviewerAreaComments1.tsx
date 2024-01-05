import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
import { Box } from '@mui/system';
import { useReviewerContext } from "../../../../context/reviewerContextContext";




const Contain = styled("div")({
    // marginRight: "20px",
    // marginLeft: "25px",
    marginTop: "10px",

});
const ItemHeading = styled("div")({
    // marginLeft: "25px",
    marginTop: '10px',
    color: "#717171",
    fontSize: "16px"
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

const ReviewerAreaComments1 = (props: any) => {
    const { other1Data, moveTab, setMoveTab } = props
     // @ts-ignore
     const { reviewerAreaImprovementComments, setReviewerAreaImprovementComments  } = useReviewerContext()
    const [comments, setComments] = useState();
    console.log(comments, 'comments');
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
                <b>Reviewer Areas for Improvements (Reviewer)</b>
            </ItemHeading>
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
                            size='small'
                            name="comments"
                            value={reviewerAreaImprovementComments || ""}
                            onChange={(e) => {handleCommentsChange(e);
                            setMoveTab(true);
                            }} />
                    </Tf>
                </Box>
            </Contain>
        </div>
    )
}
export default ReviewerAreaComments1