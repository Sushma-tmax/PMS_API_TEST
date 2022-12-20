import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useReviewerContext } from "../../context/reviewerContextContext";
import { useNormalizerContext } from "../../context/normalizerContext";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import Closeicon from "../../assets/Images/Closeicon.svg"

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
  const { setnavPrompt, navPrompt, setValue,moveTab,setMoveTab } = props;
  console.log(navPrompt, '25navPrompt')
  //@ts-ignore
  const { updateMutation, otherRecommendation, otherRecommendationComments, checkboxIdHandler, checkboxHandler, employee_id, trainingRecommendationFormValues, overallFeed, areaImprovement, trainingRecommendationComments, isLoading, normalizerAreaImprovementComments, normalizerOverallFeedComments, normalizerOtherRecommendationComments, normalizerTrainingRecommendationComments } = useNormalizerContext()
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [message, setmessage] = React.useState('');
  
  const [allFeedMandatory1, setAllFeedMandatory1] = React.useState(false);
  const [disableSubmit, setdisableSubmit] = React.useState(false);
  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
  };
  const saveHandler = () => {
   
    if(normalizerOverallFeedComments == undefined || normalizerOverallFeedComments == null || normalizerOverallFeedComments =="" ){
      setmessage('Please add the rejection reasons in the Overall Feedback.')
    setAllFeedMandatory1(true)
    }else{

      updateMutation({

        "normalizer.normalizer_status": 'draft',
        "normalizer.other_recommendation_comments": normalizerOtherRecommendationComments,
        "normalizer.training_recommendation_comments": normalizerTrainingRecommendationComments,
        "normalizer.normalizer_overall_feedback": normalizerOverallFeedComments,
        "normalizer.area_of_improvement_comments": normalizerAreaImprovementComments,
        id: employee_id,
      })

    setmessage('Changes have been saved.')

    setAllFeedMandatory1(true)
    setnavPrompt(false)
    // setMoveTab(false);
    }
  }
  // if (isLoading) {
  //   <p>Loading...</p>
  // }
  const handleAllFeedMandatory1 = () => {
    setAllFeedMandatory1(false);
    setMoveTab(false);
    setmessage('')
  };
  const moveTabHandler = () => {  
    if (moveTab === true) {
      setmessage("Please save the changes before leaving the page.");
      setAllFeedMandatory(true);
     
    } else if (moveTab === false) {
      setValue(0);
    }
  }
  console.log(normalizerOverallFeedComments,"normalizerOverallFeedComments")
  return (
    // <Footer>normalizer
    <Stack justifyContent="center" spacing={2} direction="row">

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
      </Link> */}

      {/* <Link to={`/normalizer`}> */}
      <Button
        variant="outlined"
        style={{
          // color: "#008E97",
          // fontSize: "16px",
          // border: "1px solid ##008E97",
          // fontWeight: 400,
          // textTransform: "none",
          // borderRadius: "7px",
          // backgroundColor: "#008E97",
          fontSize: "15px",
          color: "#3e8cb5",
          textTransform: "none",
          borderColor: "#3e8cb5",
          background: "transparent",
          height: "35px",
          // width: "70px",
          fontFamily:"arial",
        }}
        onClick={() => {
          // updateMutation({
          //"normalizer.other_recommendation": checkboxIdHandler(
          //checkboxHandler(otherRecommendation)
          // ),
          //      "normalizer.training_recommendation":
          //trainingRecommendationFormValues,
          //   "normalizer.other_recommendation_comments": normalizerOtherRecommendationComments,
          //   "normalizer.training_recommendation_comments": normalizerTrainingRecommendationComments,
          //   "normalizer.feedback_questions_comments": normalizerOverallFeedComments,
          //   "normalizer.area_of_improvement_comments": normalizerAreaImprovementComments,
          //   // "normalizer.feedback_questions": overallFeed,
          //   // "normalizer.area_of_improvement": areaImprovement,

          //   "normalizerIsChecked": true,
          //   "normalizerIsDisabled": true,
          //   "normalizer.normalizer_status": 'rejected',
          //   "appraisal.appraiser_status": "normalizer-rejected",

          //   id: employee_id,
          // })
          //setnavPrompt(false)
          saveHandler();
        }}
      >
        Save as Draft
      </Button>
      {/* </Link> */}

      {/* <Link to={`/normalizer`}> */}
      <Button
        variant="outlined"
        style={{
          fontSize: "15px",
          color: "#3e8cb5",
          textTransform: "none",
          borderColor: "#3e8cb5",
          background: "transparent",
          height: "35px",
          width: "70px",
          fontFamily:"arial",
        }}
        onClick={() => {
          moveTabHandler()
          // setValue(0);
          // saveRecommendationsHandler();
        }}
      >
        Back
      </Button>
      <Dialog
                  // fullScreen={fullScreen}
                  open={allFeedMandatory1}
                  // onClose={handleAllFeedMandatory1}
                  BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
                  PaperProps={{
                    style: {
                      // borderColor:'blue',
                      //border:'1px solid',
                      boxShadow: "none",
                      borderRadius: "6px",
                      //marginTop: "155px",
                      maxWidth: "0px",
                      minWidth: "26%",
                      margin:"0px",
                      padding:"30px",
                      // display: "flex",
                      // justifyContent: "center",
                      // alignItems: "center",
                      // textAlign: "center",
                    },
                  }}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  {/* <DialogTitle
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                    id="alert-dialog-title"
                  >
                    <IconButton onClick={handleAllFeedMandatory}>
                      <img src={Closeicon} alt="icon" />
                    </IconButton>
                  </DialogTitle> */}
                  <DialogContent>
                    <DialogContentText
                      id="alert-dialog-description"
                      style={{
                        color: "#333333",
                        fontSize: "14px",
                        fontFamily: "Arial",
                        // paddingBottom: "12px",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        wordBreak: "break-word",
                        // height: "100px",
                        // width: "300px",
                        alignItems: "center",
                      }}
                    >

                      {message}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // paddingBottom: "30px"
                    }}
                  >
                    <Button
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        // marginRight: "10px",
                        width: "70px",
                        height: "35px",
                        background: "transparent",
                        color:"#3e8cb5"
                      }}
                      variant="outlined"
                      autoFocus
                      onClick={handleAllFeedMandatory1}
                    >
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
      <Dialog
        // fullScreen={fullScreen}
        open={allFeedMandatory}
        onClose={handleAllFeedMandatory}
        BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
        PaperProps={{
          style: {
            // borderColor:'blue',
            //border:'1px solid',
            boxShadow: "none",
            borderRadius: "6px",
            //marginTop: "155px",
            maxWidth: "0px",
            minWidth: "26%",
            margin: "0px",
            padding: "30px",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            // textAlign: "center",
          },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
            id="alert-dialog-title"
          >
            <IconButton onClick={handleAllFeedMandatory}>
              <img src={Closeicon} alt="icon" />
            </IconButton>
          </DialogTitle> */}
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{
              color: "#333333",
              fontSize: "14px",
              fontFamily: "Arial",
              // paddingBottom: "12px",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              wordBreak: "break-word",
              // height: "100px",
              // width: "300px",
              alignItems: "center",
              overflowY:"hidden",
            }}
          >

            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // paddingBottom: "30px"
          }}
        >
          <Button
            style={{
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3E8CB5",
               marginRight: "10px",
              // width: "70px",
              // height: "35px",
              background: "transparent",
              color:"#3e8cb5"}}
            variant="outlined"
            autoFocus
            onClick={handleAllFeedMandatory}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {/* </Link> */}
    </Stack>
    // </Footer>
  );
}

export default Footerbuttons;
