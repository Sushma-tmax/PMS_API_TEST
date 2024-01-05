import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import { Box, Grid, TextField, FormControlLabel } from "@mui/material";
import ReviewerFeedbackComments1 from "./ReviewerComments";
import NormalizerOverallFeedback from "./HR_NormalizerComments";
import Checkbox from '@mui/material/Checkbox';
import AppraiserMessageForEmployee from "./AppraiserMessageForEmployee";

const Typo7 = styled("div")({
  // marginLeft: "25px",
  // position: "absolute",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
  marginBottom: "10px",
});
const Contain2 = styled("div")({
  // marginRight: "35px",

  marginTop: "-15px",

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
  fontFamily: "arial",
  lineHeight:"1.5"
});
const AppraiserOtherRecommendations1 = (props: any) => {
  // @ts-ignore
  const { appraiserOtherRecommendation, setAppraiserOtherRecommendation, appraiserOverallFeedback, setAppraiserOverallFeedback, setOtherRecommendationothers, OtherRecommendationothers } = useReviewerContext()
  const { employeeData, setnavPrompt, navPrompt, moveTab, setMoveTab } = props;
  const [hideotherRecommendation, setHideotherRecommendation] = useState(false);
  const [otherRecommendationother, setotherRecommendationother] = useState("");
  const Otherrecommendation = appraiserOtherRecommendation &&
  appraiserOtherRecommendation.map((i: any, index: any) => {

    return (
      <>
        {i.name.name}
      </>

    )
  })
  console.log(Otherrecommendation?.length,"Otherrecommendation")
  useEffect(() => {
    setotherRecommendationother(employeeData?.data?.appraisal?.other_recommendation_others)
    const Otherrecommendation = appraiserOtherRecommendation &&
      appraiserOtherRecommendation.map((i: any, index: any) => {

        return (
          <>
            {i.name.name}
          </>

        )
      })
    if (Otherrecommendation?.length == 0) {
      setHideotherRecommendation(false);
    } else {
      setHideotherRecommendation(true)
    }
    
  }, [employeeData])
  console.log("xemployeeData:", employeeData);
  console.log(employeeData?.data?.appraisal?.other_recommendation?.length, "OtherRecommendationothers");
// (OtherRecommendationothers !== "") 
  return (
    <>
      {Otherrecommendation?.length > 0 || OtherRecommendationothers !== "" ? (
        <div style={{marginBottom:"20px"}}>

          <Typo7>
            <b>Further Recommendations</b>
          </Typo7>

          <Contain>
            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>

              {appraiserOtherRecommendation &&
                appraiserOtherRecommendation.map((i: any, index: any) => {
                  return (

                    <Grid alignItems="center" display="flex" item xs={2} sm={4} md={3} key={index}>

                      <input type="checkbox" checked />
                      <Labels>
                        {i.name.name}
                      </Labels>
                    </Grid>

                  );
                })}
            </Grid>
          </Contain>

          {OtherRecommendationothers !== "" &&
          <>
            <div
            style={{ marginBottom: "20px",
            marginTop:"5px" ,
            //  marginLeft: "35px",
             color: "#717171",
            fontSize: "16px",
            fontFamily: "arial"}}>
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
              <Contain2>
                <Tf1>
                  <Box>
                    <TextField
                      //  inputProps={{ maxLength: 500 }}
                      size="small"
                      InputProps={{ readOnly: true }}
                      fullWidth
                      multiline
                      //   rows={1}
                      value={OtherRecommendationothers || ""}
                    ></TextField>
                  </Box>
                </Tf1>
              </Contain2>
            </>}
            </div>
      ) : ""}

      {appraiserOverallFeedback !== "" && appraiserOverallFeedback !== null &&
        <div>
          <AppraiserMessageForEmployee />
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

    </>
  );
};
export default AppraiserOtherRecommendations1;
