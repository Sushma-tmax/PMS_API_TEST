import React from 'react';
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import { useNormalizerContext } from '../../../context/normalizerContext';
import NFeedbackCommentsN from './OverallFeedbackComments';
import { Box, Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAppraiserRejectsReviewerContext } from '../../../context/AppraiserRejectsReviewer';
import { useAppraiserRejectsNormalizerContext } from '../../../context/AppraiserRejectsNormalizer';
import ProvidedReviewerContextProvider from '../../../context/reviewerContextContext';
import ProvidedAppraisalContextProvider from '../../../context/appraiserOverviewContext';
const Typo7 = styled("div")({
  // marginLeft: "25px",
  // position: "absolute",
  marginTop: '20px',
  color: "#717171",
  fontSize: '16px',
  fontFamily: 'Arial',
  paddingBottom: "10px"
});
const Contain = styled("div")({
  // marginLeft: "25px",
  // position: "absolute",
  // marginTop: '10px',
  // color: "#717171",
  // fontSize: '16px',
  // FontFamily:'arial'
});
const Typos1 = styled("div")({
  // marginLeft: "25px",
  // position: "absolute",
  //marginTop: '15px',
  fontSize: '14px',
  color: 'rgb(0 142 151/84%)',
  // float: 'left',
  // paddingBottom: "15px"
});
const Typos2 = styled("div")({
  // marginLeft: "250px",
  // position: "absolute",
  // marginTop: '325px',
  fontSize: '13px',
  color: '#333333',
  opacity: '0.7'
});

const Tf2 = styled("div")({
  // width: "93%",
  // marginTop: "5px",
  // backgroundColor: 'rgb(255 255 255/70%)',

  '& .MuiInputBase-input': {
    color: '#333333',
    fontSize: '14px',
    fontFamily: "arial",
    fontWeight: '400',
    padding: "4px",
    textTransform: 'none',
    textAlign: "justify",

  },
  "& .MuiTextField-root": {
    // color: "#333333",
    // fontSize: "13px",
    // fontWeight: "400",
    // textTransform: "none",
    // padding: "8px",
    width: "100%",
  },

});
const Labels = styled("div")({
  fontSize: "14px",
  color: "#333333",
  // opacity: 0.84,
  marginLeft: "1px",
  fontFamily:"arial"
});
const AppraiserOtherRecommendationN = (props: any) => {
  // @ts-ignore
  const { empData, trainingRecommendation, setTrainingRecommendation, appraiserTrainingRecommendation, setnavPromptsetAppraiserTrainingRecommendation, trainingSelectValue, trainingRecommendationFormValues, setTrainingRecommendationFormValues, appraiserOtherRecommendation, setAppraiserOtherRecommendation, normalizerComments, setNormalizerComments, appraiserOverallFeedback, setAppraiserOverallFeedback } = useNormalizerContext()
  const { employeeData, navPrompt, setnavPrompt, moveTab, setMoveTab, change, setChange } = props;

  // @ts-ignore
  //  const{reviewerOverallFeedComments,setReviewerOverallFeedComments} = useAppraiserRejectsReviewerContext();
  // const { reviewerComments,setReviewerComments  } = useAppraiserRejectsNormalizerContext();


  const [comments1, setComments1] = useState();
  //   const [otherComments, setOtherComments] = useState('');
  //   useEffect(() => {
  //     setOtherComments(reviewerOverallFeedComments)
  // }, [reviewerOverallFeedComments])

  const handleCommentsChange = (e: any) => {
    console.log(e);
    setComments1(e.target.value)
  }
  useEffect(() => {
    setNormalizerComments(comments1)
  }, [comments1]);
  console.log(normalizerComments, "comment")
  // console.log(reviewerOverallFeedComments,"comment11")
  console.log(appraiserOtherRecommendation, 'appraiserOtherRecommendation')
  useEffect(() => {
    if (empData) {
      setAppraiserOtherRecommendation(() => {
        return empData.data.appraisal.other_recommendation
      });
      setAppraiserOverallFeedback(() => {
        return empData.data.appraisal.appraiser_overall_feedback
      })
    }
  }, [empData])

  return (
    <div>
      <div>
        <Typo7>
          <b> Other Recommendations </b>
        </Typo7>

        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {appraiserOtherRecommendation && appraiserOtherRecommendation?.map((i: any, index: any) => {
            return (
              <Grid item xs={2} sm={4} md={3} key={index}>
                 <Labels>
                <label>{i?.name?.name}</label>
              </Labels>
              </Grid>
            )
          }
          )}
        </Grid>
        {/* {appraiserOtherRecommendation && appraiserOtherRecommendation?.map((i: any, index: any) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "19%",
                float: "left",
                paddingBottom: "15px",

              }}
            >
              <Labels>
                <label>{i.name.name}</label>
              </Labels>
            </Box>
          )
        })} */}
      </div>


      {/* <Stack
        direction="row"
        alignItems="center"
        // marginLeft='25px'
        marginTop='15px'
        spacing={25}
      >
        {appraiserOtherRecommendation && appraiserOtherRecommendation?.map((i: any, index: any) => {
          return (
            <Typos1>{i.name.name}</Typos1>
          )
        })}


      </Stack> */}


      {/* <Typo7><b>Reviewer Overall Feedback</b> </Typo7>
          <Contain>
              <Tf2>

                <TextField 
                 multiline
                  disabled
                //   inputProps={{ maxLength: 256 }}
                  size='small'
                //   variant="standard"
                //   InputProps={{
                //     disableUnderline: true,
                //   }}
                  // placeholder='Add'
                  // key={i._id}
                  value={comments1 || ""}
                  onChange={e => handleCommentsChange(e)} />
                  

              </Tf2>
          </Contain> */}

    </div>
  )
}
export default AppraiserOtherRecommendationN