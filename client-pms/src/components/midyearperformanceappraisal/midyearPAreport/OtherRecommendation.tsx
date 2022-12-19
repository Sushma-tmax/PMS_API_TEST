import React from "react";
import { styled } from "@mui/material/styles";

const OtherRecommendation = (props: any) => {
  const { otherData } = props;
  console.log(otherData, "otherDAta");
  return (
    <>
      <h4>Other Recommendation(s)</h4>
      {otherData &&
        otherData.data.appraisal.other_recommendation.map((i: any) => {
          console.log(i, "iiiiiiiiiiiiii");
          return <p>{i.name.name}</p>;
        })}
    </>
  );
};

export default OtherRecommendation;
