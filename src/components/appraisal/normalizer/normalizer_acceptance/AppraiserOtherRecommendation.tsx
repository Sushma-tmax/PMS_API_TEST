import React from 'react';
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import { useNormalizerContext } from '../../../../context/normalizerContext';
import NFeedbackCommentsN from './OverallFeedbackComments';
import { Box, Grid, TextField,Checkbox,FormControlLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAppraiserRejectsReviewerContext } from '../../../../context/AppraiserRejectsReviewer';
import { useAppraiserRejectsNormalizerContext } from '../../../../context/AppraiserRejectsNormalizer';
import ProvidedReviewerContextProvider from '../../../../context/reviewerContextContext';
import ProvidedAppraisalContextProvider from '../../../../context/appraiserOverviewContext';
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
const Contain1 = styled("div")({
  marginRight: "35px",
  // marginLeft:"-30px",
  marginTop: "10px",

});
const Contain2 = styled("div")({
  // marginRight: "35px",
  marginLeft:"-35px",
  marginTop: "-15px",

});
const Labels = styled("div")({
  fontSize: "14px",
  color: "#333333",
  // opacity: 0.84,
  marginLeft: "5px",
  fontFamily:"arial",
  lineHeight:"1.5"

});
const Tf1 = styled("div")({
  marginLeft: "35px",
  marginTop: "5px",
  
  // backgroundColor: "rgb(255 255 255/70%)",
//    color:"white",
  // "& .MuiInputBase-input": {
  //   color: "#333333",
  //   fontSize: "13px",
  //   fontWeight: "400",
  //   textTransform: "none",
  //   opacity: 0.4,
  // },
  backgroundColor: "white",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
      color: "#333333",
      fontSize: "14px",
      fontWeight: "400",
      textTransform: "none",
      fontFamily:"arial",
      // padding:"4px",
      textAlign:"left"
      // padding: "-2px",
    },
  //   "& .MuiTextField-root": {
  //     // color: "#333333",
  //     // fontSize: "13px",
  //     // fontWeight: "400",
  //     // textTransform: "none",
  //     // padding: "8px",
  //     width: "100%",
  //   },
});
const AppraiserOtherRecommendationN = (props: any) => {
  // @ts-ignore
  const { empData, trainingRecommendation, setTrainingRecommendation, appraiserTrainingRecommendation,reviewerComments, setnavPromptsetAppraiserTrainingRecommendation, trainingSelectValue, trainingRecommendationFormValues, setTrainingRecommendationFormValues, appraiserOtherRecommendation, setAppraiserOtherRecommendation, normalizerComments, setNormalizerComments, appraiserOverallFeedback, normalizerOverallFeedComments,setAppraiserOverallFeedback,reviewerOverallFeedback,setNormalizerOverallFeedComments,setNormalizerReason,normalizerReason,setOtherRecommendationothers,OtherRecommendationothers } = useNormalizerContext()
  const { employeeData, navPrompt, setnavPrompt, moveTab, setMoveTab, change, setChange } = props;

  // @ts-ignore
  //  const{reviewerOverallFeedComments,setReviewerOverallFeedComments} = useAppraiserRejectsReviewerContext();
  // const { reviewerComments,setReviewerComments  } = useAppraiserRejectsNormalizerContext();

  const [hideotherRecommendation, setHideotherRecommendation] = useState(false);

  const [comments1, setComments1] = useState();
  //   const [otherComments, setOtherComments] = useState('');
  //   useEffect(() => {
  //     setOtherComments(reviewerOverallFeedComments)
  // }, [reviewerOverallFeedComments])

  // const handleCommentsChange = (e: any) => {
  //   console.log(e);
  //   setComments1(e.target.value)
  // }
  // useEffect(() => {
  //   setNormalizerComments(comments1)
  // }, [comments1]);
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
  const Otherrecommendation=appraiserOtherRecommendation &&
  appraiserOtherRecommendation.map((i: any, index: any) => {

    return(
      <>
      {i.name.name}
      </>

    )
    })
  useEffect(()=>{
    const Otherrecommendation=appraiserOtherRecommendation &&
    appraiserOtherRecommendation.map((i: any, index: any) => {

      return(
        <>
        {i.name.name}
        </>

      )
      })
      if(Otherrecommendation == "" || Otherrecommendation == null || Otherrecommendation == undefined){
        setHideotherRecommendation(false);
      }else{
        setHideotherRecommendation(true)
      }
      // console.log(Otherrecommendation,"Otherrecommendation")
  })
  const handleCommentsChange = (e: any) => {
    console.log(e);
    // setNormalizerOverallFeedComments(e.target.value)
    setNormalizerComments(e.target.value)
    setMoveTab(false);
}

const [hidecomments, setHidcomments] = useState(false);
useEffect(()=>{
if(reviewerOverallFeedback == "" || reviewerOverallFeedback == null || reviewerOverallFeedback == undefined ){
    setHidcomments(false)
}else{
    setHidcomments(true)
}
},[empData])
  return (
    <div>
      {Otherrecommendation?.length >0 || OtherRecommendationothers !== ""  ?(
      <div>
        <Typo7>
          <b> Further Recommendations </b>
        </Typo7>
       
     
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {appraiserOtherRecommendation && appraiserOtherRecommendation?.map((i: any, index: any) => {
            return (
             <Grid alignItems="center"  display="flex" item xs={2} sm={4} md={3} key={index}>
          
            <input type="checkbox" checked/>
                 <Labels>
               {i?.name?.name}
              </Labels>
              </Grid>
            )
          }
          )}
        </Grid>
        
       
      </div>
      ) : ""}


          
{OtherRecommendationothers !== ""  &&
<>
            <div 
            style={{ marginBottom: "20px",
            marginTop:"5px" ,
            //  marginLeft: "35px",
             color: "#717171",
            fontSize: "16px",
            fontFamily: "arial"}}>
            {/* <Typo7> */}
            <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      color: "#333333",
                      fontFamily: "Arial",
                    },
                  }}
                  control={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input type="checkbox" checked readOnly style={{ display: "none" }} />
                      <Checkbox
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: "18px !important",
                          },
                          pointerEvents: "none",
                          // opacity: 0.5,
                        }}
                        checked
                      />
                    </div>
                  }
                  label="Others"
                />
                 </div>
            {/* <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "18px !important",
                                },
                              }} checked={employeeData?.data?.appraisal?.other_recommendation_others} name="Others" readOnly />
                          }
                          label="Others"
                        /> */}
              {/* <b>Others</b> */}
            {/* </Typo7> */}
            <Contain2>
                        <Tf1>
                          <Box>
                            <TextField
                            //  inputProps={{ maxLength: 500 }}
                            size="small"
                            InputProps={{readOnly: true}}
                              fullWidth
                              multiline
                            //   rows={1}
                              value={OtherRecommendationothers || ""} 
                            ></TextField>
                          </Box>
                        </Tf1>
                        </Contain2>
                        </>
                       
        }

    </div>
  )
}
export default AppraiserOtherRecommendationN