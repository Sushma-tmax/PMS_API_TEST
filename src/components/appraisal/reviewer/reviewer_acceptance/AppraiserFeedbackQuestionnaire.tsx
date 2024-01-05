import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Checkbox, Typography } from "@mui/material";
import { TextField } from "@mui/material";
// import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Blueadd from "../Reviewericons/Blueadd.svg";
import Bluenegative from "../../../assets/appraiser/Reviewericons/Bluenegative.svg";
import Blueplus from "../Reviewericons/Blueplus.svg";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ReviewerFeedbackComments1 from "./ReviewerComments";
import Table11 from "./AppraiserAreasOfImprovement";
import Table21 from "./AppraiserTrainingRecommendation";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import { useGetEmployeeAppraisalQuery } from "../../../../service";
import { useParams, useNavigate } from "react-router-dom";
import ProvidedReviewerContextProvider from "../../../../context/reviewerContextContext";




const Typo1 = styled("div")({
  // marginLeft: "25px",
  // paddingTop: "20px",
  color: "#3e8cb5",
  fontSize: "20px",
  fontFamily: "arial"
});
const Contain = styled("div")({
  // marginRight: "20px",

  marginTop: "10px",

});
const Tf1 = styled("div")({
  // marginLeft: "25px",
  marginTop: "5px",

  backgroundColor: "white",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
    fontWeight: "400",
    textTransform: "none",
    // padding: "4px",
    textAlign: "left"
  },
});
const Typo2 = styled("div")({
  // marginLeft: "25px",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial"
});
const Divide = styled("div")({
  //position: "absolute",
  marginTop: "20px",
  marginLeft: "25px",
  marginRight: "20px",
});
const Divide1 = styled("div")({
  //position: "absolute",
  marginTop: "15px",
  marginLeft: "25px",
  marginRight: "20px",
});
const Overallfeedbackss = styled("div")({
  //marginLeft: "58px",
  // marginTop: "10px",
  color: '#3e8cb5',
  //color: "#333333",
  fontSize: "20px",
  fontFamily: 'Avenir semibold Italics',
  display: "flex",
  justifyContent: "center",
  fontStyle: "italic"
});

const Performancefeedbacksummary1 = (props: any) => {
  //@ts-ignore
  const { empData } = useReviewerContext();
  const [overallFeedback, setOverallFeedback] = useState<any>([]);

  useEffect(() => {
    setOverallFeedback(empData?.data?.appraisal?.feedback_questions)
  },[empData]) 

  return (

    <div>
      {empData && (
        <div>
          <Typo1>Performance Feedback Summary</Typo1>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {overallFeedback &&
                  overallFeedback.map((j: any, mapIndex: any) => {
                    return (
                      <>
                        <Typo2> <b>{j?.name?.name}</b> </Typo2>
                        <Contain>
                          <Box>
                            <Tf1>
                              <TextField
                                fullWidth
                                InputProps={{ readOnly: true }}
                                multiline
                                inputProps={{ maxLength: 500 }}
                                size='small'
                                key={j._id}
                                value={overallFeedback[mapIndex].value}                             
                              />
                            </Tf1>
                          </Box>
                        </Contain>
                      </>
                    );
                  })}
              </Grid>
            </Grid>
          </Box>
        </div>
      )}

    </div>
  )
}
export default Performancefeedbacksummary1