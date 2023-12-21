import React from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useReviewerContext } from "../../../context/reviewerContextContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import AlertDialogSuccess from "../../UI/DialogSuccess";
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

const FooterButtonsForRecommendation = (props: any) => {
  const { setnavPrompt, navPrompt, setValue, value, moveTab, setMoveTab } = props;
  //@ts-ignore
  const { updateMutation, employee_id, empData, reviewerOverallFeedComments, reviewerOtherRecommendationComments, reviewerAreaImprovementComments, reviewerTrainingRecommendationComments } = useReviewerContext()
  const navigate = useNavigate();
  const [openOk, setOpenOk] = useState(false);
  const [message, setMessage] = useState("")
  const [message1, setMessage1] = useState("")

  // if (isLoading) {
  //   <p>Loading...</p>
  // }

  const backHandler = () => {
    if (moveTab === true) {
      setOpenOk(true);
      setMessage("Please save the changes before leaving the page.")
    } else {
      setValue(0)
    }
  }

  const handleAlertClose = () => {
    setOpenOk(false);
    setMessage("");
  }


  const updateRejectionCount = (count: any) => {

    if (count === 0 || count === undefined) {
      return 1;
    } else if (count === 1) {
      return 2;
    } else if (count === 2) {
      return 3;
    }
  }

  const rejectionHandler = (count: any) => {
    if (count === 0 || count === undefined) {
      updateMutation({
        "reviewer.rejection_count": 1,
        "reviewerIsChecked": true,
        "reviewerIsDisabled": true,
        "reviewer.reviewer_status": 'rejected',
        "appraiserIsDisabled": false,
        "appraisal.appraiser_status": "reviewer-rejected",
        "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
        "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
        "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
        "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
        id: employee_id,
      })
    } else if (count === 1) {
      updateMutation({
        "reviewer.rejection_count": 2,
        "reviewerIsChecked": true,
        "reviewerIsDisabled": true,
        "reviewer.reviewer_status": 'rejected',
        "appraiserIsDisabled": false,
        "appraisal.appraiser_status": "reviewer-rejected",
        // "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
        // "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
        "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
        // "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
        id: employee_id,
      })
    } else if (count === 2) {
      updateMutation({
        "reviewer.rejection_count": 3,
        "reviewerIsChecked": true,
        "reviewerIsDisabled": true,
        "reviewer.reviewer_status": 'rejected',
        "normalizerIsDisabled": false,
        "normalizerIsChecked": false,
        "normalizer.normalizer_status": 'pending',
        // "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
        // "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
        "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
        // "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
        id: employee_id,
      })
    }
    //navigate(`/reviewer`);
  }


  const handleSubmit = () => {
    if (empData.data.reviewer.rejection_count === 0) {
      updateMutation({
        "reviewerIsChecked": true,
        "reviewerIsDisabled": true,
        "reviewer.reviewer_status": 'accepted',
        "normalizerIsDisabled": false,
        "normalizerIsChecked": false,
        "normalizer.normalizer_status": 'pending',
        id: employee_id,
      })
    }
  }
  //nav prompt
  const [navTrigger, setnavTrigger] = useState(false);
  console.log(navTrigger, navPrompt, 'navTrigger&prompt')
  useEffect(() => {
    if (navPrompt === false && navTrigger === true) {
      console.log('func2')
      setnavTrigger(false)
      rejectionHandler(empData.data.reviewer.rejection_count);
      updateMutation({
        "reviewerIsChecked": true,
        "reviewerIsDisabled": true,
        "reviewer.reviewer_status": 'rejected',
        "appraiserIsDisabled": false,
        "appraisal.appraiser_status": "reviewer-rejected",
        // "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
        // "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
        "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
        // "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
        id: employee_id,
      })
    }
  }, [navTrigger]);
  //nav prompt
  const saveHandler = () => {
    setMoveTab(false);
    if (reviewerOverallFeedComments == undefined || reviewerOverallFeedComments == null || reviewerOverallFeedComments == "") {
      setMessage1('Please add the rejection reasons in the Overall Feedback.')
      setAllFeedMandatory(true);
      // updateMutation({
      //   "reviewer.reviewer_status": 'Draft',
      //   // "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
      //   // "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
      //   "reviewer.feedback_questions_comments": reviewerOverallFeedComments,
      //   // "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
      //   id: employee_id,
      // })
    } else {
      updateMutation({

        "reviewer.reviewer_status": 'draft',
        // "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
        // "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
        "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
        // "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
        id: employee_id,
      })
      setMessage1(' Changes have been saved.')
      setAllFeedMandatory(true);
      setnavPrompt(false);
    }
  }

  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
  };


  return (
    // <Footer>
    <Stack justifyContent="center" spacing={2} direction="row">
      {/* <Link to={`/reviewer`}>
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
                            obj: empData.data.appraisal.objective_description,
                            // "reviewer.other_recommendation": checkboxIdHandler(
                            //     checkboxHandler(otherRecommendation)
                            // ),
                            // "reviewer.training_recommendation":
                            // trainingRecommendationFormValues,
                            // "reviewer.feedback_questions": overallFeed,
                            // "reviewer.area_of_improvement": areaImprovement,
                            "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
                            "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
                            "reviewer.feedback_questions_comments":reviewerOverallFeedComments,
                            "reviewer.area_of_improvement_comments":reviewerAreaImprovementComments,
                            id: employee_id,
                        })
                    }}
                >
                    <Typo1>Save</Typo1>
                </Button>
            </Link> */}

      {/* <Link to={`/reviewer`}> */}
      <Button
        variant="outlined"

        // style={{
        //     // color: "#008E97",
        //     // fontSize: "16px",
        //     // border: "1px solid ##008E97",
        //     // fontWeight: 400,
        //     // textTransform: "none",
        //     // borderRadius: "7px",
        //     backgroundColor: "#008E97",
        //     fontSize: "16px",
        //     fontWeight: 400,
        //     textTransform: "none",
        //     borderRadius: "7px",
        // }}
        style={{
          backgroundColor: "Transparent",
          fontSize: "15px",
          fontWeight: 400,
          textTransform: "none",
          color: "#3e8cb5",
          borderColor: "#3E8CB5",
          height: "35px",
          fontFamily:"arial"
          // width: "70px",
        }}
        onClick={() => {
          saveHandler()

        }}
      >
        Save as Draft
      </Button>
      {/* </Link> */}

      <Button
        variant="outlined"
        // style={{
        //     color: "#008E97",
        //     fontSize: "16px",
        //     fontWeight: 400,
        //     textTransform: "none",
        //     borderRadius: "7px",
        // }}
        style={{
          backgroundColor: "Transparent",
          fontSize: "15px",
          textTransform: "none",
          color: "#3e8cb5",
          borderColor: "#3E8CB5",
          height: "35px",
          width: "70px",
          fontWeight: 400,
          fontFamily:"arial"
        }}
        onClick={() => { backHandler() }}
      >
        Back
        {/* <Link to={`/reviewer`}>
                    Back
                </Link> */}

      </Button>

      <AlertDialogSuccess
        isAlertOpen={openOk}
        handleAlertClose={handleAlertClose}>
        {message}
      </AlertDialogSuccess>

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
              //paddingBottom: "12px",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              wordBreak: "break-word",
              //height: "100px",
              // width: "300px",
              alignItems: "center",
              overflowY: "hidden",
            }}
          >
            {/* Changes have been saved. */}
            {message1}
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
              color: "#3e8cb5",
              width: "70px",
              height: "35px",
              background: "transparent",
            }}
            variant="outlined"
            autoFocus
            onClick={handleAllFeedMandatory}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
    // </Footer>
  );
}

export default FooterButtonsForRecommendation;
