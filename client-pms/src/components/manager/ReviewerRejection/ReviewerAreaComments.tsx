import React, { useEffect, useState } from 'react';
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { useAppraiserRejectsReviewerContext } from '../../../context/AppraiserRejectsReviewer';

const Typo7 = styled("div")({
    marginLeft: "25px",
    // position: "absolute",
    marginTop: '290x',
    color: '#008E97',
    fontSize: '13px',
    opacity: 0.85
});
const Contain = styled("div")({
    marginRight: "20px",
    marginLeft: "25px",
    marginTop: "10px",
  });
const Tf = styled("div")({
    fontSize: "14x",
  
    backgroundColor: "#FFFFFF",
    "& .MuiInputLabel-root": {
      color: "#333333",
      opacity: "0.5",
      fontSize: "13px",
      fontWeight: "400",
      textTransform: "none",
    },
  });

const ReviewerAreaComments = (props: any) => {
    const {navPrompt, setnavPrompt} = props;
    // @ts-ignoreotherRecommendation
    const { reviewerAreaImprovementComments, appraiserAreaOfImprovementComments, setAppraiserAreaOfImprovementComments } = useAppraiserRejectsReviewerContext();
    const [otherComments, setOtherComments] = useState('');
    const [appraiserotherComments, setAppraiserOtherComments] = useState('');
    useEffect(() => {
        setOtherComments(reviewerAreaImprovementComments)
      }, [reviewerAreaImprovementComments])
      useEffect(() => {
        setAppraiserOtherComments(appraiserAreaOfImprovementComments)
    }, [appraiserAreaOfImprovementComments])

    const handleCommentsChange = (e: any) => {
        setnavPrompt(true)
        console.log(e);
        setAppraiserAreaOfImprovementComments(e.target.value)
    }
    return (
        <>
         <div>
            <Typo7>
                <p>Appraiser Area(s) of Improvement Comments</p>
            </Typo7>
            <Contain>
                <Box>
                    <Tf>
                        <TextField fullWidth
                            size='small'
                            name="comments"
                            value={appraiserotherComments || ""} 
                            inputProps={{ maxLength: 512 }}

                            onChange={e => handleCommentsChange(e)}
                            />
                    </Tf>
                </Box>
            </Contain>
        </div>
        <div>
            <Typo7>
                <p>Reviewer Area(s) of Improvement Comments</p>
            </Typo7>
            <Contain>
                <Box>
                    <Tf>
                        <TextField fullWidth disabled
                            size='small'
                            name="comments"
                            value={otherComments || ""} />
                    </Tf>
                </Box>
            </Contain>
        </div>
       
        </>
    )
}

export default ReviewerAreaComments;
