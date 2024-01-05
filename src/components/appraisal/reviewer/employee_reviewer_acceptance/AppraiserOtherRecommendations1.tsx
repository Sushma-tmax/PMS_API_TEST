import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import { Box, Grid, TextField } from "@mui/material";
import ReviewerFeedbackComments1 from "./ReviewerFeedbackComments";
import NormalizerOverallFeedback from "./NormalizerOverallFeedback";
import EmployeeComments from "./EmployeeComments";

const Typo7 = styled("div")({
  // marginLeft: "25px",
  // position: "absolute",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
  marginBottom: "10px",
});
const Typos1 = styled("div")({
  marginLeft: "25px",
  // position: "absolute",
  //marginTop: '15px',
  fontSize: "14px",
  color: "rgb(0 142 151/84%)",
  // float: 'left',
  // paddingBottom: "15px"
});
const Typos2 = styled("div")({
  // marginLeft: "250px",
  // position: "absolute",
  // marginTop: '325px',
  fontSize: "13px",
  color: "#333333",
  opacity: "0.7",
});
const Typo2 = styled("div")({
  // marginLeft: "25px",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
});
const Tf1 = styled("div")({
  // marginLeft: "25px",
  marginTop: "10px",
  // marginRight: "20px",
  backgroundColor: "white",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
    fontWeight: "400",
    textTransform: "none",
    // padding: "4px",
    textAlign: "left",
  },
});
const Contain = styled("div")({
  // marginLeft: "20px",
  // marginRight: "20px",
  // marginTop: "10px",
  // width: "100%",
  // paddingTop: "0px",
});
const Labels = styled("div")({
  fontSize: "14px",
  color: "#333333",
  // opacity: 0.84,
  marginLeft: "5px",
  fontFamily:"arial",
  lineHeight:"1.5"
});
const AppraiserOtherRecommendations1 = (props: any) => {
  // @ts-ignore
  const { appraiserOtherRecommendation, setAppraiserOtherRecommendation, appraiserOverallFeedback, setAppraiserOverallFeedback } = useReviewerContext()
  const { employeeData, setnavPrompt, navPrompt, moveTab, setMoveTab } = props;
  const [hideotherRecommendation, setHideotherRecommendation] = useState(false);
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
  },[employeeData])
  
  
  return (
    <>
    {hideotherRecommendation && (
      <div>

        <Typo7>
          <b>Further Recommendations</b>
        </Typo7>
        <Contain>
          <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>

            {appraiserOtherRecommendation &&
              appraiserOtherRecommendation.map((i: any, index: any) => {
                return (

                  <Grid display="flex" alignItems="center" item xs={2} sm={4} md={3} key={index}>
                    <input type="checkbox" checked/>
                    <Labels>
                     {i.name.name}
                    </Labels>
                  </Grid>

                );
              })}
          </Grid>
        </Contain>
      </div>
      )}
      {appraiserOverallFeedback !== "" && appraiserOverallFeedback !== null &&
      <div >
        <Typo2>
          <b>Appraiser Message for Employee</b>
        </Typo2>
        <Tf1>
          <Box>

            <TextField
              inputProps={{ maxLength: 500 }}
              size="small"
              InputProps={{ readOnly: true }}
              fullWidth
              multiline
              // rows={1}
              value={appraiserOverallFeedback || ""}
            ></TextField>
          </Box>
        </Tf1>
      </div>    
      }
      <ReviewerFeedbackComments1
        employeeData={employeeData}
        moveTab={moveTab}
        setMoveTab={setMoveTab}
        navPrompt={navPrompt} 
        setnavPrompt={setnavPrompt}
      />

      <NormalizerOverallFeedback
        employeeData={employeeData}
        moveTab={moveTab}
        setMoveTab={setMoveTab}
      />
      
      <EmployeeComments/>

    </>
  );
};
export default AppraiserOtherRecommendations1;
