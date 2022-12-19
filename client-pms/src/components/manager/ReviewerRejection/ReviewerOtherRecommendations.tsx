import React, { useEffect, useState } from 'react';
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { useAppraiserRejectsReviewerContext } from '../../../context/AppraiserRejectsReviewer';

const Typo7 = styled("div")({
    marginLeft: "58px",
    // position: "absolute",
    //marginTop: '25px',
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
    fontSize: "13x",
  width:"94.5%",
    backgroundColor: "#FFFFFF",
    // "& .MuiInputLabel-root": {
    //   color: "#333333",
    //   opacity: "0.5",
    //   fontSize: "13px",
    //   fontWeight: "400",
    //   textTransform: "none",
    // },
    "& .MuiInputBase-input": {
        color: "#333333",
        fontSize: "13px",
        fontWeight: "400",
        textTransform: "none",
        padding: "8px",
      },
  });

const ReviewerOtherRecommendations = (props: any) => {
    // @ts-ignoreotherRecommendation
    const { reviewerOtherRecommendationComments } = useAppraiserRejectsReviewerContext();
    const [otherComments, setOtherComments] = useState('');
    useEffect(() => {
        setOtherComments(reviewerOtherRecommendationComments)
      }, [reviewerOtherRecommendationComments])


    console.log(reviewerOtherRecommendationComments, 'otherComments')
    return (
        <div>
            <Typo7>
                <p><b>Other Recommendations Comments (Reviewer)</b></p>
            </Typo7>
            <Contain>
                <Box>
                    <Tf>
                        <TextField fullWidth disabled
                            size='small'
                            name="comments"
                            value={reviewerOtherRecommendationComments} />
                    </Tf>
                </Box>
            </Contain>
        </div>
    )
}

export default ReviewerOtherRecommendations;
