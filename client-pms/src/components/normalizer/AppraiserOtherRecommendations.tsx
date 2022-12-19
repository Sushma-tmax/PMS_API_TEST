import React from "react";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { useReviewerContext } from "../../context/reviewerContextContext";
import { useNormalizerContext } from "../../context/normalizerContext";
import Box from "@mui/material/Box";
import { useAppraiserRejectsNormalizerContext } from "../../context/AppraiserRejectsNormalizer";
import { Grid } from "@mui/material";
const Typo7 = styled("div")({
  marginLeft: "58px",
  // position: "absolute",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
});
const Typos1 = styled("div")({
  marginLeft: "58px",
  // position: "absolute",
  //marginTop: '15px',
  fontSize: "13px",
  color: "#333333",
  opacity: "0.7",
});
const Typos2 = styled("div")({
  // marginLeft: "250px",
  // position: "absolute",
  // marginTop: '325px',
  fontSize: "13px",
  color: "#333333",
  opacity: "0.7",
});
const Labels = styled("div")({
  fontSize: "14px",
  color: "#333333",
  // opacity: 0.84,
  marginLeft: "1px",
  fontFamily:"arial"
});
const Contain = styled("div")({
  marginLeft: "58px",
  marginRight: "20px",
  marginTop: "10px",
  // width: "95%",
  paddingTop: "0px",
});
const AppraiserOtherRecommendations = (props: any) => {
  // @ts-ignore
 const { empData,appraiserOtherRecommendation, setAppraiserOtherRecommendation} = useNormalizerContext()

  const [showToast, setShowToast] = useState(false);
  //  //@ts-ignore
  //  const {otherRecommendation,setOtherRecommendation ,setReviewerOverallFeedComments,reviewerOverallFeedComments, setOpenSnackbar,appraiserOtherRecommendationComments,setAppraiserOtherRecommendationComments,appraiserOverallFeedback,setAppraiserOverallFeedback} = useAppraiserRejectsNormalizerContext()
  //     console.log(otherRecommendation,"otherRecommendation")
  const handleOnCheck = (e: any) => {
    // setnavPrompt(true)
    const { name, checked } = e.target;

    const tempUser = appraiserOtherRecommendation.map(
      (appraiserOtherRecommendation: any) => {
        return appraiserOtherRecommendation._id === name
          ? { ...appraiserOtherRecommendation, isChecked: checked }
          : appraiserOtherRecommendation;
      }
    );
    setAppraiserOtherRecommendation(tempUser);
    console.log(tempUser, "temp");
  };
  //   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  //     if (reason === 'clickaway') {
  //       return;
  //     }

  //     setShowToast(false);
  //   };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowToast(false);
  };
  useEffect(() => {
    // console.log(otherRecommendation?.filter((j:any) => j.isChecked === true).filter((k:any) => {
    //   console.log(k.name, 'augustya')
    //   return (k.name === 'Promotion' ||  k.name === 'Demotion')
    //
    // }), 'filterother')
    // console.log(otherRecommendation?.filter((j:any) => j.isChecked === true)[0]?.name === 'Promotion', 'augustya')

    if (
      appraiserOtherRecommendation
        ?.filter((j: any) => j.isChecked === true)
        .filter((k: any) => {
          console.log(k.name, "augustya");
          return k.name === "Promotion" || k.name === "Demotion";
        }).length > 1
    ) {
      setShowToast(true);
      //   setOpenSnackbar(true)
    } else {
      //   setOpenSnackbar(false)
      setShowToast(false);
    }
  }, [appraiserOtherRecommendation]);

  useEffect(() => {
    if (empData) {
      setAppraiserOtherRecommendation(
        empData?.data?.appraisal?.other_recommendation
      );
    }
  }, [empData]);

  return (
    <div>
      <Typo7>
        <b>Other Recommendations </b>
      </Typo7>
      <Contain>
      <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      
          {appraiserOtherRecommendation &&
            appraiserOtherRecommendation.map((i: any, index: any) => {
              return (
                <>
                  {/* <Typos1>{i.name.name}</Typos1> */}
                  <Grid display="flex" item xs={2} sm={4} md={3} key={index}>

                    {/* <input
                      name={i.name.name}
                      checked={i?.isChecked || false}
                      onChange={handleOnCheck}
                      type="checkbox"
                    /> */}
                    <Labels>
                      {" "}
                      <label> {i?.name?.name}</label>{" "}
                    </Labels>
                    </Grid>
                </>
              );
            })}
         </Grid>
      </Contain>
    </div>
  );
};

export default AppraiserOtherRecommendations;
