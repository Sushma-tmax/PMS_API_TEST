import React from "react";
import { styled } from "@mui/material/styles";

const OverallFeedback = (props: any) => {
  const { feedbackData } = props;
  console.log(feedbackData, "otherDAta");
  return (
    <>
      <h4>Feedback</h4>
      {feedbackData &&
        feedbackData.data.appraisal.feedback_questions.map((i: any) => {
         
          return <p>{i.name.name}</p>;
        })}
    </>
  );
};

export default OverallFeedback;
