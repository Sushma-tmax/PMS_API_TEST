import React from 'react';
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import { useAppraiserRejectsNormalizerContext } from '../../../context/AppraiserRejectsNormalizer';

const Typo7 = styled("div")({
    marginLeft: "58px",
    // position: "absolute",
    marginTop: "10px",
    color: "#717171",
    fontSize: "16px",
});
const Typos1 = styled("div")({
    // marginLeft: "25px",
    // position: "absolute",
    //marginTop: '15px',
    fontSize: '13px',
    color: "#717171",
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
     // @ts-ignoreotherRecommendation
    const { appraiserOtherRecommendation, setAppraiserOtherRecommendation} = useAppraiserRejectsNormalizerContext()
    return (
        <div>
            <Typo7>
                <p><b>Normalizer Other Recommendation(s)</b></p>
            </Typo7>
            <Stack
                direction="row"
                alignItems="center"
                marginLeft='25px'
                marginTop='15px'
                spacing={25}
            >
                {appraiserOtherRecommendation && appraiserOtherRecommendation.map((i:any,index:any)=> {
                    return (
                          <Typos1>{i.name.name}</Typos1>
                    )
                })}
              
               
            </Stack>
        </div>
    )
}

export default ReviewerOtherRecommendations;
