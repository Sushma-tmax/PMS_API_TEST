import React from 'react';
import { styled } from "@mui/material/styles";
import { Typography } from '@mui/material';
import { useNormalizerContext } from '../../context/normalizerContext';
// import {useAppraisalContext} from "../../../context/appraiserOverviewContext";
// import {useReviewerContext} from "../../../context/reviewerContextContext";


const Typo1 = styled("div")({
    marginLeft: "25px",
    //position: "absolute",
    marginTop: '15px',
    color: "#008E97",
    fontSize: '13px',
    opacity: '0.85'

});
const Tablecontainer = styled("div")({
    marginLeft: "25px",
   // position: "absolute",
    marginTop: '10px',

});
const Pad1 = styled("div")({
    display: "flex",
    justifyContent: "center",
});
const Pad2 = styled("div")({
    paddingRight: '48px',
    paddingLeft: '50px'
});


const Root = styled('div')`
  table {
    
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: center;
    padding: 7px;
  }

  th {
    background-color: #eaf2f5;
    fontsize:12px;
  }
  td{
    background-color: #f7fbfc;  
  }
`

const ReviewerTraining = () => {

    //@ts-ignore
    const {reviewerTrainingRecommendation} = useNormalizerContext()

    console.log(reviewerTrainingRecommendation, 'trainingRecommendation')

    return (
        <div><Typo1>Reviewer Training Recommendation(s) </Typo1>
            <Tablecontainer>
                <Root sx={{  width:"99%" }}   >
                    <table   >
                        <thead>
                            <tr>
                                <th style={{ fontWeight: '400', fontSize: '12px', color: '#707070', opacity: 0.8 }} >#</th>
                                <th style={{ fontWeight: '400', fontSize: '12px', color: '#707070', opacity: 0.8, width: '152px' }} >Training Category</th>
                                <th style={{ fontWeight: '400', fontSize: '12px', color: '#707070', opacity: 0.8, width: '152px' }} >Training Name</th>
                                <th style={{ fontWeight: '400', fontSize: '12px', color: '#707070', opacity: 0.8 }} ><Pad1>Justification</Pad1></th>
                            </tr>
                        </thead>
                        <tbody>

                        {reviewerTrainingRecommendation.map((item:any, index:any) => {
                            return (
                                <tr style={{ fontWeight: '400', fontSize: '12px', color: '#707070', opacity: 0.8, lineHeight: '20px' }} >
                                    <td width='20' >1</td>
                                    <td  >
                                        {item.name.title}
                                    </td>
                                    <td >
                                        {item.training_name}
                                    </td>
                                    <td width='620' style={{ paddingLeft: '10px' }} >
                                        <Pad2>
                                            {item.justification}
                                        </Pad2>

                                    </td>
                                </tr>
                            )
                        })}

                        </tbody>
                    </table>
                </Root>
            </Tablecontainer>
        </div>
    )
}

export default ReviewerTraining;