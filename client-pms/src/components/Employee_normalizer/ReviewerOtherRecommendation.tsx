import React from 'react';
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import { useReviewerContext } from '../../context/reviewerContextContext';
import { useNormalizerContext } from '../../context/normalizerContext';

const Typo7 = styled("div")({
    marginLeft: "25px",
    // position: "absolute",
    marginTop: '290x',
    color: '#008E97',
    fontSize: '13px',
    opacity: 0.85
});
const Typos1 = styled("div")({
    // marginLeft: "25px",
    // position: "absolute",
    //marginTop: '15px',
    fontSize: '13px',
    color: '#333333',
    opacity: '0.7'
});
const Typos2 = styled("div")({
    // marginLeft: "250px",
    // position: "absolute",
    // marginTop: '325px',
    fontSize: '13px',
    color: '#333333',
    opacity: '0.7'
});

const ReviewerOtherRecommendations = (props:any) =>  {
     // @ts-ignore
    const { reviewerOtherRecommendation, setReviewerOtherRecommendation} = useNormalizerContext()
    return (
        <div>
            <Typo7>
                <p>Reviewer Other Recommendation(s)</p>
            </Typo7>
            <Stack
                direction="row"
                alignItems="center"
                marginLeft='25px'
                marginTop='15px'
                spacing={25}
            >
                {reviewerOtherRecommendation && reviewerOtherRecommendation.map((i:any,index:any)=> {
                    return (
                          <Typos1>{i.name.name}</Typos1>
                    )
                })}
              
               
            </Stack>
        </div>
    )
}

export default ReviewerOtherRecommendations;