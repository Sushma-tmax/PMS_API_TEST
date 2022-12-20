import React from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useReviewerContext } from "../../context/reviewerContextContext";
import { useNormalizerContext } from "../../context/normalizerContext";
import { Link, useNavigate } from "react-router-dom";
import {
  useNormalizerAcceptEmployeeMutation,
  useNormalizerRejectEmployeeMutation
} from '../../service'
const Typo1 = styled("div")({
  // fontSize: '16px',
  // fontWeight: 400
  paddingRight: "5px",
});
const Footer = styled("div")({
  marginLeft: "450px",
  marginTop: "120px",
  paddingBottom: "45px",
  display: "flex",
  justifyContent: "center",
});

const Footerbuttons = (props: any) => {
  const {navPrompt, setnavPrompt} = props;
  
  //@ts-ignore
  const { updateMutation, otherRecommendation, otherRecommendationComments, checkboxIdHandler, checkboxHandler, employee_id, trainingRecommendationFormValues, overallFeed, areaImprovement, trainingRecommendationComments, isLoading, normalizerAreaImprovementComments, normalizerOverallFeedComments, normalizerOtherRecommendationComments, normalizerTrainingRecommendationComments } = useNormalizerContext()
  const [NormalizerAcceptEmployee] = useNormalizerAcceptEmployeeMutation()
  const [NormalizerRejectEmployee] = useNormalizerRejectEmployeeMutation()
  const navigate = useNavigate();
  // if (isLoading) {
  //   <p>Loading...</p>
  // }
  return (
    // <Footer>normalizer
    <Stack justifyContent="center" spacing={3} direction="row">
        <Link to={`/normalizer`}>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#008E97",
          fontSize: "16px",
          fontWeight: 400,
          textTransform: "none",
          borderRadius: "7px",
        }}
        onClick={() => { 
          NormalizerAcceptEmployee(employee_id)
          setnavPrompt(false)
        }}>Accept
      </Button>
      </Link>
      <Link to={`/normalizer`}>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#008E97",
          fontSize: "16px",
          fontWeight: 400,
          textTransform: "none",
          borderRadius: "7px",
        }}
        onClick={() => {
          NormalizerRejectEmployee(employee_id)
          setnavPrompt(false)
        }}>Reject</Button>
        </Link>

      {/* <Link to={`/normalizer`}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#008E97",
            fontSize: "16px",
            fontWeight: 400,
            textTransform: "none",
            borderRadius: "7px",
          }}
          onClick={() => {
            updateMutation({
              //"normalizer.other_recommendation": checkboxIdHandler(
                //checkboxHandler(otherRecommendation)
              //),
              //"normalizer.training_recommendation":
                //trainingRecommendationFormValues,
              "normalizer.other_recommendation_comments": normalizerOtherRecommendationComments,
              "normalizer.training_recommendation_comments": normalizerTrainingRecommendationComments,
              "normalizer.feedback_questions_comments": normalizerOverallFeedComments,
              "normalizer.area_of_improvement_comments": normalizerAreaImprovementComments,
             // "normalizer.feedback_questions": overallFeed,
              //"normalizer.area_of_improvement": areaImprovement,
              id: employee_id,
            })
          }}
        >
          <Typo1>Save</Typo1>
        </Button>
      </Link>

      <Link to={`/normalizer`}>
        <Button
          variant="outlined"
          style={{
            color: "#008E97",
            fontSize: "16px",
            border: "1px solid ##008E97",
            fontWeight: 400,
            textTransform: "none",
            borderRadius: "7px",
          }}
          onClick={() => {
            updateMutation({
              //"normalizer.other_recommendation": checkboxIdHandler(
                //checkboxHandler(otherRecommendation)
             // ),
        //      "normalizer.training_recommendation":
                //trainingRecommendationFormValues,
              "normalizer.other_recommendation_comments": normalizerOtherRecommendationComments,
              "normalizer.training_recommendation_comments": normalizerTrainingRecommendationComments,
              "normalizer.feedback_questions_comments": normalizerOverallFeedComments,
              "normalizer.area_of_improvement_comments": normalizerAreaImprovementComments,
             // "normalizer.feedback_questions": overallFeed,
             // "normalizer.area_of_improvement": areaImprovement,

              "normalizerIsChecked": true,
              "normalizerIsDisabled": true,
              "normalizer.normalizer_status": 'rejected',
              "appraisal.appraiser_status": "normalizer-rejected",

              id: employee_id,
            })
          }}
        >
          Save and Submit
        </Button>
      </Link>


      <Button
        variant="text"
        style={{
          color: "#008E97",
          fontSize: "16px",
          fontWeight: 400,
          textTransform: "none",
          borderRadius: "7px",
        }}
      >
        <Link to={`/normalizer`}>
          Back to Assessment
        </Link>
      </Button> */}
    </Stack>
    // </Footer>
  );
}

export default Footerbuttons;
